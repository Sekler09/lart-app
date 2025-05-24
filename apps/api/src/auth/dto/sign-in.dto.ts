import { createZodDto } from 'nestjs-zod';
import { SignInSchema } from '@repo/api/schemas/auth';

export class SignInDto extends createZodDto(SignInSchema) {}
