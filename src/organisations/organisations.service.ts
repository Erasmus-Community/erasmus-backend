import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrganisationDto } from './organisations.models';

@Injectable()
export class OrganisationsService {
    constructor(private readonly prismaService: PrismaService){}

    async findAllOrgs(): Promise<OrganisationDto[]>{
        return await this.prismaService.organisation.findMany();
    }
    /*
    *   Find a single org by Id
    *   @returns Organisation
    */
    async findOrgById(id: number): Promise<OrganisationDto>{
        return await this.prismaService.organisation.findOne({
            where: {
            id: id,
            }
        });
    }

    /*
    * Creating the organisation based on the params
    * @returns Created organisation
    */
    async createOrg(orgInfo: OrganisationDto): Promise<OrganisationDto>{
        return await this.prismaService.organisation.create({
            data: {
                country: orgInfo.country,
                name: orgInfo.name,
                description: orgInfo.description
            }
        });
    }

    /*
    * Update Organisation by ID
    * @returns - updated organisation 
    */
    async updateOrganisationById(id: number, orgInfo: OrganisationDto): Promise<OrganisationDto>{
        return await this.prismaService.organisation.update({
            where: {
                id: id
            },
            data: {
                name: orgInfo.name,
                description: orgInfo.description,
                country: orgInfo.country
            }
        });
    }

    /*
    * Delete Organisation by Id
    * @returns json with error false and message
    */
    async deleteOrganisationById(id: number): Promise<any>{
        const org = await this.prismaService.organisation.delete({
            where: {
                id: id
            }
        })
        if(org) { return {error: false, message: "OK" } }
        else{ return {error: true, message: "No organisation was found" } }
    }
}
