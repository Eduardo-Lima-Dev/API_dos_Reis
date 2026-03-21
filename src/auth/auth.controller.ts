import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SignInDto, SignInResponseDto } from './dto/sign-in.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiOperation({ summary: 'Autentica usuario e retorna token JWT' })
  @ApiBody({ type: SignInDto })
  @ApiOkResponse({
    description: 'Login realizado com sucesso',
    type: SignInResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Credenciais invalidas' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto): Promise<SignInResponseDto> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Retorna dados do usuario autenticado' })
  @ApiOkResponse({
    description: 'Perfil autenticado',
    schema: {
      example: {
        sub: 'a67fda9f-6b12-4c5b-83ad-7b9c2f7d2f99',
        email: 'usuario@email.com',
        iat: 1710000000,
        exp: 1710003600,
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Token nao enviado ou invalido' })
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
