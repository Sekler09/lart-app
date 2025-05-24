import { User } from '@repo/db';

export type { User };
export type UserProfile = Omit<User, 'password'>;
