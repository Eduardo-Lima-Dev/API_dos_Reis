import {
    Body,
    ConflictException,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateHaircutDto, CreateHaircutMultipartDto, UpdateHaircutDto } from './dto/create-haircuts';
import { HaircutService } from './haircut.service';
import { Public } from 'src/auth/public.decorator';
import { SupabaseService } from 'src/supabase/supabase.service';
import { Prisma } from '@prisma/client';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('Haircuts')
@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse({ description: 'Token nao enviado ou invalido' })
@Controller('haircut')
export class HaircutController {
    constructor(private readonly haircutService: HaircutService, private readonly supabaseService: SupabaseService) {}

    @Post()
    @ApiOperation({ summary: 'Cria um novo corte' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                price: { type: 'number' },
                duration: { type: 'number' },
                tags: { type: 'array', items: { type: 'string' } },
                image: { type: 'string', format: 'binary' },
                description: { type: 'string' },
            },
        },
        examples: {
            'multipart/form-data': {
                value: {
                    name: 'Cortes de cabelo',
                    price: 100,
                    duration: 30,
                    tags: ['corte', 'cabelo', 'barba'],
                    image: 'image.jpg',
                    description: 'Cortes de cabelo',
                },
            },
        },
    })
    @ApiOkResponse({ description: 'Corte criado com sucesso' })
    @ApiUnauthorizedResponse({ description: 'Token nao enviado ou invalido' })
    @ApiCreatedResponse({ description: 'Corte criado com sucesso' })
    @UseInterceptors(FileInterceptor('image', {
        storage: memoryStorage(),
        limits: {
            fileSize: 1024 * 1024 * 5, // 5MB
        },
        fileFilter: (req, file, cb) => {
            if (file.mimetype.startsWith('image/')) {
                cb(null, true);
            } else {
                cb(new Error('Arquivo nao é uma imagem'), false);
            }
        },
    }))
    async createHaircut(@Body() dto: CreateHaircutMultipartDto, @UploadedFile() file: Express.Multer.File) {
        const imageUrl = await this.supabaseService.uploadPublicImage(file);
        return this.haircutService.createHaircut({ ...dto, image: imageUrl });
    }

    @Public()
    @Get()
    @ApiOperation({ summary: 'Obtem todos os cortes' })
    @ApiOkResponse({ description: 'Cortes obtidos com sucesso' })
    @ApiUnauthorizedResponse({ description: 'Token nao enviado ou invalido' })
    async getAllHaircuts() {
        return this.haircutService.getHaircutsAll();
    }

    @Public()
    @Get(':id')
    @ApiOperation({ summary: 'Obtem um corte por ID' })
    @ApiOkResponse({ description: 'Corte obtido com sucesso' })
    @ApiUnauthorizedResponse({ description: 'Token nao enviado ou invalido' })
    async getHaircutById(@Param('id') id: string) {
        return this.haircutService.getHaircutById(id);
    }

    @Put(':id')
    @ApiBody({ type: UpdateHaircutDto })
    async updateHaircutById(@Param('id') id: string, @Body() updateHaircutDto: UpdateHaircutDto) {
        try {
            return this.haircutService.updateHaircut(id, updateHaircutDto);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException('Nome do corte já existente');
                }
            }
        }
        throw new InternalServerErrorException('Erro ao atualizar corte');
    }

    @Delete(':id')
    @Roles('barber')
    @ApiCreatedResponse({ description: 'Corte deletado com sucesso' })
    async deleteHaircutById(@Param('id') id: string) {
        try {
            return this.haircutService.deleteHaircut(id);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException('Nome do corte já existente');
                }
            }
        }
    }

    @Public()
    @Get(':id/tags')
    @ApiOperation({ summary: 'Obtem um corte com tags por ID' })
    @ApiOkResponse({ description: 'Corte com tags obtido com sucesso' })
    @ApiUnauthorizedResponse({ description: 'Token nao enviado ou invalido' })
    async getHaircutWithTagsById(@Param('id') id: string) {
        return this.haircutService.getHaircutById(id);
    }
}
