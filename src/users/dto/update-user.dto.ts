import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { IsString, IsMobilePhone, IsEmail, IsOptional } from "class-validator";
export class UpdateUserDto {

    @IsString()
    @ApiProperty( { example: 'johndoe@example.com', description: ` Your existing e-mail or phone` } )
    readonly username: string;

    @IsEmail()
    @IsOptional()
    @ApiProperty( { example: 'johndoe@example.com', description: `New email` } )
    readonly email?: string;

    @IsMobilePhone()
    @IsOptional()
    @ApiProperty( { example: '79990010203', description: `New phone number` } )
    readonly phone?: string;

    @IsOptional()
    @ApiProperty( { example: 'Odin', description: `New profile name` } )
    readonly name?: string;
}