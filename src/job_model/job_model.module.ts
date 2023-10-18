import { Module } from '@nestjs/common';
import { JobModelController } from './job_model.controller';
import { JobModelService } from './job_model.service';

@Module({
  controllers: [JobModelController],
  providers: [JobModelService]
})
export class JobModelModule {}
