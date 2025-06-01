'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignIn } from '@/services/auth';
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
import { SignInData } from '@repo/api/types/auth';
import { SignInSchema } from '@repo/api/schemas/auth';
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

export default function SignInPage() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);

  const form = useForm<SignInData>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: signIn, isPending: isSignLoading } = useSignIn({
    onSuccess: () => {
      router.push('/');
    },
    onError: (error) => {
      const errorMsg =
        error.response?.data?.message || error.message || 'Sign in failed';
      setApiError(Array.isArray(errorMsg) ? errorMsg.join(', ') : errorMsg);
    },
  });

  const onSubmit: SubmitHandler<SignInData> = (data) => {
    setApiError(null);
    signIn(data);
  };

  const formIsDisabled = form.formState.isSubmitting || isSignLoading;

  return (
    <Card className="w-full max-w-sm shadow-xl/30 ">
      <CardHeader>
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>
          Enter your email to login or use Google.
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
                ? 'Signing In...'
                : form.formState.isSubmitting
                  ? 'Processing...'
                  : 'Sign In'}
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
          title="Sign in with Google"
          disabled={formIsDisabled}
        />
      </CardContent>
      <CardFooter className="text-sm">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="ml-1 underline">
          Sign up
        </Link>
      </CardFooter>
    </Card>
  );
}
