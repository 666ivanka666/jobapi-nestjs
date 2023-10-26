export class JobModel {
    constructor(
      public id: string,
      public name: string,
      public description: string,
      public validTo:number, 
      public active: boolean
    ) {}
  }
  