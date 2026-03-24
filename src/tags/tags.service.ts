import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTagDto } from 'src/tags/dto/create-tags';
import { UpdateTagDto } from 'src/tags/dto/create-tags';
import { Prisma } from '@prisma/client';

@Injectable()
export class TagsService {
    constructor(private readonly prisma: PrismaService) {}
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

    async getAllTags() {
        try {
            return await this.prisma.tag.findMany({
                select: {
                    id: true,
                    name: true,
                },
            });
        }
        catch (error) {
            throw new InternalServerErrorException('Erro ao buscar tags');
        }
    }

    async getTagById(id: string) {
        try {
            return await this.prisma.tag.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                },
            });
        }
        catch (error) {
            throw new NotFoundException('Tag não encontrada');
        }
    }

    async getAllHaircutsWithTags() {
        try {
            return await this.prisma.haircut.findMany({
                select: {
                    id: true,
                    name: true,
                    price: true,
                    duration: true,
                    description: true,
                    image: true,
                    tags: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },  
                },
            });
        }
        catch (error) {
            throw new InternalServerErrorException('Erro ao buscar cortes com tags');
        }
    }

    async updateTag(id: string, updateTagDto: UpdateTagDto) {
        try {
            return await this.prisma.tag.update({
                where: { id },
                data: updateTagDto,
                select: {
                    id: true,
                    name: true,
                },
            });
        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException('Nome da tag já existente');
                }
            }
            throw new InternalServerErrorException('Erro ao atualizar tag');
        }
    }

    async deleteTag(id: string) {
        return await this.prisma.tag.delete({
            where: { id },
            select: {
                id: true,
                name: true,
            },
        });
    }
}
