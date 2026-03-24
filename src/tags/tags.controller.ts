import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateTagDto } from './dto/create-tags';
import { UpdateTagDto } from './dto/create-tags';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) {}

    @Post()
    @ApiOperation({ summary: 'Cria uma nova tag' })
    @ApiBody({ type: CreateTagDto })
    @ApiOkResponse({ description: 'Tag criada com sucesso' })
    @ApiUnauthorizedResponse({ description: 'Token nao enviado ou invalido' })
    @ApiCreatedResponse({ description: 'Tag criada com sucesso' })
    async createTag(@Body() createTagDto: CreateTagDto) {
        return { message: 'Tag criada com sucesso' };
    }

    @Get()
    @ApiOperation({ summary: 'Obtem todas as tags' })
    @ApiOkResponse({ description: 'Tags obtidas com sucesso' })
    @ApiUnauthorizedResponse({ description: 'Token nao enviado ou invalido' })
    async getAllTags() {
        return this.tagsService.getAllTags();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtem uma tag por ID' })
    @ApiOkResponse({ description: 'Tag obtida com sucesso' })
    @ApiUnauthorizedResponse({ description: 'Token nao enviado ou invalido' })
    async getTagById(@Param('id') id: string) {
        return this.tagsService.getTagById(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualiza uma tag por ID' })
    @ApiBody({ type: UpdateTagDto })
    @ApiOkResponse({ description: 'Tag atualizada com sucesso' })
    @ApiUnauthorizedResponse({ description: 'Token nao enviado ou invalido' })
    async updateTagById(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
        return { message: 'Tag atualizada com sucesso' };
    }
    
    @Delete(':id')
    @ApiOperation({ summary: 'Deleta uma tag por ID' })
    @ApiOkResponse({ description: 'Tag deletada com sucesso' })
    @ApiUnauthorizedResponse({ description: 'Token nao enviado ou invalido' })
    async deleteTagById(@Param('id') id: string) {
        return { message: 'Tag deletada com sucesso' };
    }
}
