import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Organisation } from '@prisma/client';
import { OrganisationDto } from './organisations.models';

@Injectable()
export class OrganisationsService {
    constructor(private readonly prismaService: PrismaService){}

    async findAllOrgs(): Promise<Organisation[]>{
        return await this.prismaService.organisation.findMany();
    }
    /*
    *   Find a single org by Id
    *   @returns Organisation
    */
    async findOrgById(id: number): Promise<Organisation>{
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
    async createOrg(orgInfo: OrganisationDto): Promise<Organisation>{
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
    async updateOrganisationById(id: number, orgInfo: OrganisationDto): Promise<Organisation>{
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
    *
    */
    async deleteOrganisationById(id: number): Promise<string>{
        let org: Organisation = await this.prismaService.organisation.delete({
            where: {
                id: id
            }
        })
        if(org) { return "ok"; }
        else{ return "no org was found"; }
    }
}
