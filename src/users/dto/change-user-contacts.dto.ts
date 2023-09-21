import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { IsString, IsEmail, IsMobilePhone } from "class-validator";
export class changeContactsDto {

    @IsString()
    @IsEmail()
    @ApiProperty( { example: 'johndoe@example.com', description: ` Your existing e-mail or your new email` } )
    readonly email: string;

    @IsString()
    @IsMobilePhone()
    @ApiProperty( { example: '79990010203', description: `Your existing phone number or your new phone number` } )
    readonly phone: string;

}