import { IsNotEmpty, IsString } from 'class-validator';

export class IdDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class NameDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
