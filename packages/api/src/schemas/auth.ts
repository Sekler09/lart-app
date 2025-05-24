import { z } from 'zod';

// Password must be at least 8 characters long,
// include at least one uppercase letter, one lowercase letter, one number, and one special character.
const passwordSchema = z
  .string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  })
  .trim()
  .min(8, 'Password must be at least 8 characters')
  .regex(/(?=.*[a-z])/, {
    message: 'Password must have at least one lowercase letter',
  })
  .regex(/(?=.*[A-Z])/, {
    message: 'Password must have at least one uppercase letter',
  })
  .regex(/(?=.*\d)/, { message: 'Password must have at least one digit' })
  .regex(/(?=.*[@$!%*?&])/, {
    message: 'Password must have at least one special character',
  });

export const SignUpSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: passwordSchema,
});

export const SignInSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(1, 'Password is required'),
});
