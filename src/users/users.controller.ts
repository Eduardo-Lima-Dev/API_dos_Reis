import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { Public } from 'src/auth/public.decorator';
import { CreateReceptionistDto } from './dto/create-receptionistDto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse({ description: 'Token nao enviado ou invalido' })
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @ApiOperation({ summary: 'Cria um novo usuario comum' })
  @ApiCreatedResponse({
    description: 'Usuario criado com sucesso',
    schema: {
      example: {
        id: 'a67fda9f-6b12-4c5b-83ad-7b9c2f7d2f99',
        name: 'Joao da Silva',
        email: 'joao@email.com',
        createdAt: '2026-03-21T12:00:00.000Z',
      },
    },
  })
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Cria um usuario com role de recepcionista' })
  @ApiCreatedResponse({
    description: 'Recepcionista criado com sucesso',
    schema: {
      example: {
        id: 'a67fda9f-6b12-4c5b-83ad-7b9c2f7d2f99',
        name: 'Maria Recepcao',
        email: 'maria@email.com',
        createdAt: '2026-03-21T12:00:00.000Z',
      },
    },
  })
  @Post('receptionist')
  async createReceptionist(
    @Body() createReceptionistDto: CreateReceptionistDto,
  ) {
    return this.usersService.createReceptionist(createReceptionistDto);
  }

  @ApiOperation({ summary: 'Atualiza dados de um usuario' })
  @ApiParam({ name: 'id', description: 'UUID do usuario' })
  @ApiOkResponse({
    description: 'Usuario atualizado com sucesso',
    schema: {
      example: {
        id: 'a67fda9f-6b12-4c5b-83ad-7b9c2f7d2f99',
        name: 'Joao Atualizado',
        email: 'joao.novo@email.com',
        updatedAt: '2026-03-21T12:00:00.000Z',
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Usuario nao encontrado' })
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Lista todos os usuarios' })
  @ApiOkResponse({ description: 'Lista de usuarios retornada com sucesso' })
  @Get('all')
  async findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @ApiOperation({ summary: 'Lista todos os recepcionistas' })
  @ApiOkResponse({
    description: 'Lista de recepcionistas retornada com sucesso',
  })
  @Get('all/receptionists')
  async findAllReceptionists() {
    return this.usersService.findAllReceptionists();
  }

  @ApiOperation({ summary: 'Busca um usuario por ID' })
  @ApiParam({ name: 'id', description: 'UUID do usuario' })
  @ApiOkResponse({ description: 'Usuario encontrado com sucesso' })
  @ApiNotFoundResponse({ description: 'Usuario nao encontrado' })
  @Get(':id')
  async findUser(@Param('id') id: string) {
    return this.usersService.findUser(id);
  }

  @ApiOperation({ summary: 'Remove um usuario por ID' })
  @ApiParam({ name: 'id', description: 'UUID do usuario' })
  @ApiOkResponse({ description: 'Usuario removido com sucesso' })
  @ApiNotFoundResponse({ description: 'Usuario nao encontrado' })
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
