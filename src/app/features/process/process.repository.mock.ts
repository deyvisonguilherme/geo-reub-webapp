/// <reference types="jasmine" />
import { of } from 'rxjs';
import { ProcessRecord } from './process.types';
import { IRepository } from '../../core/repositories/repository.interface';

export const MOCK_PROCESSES: ProcessRecord[] = [
  { id: '1', numeroProcesso: 'REURB-2026-001' } as ProcessRecord,
  { id: '2', numeroProcesso: 'REURB-2026-002' } as ProcessRecord,
];

export class ProcessRepositoryMock implements IRepository<ProcessRecord> {
  getAll = jasmine.createSpy('getAll').and.returnValue(of(MOCK_PROCESSES));
  getById = jasmine.createSpy('getById').and.returnValue(of(MOCK_PROCESSES[0]));
  create = jasmine.createSpy('create').and.callFake((data: Partial<ProcessRecord>) => of({ ...data, id: 'new-id' } as ProcessRecord));
  update = jasmine.createSpy('update').and.callFake((id: string, data: Partial<ProcessRecord>) => of({ ...data, id } as ProcessRecord));
  delete = jasmine.createSpy('delete').and.returnValue(of(undefined));
}
