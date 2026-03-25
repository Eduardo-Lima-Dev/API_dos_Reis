import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsArray, IsUUID, MinLength, Min, IsUrl } from 'class-validator';

export class CreateHaircutDto {
    @ApiProperty({
        description: 'Nome do corte',
        example: 'Cortes de cabelo'
    })
    @IsString()
    @MinLength(2)
    name: string;

    @ApiProperty({
        description: 'Preço do corte',
        example: 100.00
    })
    @IsNumber()
    @Min(0)
    price: number;

    @ApiProperty({
        description: 'Duração do corte',
        example: 30
    })
    @IsNumber()
    @Min(0)
    duration: number;

    @ApiProperty({
        description: 'Tags do corte',
        example: ['corte', 'cabelo', 'barba']
    })
    @IsArray()
    @IsString({ each: true })
    tags: string[];

    @ApiProperty({
        description: 'Descrição do corte',
        example: 'Cortes de cabelo'
    })
    @IsString()
    @MinLength(10)
    description: string;

    @ApiProperty({
        description: 'Imagem do corte',
        example: 'https://example.com/image.jpg'
    })
    @IsString()
    @IsUrl()
    image: string;
}

export class UpdateHaircutDto {
    @ApiPropertyOptional({
        description: 'Nome do corte',
        example: 'Cortes de cabelo'
    })
    @IsOptional()
    @IsString()
    @MinLength(2)
    name?: string;
}

/**
 * DTO para requisições `multipart/form-data` do endpoint de criação.
 * Neste fluxo `image` é um arquivo (upload), então a URL será gerada no controller
 * após o upload (ex.: Supabase Storage) e só então persistida.
 */
export class CreateHaircutMultipartDto {
  @ApiProperty({
    description: 'Nome do corte',
    example: 'Cortes de cabelo',
  })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({
    description: 'Preço do corte',
    example: 100.0,
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'Duração do corte',
    example: 30,
  })
  @IsNumber()
  @Min(0)
  duration: number;

  @ApiProperty({
    description: 'Tags do corte (IDs das tags existentes)',
    example: ['a67fda9f-6b12-4c5b-83ad-7b9c2f7d2f99'],
  })
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty({
    description: 'Descrição do corte',
    example: 'Cortes de cabelo',
  })
  @IsString()
  @MinLength(10)
  description: string;
}