import { Module } from '@nestjs/common';
import { OrganisationsController } from './organisations.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrganisationsService } from './organisations.service';

@Module({
    imports: [PrismaModule],
    providers: [OrganisationsService],
    exports: [OrganisationsService],
  })
export class OrganisationsModule {}
