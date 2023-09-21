import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { IsString, IsEmail, IsMobilePhone, IsOptional } from "class-validator";

export class GetUsersQueryParams {

    @IsOptional()
    @IsString()
    @ApiProperty( { example: 1, description: `Page`, required: false } )
    readonly page?: string;

    @IsOptional()
    @IsString()
    @ApiProperty( { example: 5, description: `Page limit`, required: false } )
    readonly limit?: string;

    @IsEmail()
    @IsOptional()
    @IsString()
    @ApiProperty( { example: 'John@test.com', description: `User's email`, required: false } )
    readonly email?: string;

    @IsOptional()
    @IsString()
    @ApiProperty( { example: 'John', description: `User's name`, required: false})
    readonly name?: string;

    @IsOptional()
    @IsMobilePhone()
    @IsString()
    @ApiProperty( { example: '79990010203', description: `User's phone`, required: false})
    readonly phone?: string;
}