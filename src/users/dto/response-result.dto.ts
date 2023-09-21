import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import User from "src/models/users.model";

export class ResponseResult {

    @ApiProperty( { example: 'true', description: `Boolean status` } )
    readonly status: boolean;

    @ApiProperty( { description: `Updated user object` } )
    readonly user?: User;

    @ApiProperty( { description: `Error message if status false` } )
    readonly message?: string;
}