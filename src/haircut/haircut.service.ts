import {
    Injectable,
    ConflictException,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateHaircutDto, UpdateHaircutDto } from './dto/create-haircuts';

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
                    images: createHaircutDto.images,
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
                    images: true,
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

    async getHaircuts() {
        return await this.prisma.haircut.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                duration: true,
                description: true,
                images: true,
                tags: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
    }

    async getHaircutById(id: string) {
        try {
            return await this.prisma.haircut.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    price: true,
                    duration: true,
                    description: true,
                    images: true,
                },
            });
        }
        catch (error) {
            throw new NotFoundException('Corte não encontrado');
        }
    }

    async getHaircutsAll() {
        try {
            return await this.prisma.haircut.findMany({
                select: {
                    id: true,
                    name: true,
                    price: true,
                    duration: true,
                    description: true,
                    images: true,
                },
            });
        }
        catch (error) {
            throw new InternalServerErrorException('Erro ao buscar cortes');
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
}
