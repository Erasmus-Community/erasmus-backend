import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrganisationsController } from './organisations/organisations.controller';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule],
  controllers: [AppController, OrganisationsController],
  providers: [AppService],
})
export class AppModule {}
