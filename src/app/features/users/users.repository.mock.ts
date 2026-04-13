/// <reference types="jasmine" />
import { of } from 'rxjs';
import { UserRecord } from './users.types';
import { IRepository } from '../../core/repositories/repository.interface';

export const MOCK_USERS: UserRecord[] = [
  { id: 'u1', name: 'Mock User' } as UserRecord,
];

export class UserRepositoryMock implements IRepository<UserRecord> {
  getAll = jasmine.createSpy('getAll').and.returnValue(of(MOCK_USERS));
  getById = jasmine.createSpy('getById').and.returnValue(of(MOCK_USERS[0]));
  create = jasmine.createSpy('create').and.callFake((data: Partial<UserRecord>) => of({ ...data, id: 'new-id' } as UserRecord));
  update = jasmine.createSpy('update').and.callFake((id: string, data: Partial<UserRecord>) => of({ ...data, id } as UserRecord));
  delete = jasmine.createSpy('delete').and.returnValue(of(undefined));
}
