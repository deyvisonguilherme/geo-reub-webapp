import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { LevantamentoTopografico } from '../../process.types';

interface LevantamentoTopograficoDraft {
  id: string;
  sistemaReferencia: string;
  datum: string;
  fusoUtm: string;
  precisaoPlanimetricaCm: number | null;
  precisaoAltimetricaCm: number | null;
  responsavelTecnico: string;
  creaArt: string;
  empresaExecutora: string;
  arquivoPlantaId: string;
  arquivoMemorialId: string;
  arquivoShapefileId: string;
  dataLevantamento: Date | null;
  dataAprovacao: Date | null;
}

@Component({
  selector: 'app-levantamentos-topograficos-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    DatePickerModule,
    InputNumberModule,
    InputTextModule,
    TableModule,
  ],
  templateUrl: './levantamentos-topograficos-form.component.html',
  styleUrl: './levantamentos-topograficos-form.component.scss',
})
export class LevantamentosTopograficosFormComponent implements OnChanges {
  @Input() items: LevantamentoTopografico[] = [];
  @Output() save = new EventEmitter<LevantamentoTopografico[]>();

  localItems: LevantamentoTopografico[] = [];
  draft: LevantamentoTopograficoDraft = this.createDraft();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.localItems = this.items.map((item) => ({ ...item }));
      this.resetDraft();
    }
  }

  edit(item: LevantamentoTopografico): void {
    this.draft = {
      ...item,
      dataLevantamento: this.parseDate(item.dataLevantamento),
      dataAprovacao: this.parseDate(item.dataAprovacao),
    };
  }

  upsert(): void {
    const item: LevantamentoTopografico = {
      ...this.draft,
      id: this.draft.id || crypto.randomUUID(),
      dataLevantamento: this.toDateString(this.draft.dataLevantamento),
      dataAprovacao: this.toDateString(this.draft.dataAprovacao),
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

  private createDraft(): LevantamentoTopograficoDraft {
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
      dataLevantamento: null,
      dataAprovacao: null,
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
