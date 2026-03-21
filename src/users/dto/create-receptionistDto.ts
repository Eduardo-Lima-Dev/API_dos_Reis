import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReceptionistDto {
  @ApiProperty({
    example: 'Maria Recepcao',
    minLength: 3,
    description: 'Nome da recepcionista',
  })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    example: 'maria.recepcao@email.com',
    description: 'Email unico da recepcionista',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'SenhaSegura123',
    minLength: 6,
    description: 'Senha de acesso da recepcionista',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: '11977776666',
    minLength: 11,
    description: 'Celular com DDD',
  })
  @IsString()
  @MinLength(11)
  cell: string;
}

export class UpdateReceptionistDto {
  @ApiPropertyOptional({ example: 'Maria Atualizada', minLength: 3 })
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;

  @ApiPropertyOptional({ example: 'maria.nova@email.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'NovaSenha123', minLength: 6 })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional({ example: '11966665555', minLength: 11 })
  @IsOptional()
  @IsString()
  @MinLength(11)
  cell?: string;
}

export class FindReceptionistDto {
  @ApiPropertyOptional({
    example: 'a67fda9f-6b12-4c5b-83ad-7b9c2f7d2f99',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiPropertyOptional({ example: 'Maria Recepcao' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;

  @ApiPropertyOptional({ example: 'maria.recepcao@email.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '11977776666' })
  @IsOptional()
  @IsString()
  @MinLength(11)
  cell?: string;

  @ApiPropertyOptional({ example: 'receptionist' })
  @IsOptional()
  @IsString()
  role?: 'receptionist';
}

export class DeleteReceptionistDto {
  @ApiProperty({
    example: 'a67fda9f-6b12-4c5b-83ad-7b9c2f7d2f99',
    format: 'uuid',
  })
  @IsUUID()
  id: string;
}
