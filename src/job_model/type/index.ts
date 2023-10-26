export class JobModel {
    constructor(
      public id: string,
      public name: string,
      public description: string,
      public validTo:Date, 
      public active: boolean
    ) {}
  }
  