import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { IsString } from "class-validator";

export class DeleteUserDto {

    @IsString()
    @ApiProperty( { example: 'JohnDoe@example.com', description: `User's e-mail or phone number`, required: false } )
    readonly username?: string;

}