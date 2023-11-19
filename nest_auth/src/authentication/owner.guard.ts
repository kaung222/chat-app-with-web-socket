import { CanActivate, ExecutionContext } from '@nestjs/common';
export class AuthorGuard implements CanActivate {
  constructor() {}
  canActivate(context: ExecutionContext): boolean {
    // const request = context.switchToHttp().getRequest();
    // console.log(request.params.id);
    // if(request.user.id=== request.param)
    return true;
  }
}
