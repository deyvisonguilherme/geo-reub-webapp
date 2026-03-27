import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ProjetoUrbanistico, ReurbModalidade } from '../../process.types';

interface ProjetoUrbanisticoDraft {
  id: string;
  titulo: string;
  descricao: string;
  areaIntervencaoM2: number | null;
  numeroLotes: number | null;
  sistemaViario: boolean;
  redeAgua: boolean;
  redeEsgoto: boolean;
  drenagem: boolean;
  energiaEletrica: boolean;
  iluminacaoPublica: boolean;
  coletaResiduos: boolean;
  areasVerdesM2: number | null;
  areasInstitucionaisM2: number | null;
  responsavelTecnico: string;
  registroProfissional: string;
  arquivoProjetoId: string;
  arquivoMemorialDescritivoId: string;
  arquivoPlantasId: string;
  aprovadoMunicipio: boolean;
  dataAprovacaoMunicipio: Date | null;
  licencaUrbanistica: string;
  licencaAmbiental: string;
  contratoCusteioAnexado: boolean;
  dotacaoOrcamentariaPublica: string;
  isencaoEmolumentosPrimeiroRegistro: boolean;
  fluxoAtoUnico: boolean;
  bemPublico: boolean;
}

@Component({
  selector: 'app-projeto-urbanistico-form',
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
  ],
  templateUrl: './projeto-urbanistico-form.component.html',
  styleUrl: './projeto-urbanistico-form.component.scss',
})
export class ProjetoUrbanisticoFormComponent implements OnChanges {
  @Input() model: ProjetoUrbanistico | null = null;
  @Input() modalidade: ReurbModalidade = '';
  @Output() save = new EventEmitter<ProjetoUrbanistico | null>();

  draft: ProjetoUrbanisticoDraft = this.createDraft();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model'] || changes['modalidade']) {
      this.draft = this.createDraft();
      if (this.modalidade === 'REURB-S') {
        this.draft.isencaoEmolumentosPrimeiroRegistro = true;
      }
    }
  }

  submit(): void {
    if (this.modalidade === 'REURB-S') {
      this.draft.isencaoEmolumentosPrimeiroRegistro = true;
    }
    this.save.emit({
      ...this.draft,
      dataAprovacaoMunicipio: this.toDateString(this.draft.dataAprovacaoMunicipio),
    });
  }

  private createDraft(): ProjetoUrbanisticoDraft {
    return {
      id: this.model?.id ?? crypto.randomUUID(),
      titulo: this.model?.titulo ?? '',
      descricao: this.model?.descricao ?? '',
      areaIntervencaoM2: this.model?.areaIntervencaoM2 ?? null,
      numeroLotes: this.model?.numeroLotes ?? null,
      sistemaViario: this.model?.sistemaViario ?? false,
      redeAgua: this.model?.redeAgua ?? false,
      redeEsgoto: this.model?.redeEsgoto ?? false,
      drenagem: this.model?.drenagem ?? false,
      energiaEletrica: this.model?.energiaEletrica ?? false,
      iluminacaoPublica: this.model?.iluminacaoPublica ?? false,
      coletaResiduos: this.model?.coletaResiduos ?? false,
      areasVerdesM2: this.model?.areasVerdesM2 ?? null,
      areasInstitucionaisM2: this.model?.areasInstitucionaisM2 ?? null,
      responsavelTecnico: this.model?.responsavelTecnico ?? '',
      registroProfissional: this.model?.registroProfissional ?? '',
      arquivoProjetoId: this.model?.arquivoProjetoId ?? '',
      arquivoMemorialDescritivoId: this.model?.arquivoMemorialDescritivoId ?? '',
      arquivoPlantasId: this.model?.arquivoPlantasId ?? '',
      aprovadoMunicipio: this.model?.aprovadoMunicipio ?? false,
      dataAprovacaoMunicipio: this.parseDate(this.model?.dataAprovacaoMunicipio),
      licencaUrbanistica: this.model?.licencaUrbanistica ?? '',
      licencaAmbiental: this.model?.licencaAmbiental ?? '',
      contratoCusteioAnexado: this.model?.contratoCusteioAnexado ?? false,
      dotacaoOrcamentariaPublica: this.model?.dotacaoOrcamentariaPublica ?? '',
      isencaoEmolumentosPrimeiroRegistro: this.model?.isencaoEmolumentosPrimeiroRegistro ?? false,
      fluxoAtoUnico: this.model?.fluxoAtoUnico ?? false,
      bemPublico: this.model?.bemPublico ?? false,
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
