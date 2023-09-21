import { Controller, Body, Post, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/auth-response.dto';

@ApiTags("Authorization")
@Controller('auth')

export class AuthController {
    

    constructor( private authService: AuthService) {}
    
    @ApiOperation({
        summary: "Get all users"
    })
    @ApiResponse({
        status: 200,
        type: AuthResponseDto
    })
    @Post('/login')
    login(@Body(new ValidationPipe()) userDto: LoginUserDto) {
        return this.authService.login(userDto);
    }

    @ApiOperation({
        summary: "Get all users"
    })
    @ApiResponse({
        status: 200,
        type: AuthResponseDto
    })
    @Post('/register')
    register(@Body(new ValidationPipe()) userDto: CreateUserDto) {
        return this.authService.register(userDto);
    }
}
