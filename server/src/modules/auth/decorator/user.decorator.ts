import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const getUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
