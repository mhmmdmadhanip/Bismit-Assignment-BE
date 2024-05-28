import { PrismaService } from "src/prisma.service";
import { UpdateUser, User } from "./user.model";
import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

interface CookieOptions {
    httpOnly: boolean;
    maxAge: number;
    secure: boolean;
    sameSite: 'strict' | 'lax' | 'none' | boolean;
}

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
        const updateUser = this.prisma.user.update({
            where: {id: Number(id)},
            data: {
                fullname: data.fullname,
                phonenumber: data.phonenumber,
            }
        })
        return updateUser;
    }

    async deleteUser(id: number): Promise<User> {
        return this.prisma.user.delete({
            where: {id: Number(id)},

        })
    }

    async findUserLogin(username: string, password: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                username: username,
            },
        });

        // If user doesn't exist or password doesn't match, return null
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new BadRequestException('Invalid Credentials');
        }

        // Return the user
        return user;
    }
}