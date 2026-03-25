import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PROCESS_FORM_STYLES } from '../../process-form.styles';
import { TermoCompromisso } from '../../process.types';

@Component({
  selector: 'app-termos-compromisso-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './termos-compromisso-form.component.html',
  styles: [PROCESS_FORM_STYLES],
})
export class TermosCompromissoFormComponent implements OnChanges {
  @Input() items: TermoCompromisso[] = [];
  @Output() save = new EventEmitter<TermoCompromisso[]>();

  localItems: TermoCompromisso[] = [];
  draft: TermoCompromisso = this.createDraft();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.localItems = this.items.map((item) => ({ ...item }));
      this.resetDraft();
    }
  }

  edit(item: TermoCompromisso): void {
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

  private createDraft(): TermoCompromisso {
    return {
      id: '',
      numeroTermo: '',
      descricao: '',
      compromissario: '',
      obrigacoes: '',
      cronograma: '',
      arquivoTermoId: '',
      assinado: false,
      dataAssinatura: '',
      vigenciaInicio: '',
      vigenciaFim: '',
    };
  }
}
