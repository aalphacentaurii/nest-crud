import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import User from "../models/users.model";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User){

    }

    async createUser(dto: CreateUserDto) {
        console.log( dto );
        const user = await this.userRepository.create(dto);
        return user;
    }

    async getAllUsers( options:{page?:number, limit?:number, email?: string, name?: string, phone?: string}) {
        
        let userInfo = {...options};
        delete userInfo.page;
        delete userInfo.limit;

        console.log({...userInfo})

        const users = await this.userRepository.findAll({
            offset: (options.page && options.limit) ? (options.page - 1) * options.limit : 0,
            limit: options.limit,
            where: {...userInfo}
        });
        return users;
    }

    async findUser(username: string) {
        const user = await this.userRepository.findOne({
            where: {
                [Op.or]: [{phone: username}, {email: username}]
            }
        });
        return user;
    }

    async updateUser( username: string, user: User ) {
        return await this.userRepository.update( {...user.dataValues}, {
            where: {
                [Op.or]: [{phone: user.phone}, {email: user.email}]
            }
        });
    }

    async deleteUser( username: string ) {
        const user = await this.userRepository.destroy({
            where: {
                [Op.or]: [{phone: username}, {email: username}]
            }
        });
        return user;
    }

}
