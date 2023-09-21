import { ApiProperty } from "@nestjs/swagger/dist/decorators";

export class ResponseResult {

    @ApiProperty( { example: 'true', description: `Boolean status` } )
    readonly status: boolean;

    @ApiProperty( { description: `Error message or result message` } )
    readonly message: string;
}