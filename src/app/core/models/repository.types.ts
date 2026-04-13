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

export interface RepositoryError {
  message: string;
  code?: string;
  status?: number;
}
