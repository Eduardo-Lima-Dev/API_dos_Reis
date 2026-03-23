import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    const datasourceUrl = process.env.DATABASE_URL;
    if (!datasourceUrl) {
      throw new Error(
        'DATABASE_URL não está definido. Crie/ajuste o arquivo .env antes de iniciar a API.',
      );
    }
    const pool = new Pool({
      connectionString: datasourceUrl,
      connectionTimeoutMillis: 10_000,
      idleTimeoutMillis: 10_000,
    });
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Conexao com banco estabelecida com sucesso.');
    } catch (error) {
      this.logger.error(
        'Falha ao conectar no banco de dados. Verifique DATABASE_URL e se o servidor Postgres esta acessivel.',
      );
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
