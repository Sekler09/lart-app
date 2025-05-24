import { Request } from 'express';
import { User } from '@repo/api/types/users';

export const extractUserFromRequest = (req: Request) => {
  return req['user'] as Pick<User, 'email' | 'id'>;
};
