import { IsNotEmpty, IsString } from "class-validator";

export class CreateProfileDto {
    @IsString()
    @IsNotEmpty()
    gender: string;
    
    @IsString()
    @IsNotEmpty()
    photo: string;
}

