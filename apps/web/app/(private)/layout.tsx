'use client';

import React, { PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import Header from '@/components/header';

export default function PrivateAppLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/signin');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading user session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Redirecting to sign in...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header user={user ?? null} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
