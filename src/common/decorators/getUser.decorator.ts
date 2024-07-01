import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { ReqUserPayload } from '../types/type';
import { Request } from 'express';

/**
 * @GetUser
 *
 * - Param Decorator
 * - @GetUser의 매개변수로는 ReqUserPaylod의 프로퍼티를 주거나 생략할 수 있습니다.
 *
 */
export const GetUser = createParamDecorator(
  (
    property: keyof ReqUserPayload,
    context: ExecutionContext,
  ): ReqUserPayload | ReqUserPayload[keyof ReqUserPayload] => {
    // Get context Request Object
    const request = context.switchToHttp().getRequest<Request>();

    // Expect Request, user property as type 'ReqUserPayload'(Refer to defined in common/types/type.d.ts)
    const user: Express.User = request.user;
    if (!user) {
      throw new UnauthorizedException('인증에 실패하였습니다.');
    }
    return user['id'];
  },
);
