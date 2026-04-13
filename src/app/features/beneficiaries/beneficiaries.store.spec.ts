import { TestBed } from '@angular/core/testing';
import { BeneficiariesStore } from './beneficiaries.store';
import { BeneficiaryRepository } from './beneficiaries.repository';
import { BeneficiaryRepositoryMock, MOCK_BENEFICIARIES } from './beneficiaries.repository.mock';

describe('BeneficiariesStore', () => {
  let store: BeneficiariesStore;
  let repositoryMock: BeneficiaryRepositoryMock;

  beforeEach(() => {
    repositoryMock = new BeneficiaryRepositoryMock();

    TestBed.configureTestingModule({
      providers: [
        BeneficiariesStore,
        { provide: BeneficiaryRepository, useValue: repositoryMock }
      ]
    });

    store = TestBed.inject(BeneficiariesStore);
  });

  it('should load beneficiaries on init', () => {
    expect(repositoryMock.getAll).toHaveBeenCalled();
    expect(store.beneficiaries()).toEqual(MOCK_BENEFICIARIES);
  });

  it('should create a beneficiary', () => {
    store.createBeneficiary({ nomeCompleto: 'Novo' });
    expect(repositoryMock.create).toHaveBeenCalled();
  });

  it('should delete a beneficiary', () => {
    const idToDelete = MOCK_BENEFICIARIES[0].id;
    store.deleteBeneficiary(idToDelete);
    expect(repositoryMock.delete).toHaveBeenCalledWith(idToDelete);
  });

  it('should update a beneficiary', () => {
    const idToUpdate = MOCK_BENEFICIARIES[0].id;
    store.updateBeneficiary(idToUpdate, { nomeCompleto: 'Alterado' });
    expect(repositoryMock.update).toHaveBeenCalled();
  });
});
