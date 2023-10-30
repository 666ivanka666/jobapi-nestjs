import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { JobModelService } from './job_model.service';
import { JobModelDto } from './dto';
import { JobModel } from './type';
import { IdDto, NameDto } from '../common/decorators';

@Controller('jobs')
export class JobModelController {
  constructor(private readonly jobModelService: JobModelService) {}

  @Post()
  addJobModel(@Body() body: JobModelDto): { id: string } {
    const generatedId = this.jobModelService.insertJobModel(
      body.name,
      body.description,
      body.validTo,
      body.active,
    );
    return { id: generatedId };
  }

  @Get()
  getAllJobModel(): JobModel[] {
    return this.jobModelService.getJobModel().filter((job) => job.active);
  }

  @Get(':id')
  getJobModelById(@Param() params: IdDto): JobModel {
    const { id } = params
    return this.jobModelService.getSingleJobModel(id);
  }

  @Get('name/:name')
  getJobsByName(@Param() params: NameDto): JobModel[] {
    const { name } = params
    return this.jobModelService.getJobModel().filter((job) => job.name === name);
  }

  
  @Put(':id')
  updateJob(@Param() params: IdDto, @Body() body: JobModelDto): JobModel {
    const { id } = params
    return this.jobModelService.updateJobModel(id, body.name, body.description, body.validTo, body.active);
  }

  @Delete(':id')
  deleteJobModelById(@Param() params: IdDto): { message: string; } {
    return this.jobModelService.deleteJobModel(params.id);
  }
}
