import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersDTO } from './users.models';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  })

  describe('#getUser', () => {
    let user: User;
    beforeEach(async() => {
      user = await service.createUser("test@email.com","12345678");
    });

    afterEach(async() => {
      await service.deleteUser(user.id);
    });

    it('return a User object when getting looking for a user', async () => {
      expect(await service.getUser(user.id)).toHaveProperty("email","test@email.com")
    });
  })

  describe('#createUser', () => {
    let user: User;
    beforeEach(async() => {
      user = await service.createUser("test@email.com","12345678");
    });

    afterEach(async () => {
      await service.deleteUser(user.id)
    });

    it('returns a User object when creating a User', async () => {
      expect(user).toHaveProperty("email","test@email.com");
    });
  })

  describe('#updateUser', () => {
    let user: User;
    let userDto: UsersDTO;
    beforeEach(async() => {
      user = await service.createUser("test@email.com","12345678");
      userDto = { ...user, name: "Name" };
      userDto["id"] = undefined
    });

    afterEach(async() => {
      await service.deleteUser(user.id);
    });

    it('returns an updated User when changing a property', async () => {
      expect(await service.updateUser(user.id,userDto)).toHaveProperty("name","Name");
    });
  })

  describe('#deleteUser', () => {
    let user: User;
    beforeEach(async() => {
      user = await service.createUser("test@email.com","12345678");
    });

    it('returns deleted user when adding wanting to delete', async () => {
      expect(await service.deleteUser(user.id)).toHaveProperty("email","test@email.com");
    });
  })
});
