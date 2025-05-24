import { useQuery, QueryKey, UseQueryResult } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios-instance';
import { AxiosError } from 'axios';
import { ApiErrorResponse } from '@/lib/types';
import { GetUsersListResponse } from '@repo/api/types/auth';

export const usersQueryKeys = {
  users: ['usersList'] as const,
};

export const useGetUsers = (): UseQueryResult<
  GetUsersListResponse,
  AxiosError<ApiErrorResponse>
> => {
  const queryFn = async (): Promise<GetUsersListResponse> => {
    const response = await axiosInstance.get<GetUsersListResponse>('/users'); // Your backend endpoint
    return response.data;
  };
  return useQuery<
    GetUsersListResponse,
    AxiosError<ApiErrorResponse>,
    GetUsersListResponse,
    QueryKey
  >({
    queryKey: usersQueryKeys.users,
    queryFn,
  });
};
