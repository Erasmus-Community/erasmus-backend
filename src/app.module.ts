import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { OrganisationsController } from './organisations/organisations.controller';
import { PrismaModule } from './prisma/prisma.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { OrganisationsModule } from './organisations/organisations.module';
import { ProjectsModule } from './projects/projects.module';
import { ParticipantsService } from './participants/participants.service';
import { ParticipantsModule } from './participants/participants.module';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule, OrganisationsModule, ProjectsModule, ParticipantsModule],
  controllers: [AppController, OrganisationsController, UsersController],
  providers: [ParticipantsService],
})
export class AppModule {}
