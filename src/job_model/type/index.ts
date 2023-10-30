export class JobModel {
    constructor(
      public id: string,
      public name: string,
      public description: string,
      public validTo:string, 
      public active: boolean
    ) {}
  }
  