import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('Users Controller', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, PrismaService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
  describe('#getUser', () =>{
    it('', async () =>{
      expect(await controller.getUser(1)).toBeTruthy
    });
  });

  describe('#updateUser', () => {
    it('', async () =>{
      expect(await controller.updateUser()).toBeTruthy
    });
  });

  describe('#deleteUSER', () => {
    it('', async () =>{
      expect(await controller.deleteUser(1)).toBeTruthy
    });
  });
});
