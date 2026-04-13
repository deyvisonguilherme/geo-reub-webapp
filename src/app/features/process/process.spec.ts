import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ProcessStore } from './process.store';
import { ProcessRepository } from './process.repository';
import { ProcessRecord } from './process.types';

describe('ProcessStore', () => {
  let store: ProcessStore;
  let repositoryMock: jasmine.SpyObj<ProcessRepository>;

  const mockProcesses: ProcessRecord[] = [
    { id: '1', numeroProcesso: 'P1' } as ProcessRecord,
    { id: '2', numeroProcesso: 'P2' } as ProcessRecord,
  ];

  beforeEach(() => {
    repositoryMock = jasmine.createSpyObj('ProcessRepository', ['getAll', 'create', 'update', 'delete']);
    repositoryMock.getAll.and.returnValue(of(mockProcesses));

    TestBed.configureTestingModule({
      providers: [
        ProcessStore,
        { provide: ProcessRepository, useValue: repositoryMock }
      ]
    });

    store = TestBed.inject(ProcessStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should load processes on initialization', () => {
    expect(store.processes()).toEqual(mockProcesses);
    expect(repositoryMock.getAll).toHaveBeenCalled();
  });

  it('should create a process and update state', () => {
    const newProcess = { id: '3', numeroProcesso: 'P3' } as ProcessRecord;
    repositoryMock.create.and.returnValue(of(newProcess));

    store.createProcess();

    expect(store.processes().length).toBe(3);
    expect(store.processes()[0]).toEqual(newProcess);
  });

  it('should handle error when loading processes', () => {
    repositoryMock.getAll.and.returnValue(throwError(() => new Error('API Error')));
    
    // Trigger load again (or test initial load failure if we didn't inject yet)
    store.loadProcesses();
    
    // In our current implementation, we just console.error, so records remain as they were or empty
    // If we had an error signal in the store, we would test it here.
    expect(store.processes()).toEqual(mockProcesses); // Remains with previous data
  });
});
