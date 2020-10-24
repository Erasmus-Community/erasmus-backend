import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

/*
* Mocking the response because I will make the tests on the service
*/
describe('Users Controller', () => {
  let controller: UsersController;
  let prisma: PrismaService;
  let service: UsersService;
  const userInfo = {name: "Name", email: "email@test.com"} as User;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, PrismaService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    prisma = module.get<PrismaService>(PrismaService);
    service = module.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
  describe('#getUser', () =>{
    beforeEach(async () => {
      jest.spyOn(service, 'getUser').mockImplementationOnce(async () =>  userInfo );
    });

    it('it returns a user', async () =>{
      expect(await controller.getUser(1)).toBeTruthy
    });
  });

  describe('#updateUser', () => {
    const infoBeforeUpdate = { name: "Name", email: "email@test.com" } as User;
    let infoToUpdate;

    beforeEach(async () => {
      infoToUpdate = { name: 'Updated Name'};
      jest.spyOn(service, 'updateUser').mockImplementationOnce(async () => { return {
        ...infoBeforeUpdate,
        name: infoToUpdate.name
      }}); 
    });

    it('updates an user', async () =>{
      expect(await controller.updateUser()).toHaveProperty("name", infoToUpdate.name)
    });
  });

  describe('#deleteUser', () => {
    beforeEach(async () => {
      jest.spyOn(service, 'deleteUser').mockImplementationOnce(async () => userInfo );
    });
    
    it('deletes a user', async () =>{
      expect(await controller.deleteUser(1)).toBeTruthy
    });
  });
});
