import { IsString, IsBoolean, IsDateString } from 'class-validator';

export class JobModelDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDateString()
  validTo: string; 

  @IsBoolean()
  active: boolean;
}
