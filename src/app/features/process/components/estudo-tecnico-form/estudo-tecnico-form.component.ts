import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { EstudoTecnico } from '../../process.types';

interface EstudoTecnicoDraft extends Omit<EstudoTecnico, 'dataElaboracao' | 'dataAprovacao'> {
  dataElaboracao: Date | null;
  dataAprovacao: Date | null;
}

@Component({
  selector: 'app-estudo-tecnico-form',
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
  templateUrl: './estudo-tecnico-form.component.html',
  styleUrl: './estudo-tecnico-form.component.scss',
})
export class EstudoTecnicoFormComponent implements OnChanges {
  @Input() model: EstudoTecnico | null = null;
  @Output() save = new EventEmitter<EstudoTecnico | null>();

  draft: EstudoTecnicoDraft = this.createDraft();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model']) {
      this.draft = this.createDraft();
    }
  }

  submit(): void {
    this.save.emit({
      ...this.draft,
      dataElaboracao: this.toDateString(this.draft.dataElaboracao),
      dataAprovacao: this.toDateString(this.draft.dataAprovacao),
    } as EstudoTecnico);
  }

  private createDraft(): EstudoTecnicoDraft {
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
      dataElaboracao: this.parseDate(this.model?.dataElaboracao),
      dataAprovacao: this.parseDate(this.model?.dataAprovacao),
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
