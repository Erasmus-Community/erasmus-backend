import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('#init', async () => {
    expect(await service.onModuleInit()).toBeTruthy
  });
  
  it('#makeQuery', async () => {
    expect(await service.makeQuery('SELECT * FROM "User"')).toBeTruthy
  })

  it('#destroy', async () => {
    expect(await service.onModuleDestroy()).toBeTruthy
  })
});
