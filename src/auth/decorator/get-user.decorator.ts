import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<{ user: { id: string; name: string; email: string } }>();
    if (data) {
      return request.user[data] as string;
    }
    return request.user;
  },
);
