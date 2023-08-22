import {
    IsEmail,
    IsNotEmpty,
    IsString,
  } from 'class-validator';

export class GenerateTokenDto {
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEmail()
    @IsNotEmpty()
    email : string;
}

