import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const accessToken = request.headers.authorization.split(' ')[1];
      if (!accessToken) {
        throw new UnauthorizedException();
      }
      request.user = this.jwtService.verify(accessToken);
    } catch (err) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
