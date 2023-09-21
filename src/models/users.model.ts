import { Model, Table, Column, DataType } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
interface IUserCreate {
    email: string,
    phone: string,
    password: string,
    name: string
}

@Table({tableName: 'users'})
export default class User extends Model<User, IUserCreate> {
    
    @ApiProperty( { example: '1', description: 'Primary Key' } )
    @Column({
        type: DataType.INTEGER, 
        unique: true, 
        autoIncrement: true, 
        primaryKey: true,
    })
    id: number;

    @ApiProperty( { example: 'johndoe@example.com', description: `User's e-mail` } )
    @Column({
        type: DataType.STRING,
        unique: true
    })
    email: string;

    @ApiProperty( { example: '79990010203', description: `User's phone` } )
    @Column({
        type: DataType.STRING,
        unique: true
    })
    phone: string;

    @ApiProperty( { example: '12345', description: `User's password` } )
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string;

    @ApiProperty( { example: 'John', description: `User's name`})
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string;
}