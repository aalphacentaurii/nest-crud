import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { IsString, Length } from "class-validator";
export class LoginUserDto {

    @IsString()
    @Length(5, 50)
    @ApiProperty( { example: 'johndoe@example.com or 79990010203', description: `User's e-mail or phone number` } )
    readonly username: string;
    
    @IsString()
    @Length(5, 50)
    @ApiProperty( { example: '12345', description: `User's password` } )
    readonly password: string;
}