import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PROCESS_FORM_STYLES } from '../../process-form.styles';
import { Beneficiario, BeneficiarioDocumento } from '../../process.types';

@Component({
  selector: 'app-beneficiario-documentos-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './beneficiario-documentos-form.component.html',
  styles: [PROCESS_FORM_STYLES],
})
export class BeneficiarioDocumentosFormComponent implements OnChanges {
  @Input() beneficiarios: Beneficiario[] = [];
  @Input() items: BeneficiarioDocumento[] = [];
  @Output() save = new EventEmitter<BeneficiarioDocumento[]>();

  localItems: BeneficiarioDocumento[] = [];
  draft: BeneficiarioDocumento = this.createDraft();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.localItems = this.items.map((item) => ({ ...item }));
      this.resetDraft();
    }
  }

  getBeneficiarioNome(id: string): string {
    return this.beneficiarios.find((item) => item.id === id)?.nomeCompleto || 'Não vinculado';
  }

  edit(item: BeneficiarioDocumento): void {
    this.draft = { ...item };
  }

  upsert(): void {
    const item = { ...this.draft, id: this.draft.id || crypto.randomUUID() };
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

  private createDraft(): BeneficiarioDocumento {
    return {
      id: '',
      beneficiarioId: '',
      tipoDocumento: '',
      arquivoId: '',
      validado: false,
      dataValidacao: '',
      validadoPor: '',
    };
  }
}
