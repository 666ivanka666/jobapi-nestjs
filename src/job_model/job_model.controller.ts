import { Body, Controller, Delete, Get, Param, Post, Put, NotFoundException } from '@nestjs/common';
import { JobModelService } from './job_model.service';
import { JobModelDto } from './dto';
import { JobModel } from './type';

@Controller('jobs')
export class JobModelController {
  jobModels: any;
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
  getJobModelById(@Param('id') id: string): JobModel {
    const job = this.jobModelService.getSingleJobModel(id);
    if (!job) {
      throw new NotFoundException(`Posao sa ID ${id} nije nađen`);
    }
    return job;
  }

 
  @Get('name/:name')
  getJobsByName(@Param('name') name: string): JobModel[] {
    if (!name) {
      throw new NotFoundException('Naziv posla je obavezan.');
    }
  
    return this.jobModelService.getJobModel().filter((job) => job.name === name);
  }
  
  @Put(':id')
  updateJob(@Param('id') id: string, @Body() body: JobModelDto): JobModel {
    const job = this.jobModelService.updateJobModel(id, body.name, body.description, body.validTo, body.active);
    if (!job) {
      throw new NotFoundException(`Posao sa ID ${id} nije nađen`);
    }
    return job;
  }

  @Delete(':id')
  deleteJobModel(@Param('id') JobModelId: string): boolean {
    const [, index] = this.findJobModel(JobModelId);
    if (index !== -1) {
    this.jobModels.splice(index, 1);
      return true;
  }
    return false;
  }

  private findJobModel(id: string): [JobModel | undefined, number] {
    const index = this.jobModels.findIndex((jobModel) => jobModel.id === id);
    if (index === -1) {
      return [undefined, -1];
    }
    return [this.jobModels[index], index];
  }
  
  
}
