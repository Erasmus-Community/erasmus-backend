import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Organisation } from '@prisma/client';

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
    async findOrgById(id: string): Promise<Organisation>{
        let orgId = this.parseId(id);
        return await this.prismaService.organisation.findOne({
            where: {
            id: orgId,
            }
        });
    }

    /*
    * Creating the organisation based on the params
    * @returns Created organisation
    */
    async createOrg(): Promise<Organisation>{
        return await this.prismaService.organisation.create({
            data: {
                country: "PT",
                name: "Org to Test",
                description: "this is a description"
            }
        });
    }

    /*
    * Update Organisation by ID
    * @returns - updated organisation 
    */
    async updateOrganisationById(id: string): Promise<Organisation>{
        let orgId = this.parseId(id);
        return await this.prismaService.organisation.update({
            where: {
                id: orgId
            },
            data: {
                name: "testing update"
            }
        });
    }

    /*
    *
    */
    async deleteOrganisationById(id: string): Promise<string>{
        let orgId = this.parseId(id);
        let org: Organisation = await this.prismaService.organisation.delete({
            where: {
                id: orgId
            }
        })
        if(org) { return "ok"; }
        else{ return "no org was found"; }
    }

    /* PRIVATE METHODS */
    private parseId(id: string){
        let orgId = parseInt(id);
        if(isNaN(orgId)){ throw new HttpException({status: HttpStatus.NOT_FOUND, error: ":id must be an Integer"}, HttpStatus.NOT_FOUND) }
        return orgId;
    }
}
