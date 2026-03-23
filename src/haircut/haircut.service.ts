import {
    Injectable,
    ConflictException,
    InternalServerErrorException,
  } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateHaircutDto, UpdateHaircutDto } from './dto/create-haircuts';
import { CreateTagDto } from './dto/create-tags';

@Injectable()
export class HaircutService {
    constructor(private readonly prisma: PrismaService) {}

    async createHaircut(createHaircutDto: CreateHaircutDto) {
        try {
            return await this.prisma.haircut.create({
                data: {
                    name: createHaircutDto.name,
                    price: createHaircutDto.price,
                    duration: createHaircutDto.duration,
                    description: createHaircutDto.description,
                    image: createHaircutDto.image,
                    tags: {
                        connect: createHaircutDto.tags.map(tag => ({ id: tag })),
                    },
                },
                select: {
                    id: true,
                    name: true,
                    price: true,
                    duration: true,
                    description: true,
                    image: true,
                },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException('Nome do corte já existente');
                }
            }
            throw new InternalServerErrorException('Erro ao criar corte');
        }
    }

    async updateHaircut(id: string, updateHaircutDto: UpdateHaircutDto) {
        try {
            return await this.prisma.haircut.update({
                where: { id },
                data: updateHaircutDto,
                select: {
                    id: true,
                    name: true,
                    price: true,
                    duration: true,
                },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException('Nome do corte já existente');
                }
            }
            throw new InternalServerErrorException('Erro ao atualizar corte');
        }
    }

    async deleteHaircut(id: string) {
        return await this.prisma.haircut.delete({
            where: { id },
            select: {
                id: true,
                name: true,
                price: true,
                duration: true,
            },
        });
    }

    async createTag(createTagDto: CreateTagDto) {
        try {
            return await this.prisma.tag.create({
                data: createTagDto,
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException('Nome da tag já existente');
                }
            }
            throw new InternalServerErrorException('Erro ao criar tag');
        }
    }
}
