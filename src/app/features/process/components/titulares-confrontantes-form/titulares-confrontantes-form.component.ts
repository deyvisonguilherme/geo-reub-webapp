import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { TitularConfrontante } from '../../process.types';

interface TitularConfrontanteDraft extends Omit<TitularConfrontante, 'dataNotificacao' | 'dataImpugnacao'> {
  dataNotificacao: Date | null;
  dataImpugnacao: Date | null;
}

@Component({
  selector: 'app-titulares-confrontantes-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    DatePickerModule,
    InputTextModule,
    TableModule,
    TextareaModule,
  ],
  templateUrl: './titulares-confrontantes-form.component.html',
  styleUrl: './titulares-confrontantes-form.component.scss',
})
export class TitularesConfrontantesFormComponent implements OnChanges {
  @Input() items: TitularConfrontante[] = [];
  @Output() save = new EventEmitter<TitularConfrontante[]>();

  localItems: TitularConfrontante[] = [];
  draft: TitularConfrontanteDraft = this.createDraft();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.localItems = (this.items || []).map((item) => ({ ...item }));
      this.resetDraft();
    }
  }

  edit(item: TitularConfrontante): void {
    this.draft = {
      ...item,
      dataNotificacao: this.parseDate(item.dataNotificacao),
      dataImpugnacao: this.parseDate(item.dataImpugnacao),
    };
  }

  upsert(): void {
    const item: TitularConfrontante = {
      ...this.draft,
      id: this.draft.id || this.generateId(),
      dataNotificacao: this.toDateString(this.draft.dataNotificacao),
      dataImpugnacao: this.toDateString(this.draft.dataImpugnacao),
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
    if (this.draft.id === id) {
      this.resetDraft();
    }
  }

  resetDraft(): void {
    this.draft = this.createDraft();
  }

  private createDraft(): TitularConfrontanteDraft {
    return {
      id: '',
      tipo: '',
      nomeCompleto: '',
      cpfCnpj: '',
      identificado: true,
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: '',
      cep: '',
      notificado: false,
      dataNotificacao: null,
      formaNotificacao: '',
      impugnou: false,
      dataImpugnacao: null,
      arquivoImpugnacaoId: '',
      resultadoImpugnacao: '',
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

  private generateId(): string {
    return crypto.randomUUID();
  }
}
