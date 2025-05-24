import { SignInSchema, SignUpSchema } from '../schemas/auth';
import { z } from 'zod';
import { UserProfile } from './users';

export type SignInData = z.infer<typeof SignInSchema>;
export type SignUpData = z.infer<typeof SignUpSchema>;

export type SignInResponse = UserProfile;
export type SignUpResponse = UserProfile;
export type SignOutResponse = void;
export type GetMeResponse = UserProfile;
export type GetUsersListResponse = UserProfile[];
