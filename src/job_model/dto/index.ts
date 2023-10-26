import { IsString, IsDate, IsBoolean } from 'class-validator';

export class JobModelDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDate()
  validTo: Date; 

  @IsBoolean()
  active: boolean;
}
