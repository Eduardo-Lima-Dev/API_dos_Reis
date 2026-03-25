import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { randomUUID } from 'node:crypto';

/** Shape do arquivo após MemoryStorage do Multer (evita Express.Multer.File com @types/express v5). */
export interface MemoryUploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

@Injectable()
export class SupabaseService {
  readonly client: SupabaseClient;
  readonly imagesBucket: string;

  constructor() {
    const url = process.env.SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const bucket = process.env.SUPABASE_IMAGES_BUCKET ?? 'images';

    if (!url) throw new Error('SUPABASE_URL não está definido no .env');
    if (!serviceRoleKey)
      throw new Error('SUPABASE_SERVICE_ROLE_KEY não está definido no .env');

    this.client = createClient(url, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    this.imagesBucket = bucket;
  }

  async uploadPublicImage(file: MemoryUploadedFile): Promise<string> {
    const ext =
      extFromOriginalName(file.originalname) ??
      extFromMime(file.mimetype) ??
      'bin';
    const path = `haircuts/${randomUUID()}.${ext}`;

    const { data, error } = await this.client.storage
      .from(this.imagesBucket)
      .upload(path, file.buffer, {
        contentType: file.mimetype || 'application/octet-stream',
        upsert: false,
      });

    if (error) {
      throw new InternalServerErrorException('Erro ao fazer upload da imagem');
    }

    const { data: pub } = this.client.storage
      .from(this.imagesBucket)
      .getPublicUrl(data.path);

    return pub.publicUrl;
  }
}

function extFromOriginalName(originalname: string): string | undefined {
  const i = originalname.lastIndexOf('.');
  if (i === -1 || i === originalname.length - 1) return undefined;
  const ext = originalname
    .slice(i + 1)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
  return ext.length > 0 ? ext : undefined;
}

function extFromMime(mimetype: string): string | undefined {
  const map: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
  };
  return map[mimetype];
}
