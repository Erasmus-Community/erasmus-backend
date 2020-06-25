import { Controller, Post, Get, Param, Delete, Put } from '@nestjs/common';
import { Organisation } from '@prisma/client';
import { OrganisationsService } from './organisations.service';

@Controller('organisations')
export class OrganisationsController {
    constructor(private organisationsService: OrganisationsService){}

    @Get()
    async getOrgs(): Promise<Organisation[]> {
        return await this.organisationsService.findAllOrgs();
    }

    @Get(':id')
    async findOrgById(@Param('id') id: string): Promise<Organisation> {
        return await this.organisationsService.findOrgById(id);
    }

    @Post()
    async create(): Promise<Organisation> {
        return await this.organisationsService.createOrg();
    }

    @Put(':id')
    async update(@Param('id') id: string): Promise<Organisation> {
        return await this.organisationsService.updateOrganisationById(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<string> {
        return await this.organisationsService.deleteOrganisationById(id);
    }
}
