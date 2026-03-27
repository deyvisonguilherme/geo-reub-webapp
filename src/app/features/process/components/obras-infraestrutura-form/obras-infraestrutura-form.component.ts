import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { ObraInfraestrutura } from '../../process.types';

interface ObraInfraestruturaDraft {
  id: string;
  tipoObra: string;
  descricao: string;
  especificacoesTecnicas: string;
  unidadeMedida: string;
  quantidade: number | null;
  custoEstimado: number | null;
  obraEssencial: boolean;
  obraMitigacao: boolean;
  obraCompensacao: boolean;
  prazoExecucaoMeses: number | null;
  dataPrevistaInicio: Date | null;
  dataPrevistaConclusao: Date | null;
}

@Component({
  selector: 'app-obras-infraestrutura-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    DatePickerModule,
    InputNumberModule,
    InputTextModule,
    TableModule,
    TextareaModule,
  ],
  templateUrl: './obras-infraestrutura-form.component.html',
  styleUrl: './obras-infraestrutura-form.component.scss',
})
export class ObrasInfraestruturaFormComponent implements OnChanges {
  @Input() items: ObraInfraestrutura[] = [];
  @Output() save = new EventEmitter<ObraInfraestrutura[]>();

  localItems: ObraInfraestrutura[] = [];
  draft: ObraInfraestruturaDraft = this.createDraft();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.localItems = this.items.map((item) => ({ ...item }));
      this.resetDraft();
    }
  }

  edit(item: ObraInfraestrutura): void {
    this.draft = {
      ...item,
      dataPrevistaInicio: this.parseDate(item.dataPrevistaInicio),
      dataPrevistaConclusao: this.parseDate(item.dataPrevistaConclusao),
    };
  }

  upsert(): void {
    const item: ObraInfraestrutura = {
      ...this.draft,
      id: this.draft.id || crypto.randomUUID(),
      dataPrevistaInicio: this.toDateString(this.draft.dataPrevistaInicio),
      dataPrevistaConclusao: this.toDateString(this.draft.dataPrevistaConclusao),
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

  private createDraft(): ObraInfraestruturaDraft {
    return {
      id: '',
      tipoObra: '',
      descricao: '',
      especificacoesTecnicas: '',
      unidadeMedida: '',
      quantidade: null,
      custoEstimado: null,
      obraEssencial: false,
      obraMitigacao: false,
      obraCompensacao: false,
      prazoExecucaoMeses: null,
      dataPrevistaInicio: null,
      dataPrevistaConclusao: null,
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
