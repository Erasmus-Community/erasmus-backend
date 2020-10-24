import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient
implements OnModuleInit, OnModuleDestroy{
    constructor() {
        super();
    }
    
    async onModuleInit(): Promise<void> { await this.$connect(); }

    async onModuleDestroy(): Promise<void> { await this.$disconnect(); }

    async makeQuery(query: string): Promise<void> { await this.$queryRaw(query); }
}
