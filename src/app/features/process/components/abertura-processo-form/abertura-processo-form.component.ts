import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PROCESS_FORM_STYLES } from '../../process-form.styles';
import { ProcessRecord } from '../../process.types';
import { ButtonModule } from 'primeng/button';

type ProcessoDraft = Pick<
  ProcessRecord,
  | 'numeroProcesso'
  | 'nucleoId'
  | 'modalidade'
  | 'status'
  | 'legitimadoRequerenteId'
  | 'tipoLegitimado'
  | 'dataInstauracao'
  | 'prazoAnaliseAdmissibilidade'
  | 'prazoConclusaoEstimado'
  | 'dataConclusao'
  | 'arquivoRequerimentoId'
  | 'observacoes'
  | 'criadoPor'
  | 'atualizadoPor'
>;

@Component({
  selector: 'app-abertura-processo-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './abertura-processo-form.component.html',
  styles: [PROCESS_FORM_STYLES],
})
export class AberturaProcessoFormComponent implements OnChanges {
  @Input({ required: true }) model!: ProcessRecord;
  @Output() save = new EventEmitter<Partial<ProcessRecord>>();

  draft: ProcessoDraft = this.createDraft();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model']) {
      this.draft = this.createDraft();
    }
  }

  submit(): void {
    this.save.emit({ ...this.draft });
  }

  private createDraft(): ProcessoDraft {
    return {
      numeroProcesso: this.model?.numeroProcesso ?? '',
      nucleoId: this.model?.nucleoId ?? '',
      modalidade: this.model?.modalidade ?? '',
      status: this.model?.status ?? 'REQUERIMENTO_PROTOCOLADO',
      legitimadoRequerenteId: this.model?.legitimadoRequerenteId ?? '',
      tipoLegitimado: this.model?.tipoLegitimado ?? '',
      dataInstauracao: this.model?.dataInstauracao ?? '',
      prazoAnaliseAdmissibilidade: this.model?.prazoAnaliseAdmissibilidade ?? '',
      prazoConclusaoEstimado: this.model?.prazoConclusaoEstimado ?? '',
      dataConclusao: this.model?.dataConclusao ?? '',
      arquivoRequerimentoId: this.model?.arquivoRequerimentoId ?? '',
      observacoes: this.model?.observacoes ?? '',
      criadoPor: this.model?.criadoPor ?? '',
      atualizadoPor: this.model?.atualizadoPor ?? '',
    };
  }
}
