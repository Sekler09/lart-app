'use client';

import { useGetProfile } from '@/services/auth';

export const useAuth = () => {
  const { data: user, isLoading, isError, error } = useGetProfile();

  const isAuthenticated = !!user && !isError;

  return {
    user,
    isLoading,
    isAuthenticated,
    isError,
    error,
  };
};
