import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectsService {
    constructor(private readonly prismaService: PrismaService){}

    async getProjects(): Promise<string> { return "Missing Method" }
    async getProjectInfo(): Promise<string> { return "Missing Method" }
    async updateProject(): Promise<string> { return "Missing Method" }
    async deleteProject(): Promise<string> { return "Missing Method" }
}
