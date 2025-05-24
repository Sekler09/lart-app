import { AxiosError } from 'axios';

// API Error structure (align with your NestJS error responses)
export interface ApiErrorResponse {
  message: string | string[];
  error?: string;
  statusCode?: number;
}

export type MutationOptions<TData, TVariables> = {
  onSuccess?: (data: TData, variables: TVariables, context: unknown) => void;
  onError?: (
    error: AxiosError<ApiErrorResponse>,
    variables: TVariables,
    context: unknown,
  ) => void;
};
