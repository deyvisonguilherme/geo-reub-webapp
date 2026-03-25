import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PROCESS_FORM_STYLES } from '../../process-form.styles';
import { Beneficiario, ReurbModalidade } from '../../process.types';

@Component({
  selector: 'app-cadastro-social-beneficiario-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-social-beneficiario-form.component.html',
  styles: [PROCESS_FORM_STYLES],
})
export class CadastroSocialBeneficiarioFormComponent implements OnChanges {
  @Input() items: Beneficiario[] = [];
  @Input() modalidade: ReurbModalidade = '';
  @Output() save = new EventEmitter<Beneficiario[]>();

  readonly limiteRendaReurbS = 7590;
  localItems: Beneficiario[] = [];
  draft: Beneficiario = this.createDraft();

  get totalRenda(): number {
    return this.localItems.reduce((sum, item) => sum + Number(item.rendaFamiliarMensal ?? 0), 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.localItems = this.items.map((item) => ({ ...item }));
      this.resetDraft();
    }
  }

  edit(item: Beneficiario): void {
    this.draft = { ...item };
  }

  upsert(): void {
    const item = { ...this.draft, id: this.draft.id || crypto.randomUUID() };
    if (this.modalidade === 'REURB-S' && item.rendaFamiliarMensal !== null) {
      item.rendaFamiliarAte5Sm = item.rendaFamiliarMensal <= this.limiteRendaReurbS;
    }
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

  private createDraft(): Beneficiario {
    return {
      id: '',
      nomeCompleto: '',
      cpf: '',
      rg: '',
      orgaoExpedidor: '',
      dataNascimento: '',
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
      dataOcupacaoInicial: '',
      rendaFamiliarAte5Sm: false,
      direitoRealConferido: '',
      idoso: false,
      deficiente: false,
      mulherChefeFamilia: false,
      possuiDocumentacaoCompleta: false,
      observacoes: '',
    };
  }
}
