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

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [OrganisationsService],
      exports: [OrganisationsService],
      controllers: [OrganisationsController]
    }).compile();

    controller = module.get<OrganisationsController>(OrganisationsController);
    service = module.get<OrganisationsService>(OrganisationsService);
    });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  /* Normal Methods */

  describe('find organisations', () => {
    beforeEach(async () => {
      jest.spyOn(service, 'findAllOrgs').mockImplementationOnce(async () => []);
    })

    it('should return an array of organisations', async () => {    
      expect(await controller.getOrgs()).toStrictEqual([]);
    });
  });

  describe('create an organisation', () => {
    beforeEach(async () => {
      jest.spyOn(service, 'createOrg').mockImplementationOnce(async () => { return orgInfo });
    })
    it('should return an array with a single organisation', async () => {
      expect(await controller.create(orgInfo)).toBe(orgInfo)
    })
  });

  describe('finding and organisation', () => {
    beforeEach(async () => {
      jest.spyOn(service, 'findOrgById').mockImplementationOnce(async () => orgInfo);
    })

    it('should have found a organisation', async () => {
      expect(await controller.findOrgById(1)).toBe(orgInfo);
    });
  });

  describe('update an organisation', () => {
    const infoBeforeUpdate = { country: "PT", description: "Test Description", name: "Name of Org", owner: null, id: 1} as OrganisationDto;
    let infoToUpdate;

    beforeEach(async () => {
      infoToUpdate = { description: 'Updated Description'};
      jest.spyOn(service, 'updateOrganisationById').mockImplementationOnce(async () => { return {
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
      jest.spyOn(service, 'deleteOrganisationById').mockImplementationOnce(async () => { 
        return { error: false, message: "OK" }
      });
    });

    it('should return an array without ', async () => {
      expect(await controller.delete(1)).toHaveProperty('message','OK');
    });
  });

  /*
  * Errors mocks
  */

  describe('returns errrors', () => {
    describe('#CreateOrg', () => {
      beforeEach(async () => {
        jest.spyOn(service, 'createOrg').mockRejectedValue(new Error('error on database'));
      });
  
      it('should return an error', async () => {
        try{
          await controller.create(orgInfo)
        }catch(e) {
          expect(e).toHaveProperty('error', true);
        }
      });
    });

    describe('#findAllOrgs', () => {
      beforeEach(async () => {
        jest.spyOn(service, 'findAllOrgs').mockImplementationOnce(async () => Promise.reject('error on database'));
      });

      it('should return an error', async () => {
        try{
          await controller.getOrgs();
        } catch(e) {
          expect(e).toHaveProperty('error', true);
        }
      });
    });
      
    describe("#findOrgById", () => {
      beforeEach(async () => {
        jest.spyOn(service, 'findOrgById').mockImplementationOnce(async () => Promise.reject('error on database'));
      });

      it('should return an error', async () => {
        try{
          await controller.findOrgById(1);
        } catch(e) {
          expect(e).toHaveProperty('error', true);
        }
      });
    });

    describe("#update", () => {
      beforeEach(async () => {
        jest.spyOn(service, 'updateOrganisationById').mockImplementationOnce(async () => Promise.reject('error on database'));
      });

      it('should return an error', async () => {
        try{
          await controller.update(1, orgInfo);
        } catch(e) {
          expect(e).toHaveProperty('error', true);
        }
      }); 
    });

    describe("#deleteId", () => {
      beforeEach(async () => {
        jest.spyOn(service, 'deleteOrganisationById').mockImplementationOnce(async () => Promise.reject('error on database'));
      })

      it('should return an error', async () => {
        try{
          await controller.delete(1);
        } catch(e) {
          expect(e).toHaveProperty('error', true);
        }
      });
    });
  });
  /* End of errors mocks */
});