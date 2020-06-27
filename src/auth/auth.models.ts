import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {
    @IsEmail()
    email: string;
    
    @MinLength(10, {
        message: 'Please insert a bigger password'
    })
    password: string;
}