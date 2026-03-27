import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { Beneficiario, BeneficiarioDocumento } from '../../process.types';

interface DocumentoDraft {
  id: string;
  beneficiarioId: string;
  tipoDocumento: string;
  arquivoId: string;
  validado: boolean;
  dataValidacao: Date | null;
  validadoPor: string;
}

@Component({
  selector: 'app-beneficiario-documentos-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    DatePickerModule,
    InputTextModule,
    SelectModule,
    TableModule,
  ],
  templateUrl: './beneficiario-documentos-form.component.html',
  styleUrl: './beneficiario-documentos-form.component.scss',
})
export class BeneficiarioDocumentosFormComponent implements OnChanges {
  @Input() beneficiarios: Beneficiario[] = [];
  @Input() items: BeneficiarioDocumento[] = [];
  @Output() save = new EventEmitter<BeneficiarioDocumento[]>();

  localItems: BeneficiarioDocumento[] = [];
  draft: DocumentoDraft = this.createDraft();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.localItems = this.items.map((item) => ({ ...item }));
      this.resetDraft();
    }
  }

  get beneficiarioOptions() {
    return this.beneficiarios.map((b) => ({ label: b.nomeCompleto, value: b.id }));
  }

  getBeneficiarioNome(id: string): string {
    return this.beneficiarios.find((item) => item.id === id)?.nomeCompleto || 'Não vinculado';
  }

  edit(item: BeneficiarioDocumento): void {
    this.draft = {
      ...item,
      dataValidacao: this.parseDate(item.dataValidacao),
    };
  }

  upsert(): void {
    const item: BeneficiarioDocumento = {
      ...this.draft,
      id: this.draft.id || crypto.randomUUID(),
      dataValidacao: this.toDateString(this.draft.dataValidacao),
    };
    const exists = this.localItems.some((current) => current.id === item.id);
    this.localItems = exists
      ? this.localItems.map((current) => (current.id === item.id ? item : current))
      : [item, ...this.localItems];
    this.save.emit(this.localItems);
    this.resetDraft();
  }

  remove(id: string): void {
    this.localItems = this.localItems.filter((item) => item.id !== id);
    this.save.emit(this.localItems);
  }

  resetDraft(): void {
    this.draft = this.createDraft();
  }

  private createDraft(): DocumentoDraft {
    return {
      id: '',
      beneficiarioId: '',
      tipoDocumento: '',
      arquivoId: '',
      validado: false,
      dataValidacao: null,
      validadoPor: '',
    };
  }

  private parseDate(dateStr: string | undefined): Date | null {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date;
  }

  private toDateString(date: Date | null): string {
    if (!date) return '';
    return date.toISOString().slice(0, 10);
  }
}
