import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';
@Injectable()
export class SocketGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Socket;
    const token = request.handshake.headers?.authorization;
    if (!token) {
      return false;
    }
    const tokenVerified = this.jwtService.verify(token);
    return Boolean(tokenVerified);
  }
}
