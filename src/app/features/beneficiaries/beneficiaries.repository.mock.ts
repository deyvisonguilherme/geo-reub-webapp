/// <reference types="jasmine" />
import { of } from 'rxjs';
import { Beneficiario } from '../process/process.types';
import { IRepository } from '../../core/repositories/repository.interface';

export const MOCK_BENEFICIARIES: Beneficiario[] = [
  { id: '1', nomeCompleto: 'João' } as Beneficiario,
  { id: '2', nomeCompleto: 'Maria' } as Beneficiario,
];

export class BeneficiaryRepositoryMock implements IRepository<Beneficiario> {
  getAll = jasmine.createSpy('getAll').and.returnValue(of(MOCK_BENEFICIARIES));
  getById = jasmine.createSpy('getById').and.returnValue(of(MOCK_BENEFICIARIES[0]));
  create = jasmine.createSpy('create').and.callFake((data: Partial<Beneficiario>) => of({ ...data, id: 'new-id' } as Beneficiario));
  update = jasmine.createSpy('update').and.callFake((id: string, data: Partial<Beneficiario>) => of({ ...data, id } as Beneficiario));
  delete = jasmine.createSpy('delete').and.returnValue(of(undefined));
}
