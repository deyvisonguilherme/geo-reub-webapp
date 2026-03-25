import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PROCESS_FORM_STYLES } from '../../process-form.styles';
import { ProjetoUrbanistico, ReurbModalidade } from '../../process.types';

@Component({
  selector: 'app-projeto-urbanistico-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './projeto-urbanistico-form.component.html',
  styles: [PROCESS_FORM_STYLES],
})
export class ProjetoUrbanisticoFormComponent implements OnChanges {
  @Input() model: ProjetoUrbanistico | null = null;
  @Input() modalidade: ReurbModalidade = '';
  @Output() save = new EventEmitter<ProjetoUrbanistico | null>();

  draft: ProjetoUrbanistico = this.createDraft();

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
    this.save.emit({ ...this.draft });
  }

  private createDraft(): ProjetoUrbanistico {
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
      dataAprovacaoMunicipio: this.model?.dataAprovacaoMunicipio ?? '',
      licencaUrbanistica: this.model?.licencaUrbanistica ?? '',
      licencaAmbiental: this.model?.licencaAmbiental ?? '',
      contratoCusteioAnexado: this.model?.contratoCusteioAnexado ?? false,
      dotacaoOrcamentariaPublica: this.model?.dotacaoOrcamentariaPublica ?? '',
      isencaoEmolumentosPrimeiroRegistro: this.model?.isencaoEmolumentosPrimeiroRegistro ?? false,
      fluxoAtoUnico: this.model?.fluxoAtoUnico ?? false,
      bemPublico: this.model?.bemPublico ?? false,
    };
  }
}
