import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt/dist';
import User from 'src/models/users.model';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService) {
        
    }

    async login(userDto: LoginUserDto) {
        const user = await this.findExistingUser(userDto);
        return this.generateToken(user);
    }

    async validateRegisterInfo(userDto: CreateUserDto) {
        if( !userDto.email && !userDto.phone ) {
            throw new HttpException('You must specify email or phone number', HttpStatus.BAD_REQUEST);
        }

        if( !userDto.password || userDto.password.length <= 5 ) {
            throw new HttpException('You must specify password more then 5 symbols', HttpStatus.BAD_REQUEST);
        }

        if( !userDto.name ) {
            throw new HttpException('Please, tell us your name:)', HttpStatus.BAD_REQUEST);
        }

        if( userDto.email ) {
            const findByEmail = await this.usersService.getUserByEmail(userDto.email);

            if(findByEmail) {
                throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
            }
        }

        if (userDto.phone) {
            const findByPhone = await this.usersService.getUserByPhone(userDto.phone);
            if(findByPhone) {
                throw new HttpException('Phone already exists', HttpStatus.BAD_REQUEST);
            }
        }
    }

    async register(userDto: CreateUserDto) {
        await this.validateRegisterInfo(userDto);
        const hashedPwd = await bcrypt.hash(userDto.password, 7);
        const user = await this.usersService.createUser({...userDto, email: userDto.email || null, phone: userDto.phone || null, password: hashedPwd});
        return this.generateToken(user);
    }

    private async generateToken(user: User) {
        const payload = { email: user.email, id: user.id, name: user.name}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async findExistingUser(userDto: LoginUserDto) {
        const findByEmail = await this.usersService.getUserByEmail(userDto.username);
        const findByPhone = await this.usersService.getUserByPhone(userDto.username);

        if (!findByEmail && !findByPhone){
            throw new HttpException('User does not exist!', HttpStatus.BAD_REQUEST);
        }
        const user = findByEmail || findByPhone;
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);

        if( user && passwordEquals ) {
            return user;
        }
        throw new UnauthorizedException({message: 'Invalid password or username'});
    }

}
