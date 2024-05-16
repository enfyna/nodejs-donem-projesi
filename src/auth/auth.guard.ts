import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { jwtConstants } from './auth.constants';
  import { Request } from 'express';
  import { Reflector } from '@nestjs/core';

export const IS_PUBLIC_KEY = 'isPublic';
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService,//jwt service
        private readonly reflector: Reflector,//reflector
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      // check if the route is public
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
          ]);
          if (isPublic) {
            return true;
          }
      // get the request
      const request = context.switchToHttp().getRequest();
      // extract the token from the header
      const token = this.extractTokenFromHeader(request);
      // if there is no token, throw an error
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        // verify the token
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: jwtConstants.secret
          }
        );
        // add the admin to the request
        request['admin'] = payload;
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    // extract the token from the header
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }