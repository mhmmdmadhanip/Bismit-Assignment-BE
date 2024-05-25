import { Prisma } from "@prisma/client";
import {IsNotEmpty, IsPhoneNumber, MaxLength, MinLength } from 'class-validator'


export class User implements Prisma.UserCreateInput {
    id: number;

    @IsNotEmpty()
    @MaxLength(20)
    username: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsNotEmpty()
    fullname: string;

    @IsPhoneNumber('ID')
    phonenumber: string;
}