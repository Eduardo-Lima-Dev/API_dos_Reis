import { IsEmail, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateReceptionistDto {
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

export class UpdateReceptionistDto {
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

export class FindReceptionistDto {
    @IsOptional()
    @IsUUID()
    id?: string;

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

    @IsOptional()
    @IsString()
    role?: 'receptionist';
}


export class DeleteReceptionistDto {
    @IsUUID()
    id: string;
}