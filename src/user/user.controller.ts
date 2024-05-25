import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UpdateUser, User } from "./user.model";
import { UserService } from "./user.service";
import * as bcrypt from 'bcrypt';
import { AuthGuard } from "./auth-guard.guard";

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
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async editUser(@Param('id') id:number, @Body() postData:UpdateUser): Promise<User> {
        return this.userService.updateUser(id, postData);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteUser(@Param('id') id:number): Promise<User> {
        return this.userService.deleteUser(id);
    }

    @Post('login')
    async loginUser(@Body('username') username:string, @Body('password') password:string ) {
        return this.userService.findUserLogin(username, password)
    }
}