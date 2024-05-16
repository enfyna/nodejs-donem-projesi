import {
    IsNotEmpty,
    IsString,
    MinLength,
  } from 'class-validator';

  export class SignInDto {

    @IsString()
    @MinLength(2, { message: 'Name must have atleast 2 characters.' })
    @IsNotEmpty()
    username: string;

    @IsString()
    @MinLength(2, { message: 'Name must have atleast 6 characters.' })
    @IsNotEmpty()
    password: string;
  

}