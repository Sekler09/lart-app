import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryKey,
  UseQueryResult,
  UseMutationResult,
} from '@tanstack/react-query';
import axiosInstance from '@/lib/axios-instance';
import { AxiosError } from 'axios';
import { UserProfile } from '@repo/api/types/users';
import { SignInData, SignUpData } from '@repo/api/types/auth';
import {
  SignInResponse,
  SignOutResponse,
  SignUpResponse,
  GetMeResponse,
} from '@repo/api/types/auth';
import { ApiErrorResponse, MutationOptions } from '@/lib/types';

export const authQueryKeys = {
  profile: ['profile'] as const,
};

export const useGetProfile = (): UseQueryResult<
  UserProfile,
  AxiosError<ApiErrorResponse>
> => {
  const queryFn = async () => {
    const response = await axiosInstance.get<GetMeResponse>('/auth/me');

    return response.data;
  };

  return useQuery<
    UserProfile,
    AxiosError<ApiErrorResponse>,
    UserProfile,
    QueryKey
  >({
    queryKey: authQueryKeys.profile,
    queryFn,
    retry: (failureCount, error) => {
      // Don't retry on 401/403 as it means unauthenticated
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return false;
      }
      return failureCount < 1;
    },
  });
};

export const useSignUp = (
  options?: MutationOptions<SignUpResponse, SignUpData>,
): UseMutationResult<
  SignUpResponse,
  AxiosError<ApiErrorResponse>,
  SignUpData
> => {
  const queryClient = useQueryClient();

  const mutationFn = async (data: SignUpData) => {
    const response = await axiosInstance.post<SignUpResponse>(
      '/auth/signup',
      data,
    );
    return response.data;
  };

  return useMutation<SignUpResponse, AxiosError<ApiErrorResponse>, SignUpData>({
    mutationFn,
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(authQueryKeys.profile, data);
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
    },
  });
};

export const useSignIn = (
  options?: MutationOptions<SignInResponse, SignInData>,
): UseMutationResult<
  SignInResponse,
  AxiosError<ApiErrorResponse>,
  SignInData
> => {
  const queryClient = useQueryClient();

  const mutationFn = async (data: SignInData) => {
    const response = await axiosInstance.post<SignInResponse>(
      '/auth/signin',
      data,
    );
    return response.data;
  };

  return useMutation<SignInResponse, AxiosError<ApiErrorResponse>, SignInData>({
    mutationFn: mutationFn,
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(authQueryKeys.profile, data);
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
    },
  });
};

export const useSignOut = (
  options?: MutationOptions<SignOutResponse, void>,
): UseMutationResult<SignOutResponse, AxiosError<ApiErrorResponse>, void> => {
  const queryClient = useQueryClient();

  const mutationFn = async () => {
    const response = await axiosInstance.post<SignOutResponse>('/auth/signout');
    return response.data;
  };

  return useMutation<SignOutResponse, AxiosError<ApiErrorResponse>, void>({
    mutationFn,
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(authQueryKeys.profile, null);
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
    },
  });
};
