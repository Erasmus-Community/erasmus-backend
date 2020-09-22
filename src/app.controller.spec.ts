import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { LoginDto } from './auth/auth.models';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{
        provide: AuthService,
        useValue: {
          login: jest.fn(),
          createUser: jest.fn()
        }
      },
      {
        provide: UsersService,
        useValue: {
          encryptPwd: jest.fn(),
        }
      }
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });
});
