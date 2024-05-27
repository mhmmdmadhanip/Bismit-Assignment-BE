import { UpdateUser, User } from "./user.model";
import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { DatabaseService } from "src/database/database.service";


@Injectable()
export class UserService {
    constructor (private readonly data: DatabaseService) {}
    
    async getAllUser(): Promise<User[]> {
        return this.data.user.findMany()
    }

    async getUser(id:number): Promise<User | null> {
        return this.data.user.findUnique({
            where: {id:Number(id)}
        })
    } 

    async createUser(data: User): Promise <User> {
        return this.data.user.create ({
            data
        })
    }

    async updateUser(id: number, data: UpdateUser): Promise <User> {
        const updateUser = this.data.user.update({
            where: {id: Number(id)},
            data: {
                fullname: data.fullname,
                phonenumber: data.phonenumber,
            }
        })
        return updateUser;
    }

    async deleteUser(id: number): Promise<User> {
        return this.data.user.delete({
            where: {id: Number(id)},

        })
    }

    async findUserLogin(username: string, password: string): Promise<User | null> {
        const user = await this.data.user.findUnique({
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