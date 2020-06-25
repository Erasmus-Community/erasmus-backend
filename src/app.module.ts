import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OrganisationsController } from './organisations/organisations.controller';
import { PrismaModule } from './prisma/prisma.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { OrganisationsModule } from './organisations/organisations.module';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule, OrganisationsModule],
  controllers: [AppController, OrganisationsController, UsersController],
  providers: [AppService],
})
export class AppModule {}
