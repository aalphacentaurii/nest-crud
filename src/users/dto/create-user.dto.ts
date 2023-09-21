import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { IsString, IsEmail, IsOptional, IsMobilePhone, Length } from "class-validator";

export class CreateUserDto {

    @IsEmail()
    @IsOptional()
    @IsString()
    @ApiProperty( { example: 'johndoe@example.com', description: `User's e-mail`, required: false } )
    readonly email?: string;
    
    @IsMobilePhone()
    @IsOptional()
    @IsString()
    @ApiProperty( { example: '79990010203', description: `User's phone`, required: false } )
    readonly phone?: string;

    @IsString()
    @Length(5, 50)
    @ApiProperty( { example: '12345', description: `User's password` } )
    readonly password: string;

    @IsString()
    @Length(5, 50)
    @ApiProperty( { example: 'John', description: `User's name`})
    readonly name: string;
}