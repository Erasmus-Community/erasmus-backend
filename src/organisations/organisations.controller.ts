import { Controller, Post, Get, Param, Delete, Put, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { OrganisationsService } from './organisations.service';
import { OrganisationDto } from './organisations.models';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/organisations')
export class OrganisationsController {
    constructor(private readonly organisationsService: OrganisationsService){}

    @Get()
    async getOrgs(): Promise<OrganisationDto[]> {
        try {
            return await this.organisationsService.findAllOrgs();     
        } catch (error) {
            return Promise.reject({error: true, message: error})
        }
       }

    @Get(':id')
    async findOrgById(@Param('id', ParseIntPipe) id: number): Promise<OrganisationDto> {
        try {
            return await this.organisationsService.findOrgById(id);            
        } catch (error) {
            return Promise.reject({error: true, message: error})
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() orgInfo: OrganisationDto): Promise<OrganisationDto> {
        try{
            return await this.organisationsService.createOrg(orgInfo);
        } catch (error) {
            return Promise.reject({error: true, message: error})
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id',ParseIntPipe) id: number, @Body() orgInfo: OrganisationDto): Promise<OrganisationDto> {
        try{
            return await this.organisationsService.updateOrganisationById(id,orgInfo);
        } catch (error) {
            return Promise.reject({error: true, message: error})
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
        try{
           return await this.organisationsService.deleteOrganisationById(id);
        } catch (error) {
            return Promise.reject({error: true, message: error})
        }
    }
}
