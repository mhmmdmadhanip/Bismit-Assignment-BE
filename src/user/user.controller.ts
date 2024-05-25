import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { User } from "./user.model";
import { UserService } from "./user.service";
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Get()
    async getAllUser(): Promise<User[]> {
        return this.userService.getAllUser()
    }
    
    @Get(':id')
    async getUserById(@Param('id') id:number): Promise<User | null> {
        return this.userService.getUser(id);
    }

    @Post('register')
    @UsePipes(new ValidationPipe())
    async createUser(@Body() postData: User): Promise<User> {
        const hashedPassword = await bcrypt.hash(postData.password, 12);
    
        const postDataWithHashedPassword = {
            ...postData,
            password: hashedPassword,
        };
    
        return this.userService.createUser(postDataWithHashedPassword);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    async editUser(@Param('id') id:number, @Body() postData:User): Promise<User> {
        return this.userService.updateUser(id, postData);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id:number): Promise<User> {
        return this.userService.deleteUser(id);
    }

    @Post('login')
    async loginUser(@Body('username') email:string, @Body('password') password:string ) {

    }
}