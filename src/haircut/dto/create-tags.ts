import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTagDto {
    @ApiProperty({
        description: 'Nome da tag',
        example: 'Cortes de cabelo'
    })
    @IsString()
    @MinLength(2)
    name: string;

    @ApiPropertyOptional({
        description: 'Descrição da tag',
        example: 'Tag para cortes de cabelo'
    })
    @IsOptional()
    @IsString()
    @MinLength(10)
    description?: string;
}