import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateProfileDto } from "src/profiles/dto/create-profile.dto";

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    profile?: CreateProfileDto;
}