import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { CreateReceptionistDto } from './dto/create-receptionistDto';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async createUser(createUserDto: CreateUserDto) {
        try {
            const hashedPassword = await argon2.hash(createUserDto.password);
            createUserDto.password = hashedPassword;

            return await this.prisma.user.create({
                data: {
                    name: createUserDto.name,
                    email: createUserDto.email,
                    password: hashedPassword,
                    cell: createUserDto.cell,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                },
            });
        } catch (error) {
            throw new ConflictException('Erro ao criar usuário');
        }
    }

    async createReceptionist(createReceptionistDto: CreateReceptionistDto) {
        try {
            const hashedPassword = await argon2.hash(createReceptionistDto.password);
            createReceptionistDto.password = hashedPassword;
            
            return await this.prisma.user.create({
                data: {
                    name: createReceptionistDto.name,
                    email: createReceptionistDto.email,
                    password: hashedPassword,
                    cell: createReceptionistDto.cell,
                    role: 'receptionist',
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                },
            });
        } catch (error) {
            throw new ConflictException('Erro ao criar recepcionista');
        }
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto) {
        try {
            if (updateUserDto.password) {
                const hashedPassword = await argon2.hash(updateUserDto.password);
                updateUserDto.password = hashedPassword;
            }
            
            const user = await this.prisma.user.update({
                where: { id },
                data: updateUserDto,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    updatedAt: true,
                },
            });
            return user;
        } catch (error) {
            throw new NotFoundException('Usuário não encontrado');
        }
    }
    
    async findUser(id: string) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
            if (!user) {
                throw new NotFoundException('Usuário não encontrado');
            }
            return user;
        } catch (error) {
            throw new NotFoundException('Usuário não encontrado');
        }
    }
    
    async deleteUser(id: string) {
        try {
            const user = await this.prisma.user.delete({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            });
            return user;
        } catch (error) {
            throw new NotFoundException('Usuário não encontrado');
        }
    }

    async findByEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
            },
        });
        return user;
    }
}