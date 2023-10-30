import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { JobModel } from './type';

@Injectable()
export class JobModelService {
  private jobModels: JobModel[] = [];

  insertJobModel(
    name: string, 
    description: string, 
    validTo: string, 
    active: boolean
    ): string {
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
    validTo: string, 
    active: boolean
  ): JobModel {
    const [jobModel, index] = this.findJobModel(id);
  
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
  

  deleteJobModel(JobModelId: string) {
    const [jobModel, index] = this.findJobModel(JobModelId);
    this.jobModels.splice(index, 1);

    return { message: 'Uspjesno obrisano' };
  }

  findJobModel(id: string): [JobModel | undefined, number] {
    const jobModelIndex = this.jobModels.findIndex((jobModel) => jobModel.id === id);
    if (jobModelIndex === -1) {
      throw new NotFoundException(`Posao sa ID ${id} nije nađen`);
    }
    return [this.jobModels[jobModelIndex], jobModelIndex];
  }
}
