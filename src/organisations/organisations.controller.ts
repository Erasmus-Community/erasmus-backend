import { Controller, Post, Get, Param, Delete } from '@nestjs/common';

@Controller('organisations')
export class OrganisationsController {
    @Get()
    async findAll(): Promise<string> {
        return 'should get all the orgs';
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<string> {
        console.log(id)
        return `This action returns a #${id} organisation`; 
    }

    @Post()
    async create(): Promise<string> {
        return 'should create a new org';
    }

    @Delete(':id')
    async delete(): Promise<string> {
        return 'endpoint to delete an organisation';
    }
}
