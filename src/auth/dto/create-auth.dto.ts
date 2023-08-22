import {
    IsEmail,
    IsNotEmpty,
    IsString,
  } from 'class-validator';

export class CreateAuthDto {
    @IsString()
    @IsNotEmpty()
    name : string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEmail()
    @IsNotEmpty()
    email : string;
}

