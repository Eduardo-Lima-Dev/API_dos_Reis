import { IsEmail, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(3)
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    @MinLength(11)
    cell: string;
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @MinLength(3)
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;
    
    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string;

    @IsOptional()
    @IsString()
    @MinLength(11)
    cell?: string;
}

export class FindUserDto {
    @IsUUID()
    id: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    @MinLength(11)
    cell?: string;
}

export class DeleteUserDto {
    @IsUUID()
    id: string;
}