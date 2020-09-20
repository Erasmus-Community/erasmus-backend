import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrganisationsController } from './organisations.controller';
import { OrganisationsService } from './organisations.service';

describe('Organisations Controller', () => {
  let controller: OrganisationsController;
  let service: OrganisationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [OrganisationsService],
      exports: [OrganisationsService],
    }).compile();

    controller = module.get<OrganisationsController>(OrganisationsController);
    service = module.get<OrganisationsService>(OrganisationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('findAll', () => {
    it('should return an array of organisations', async () => {
      jest.spyOn(service, 'findAllOrgs').mockImplementation(async () => []);

      expect(await controller.getOrgs()).toBe([]);
    });
  });
});

