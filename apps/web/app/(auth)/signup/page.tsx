'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignUp } from '@/services/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SignInData, SignUpData } from '@repo/api/types/auth';
import { SignUpSchema } from '@repo/api/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import GoogleAuthButton from '@/components/google-auth-button';

export default function SignUpPage() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);

  const form = useForm<SignUpData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: signUp, isPending: isSignLoading } = useSignUp({
    onSuccess: () => {
      router.push('/');
    },
    onError: (error) => {
      const errorMsg =
        error.response?.data?.message || error.message || 'Sign up failed';
      setApiError(Array.isArray(errorMsg) ? errorMsg.join(', ') : errorMsg);
    },
  });

  const onSubmit: SubmitHandler<SignInData> = (data) => {
    setApiError(null);
    signUp(data);
  };

  const formIsDisabled = form.formState.isSubmitting || isSignLoading;

  return (
    <Card className="w-full max-w-sm shadow-md ">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your email to sign up or use Google.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="test@example.com"
                      {...field}
                      disabled={formIsDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      disabled={formIsDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {apiError && (
              <p className="text-sm text-red-600 pt-1">{apiError}</p>
            )}{' '}
            <Button type="submit" className="w-full" disabled={formIsDisabled}>
              {isSignLoading
                ? 'Signing Up...'
                : form.formState.isSubmitting
                  ? 'Processing...'
                  : 'Sign Up'}
            </Button>
          </form>
        </Form>
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <GoogleAuthButton
          title="Sign up with Google"
          disabled={formIsDisabled}
        />
      </CardContent>
      <CardFooter className="text-sm">
        Already have an account?{' '}
        <Link href="/signin" className="ml-1 underline">
          Sign in
        </Link>
      </CardFooter>
    </Card>
  );
}
