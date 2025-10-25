import * as z from 'zod';

export const SignupFormSchema = z.object({
  name: z.string().min(2, 'Name is required and at least 2 characters long').trim(),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Be at least 8 characters long')
    .regex(/[a-zA-Z]/, 'Contain at least one letter.')
    .regex(/[0-9]/, 'Contain at least one number.')
    .regex(/[^a-zA-Z0-9]/,
      'Contain at least one special character.',
    )
    .trim(),
})

export type SessionPayload = {
  userId: string;
  expiresAt: Date;
}

export const SignInFormSchema = SignupFormSchema.pick({
  email: true,
  password: true,
})

export type FormState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string;
  data?: {
    name?: string;
    email?: string;
    password?: string;
  };
} | undefined;

export type SignInFormState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
} | undefined;


