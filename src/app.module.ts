import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobModelModule } from './job_model/job_model.module';

@Module({
  imports: [JobModelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
