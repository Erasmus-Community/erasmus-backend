import { Module } from '@nestjs/common';
import { OrganisationsController } from './organisations.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [OrganisationsController],
  })
export class OrganisationsModule {}
