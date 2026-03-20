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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('receptionist')
  async createReceptionist(
    @Body() createReceptionistDto: CreateReceptionistDto,
  ) {
    return this.usersService.createReceptionist(createReceptionistDto);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Get('all')
  async findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Get('all/receptionists')
  async findAllReceptionists() {
    return this.usersService.findAllReceptionists();
  }

  @Get(':id')
  async findUser(@Param('id') id: string) {
    return this.usersService.findUser(id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
