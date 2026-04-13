import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BeneficiariesStore } from './beneficiaries.store';
import { Beneficiario } from '../process/process.types';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { BeneficiaryFormComponent } from './components/beneficiary-form/beneficiary-form.component';

@Component({
  selector: 'app-beneficiaries',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TagModule,
    TableModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    TooltipModule,
    DialogModule,
    BeneficiaryFormComponent,
  ],
  templateUrl: './beneficiaries.component.html',
  styleUrl: './beneficiaries.component.scss',
})
export class BeneficiariesComponent {
  private readonly store = inject(BeneficiariesStore);

  searchTerm = '';
  rows = 10;
  displayDialog = false;
  beneficiaryToEdit: Beneficiario | null = null;
  
  private readonly selectedId = signal<string | null>(null);
  readonly selectedBeneficiary = computed(() => {
    const id = this.selectedId();
    return id ? this.store.beneficiaries().find(b => b.id === id) : null;
  });

  readonly beneficiaries = computed(() => this.store.beneficiaries());

  get filteredBeneficiaries(): Beneficiario[] {
    const term = this.searchTerm.trim().toLocaleLowerCase('pt-BR');
    if (!term) {
      return this.beneficiaries();
    }

    return this.beneficiaries().filter((b) =>
      [
        b.nomeCompleto,
        b.cpf,
        b.email,
        b.logradouro,
        b.quadra,
        b.numeroLote,
      ]
        .filter(Boolean)
        .some((value) => value!.toLocaleLowerCase('pt-BR').includes(term)),
    );
  }

  selectBeneficiary(data: any): void {
    if (data && 'id' in data) {
      this.selectedId.set(data.id);
    }
  }

  createBeneficiary(): void {
    this.beneficiaryToEdit = null;
    this.displayDialog = true;
  }

  editBeneficiary(beneficiary: Beneficiario): void {
    this.beneficiaryToEdit = { ...beneficiary };
    this.displayDialog = true;
  }

  onSaveBeneficiary(beneficiary: Beneficiario): void {
    if (this.beneficiaryToEdit) {
      this.store.updateBeneficiary(beneficiary.id, beneficiary);
    } else {
      this.store.createBeneficiary(beneficiary);
    }
    this.displayDialog = false;
    this.beneficiaryToEdit = null;
  }

  deleteBeneficiary(beneficiary: Beneficiario): void {
    this.store.deleteBeneficiary(beneficiary.id);
    if (this.selectedId() === beneficiary.id) {
      this.selectedId.set(null);
    }
  }

  onSearchTermChange(value: string): void {
    this.searchTerm = value;
  }

  getStatusSeverity(beneficiary: Beneficiario): 'success' | 'warn' | 'danger' | 'secondary' {
    if (beneficiary.possuiDocumentacaoCompleta) return 'success';
    return 'warn';
  }

  getStatusLabel(beneficiary: Beneficiario): string {
    return beneficiary.possuiDocumentacaoCompleta ? 'Documentação Completa' : 'Pendente';
  }
}
