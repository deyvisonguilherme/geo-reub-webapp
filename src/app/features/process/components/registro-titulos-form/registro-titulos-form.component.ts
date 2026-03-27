import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { Beneficiario, RegistroTitulo } from '../../process.types';

@Component({
  selector: 'app-registro-titulos-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputNumberModule,
    InputTextModule,
    SelectModule,
    TableModule,
    TextareaModule,
  ],
  templateUrl: './registro-titulos-form.component.html',
  styleUrl: './registro-titulos-form.component.scss',
})
export class RegistroTitulosFormComponent implements OnChanges {
  @Input() beneficiarios: Beneficiario[] = [];
  @Input() items: RegistroTitulo[] = [];
  @Output() save = new EventEmitter<RegistroTitulo[]>();

  localItems: RegistroTitulo[] = [];
  draft: RegistroTitulo = this.createDraft();

  beneficiarioOptions: { label: string; value: string }[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.localItems = (this.items || []).map((item) => ({ ...item }));
      this.resetDraft();
    }
    if (changes['beneficiarios']) {
      this.beneficiarioOptions = (this.beneficiarios || []).map((b) => ({
        label: b.nomeCompleto,
        value: b.id,
      }));
    }
  }

  getBeneficiarioNome(id: string): string {
    return this.beneficiarios.find((item) => item.id === id)?.nomeCompleto || 'Não vinculado';
  }

  edit(item: RegistroTitulo): void {
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
    if (this.draft.id === id) {
      this.resetDraft();
    }
  }

  resetDraft(): void {
    this.draft = this.createDraft();
  }

  private createDraft(): RegistroTitulo {
    return {
      id: '',
      beneficiarioId: '',
      numeroItem: null,
      identificacaoLote: '',
      areaLoteM2: null,
      frenteM: null,
      fundosM: null,
      lateralDireitaM: null,
      lateralEsquerdaM: null,
      confrontacoes: '',
    };
  }
}
