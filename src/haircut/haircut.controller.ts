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
    
    async createHaircut(@Body() createHaircutMultipartDto: CreateHaircutMultipartDto) {
        const image = await this.supabaseService.uploadPublicImage(createHaircutMultipartDto as unknown as Express.Multer.File);
        return this.haircutService.createHaircut({ ...createHaircutMultipartDto, image: image as string });
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
    @ApiOperation({ summary: 'Atualiza um corte por ID' })
    @ApiBody({ type: UpdateHaircutDto })
    @ApiOkResponse({ description: 'Corte atualizado com sucesso' })
    @ApiUnauthorizedResponse({ description: 'Token nao enviado ou invalido' })
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
    @ApiOperation({ summary: 'Deleta um corte por ID' })
    @ApiOkResponse({ description: 'Corte deletado com sucesso' })
    @ApiUnauthorizedResponse({ description: 'Token nao enviado ou invalido' })
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

    // // Cortes com tags

    // @Get('haircut/tags')
    // @ApiOperation({ summary: 'Obtem todos os cortes com tags' })
    // @ApiOkResponse({ description: 'Cortes com tags obtidos com sucesso' })
    // @ApiUnauthorizedResponse({ description: 'Token nao enviado ou invalido' })
    // async getAllHaircutsWithTags() {
    //     return this.haircutService.getAllHaircutsWithTags();
    // }

    @Public()
    @Get(':id/tags')
    @ApiOperation({ summary: 'Obtem um corte com tags por ID' })
    @ApiOkResponse({ description: 'Corte com tags obtido com sucesso' })
    @ApiUnauthorizedResponse({ description: 'Token nao enviado ou invalido' })
    async getHaircutWithTagsById(@Param('id') id: string) {
        return this.haircutService.getHaircutById(id);
    }

}
