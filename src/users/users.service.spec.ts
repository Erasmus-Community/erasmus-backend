import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#getUser', () => {
    it('return a User object when getting looking for a user', async () => {
      expect(await service.getUser(1)).toBeInstanceOf("object");
    });
  })

  describe('#createUser', () => {
    it('returns a User object when creating a User', async () => {
      expect(await service.createUser('test@user.com','1234')).toBeInstanceOf("object");
    });
  })

  // TODO:
  describe('#updateUser', () => {
    it('returns an updated User when changing a property', async () => {
      expect(await service.updateUser()).toBeTruthy
    });
  })

  describe('#deleteUser', () => {
    it('returns deleted user when adding wanting to delete', async () => {
      expect(await service.deleteUser(1)).toBeInstanceOf("object");
    });
  })
});
