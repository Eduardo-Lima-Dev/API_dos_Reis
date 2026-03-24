import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateHaircutDto, UpdateHaircutDto } from './dto/create-haircuts';
import { HaircutService } from './haircut.service';

@ApiTags('Haircuts')
@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse({ description: 'Token nao enviado ou invalido' })
@Controller('haircut')
export class HaircutController {
    constructor(private readonly haircutService: HaircutService) {}

    @Post()
    @ApiOperation({ summary: 'Cria um novo corte' })
    @ApiBody({ type: CreateHaircutDto })
    @ApiOkResponse({ description: 'Corte criado com sucesso' })
    @ApiUnauthorizedResponse({ description: 'Token nao enviado ou invalido' })
    @ApiCreatedResponse({ description: 'Corte criado com sucesso' })
    
    async createHaircut(@Body() createHaircutDto: CreateHaircutDto) {
        return { message: 'Corte criado com sucesso' };
    }

    @Get()
    @ApiOperation({ summary: 'Obtem todos os cortes' })
    @ApiOkResponse({ description: 'Cortes obtidos com sucesso' })
    @ApiUnauthorizedResponse({ description: 'Token nao enviado ou invalido' })
    async getAllHaircuts() {
        return this.haircutService.getHaircutsAll();
    }

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
        return { message: 'Corte atualizado com sucesso' };
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Deleta um corte por ID' })
    @ApiOkResponse({ description: 'Corte deletado com sucesso' })
    @ApiUnauthorizedResponse({ description: 'Token nao enviado ou invalido' })
    async deleteHaircutById(@Param('id') id: string) {
        return { message: 'Corte deletado com sucesso' };
    }

    // // Cortes com tags

    // @Get('haircut/tags')
    // @ApiOperation({ summary: 'Obtem todos os cortes com tags' })
    // @ApiOkResponse({ description: 'Cortes com tags obtidos com sucesso' })
    // @ApiUnauthorizedResponse({ description: 'Token nao enviado ou invalido' })
    // async getAllHaircutsWithTags() {
    //     return this.haircutService.getAllHaircutsWithTags();
    // }

    @Get(':id/tags')
    @ApiOperation({ summary: 'Obtem um corte com tags por ID' })
    @ApiOkResponse({ description: 'Corte com tags obtido com sucesso' })
    @ApiUnauthorizedResponse({ description: 'Token nao enviado ou invalido' })
    async getHaircutWithTagsById(@Param('id') id: string) {
        return this.haircutService.getHaircutById(id);
    }

}
