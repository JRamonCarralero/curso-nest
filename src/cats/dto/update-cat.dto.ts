import {
  IsString,
  MinLength,
  IsInt,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class UpdateCatDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  name?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  age?: number;

  @IsString()
  @IsOptional()
  breed?: string;
}
