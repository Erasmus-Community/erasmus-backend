import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './auth.models';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,PrismaService,
      { 
        provide: JwtService,
        useValue: {
          sign: jest.fn()
      }
    }
    ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#Verifications', () => {
    describe('validateUser', () => {
      it('with a fake account ', async () => {
        expect(await service.validateUser('invalid@test.com','1234')).toBeNull
      })

      it('with a valid account', async () => {
        expect(await service.validateUser('test@test.com','12345678')).toBeNull
      })
    });

    describe('login', () => {
      it('with a fake account', async () => {
        const loginInfo = { email: 'invalid@test.com', password: '12345678' } as LoginDto;
        expect(await service.login(loginInfo)).toBeFalsy
      });

      it('with a valid account', async () => {
        const loginInfo = { email: 'test@test.com', password: '1234' } as LoginDto;
        expect(await service.login(loginInfo)).toHaveProperty('access_token')
      })
    });

  });


  describe('Unit Tests', () => {
    const password = "12345678";
    
    it('encryPwd', async () => {
      expect(await service.encryptPwd(password)).toBeTruthy;
    });
  
    describe('checkPwd', () => {
      it('returns true. correct comparison', async () =>{
        expect(await service.checkPwd(password,'$2b$10$ZTqbOKIhBC23zBUeT3nxs.ZW9WOHecFIZlXMOYdorKP2k.3gmidUa')).toBeTruthy;
      })
  
      it('returns false. not a correct comparison', async () => {
        expect(await service.checkPwd(password,'1234')).toBeFalsy;
      });
    });
  });
});