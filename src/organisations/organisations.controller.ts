import { Controller, Post, Get, Param, Delete, Put, Body, ParseIntPipe } from '@nestjs/common';
import { Organisation } from '@prisma/client';
import { OrganisationsService } from './organisations.service';
import { OrganisationDto } from './organisations.models';

@Controller('organisations')
export class OrganisationsController {
    constructor(private organisationsService: OrganisationsService){}

    @Get()
    async getOrgs(): Promise<Organisation[]> {
        return await this.organisationsService.findAllOrgs();
    }

    @Get(':id')
    async findOrgById(@Param('id', ParseIntPipe) id: number): Promise<Organisation> {
        return await this.organisationsService.findOrgById(id);
    }

    @Post()
    async create(@Body() orgInfo: OrganisationDto): Promise<OrganisationDto> {
        return await this.organisationsService.createOrg(orgInfo);
    }

    @Put(':id')
    async update(@Param('id',ParseIntPipe) id: number, @Body() orgInfo: OrganisationDto): Promise<Organisation> {
        return await this.organisationsService.updateOrganisationById(id,orgInfo);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
        return await this.organisationsService.deleteOrganisationById(id);
    }
}
