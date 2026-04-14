import { 
  createInitialAsyncState, 
  updateAsyncLoading, 
  updateAsyncSuccess, 
  updateAsyncError 
} from './repository.types';

describe('Repository State Helpers', () => {
  it('should create initial async state', () => {
    const state = createInitialAsyncState<string[]>([]);
    expect(state).toEqual({
      data: [],
      loading: false,
      error: null
    });
  });

  it('should update to loading state', () => {
    const initialState = createInitialAsyncState<string[]>([]);
    const loadingState = updateAsyncLoading(initialState);
    expect(loadingState.loading).toBeTrue();
    expect(loadingState.error).toBeNull();
    expect(loadingState.data).toEqual([]);
  });

  it('should update to success state', () => {
    const data = ['test'];
    const successState = updateAsyncSuccess(data);
    expect(successState.data).toEqual(data);
    expect(successState.loading).toBeFalse();
    expect(successState.error).toBeNull();
    expect(successState.lastUpdated).toBeDefined();
  });

  it('should update to error state', () => {
    const errorMessage = 'Error occurred';
    const errorState = updateAsyncError(errorMessage, ['old data']);
    expect(errorState.data).toEqual(['old data']);
    expect(errorState.loading).toBeFalse();
    expect(errorState.error).toBe(errorMessage);
  });
});
