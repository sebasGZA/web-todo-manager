import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const authHeader = request.headers.authorization;

        if (!authHeader)
            throw new UnauthorizedException('El token es requerido');


        const [type, token] = authHeader.split(' ');
        if (type !== 'Bearer' || !token) throw new UnauthorizedException('Formato de token invalido');

        const systemToken = process.env.TOKEN;
        if (token !== systemToken) throw new UnauthorizedException('Token invalido')
        return true;
    }
}