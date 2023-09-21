import { Module } from '@nestjs/common';
import { ApplicationsService } from './services/applications.service';
import { ApplicationsController } from './controllers/applications.controller';

@Module({
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
})
export class ApplicationsModule {}
