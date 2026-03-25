import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PROCESS_FORM_STYLES } from '../../process-form.styles';
import { CertidaoCrf, ReurbModalidade } from '../../process.types';

@Component({
  selector: 'app-emissao-crf-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './emissao-crf-form.component.html',
  styles: [PROCESS_FORM_STYLES],
})
export class EmissaoCrfFormComponent implements OnChanges {
  @Input() model: CertidaoCrf | null = null;
  @Input() modalidade: ReurbModalidade = '';
  @Input() beneficiariosCount = 0;
  @Input() atoUnicoDisponivel = false;
  @Output() save = new EventEmitter<CertidaoCrf | null>();

  draft: CertidaoCrf = this.createDraft();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model'] || changes['modalidade'] || changes['beneficiariosCount']) {
      this.draft = this.createDraft();
    }
  }

  submit(): void {
    this.save.emit({ ...this.draft });
  }

  private createDraft(): CertidaoCrf {
    return {
      id: this.model?.id ?? crypto.randomUUID(),
      numeroCrf: this.model?.numeroCrf ?? '',
      descricaoNucleo: this.model?.descricaoNucleo ?? '',
      areaTotalM2: this.model?.areaTotalM2 ?? null,
      numeroBeneficiarios: this.model?.numeroBeneficiarios ?? this.beneficiariosCount,
      modalidadeReurb: this.model?.modalidadeReurb ?? this.modalidade,
      arquivoCrfId: this.model?.arquivoCrfId ?? '',
      arquivoMemorialDescritivoId: this.model?.arquivoMemorialDescritivoId ?? '',
      arquivoProjetoUrbanisticoId: this.model?.arquivoProjetoUrbanisticoId ?? '',
      arquivoListaBeneficiariosId: this.model?.arquivoListaBeneficiariosId ?? '',
      arquivoPlantaId: this.model?.arquivoPlantaId ?? '',
      dataEmissao: this.model?.dataEmissao ?? '',
      emitidoPor: this.model?.emitidoPor ?? '',
      valida: this.model?.valida ?? true,
      dataCancelamento: this.model?.dataCancelamento ?? '',
      motivoCancelamento: this.model?.motivoCancelamento ?? '',
    };
  }
}
