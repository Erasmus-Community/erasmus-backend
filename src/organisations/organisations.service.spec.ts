import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrganisationsService } from './organisations.service';

/*
* Making tests directly to a test database
* TODO: add the test database to make proper tests
*/


describe('OrganisationsService', () => {
  let service: OrganisationsService;
  const orgInfo = {country: "PT", description: "Test Organisation", name: "Name Organisation", owner: null} as OrganisationDto;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganisationsService, PrismaService],
    }).compile();

    service = module.get<OrganisationsService>(OrganisationsService);
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
    let infoToUpdate;
    beforeEach(() =>{
       infoToUpdate = { description: 'Updated Description'};
    });

    it('should update a organisation to the Updated Info', async () => {
      expect(await service.updateOrganisationById(1,infoToUpdate))
    });
  });

  describe('deleteOrganisationById', () => {
    it('should delete a organisation', async () => {
      expect(await service.deleteOrganisationById(1));
    });
  });


  describe('deleteOrganisationById with a ', () => {
    it('should delete a organisation', async () => {
      expect(await service.deleteOrganisationById(1))
    });
  })
});
