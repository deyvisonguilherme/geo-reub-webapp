export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  lastUpdated?: string;
}

export function createInitialAsyncState<T>(initialData: T | null = null): AsyncState<T> {
  return {
    data: initialData,
    loading: false,
    error: null,
  };
}

export function updateAsyncLoading<T>(state: AsyncState<T>): AsyncState<T> {
  return {
    ...state,
    loading: true,
    error: null,
  };
}

export function updateAsyncSuccess<T>(data: T): AsyncState<T> {
  return {
    data,
    loading: false,
    error: null,
    lastUpdated: new Date().toISOString(),
  };
}

export function updateAsyncError<T>(error: string, previousData: T | null = null): AsyncState<T> {
  return {
    data: previousData,
    loading: false,
    error,
  };
}

export interface RepositoryError {
  message: string;
  code?: string;
  status?: number;
}
