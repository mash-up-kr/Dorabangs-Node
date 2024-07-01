import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JWT_STRATEGY_TOKEN } from '@src/modules/users/guards/strategy/strategy.token';
import { PublicRouteToken } from '@src/common';

@Injectable()
export class JwtGuard extends AuthGuard(JWT_STRATEGY_TOKEN) {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Handler 혹은 Class중 하나만 정의되어있다면 boolean으로 둘다 정의되어있다면 array([boolean,boolean])로 옵니다
    const publicMetadata = this.reflector.getAllAndMerge(PublicRouteToken, [
      context.getClass(),
      context.getHandler(),
    ]);

    // Handler와 Class모두 메타데이터가 정의되어있는 경우
    if (
      (Array.isArray(publicMetadata) && publicMetadata.length) ||
      typeof publicMetadata === 'boolean'
    ) {
      try {
        return (await super.canActivate(context)) as boolean;
      } catch (err) {
        return true;
      }
    }
    return (await super.canActivate(context)) as boolean;
  }
}
