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
    jest.fn();
    jest.spyOn(service, 'findAllOrgs').mockImplementation(async () => []);
    jest.spyOn(service, 'findOrgById').mockImplementation(async () => { return {
      country: "PT", description: "Test Organisation", name: "Name Organisation", owner: null, id: 1
    } as OrganisationDto});
    jest.spyOn(service, 'createOrg').mockImplementation(async () => { return {} as OrganisationDto });
    jest.spyOn(service, 'updateOrganisationById').mockImplementation(async () => { return {} as OrganisationDto});
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
    it('should return an array with a single organisation', async () => {
      const orgInfo = {country: "PT", description: "Test Organisation", name: "Name Organisation", owner: null} as OrganisationDto;
      expect(await controller.create(orgInfo)).toContain({country: "PT", description: "Test Organisation", name: "Name Organisation", owner: null} as OrganisationDto)
    })
  });

  describe('finding and organisation', () => {
    it('should have found a organisation', async () => {
      expect(await controller.findOrgById(1)).toBe({
        country: "PT", description: "Test Organisation", name: "Name Organisation", owner: null, id: 1
      })
    });
  });

  describe('update an organisation', () => {
    let infoToUpdate;
    beforeEach(async () => {
      infoToUpdate = { description: 'Updated Description'};
    });

    it('should update a property of the desired organisation', async () => {
      expect(await controller.update(1,infoToUpdate)).toBe({
        country: "PT", description: "Updated Description", name: "Name Organisation", owner: null, id: 1
      })
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

