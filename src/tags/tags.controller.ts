import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    Post, 
    Put 
} from '@nestjs/common';
import { 
    ApiBody, 
    ApiCreatedResponse, 
    ApiOkResponse, 
    ApiOperation, 
    ApiUnauthorizedResponse 
} from '@nestjs/swagger';
import { CreateTagDto } from './dto/create-tags';
import { UpdateTagDto } from './dto/create-tags';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) {}

    @Post()
    @ApiOperation({ summary: 'Cria uma nova tag' })
    @ApiBody({ type: CreateTagDto })
    @ApiUnauthorizedResponse({ description: 'Token nao enviado ou invalido' })
    @ApiCreatedResponse({ description: 'Tag criada com sucesso', schema: {
        example: {
            id: 'a67fda9f-6b12-4c5b-83ad-7b9c2f7d2f99',
            name: 'Cortes de cabelo',
            description: 'Tag para cortes de cabelo',
            createdAt: '2026-03-21T12:00:00.000Z',
        },
    } })
    @ApiOkResponse({ description: 'Tag criada com sucesso' })
    async createTag(@Body() createTagDto: CreateTagDto) {
        return this.tagsService.createTag(createTagDto);
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
    @ApiCreatedResponse({ description: 'Tag atualizada com sucesso', schema: {
        example: {
            id: 'a67fda9f-6b12-4c5b-83ad-7b9c2f7d2f99',
            name: 'Cortes de cabelo',
            description: 'Tag para cortes de cabelo',
            createdAt: '2026-03-21T12:00:00.000Z',
        },
    } })
    @ApiOkResponse({ description: 'Tag atualizada com sucesso' })
    @ApiUnauthorizedResponse({ description: 'Token nao enviado ou invalido' })
    async updateTagById(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
        return this.tagsService.updateTag(id, updateTagDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Deleta uma tag por ID' })
    @ApiOkResponse({ description: 'Tag deletada com sucesso' })
    @ApiUnauthorizedResponse({ description: 'Token nao enviado ou invalido' })
    async deleteTagById(@Param('id') id: string) {
        return this.tagsService.deleteTag(id);
    }
}
