import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PROCESS_FORM_STYLES } from '../../process-form.styles';
import { LevantamentoTopografico } from '../../process.types';

@Component({
  selector: 'app-levantamentos-topograficos-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './levantamentos-topograficos-form.component.html',
  styles: [PROCESS_FORM_STYLES],
})
export class LevantamentosTopograficosFormComponent implements OnChanges {
  @Input() items: LevantamentoTopografico[] = [];
  @Output() save = new EventEmitter<LevantamentoTopografico[]>();

  localItems: LevantamentoTopografico[] = [];
  draft: LevantamentoTopografico = this.createDraft();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.localItems = this.items.map((item) => ({ ...item }));
      this.resetDraft();
    }
  }

  edit(item: LevantamentoTopografico): void {
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

  private createDraft(): LevantamentoTopografico {
    return {
      id: '',
      sistemaReferencia: '',
      datum: '',
      fusoUtm: '',
      precisaoPlanimetricaCm: null,
      precisaoAltimetricaCm: null,
      responsavelTecnico: '',
      creaArt: '',
      empresaExecutora: '',
      arquivoPlantaId: '',
      arquivoMemorialId: '',
      arquivoShapefileId: '',
      dataLevantamento: '',
      dataAprovacao: '',
    };
  }
}
