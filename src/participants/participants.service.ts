import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ParticipantsService {
    constructor(private readonly prismaService: PrismaService){}

    async createPartipant() : Promise<string> { return "Missing Method" }
}
