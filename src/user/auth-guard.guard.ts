import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userCookie = request.cookies['user']; // Assuming the user information is stored in a cookie named 'user'
    if (userCookie) {
      // User is logged in
      return true;
    } else {
      // User is not logged in
      return false;
    }
  }
}