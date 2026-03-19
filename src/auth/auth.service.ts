import { Injectable, UnauthorizedException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(
        email: string, 
        password: string
    ): Promise<{ access_token: string }> {
        if (!email || !password) {
            throw new BadRequestException('Email e password são obrigatórios');
        }

        try {
            const user = await this.usersService.findByEmail(email);
            if (!user || user.password !== password) {
                throw new UnauthorizedException('Credenciais inválidas');
            }
            const payload = { email: user.email, sub: user.id };
            return {
                access_token: this.jwtService.sign(payload),
            };
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw error;
            }
            console.error('Erro ao fazer login:', error);
            throw new InternalServerErrorException('Erro ao autenticar usuário: ' + error.message);
        }
    }
}
