'use client';

import React, { PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Loader } from 'lucide-react';

export default function AuthLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="animate-spin h-8 w-8 text-gray-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="flex items-center justify-center min-h-screen  p-4">
        {children}
      </main>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecting...</p>
    </div>
  );
}
