import {
    IsEmail,
    IsInt,
    IsNotEmpty,
    IsString,
    MinLength,
  } from 'class-validator';

  export class CreateOgrenciDto {
    @IsInt()
    deptid:number;

    @IsInt()
    counter:number;

    @IsString()
    @MinLength(2, { message: 'Name must have atleast 2 characters.' })
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    @IsEmail(null, { message: 'Please provide valid Email.' })
    email: string;
  

  }