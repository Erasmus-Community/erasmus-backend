import { Controller, Post, Get, Param, Delete, HttpException, HttpStatus, Put } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Organisation } from 'generated/prisma-client';

@Controller('organisations')
export class OrganisationsController {
    constructor( private readonly prisma: PrismaService){}

    @Get()
    async organisations(): Promise<Organisation[]> {
        return await this.prisma.organisation.findMany();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Organisation> {

        let orgId = parseInt(id);
        if(isNaN(orgId)){ throw new HttpException({status: HttpStatus.NOT_FOUND, error: ":id must be an Integer"}, HttpStatus.NOT_FOUND) }
        
        return await this.prisma.organisation.findOne({
            where: {
            id: orgId,
            }
        });
    }

    @Post()
    async create(): Promise<Organisation> {
        return await this.prisma.organisation.create({
            data: {
                country: "PT",
                name: "Org to Test",
                description: "this is a description"
            }
        });
    }

    @Put(':id')
    async update(@Param('id') id: string): Promise<Organisation> {
        let orgId = parseInt(id);
        if(isNaN(orgId)){ throw new HttpException({status: HttpStatus.NOT_FOUND, error: ":id must be an Integer"}, HttpStatus.NOT_FOUND) }

        return await this.prisma.organisation.update({
            where: {
                id: orgId
            },
            data: {
                name: "testing update"
            }
        });
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<string> {
        let orgId = parseInt(id);
        if(isNaN(orgId)){ throw new HttpException({status: HttpStatus.NOT_FOUND, error: ":id must be an Integer"}, HttpStatus.NOT_FOUND) }
        
        let org: Organisation = await this.prisma.organisation.delete({
            where: {
                id: orgId
            }
        })
        if(org) { return "ok"; }
        else{ return "no org was found"; }
    }
}
