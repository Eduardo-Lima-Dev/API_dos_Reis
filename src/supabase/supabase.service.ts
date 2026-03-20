import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

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
}
