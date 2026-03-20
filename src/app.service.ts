import { Injectable } from '@nestjs/common';
import { Public } from './auth/public.decorator';

@Public()
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
