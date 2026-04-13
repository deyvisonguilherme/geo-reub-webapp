/// <reference types="jasmine" />
import { of } from 'rxjs';
import { NucleusFormModel } from './nucleus.types';
import { IRepository } from '../../core/repositories/repository.interface';

export const MOCK_NUCLEI: NucleusFormModel[] = [
  { id: 'n1', nome: 'Vale Verde Mock' } as NucleusFormModel,
];

export class NucleusRepositoryMock implements IRepository<NucleusFormModel> {
  getAll = jasmine.createSpy('getAll').and.returnValue(of(MOCK_NUCLEI));
  getById = jasmine.createSpy('getById').and.returnValue(of(MOCK_NUCLEI[0]));
  create = jasmine.createSpy('create').and.callFake((data: Partial<NucleusFormModel>) => of({ ...data, id: 'new-id' } as NucleusFormModel));
  update = jasmine.createSpy('update').and.callFake((id: string, data: Partial<NucleusFormModel>) => of({ ...data, id } as NucleusFormModel));
  delete = jasmine.createSpy('delete').and.returnValue(of(undefined));
}
