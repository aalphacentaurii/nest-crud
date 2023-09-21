import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import User from "../models/users.model";
import { CreateUserDto } from './dto/create-user.dto';
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

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}});
        return user;
    }

    async getUserByPhone(phone: string) {
        const user = await this.userRepository.findOne({where: {phone}});
        return user;
    }

    async addPhoneNumberByEmail(phone: string, email: string ) {
        const user = await this.userRepository.update({phone: phone}, {
            where: {email}
        });
        return user;
    }

    async addEmailByPhoneNumber(phone: string, email: string ) {
        const user = await this.userRepository.update({email}, {
            where: {phone}
        });
        return user;
    }

    async deleteUserByEmailOrPhone( username: string ) {
        const user = await this.userRepository.destroy({
            where: {
                [Op.or]: [{phone: username}, {email: username}]
            }
        });
        return user;
    }

}
