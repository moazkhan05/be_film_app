import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  IsNumber,
  Min,
  Max,
  IsInt
} from 'class-validator';

export class CreateCommentDto {
    @IsString()
    @IsNotEmpty()
    comment: string;
}