import { Controller, Body, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { AuthService } from './auth.service';

@ApiTags("Authorization")
@Controller('auth')

export class AuthController {
    

    constructor( private authService: AuthService) {}

    @Post('/login')
    login(@Body(new ValidationPipe()) userDto: LoginUserDto) {
        return this.authService.login(userDto);
    }

    @Post('/register')
    register(@Body(new ValidationPipe()) userDto: CreateUserDto) {
        return this.authService.register(userDto);
    }
}
