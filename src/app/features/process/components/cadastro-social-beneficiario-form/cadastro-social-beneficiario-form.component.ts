import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { Beneficiario, ReurbModalidade } from '../../process.types';

interface BeneficiarioDraft {
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
  selector: 'app-cadastro-social-beneficiario-form',
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
  templateUrl: './cadastro-social-beneficiario-form.component.html',
  styleUrl: './cadastro-social-beneficiario-form.component.scss',
})
export class CadastroSocialBeneficiarioFormComponent implements OnChanges {
  @Input() items: Beneficiario[] = [];
  @Input() modalidade: ReurbModalidade = '';
  @Output() save = new EventEmitter<Beneficiario[]>();

  readonly limiteRendaReurbS = 7590;
  
  readonly localItems = signal<Beneficiario[]>([]);
  readonly draft = signal<BeneficiarioDraft>(this.createDraft());

  readonly totalRenda = computed(() => {
    return this.localItems().reduce((sum, item) => sum + Number(item.rendaFamiliarMensal ?? 0), 0);
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.localItems.set(this.items.map((item) => ({ ...item })));
      this.resetDraft();
    }
  }

  edit(item: Beneficiario): void {
    this.draft.set({
      ...item,
      dataNascimento: this.parseDate(item.dataNascimento),
      dataOcupacaoInicial: this.parseDate(item.dataOcupacaoInicial),
    });
  }

  upsert(): void {
    const currentDraft = this.draft();
    const item: Beneficiario = {
      ...currentDraft,
      id: currentDraft.id || crypto.randomUUID(),
      dataNascimento: this.toDateString(currentDraft.dataNascimento),
      dataOcupacaoInicial: this.toDateString(currentDraft.dataOcupacaoInicial),
    };

    if (this.modalidade === 'REURB-S' && item.rendaFamiliarMensal !== null) {
      item.rendaFamiliarAte5Sm = item.rendaFamiliarMensal <= this.limiteRendaReurbS;
    }
    
    const exists = this.localItems().some((current) => current.id === item.id);
    if (exists) {
      this.localItems.update(items => items.map((current) => (current.id === item.id ? item : current)));
    } else {
      this.localItems.update(items => [item, ...items]);
    }
    
    this.save.emit(this.localItems());
    this.resetDraft();
  }

  remove(id: string): void {
    this.localItems.update(items => items.filter((item) => item.id !== id));
    this.save.emit(this.localItems());
  }

  resetDraft(): void {
    this.draft.set(this.createDraft());
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
    try {
      return date.toISOString().slice(0, 10);
    } catch {
      return '';
    }
  }
}
