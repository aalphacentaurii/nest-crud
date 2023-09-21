import { ApiProperty } from "@nestjs/swagger/dist/decorators";

export class AuthResponseDto {

    @ApiProperty( { description: `JWT Token if Authorization or Registration success` } )
    readonly token?: string;

    @ApiProperty( { description: `Message if Authorzation or Registration false` } )
    readonly message?: string;

}