import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class ThrottleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    return true;
  }
}
