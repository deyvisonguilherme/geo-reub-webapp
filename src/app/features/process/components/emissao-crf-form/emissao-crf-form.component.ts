import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { CertidaoCrf, ReurbModalidade } from '../../process.types';

interface CrfDraft {
  id: string;
  numeroCrf: string;
  descricaoNucleo: string;
  areaTotalM2: number | null;
  numeroBeneficiarios: number | null;
  modalidadeReurb: ReurbModalidade;
  arquivoCrfId: string;
  arquivoMemorialDescritivoId: string;
  arquivoProjetoUrbanisticoId: string;
  arquivoListaBeneficiariosId: string;
  arquivoPlantaId: string;
  dataEmissao: Date | null;
  emitidoPor: string;
  valida: boolean;
  dataCancelamento: Date | null;
  motivoCancelamento: string;
}

@Component({
  selector: 'app-emissao-crf-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    DatePickerModule,
    InputNumberModule,
    InputTextModule,
    SelectModule,
    TextareaModule,
  ],
  templateUrl: './emissao-crf-form.component.html',
  styleUrl: './emissao-crf-form.component.scss',
})
export class EmissaoCrfFormComponent implements OnChanges {
  @Input() model: CertidaoCrf | null = null;
  @Input() modalidade: ReurbModalidade = '';
  @Input() beneficiariosCount = 0;
  @Input() atoUnicoDisponivel = false;
  @Output() save = new EventEmitter<CertidaoCrf | null>();

  draft: CrfDraft = this.createDraft();

  modalidadeOptions = [
    { label: 'REURB-S', value: 'REURB-S' },
    { label: 'REURB-E', value: 'REURB-E' },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model'] || changes['modalidade'] || changes['beneficiariosCount']) {
      this.draft = this.createDraft();
    }
  }

  submit(): void {
    const result: CertidaoCrf = {
      ...this.draft,
      dataEmissao: this.toDateString(this.draft.dataEmissao),
      dataCancelamento: this.toDateString(this.draft.dataCancelamento),
    };
    this.save.emit(result);
  }

  private createDraft(): CrfDraft {
    return {
      id: this.model?.id ?? crypto.randomUUID(),
      numeroCrf: this.model?.numeroCrf ?? '',
      descricaoNucleo: this.model?.descricaoNucleo ?? '',
      areaTotalM2: this.model?.areaTotalM2 ?? null,
      numeroBeneficiarios: this.model?.numeroBeneficiarios ?? this.beneficiariosCount,
      modalidadeReurb: this.model?.modalidadeReurb ?? (this.modalidade as ReurbModalidade),
      arquivoCrfId: this.model?.arquivoCrfId ?? '',
      arquivoMemorialDescritivoId: this.model?.arquivoMemorialDescritivoId ?? '',
      arquivoProjetoUrbanisticoId: this.model?.arquivoProjetoUrbanisticoId ?? '',
      arquivoListaBeneficiariosId: this.model?.arquivoListaBeneficiariosId ?? '',
      arquivoPlantaId: this.model?.arquivoPlantaId ?? '',
      dataEmissao: this.parseDate(this.model?.dataEmissao),
      emitidoPor: this.model?.emitidoPor ?? '',
      valida: this.model?.valida ?? true,
      dataCancelamento: this.parseDate(this.model?.dataCancelamento),
      motivoCancelamento: this.model?.motivoCancelamento ?? '',
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
