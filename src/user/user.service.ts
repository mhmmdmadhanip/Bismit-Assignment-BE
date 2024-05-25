import { PrismaService } from "src/prisma.service";
import { UpdateUser, User } from "./user.model";
import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor (private prisma: PrismaService) {}
    
    async getAllUser(): Promise<User[]> {
        return this.prisma.user.findMany()
    }

    async getUser(id:number): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {id:Number(id)}
        })
    } 

    async createUser(data: User): Promise <User> {
        return this.prisma.user.create ({
            data
        })
    }

    async updateUser(id: number, data: UpdateUser): Promise <User> {
        return this.prisma.user.update({
            where: {id: Number(id)},
            data: {
                fullname: data.fullname,
                phonenumber: data.phonenumber,
            }
        })
    }

    async deleteUser(id: number): Promise<User> {
        return this.prisma.user.delete({
            where: {id: Number(id)},

        })
    }

    async findUserLogin(username: string, password: string): Promise<User | null>{
        const user = await this.prisma.user.findUnique({
            where: {
                username: username,
            },
        });

        // If user doesn't exist or password doesn't match, return null
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return null;
        }

        // If the username and password match, return the user
        return user;
    }
}