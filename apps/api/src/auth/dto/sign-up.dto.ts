import { createZodDto } from 'nestjs-zod';
import { SignUpSchema } from '@repo/api/schemas/auth';

export class SignUpDto extends createZodDto(SignUpSchema) {}
