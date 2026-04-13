/// <reference types="jasmine" />
import { of } from 'rxjs';
import { PendingNotification, TacitAgreement, RegistryDeadline } from './comunication.types';
import { IRepository } from '../../core/repositories/repository.interface';

export const MOCK_NOTIFICATIONS: PendingNotification[] = [
  { id: 'n1', destinatario: 'Mock Recipient' } as PendingNotification,
];

export class ComunicationRepositoryMock implements IRepository<PendingNotification> {
  getAll = jasmine.createSpy('getAll').and.returnValue(of(MOCK_NOTIFICATIONS));
  getById = jasmine.createSpy('getById').and.returnValue(of(MOCK_NOTIFICATIONS[0]));
  create = jasmine.createSpy('create').and.callFake((data: Partial<PendingNotification>) => of({ ...data, id: 'new-id' } as PendingNotification));
  update = jasmine.createSpy('update').and.callFake((id: string, data: Partial<PendingNotification>) => of({ ...data, id } as PendingNotification));
  delete = jasmine.createSpy('delete').and.returnValue(of(undefined));

  getTacitAgreements = jasmine.createSpy('getTacitAgreements').and.returnValue(of([]));
  getRegistryDeadlines = jasmine.createSpy('getRegistryDeadlines').and.returnValue(of([]));
}
