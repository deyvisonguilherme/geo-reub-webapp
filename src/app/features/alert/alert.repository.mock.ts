/// <reference types="jasmine" />
import { of } from 'rxjs';
import { AlertaPrazo } from './alert.types';
import { IRepository } from '../../core/repositories/repository.interface';

export const MOCK_ALERTS: AlertaPrazo[] = [
  { id: 'a1', titulo: 'Mock Alert' } as AlertaPrazo,
];

export class AlertRepositoryMock implements IRepository<AlertaPrazo> {
  getAll = jasmine.createSpy('getAll').and.returnValue(of(MOCK_ALERTS));
  getById = jasmine.createSpy('getById').and.returnValue(of(MOCK_ALERTS[0]));
  create = jasmine.createSpy('create').and.callFake((data: Partial<AlertaPrazo>) => of({ ...data, id: 'new-id' } as AlertaPrazo));
  update = jasmine.createSpy('update').and.callFake((id: string, data: Partial<AlertaPrazo>) => of({ ...data, id } as AlertaPrazo));
  delete = jasmine.createSpy('delete').and.returnValue(of(undefined));
}
