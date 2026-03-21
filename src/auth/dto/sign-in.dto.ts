import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example: 'usuario@email.com',
    description: 'Email de acesso do usuario',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'minhaSenha123',
    minLength: 6,
    description: 'Senha de acesso do usuario',
  })
  @IsString()
  @MinLength(6)
  password: string;
}

export class SignInResponseDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.exemplo.assinatura',
    description: 'JWT para autenticar nas rotas protegidas',
  })
  access_token: string;
}
