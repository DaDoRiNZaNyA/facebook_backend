import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isAuthenticated = await super.canActivate(context);
    if (isAuthenticated) {
      const user = request.user;
      if (!user) {
        throw new UnauthorizedException();
      }
      return true;
    }
    return false;
  }
}
