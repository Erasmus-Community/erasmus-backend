import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrganisationDto } from './organisations.models';
import { OrganisationsService } from './organisations.service';

/*
* Making tests directly to a test database
*/


describe('OrganisationsService', () => {
  let service: OrganisationsService;
  let prisma: PrismaService;
  const orgInfo = {country: "PT", description: "Test Organisation", name: "Name Organisation", owner: null} as OrganisationDto;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganisationsService, PrismaService],
    }).compile();

    service = module.get<OrganisationsService>(OrganisationsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#findAllOrgs', () => {
    it('should return all orgs', async () => {
      expect(await service.findAllOrgs()).toBeTruthy
    });
  });

  describe('#findOrgById', () => {
    it('should return an organisation', async () => {
      expect(await service.findOrgById(1)).toBeTruthy
    });
  });

  describe('createOrg', () => {
    it('should return a organisationInfo', async () => {
      expect(await service.createOrg(orgInfo)).toBeTruthy
    });
  });

  describe('updateOrganisationById', () => {
    const infoToUpdate = { ...orgInfo, description: 'Updated Description'} ;
    let org;
    beforeEach(async () =>{
      org = await service.createOrg(orgInfo);
    });

    it('should update a organisation to the Updated Info', async () => {
      expect(await service.updateOrganisationById(org.id,infoToUpdate)).toHaveProperty("description", "Updated Description");
    });
  });

  describe('deleteOrganisationById', () => {
    let org: OrganisationDto;
    beforeEach(async () => {
      org = await service.createOrg(orgInfo);
    });
    
    it('should delete a organisation', async () => {
      expect(await service.deleteOrganisationById(org.id)).toHaveProperty("error",false);
    });
  });
});
