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
import { CreateHaircutDto } from './dto/create-haircuts';
import { HaircutService } from './haircut.service';
import { CreateTagDto } from './dto/create-tags';

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
        return this.haircutService.createHaircut(createHaircutDto);
    }

    @Post('tag')
    @ApiOperation({ summary: 'Cria uma nova tag' })
    @ApiBody({ type: CreateTagDto })
    @ApiOkResponse({ description: 'Tag criada com sucesso' })
    @ApiUnauthorizedResponse({ description: 'Token nao enviado ou invalido' })
    @ApiCreatedResponse({ description: 'Tag criada com sucesso' })
    async createTag(@Body() createTagDto: CreateTagDto) {
        return this.haircutService.createTag(createTagDto);
    }
}
