import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PROCESS_FORM_STYLES } from '../../process-form.styles';
import { TitularConfrontante } from '../../process.types';

@Component({
  selector: 'app-titulares-confrontantes-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './titulares-confrontantes-form.component.html',
  styles: [PROCESS_FORM_STYLES],
})
export class TitularesConfrontantesFormComponent implements OnChanges {
  @Input() items: TitularConfrontante[] = [];
  @Output() save = new EventEmitter<TitularConfrontante[]>();

  localItems: TitularConfrontante[] = [];
  draft: TitularConfrontante = this.createDraft();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.localItems = this.items.map((item) => ({ ...item }));
      this.resetDraft();
    }
  }

  edit(item: TitularConfrontante): void {
    this.draft = { ...item };
  }

  upsert(): void {
    const item = { ...this.draft, id: this.draft.id || this.generateId() };
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

  private createDraft(): TitularConfrontante {
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
      dataNotificacao: '',
      formaNotificacao: '',
      impugnou: false,
      dataImpugnacao: '',
      arquivoImpugnacaoId: '',
      resultadoImpugnacao: '',
    };
  }

  private generateId(): string {
    return crypto.randomUUID();
  }
}
