import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ProcessRecord, ReurbModalidade } from '../../process.types';

interface ProcessoDraft {
  numeroProcesso: string;
  nucleoId: string;
  modalidade: ReurbModalidade;
  status: string;
  legitimadoRequerenteId: string;
  tipoLegitimado: string;
  dataInstauracao: Date | null;
  prazoAnaliseAdmissibilidade: Date | null;
  prazoConclusaoEstimado: Date | null;
  dataConclusao: Date | null;
  arquivoRequerimentoId: string;
  observacoes: string;
  criadoPor: string;
  atualizadoPor: string;
}

@Component({
  selector: 'app-abertura-processo-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    DatePickerModule,
    InputTextModule,
    SelectModule,
    TextareaModule,
  ],
  templateUrl: './abertura-processo-form.component.html',
  styleUrl: './abertura-processo-form.component.scss',
})
export class AberturaProcessoFormComponent implements OnChanges {
  @Input({ required: true }) model!: ProcessRecord;
  @Output() save = new EventEmitter<Partial<ProcessRecord>>();

  draft: ProcessoDraft = this.createDraft();

  modalidadeOptions = [
    { label: 'REURB-S', value: 'REURB-S' },
    { label: 'REURB-E', value: 'REURB-E' },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model']) {
      this.draft = this.createDraft();
    }
  }

  submit(): void {
    this.save.emit({
      ...this.draft,
      dataInstauracao: this.toDateString(this.draft.dataInstauracao),
      prazoAnaliseAdmissibilidade: this.toDateString(this.draft.prazoAnaliseAdmissibilidade),
      prazoConclusaoEstimado: this.toDateString(this.draft.prazoConclusaoEstimado),
      dataConclusao: this.toDateString(this.draft.dataConclusao),
    });
  }

  private createDraft(): ProcessoDraft {
    return {
      numeroProcesso: this.model?.numeroProcesso ?? '',
      nucleoId: this.model?.nucleoId ?? '',
      modalidade: this.model?.modalidade ?? '',
      status: this.model?.status ?? 'REQUERIMENTO_PROTOCOLADO',
      legitimadoRequerenteId: this.model?.legitimadoRequerenteId ?? '',
      tipoLegitimado: this.model?.tipoLegitimado ?? '',
      dataInstauracao: this.parseDate(this.model?.dataInstauracao),
      prazoAnaliseAdmissibilidade: this.parseDate(this.model?.prazoAnaliseAdmissibilidade),
      prazoConclusaoEstimado: this.parseDate(this.model?.prazoConclusaoEstimado),
      dataConclusao: this.parseDate(this.model?.dataConclusao),
      arquivoRequerimentoId: this.model?.arquivoRequerimentoId ?? '',
      observacoes: this.model?.observacoes ?? '',
      criadoPor: this.model?.criadoPor ?? '',
      atualizadoPor: this.model?.atualizadoPor ?? '',
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
