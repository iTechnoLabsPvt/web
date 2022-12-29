import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../database/entities';

export const AuthenticatedUser = createParamDecorator(
  (_data, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
