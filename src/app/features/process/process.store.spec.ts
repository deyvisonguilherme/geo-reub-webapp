import { TestBed } from '@angular/core/testing';
import { ProcessStore } from './process.store';
import { ProcessRepository } from './process.repository';
import { ProcessRepositoryMock, MOCK_PROCESSES } from './process.repository.mock';
import { of } from 'rxjs';
import { ProcessRecord } from './process.types';

describe('ProcessStore', () => {
  let store: ProcessStore;
  let repositoryMock: ProcessRepositoryMock;

  beforeEach(() => {
    repositoryMock = new ProcessRepositoryMock();

    TestBed.configureTestingModule({
      providers: [
        ProcessStore,
        { provide: ProcessRepository, useValue: repositoryMock }
      ]
    });

    store = TestBed.inject(ProcessStore);
  });

  it('should load processes on init', () => {
    expect(repositoryMock.getAll).toHaveBeenCalled();
    expect(store.processes()).toEqual(MOCK_PROCESSES);
  });

  it('should create a process', () => {
    const id = store.createProcess();
    expect(repositoryMock.create).toHaveBeenCalled();
    expect(id).toBeDefined();
  });

  it('should delete a process', () => {
    const idToDelete = MOCK_PROCESSES[0].id;
    store.deleteProcess(idToDelete);
    expect(repositoryMock.delete).toHaveBeenCalledWith(idToDelete);
  });

  it('should update a process', () => {
    const idToUpdate = MOCK_PROCESSES[0].id;
    const changes = { numeroProcesso: 'UPDATED' };
    store.updateProcess(idToUpdate, changes);
    expect(repositoryMock.update).toHaveBeenCalled();
  });
});
