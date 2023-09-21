import { Controller, Body, Post, Get, Query, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from './users.service';
import User from '../models/users.model';
import { changeContactsDto } from './dto/change-user-contacts.dto';
import { ResponseResult } from './dto/response-result.dto';
import { GetUsersQueryParams } from './dto/get-users-query-params.dto';
import { ValidationPipe } from '@nestjs/common';
import { DeleteUserDto } from './dto/delete-user.dto';

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
        summary: "Change Phone"
    })
    @ApiResponse({
        status: 200,
        type: ResponseResult
    })
    @Post('/changephone')
    async updatePhoneByEmail(@Body( new ValidationPipe() ) userDto: changeContactsDto) {
        try {
            await this.usersService.addPhoneNumberByEmail(userDto.phone, userDto.email);
            return {
                status: true,
                message: userDto.phone
            }

        }
        catch (err) {
            return {
                status: false,
                message: err.message
            }
        }
    }

    @ApiOperation({
        summary: "Change Email"
    })
    @ApiResponse({
        status: 200,
        type: ResponseResult
    })
    @Post('/changemail')
    async updateEmailByPhone(@Body( new ValidationPipe() ) userDto: changeContactsDto) {
        try {
            await this.usersService.addEmailByPhoneNumber(userDto.phone, userDto.email);
            return {
                status: true,
                message: userDto.email
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
            await this.usersService.deleteUserByEmailOrPhone(options.username);
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
