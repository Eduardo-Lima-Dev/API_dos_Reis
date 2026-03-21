import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Joao da Silva',
    minLength: 3,
    description: 'Nome completo do usuario',
  })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    example: 'joao@email.com',
    description: 'Email unico do usuario',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'SenhaSegura123',
    minLength: 6,
    description: 'Senha em texto puro no cadastro',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: '11999998888',
    minLength: 11,
    description: 'Celular com DDD',
  })
  @IsString()
  @MinLength(11)
  cell: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'Joao Atualizado',
    minLength: 3,
    description: 'Novo nome do usuario',
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;

  @ApiPropertyOptional({
    example: 'joao.novo@email.com',
    description: 'Novo email do usuario',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    example: 'NovaSenha123',
    minLength: 6,
    description: 'Nova senha em texto puro',
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional({
    example: '11988887777',
    minLength: 11,
    description: 'Novo celular com DDD',
  })
  @IsOptional()
  @IsString()
  @MinLength(11)
  cell?: string;
}

export class FindUserDto {
  @ApiProperty({
    example: 'a67fda9f-6b12-4c5b-83ad-7b9c2f7d2f99',
    format: 'uuid',
  })
  @IsUUID()
  id: string;

  @ApiPropertyOptional({ example: 'Joao da Silva' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;

  @ApiPropertyOptional({ example: 'joao@email.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '11999998888' })
  @IsOptional()
  @IsString()
  @MinLength(11)
  cell?: string;
}

export class DeleteUserDto {
  @ApiProperty({
    example: 'a67fda9f-6b12-4c5b-83ad-7b9c2f7d2f99',
    format: 'uuid',
  })
  @IsUUID()
  id: string;
}
