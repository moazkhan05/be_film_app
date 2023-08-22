import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  IsNumber
} from 'class-validator';




export class CreateFilmDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    description : string;

    
    @IsDateString()
    @IsOptional()
    releaseDate :   string;

    @IsNumber()
    @IsOptional()
    ticketPrice :    number;

    @IsString()
    @IsOptional()
    country :    string;

    @IsString()
    @IsOptional()
    genre       :  string;

    @IsString()
    @IsOptional()
    photo       :  string

}