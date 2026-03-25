import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PROCESS_FORM_STYLES } from '../../process-form.styles';
import { PesquisaDominialidade } from '../../process.types';

@Component({
  selector: 'app-pesquisa-dominialidade-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pesquisa-dominialidade-form.component.html',
  styles: [PROCESS_FORM_STYLES],
})
export class PesquisaDominialidadeFormComponent implements OnChanges {
  @Input() model: PesquisaDominialidade | null = null;
  @Output() save = new EventEmitter<PesquisaDominialidade | null>();

  draft: PesquisaDominialidade = this.createDraft();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model']) {
      this.draft = this.createDraft();
    }
  }

  submit(): void {
    this.save.emit({ ...this.draft });
  }

  private createDraft(): PesquisaDominialidade {
    return {
      id: this.model?.id ?? this.generateId(),
      matriculaBase: this.model?.matriculaBase ?? '',
      cartorioRegistro: this.model?.cartorioRegistro ?? '',
      proprietarioIdentificado: this.model?.proprietarioIdentificado ?? false,
      areaPublica: this.model?.areaPublica ?? false,
      areaPrivada: this.model?.areaPrivada ?? false,
      situacaoDominial: this.model?.situacaoDominial ?? '',
      possuiSobreposicao: this.model?.possuiSobreposicao ?? false,
      descricaoSobreposicoes: this.model?.descricaoSobreposicoes ?? '',
      arquivoPlantaSobreposicaoId: this.model?.arquivoPlantaSobreposicaoId ?? '',
      arquivoCertidaoMatriculaId: this.model?.arquivoCertidaoMatriculaId ?? '',
      elaboradoPor: this.model?.elaboradoPor ?? '',
      dataElaboracao: this.model?.dataElaboracao ?? '',
    };
  }

  private generateId(): string {
    return crypto.randomUUID();
  }
}
