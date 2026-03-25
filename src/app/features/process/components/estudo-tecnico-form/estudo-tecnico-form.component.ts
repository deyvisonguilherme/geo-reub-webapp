import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PROCESS_FORM_STYLES } from '../../process-form.styles';
import { EstudoTecnico } from '../../process.types';

@Component({
  selector: 'app-estudo-tecnico-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estudo-tecnico-form.component.html',
  styles: [PROCESS_FORM_STYLES],
})
export class EstudoTecnicoFormComponent implements OnChanges {
  @Input() model: EstudoTecnico | null = null;
  @Output() save = new EventEmitter<EstudoTecnico | null>();

  draft: EstudoTecnico = this.createDraft();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model']) {
      this.draft = this.createDraft();
    }
  }

  submit(): void {
    this.save.emit({ ...this.draft });
  }

  private createDraft(): EstudoTecnico {
    return {
      id: this.model?.id ?? crypto.randomUUID(),
      tipoEstudo: this.model?.tipoEstudo ?? '',
      titulo: this.model?.titulo ?? '',
      resumoExecutivo: this.model?.resumoExecutivo ?? '',
      conclusoes: this.model?.conclusoes ?? '',
      recomendacoes: this.model?.recomendacoes ?? '',
      nivelRisco: this.model?.nivelRisco ?? '',
      necessitaRemocao: this.model?.necessitaRemocao ?? false,
      familiasAfetadas: this.model?.familiasAfetadas ?? null,
      responsavelTecnico: this.model?.responsavelTecnico ?? '',
      registroProfissional: this.model?.registroProfissional ?? '',
      arquivoEstudoId: this.model?.arquivoEstudoId ?? '',
      dataElaboracao: this.model?.dataElaboracao ?? '',
      dataAprovacao: this.model?.dataAprovacao ?? '',
    };
  }
}
