import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { TermoCompromisso } from '../../process.types';

interface TermoCompromissoDraft {
  id: string;
  numeroTermo: string;
  descricao: string;
  compromissario: string;
  obrigacoes: string;
  cronograma: string;
  arquivoTermoId: string;
  assinado: boolean;
  dataAssinatura: Date | null;
  vigenciaInicio: Date | null;
  vigenciaFim: Date | null;
}

@Component({
  selector: 'app-termos-compromisso-form',
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
  templateUrl: './termos-compromisso-form.component.html',
  styleUrl: './termos-compromisso-form.component.scss',
})
export class TermosCompromissoFormComponent implements OnChanges {
  @Input() items: TermoCompromisso[] = [];
  @Output() save = new EventEmitter<TermoCompromisso[]>();

  localItems: TermoCompromisso[] = [];
  draft: TermoCompromissoDraft = this.createDraft();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.localItems = this.items.map((item) => ({ ...item }));
      this.resetDraft();
    }
  }

  edit(item: TermoCompromisso): void {
    this.draft = {
      ...item,
      dataAssinatura: this.parseDate(item.dataAssinatura),
      vigenciaInicio: this.parseDate(item.vigenciaInicio),
      vigenciaFim: this.parseDate(item.vigenciaFim),
    };
  }

  upsert(): void {
    const item: TermoCompromisso = {
      ...this.draft,
      id: this.draft.id || crypto.randomUUID(),
      dataAssinatura: this.toDateString(this.draft.dataAssinatura),
      vigenciaInicio: this.toDateString(this.draft.vigenciaInicio),
      vigenciaFim: this.toDateString(this.draft.vigenciaFim),
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

  private createDraft(): TermoCompromissoDraft {
    return {
      id: '',
      numeroTermo: '',
      descricao: '',
      compromissario: '',
      obrigacoes: '',
      cronograma: '',
      arquivoTermoId: '',
      assinado: false,
      dataAssinatura: null,
      vigenciaInicio: null,
      vigenciaFim: null,
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
