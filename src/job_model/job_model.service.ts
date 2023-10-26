import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { JobModel } from './type';

@Injectable()
export class JobModelService {
  private jobModels: JobModel[] = [];

  insertJobModel(name: string, description: string, validTo: Date, active: boolean): string {
    const id = uuidv4();
    this.jobModels.push(new JobModel(id, name, description, validTo, active));
    return id;
  }

  getJobModel(): JobModel[] {
    return this.jobModels;
  }

  getSingleJobModel(JobModelId: string): JobModel {
    const [jobModel] = this.findJobModel(JobModelId);
    return jobModel;
  }

  updateJobModel(
    id: string, 
    name: string, 
    description: string, 
    validTo: Date, 
    active: boolean
  ): JobModel {
    const [jobModel, index] = this.findJobModel(id);
    if (!jobModel) {
      throw new NotFoundException(`Posao sa ID ${id} nije nađen`);
    }
  
    if (name) {
      jobModel.name = name;
    }
    if (description) {
      jobModel.description = description;
    }
    if (validTo) {
      jobModel.validTo = validTo;
    }
    if (active) {
      jobModel.active = active;
    }

    return jobModel;
  }
  

  deleteJobModel(JobModelId: string): void {
    const [jobModel, index] = this.findJobModel(JobModelId);
    if (!jobModel) {
      throw new NotFoundException(`Posao sa ID ${JobModelId} nije nađen`);
    }
    this.jobModels.splice(index, 1);
  }

  private findJobModel(id: string): [JobModel | undefined, number] {
    const JobModelIndex = this.jobModels.findIndex((jobModel) => jobModel.id === id);
    if (JobModelIndex === -1) {
      return [undefined, -1];
    }
    return [this.jobModels[JobModelIndex], JobModelIndex];
  }
}
