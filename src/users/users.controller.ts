import { HttpException, HttpStatus, Controller, Body, Post, Get, Query, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from './users.service';
import User from '../models/users.model';
import { ResponseResult } from './dto/response-result.dto';
import { GetUsersQueryParams } from './dto/get-users-query-params.dto';
import { ValidationPipe } from '@nestjs/common';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags("Users")
@Controller('/api/users')
export class UsersController {

    constructor(private usersService: UsersService) {

    }
    //Create
    @ApiOperation({
        summary: "Create user"
    })
    @ApiResponse({
        status: 200,
        type: User
    })
    @Post('')
    create(@Body( new ValidationPipe() ) userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    //Read
    @ApiOperation({
        summary: "Get all users"
    })
    @ApiResponse({
        status: 200,
        type: [User]
    })
    @Get()
    getAll(@Query( new ValidationPipe() ) query: GetUsersQueryParams) {
        const options = {
            page: isNaN(+query.page)? undefined : +query.page,
            limit: isNaN(+query.limit)? undefined : +query.limit,
            email: query.email,
            phone: query.phone,
            name: query.name
        }
        return this.usersService.getAllUsers( JSON.parse(JSON.stringify(options)) );
    }

    //Update
    @ApiOperation({
        summary: "Change Phone or Email"
    })
    @ApiResponse({
        status: 200,
        type: ResponseResult
    })
    @Post('/update')
    async updateUser(@Body( new ValidationPipe() ) userDto: UpdateUserDto) {
        try {
            let user = await this.usersService.findUser(userDto.username);
            if (!user ) {
                throw new HttpException('User does not exist!', HttpStatus.BAD_REQUEST);
            }

            if( userDto.email ) {
                const existingUser = await this.usersService.findUser(userDto.email);
                if(existingUser) {
                    throw new HttpException('Email is already occupied', HttpStatus.BAD_REQUEST);
                }
            }

            if( userDto.phone ) {
                const existingUser = await this.usersService.findUser(userDto.phone);
                if(existingUser) {
                    throw new HttpException('Phone is already occupied', HttpStatus.BAD_REQUEST);
                }
            }

            user.email = userDto.email ? userDto.email : user.email,
            user.phone = userDto.phone ? userDto.phone : user.phone,
            user.name = userDto.name ? userDto.name : user.name

            await this.usersService.updateUser(userDto.username, user);
            return {
                status: true,
                user
            }

        }
        catch (err) {
            return {
                status: false,
                message: err.message
            }
        }
    }

    // Delete
    @ApiOperation({
        summary: "Delete user by email or phone"
    })
    @ApiResponse({
        status: 200,
        type: ResponseResult
    })
    @Delete()
    async deleteUser(@Body( new ValidationPipe() ) options: DeleteUserDto ) {
        try {
            await this.usersService.deleteUser(options.username);
            return {
                status: true,
                message: options.username
            }
        }
        catch (err) {
            return {
                status: false,
                message: err.message
            }
        }
    }
}
