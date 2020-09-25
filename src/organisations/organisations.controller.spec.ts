import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrganisationsController } from './organisations.controller';
import { OrganisationsService } from './organisations.service';
import { OrganisationDto } from './organisations.models';

/*
* Mocking the response because I will make the tests on the service
*/
describe('Organisations Controller', () => {
  let controller: OrganisationsController;
  let service: OrganisationsService;
  const orgInfo = {country: "PT", description: "Test Organisation", name: "Name Organisation", owner: null} as OrganisationDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [OrganisationsService],
      exports: [OrganisationsService],
      controllers: [OrganisationsController]
    }).compile();

    controller = module.get<OrganisationsController>(OrganisationsController);
    service = module.get<OrganisationsService>(OrganisationsService);

    // mocking services
    jest.spyOn(service, 'findAllOrgs').mockImplementation(async () => []);
    jest.spyOn(service, 'findOrgById').mockImplementation(async () => orgInfo);
    });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('find organisations', () => {
    it('should return an array of organisations', async () => {    
      expect(await controller.getOrgs()).toStrictEqual([]);
    });
  });

  describe('create an organisation', () => {
    beforeEach(async () => {
      jest.spyOn(service, 'createOrg').mockImplementation(async () => { return orgInfo });
    })
    it('should return an array with a single organisation', async () => {
      expect(await controller.create(orgInfo)).toBe(orgInfo)
    })
  });

  describe('finding and organisation', () => {
    it('should have found a organisation', async () => {
      expect(await controller.findOrgById(1)).toBe(orgInfo);
    });
  });

  describe('update an organisation', () => {
    const infoBeforeUpdate = { country: "PT", description: "Test Description", name: "Name of Org", owner: null, id: 1} as OrganisationDto;
    let infoToUpdate;
    beforeEach(async () => {
      infoToUpdate = { description: 'Updated Description'};
      jest.spyOn(service, 'updateOrganisationById').mockImplementation(async () => { return {
        ...infoBeforeUpdate,
        description: infoToUpdate.description
      }});
  
    });

    it('should update a property of the desired organisation', async () => {
      expect(await controller.update(1,infoToUpdate)).toHaveProperty('description', "Updated Description")
    });
  });

  describe('delete an organisation', () => {
    beforeEach(async () => {
      jest.spyOn(service, 'deleteOrganisationById').mockImplementation(async () => { 
        return { error: false, message: "OK" }
      });
    });

    it('should return an array without ', async () => {
      expect(await controller.delete(1)).toHaveProperty('message','OK');
    });
  });
});

