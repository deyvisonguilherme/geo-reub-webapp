import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { Beneficiario, ReurbModalidade } from '../../../process/process.types';
import { DialogModule } from 'primeng/dialog';

export interface BeneficiarioDraft {
  id: string;
  nomeCompleto: string;
  cpf: string;
  rg: string;
  orgaoExpedidor: string;
  dataNascimento: Date | null;
  nacionalidade: string;
  naturalidade: string;
  nomePai: string;
  nomeMae: string;
  estadoCivil: string;
  regimeCasamento: string;
  nomeConjuge: string;
  cpfConjuge: string;
  telefone: string;
  email: string;
  logradouro: string;
  numeroLote: string;
  quadra: string;
  complemento: string;
  areaOcupadaM2: number | null;
  coordenadasLote: string;
  rendaFamiliarMensal: number | null;
  numeroDependentes: number | null;
  tempoOcupacaoAnos: number | null;
  dataOcupacaoInicial: Date | null;
  rendaFamiliarAte5Sm: boolean;
  direitoRealConferido: string;
  idoso: boolean;
  deficiente: boolean;
  mulherChefeFamilia: boolean;
  possuiDocumentacaoCompleta: boolean;
  observacoes: string;
}

@Component({
  selector: 'app-beneficiary-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    DatePickerModule,
    InputNumberModule,
    InputTextModule,
    TextareaModule,
    DialogModule,
  ],
  templateUrl: './beneficiary-form.component.html',
  styleUrl: './beneficiary-form.component.scss',
})
export class BeneficiaryFormComponent implements OnChanges {
  @Input() beneficiary: Beneficiario | null = null;
  @Input() modalidade: ReurbModalidade = '';
  @Output() save = new EventEmitter<Beneficiario>();
  @Output() cancel = new EventEmitter<void>();

  draft: BeneficiarioDraft = this.createDraft();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['beneficiary'] && this.beneficiary) {
      this.draft = {
        ...this.beneficiary,
        dataNascimento: this.parseDate(this.beneficiary.dataNascimento),
        dataOcupacaoInicial: this.parseDate(this.beneficiary.dataOcupacaoInicial),
      };
    } else if (changes['beneficiary'] && !this.beneficiary) {
      this.resetDraft();
    }
  }

  onSubmit(): void {
    const item: Beneficiario = {
      ...this.draft,
      id: this.draft.id || crypto.randomUUID(),
      dataNascimento: this.toDateString(this.draft.dataNascimento),
      dataOcupacaoInicial: this.toDateString(this.draft.dataOcupacaoInicial),
    };

    this.save.emit(item);
  }

  resetDraft(): void {
    this.draft = this.createDraft();
  }

  private createDraft(): BeneficiarioDraft {
    return {
      id: '',
      nomeCompleto: '',
      cpf: '',
      rg: '',
      orgaoExpedidor: '',
      dataNascimento: null,
      nacionalidade: '',
      naturalidade: '',
      nomePai: '',
      nomeMae: '',
      estadoCivil: '',
      regimeCasamento: '',
      nomeConjuge: '',
      cpfConjuge: '',
      telefone: '',
      email: '',
      logradouro: '',
      numeroLote: '',
      quadra: '',
      complemento: '',
      areaOcupadaM2: null,
      coordenadasLote: '',
      rendaFamiliarMensal: null,
      numeroDependentes: null,
      tempoOcupacaoAnos: null,
      dataOcupacaoInicial: null,
      rendaFamiliarAte5Sm: false,
      direitoRealConferido: '',
      idoso: false,
      deficiente: false,
      mulherChefeFamilia: false,
      possuiDocumentacaoCompleta: false,
      observacoes: '',
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
