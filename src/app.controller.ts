import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/public.decorator';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @ApiOperation({ summary: 'Endpoint de verificacao da API' })
  @ApiOkResponse({ description: 'API online' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
