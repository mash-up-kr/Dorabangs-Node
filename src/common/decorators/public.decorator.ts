import { SetMetadata } from '@nestjs/common';

/**
 * @Public Decorator
 *
 * Controller레벨 혹은 애플리케이션 Global Guard가 걸려있는 경우
 * 특정 Route에 대해 Public을 허용할 수 있게 하기 위해 사용합니다.
 */

export const PublicRouteToken = 'public-route';
export const Public = () => SetMetadata(PublicRouteToken, true);
