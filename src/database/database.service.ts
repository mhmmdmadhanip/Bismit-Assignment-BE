import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
    
    async onModuleInit() {
        await this.$connect();
    }

}
