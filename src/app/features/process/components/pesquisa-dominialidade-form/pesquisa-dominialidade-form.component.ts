import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { PesquisaDominialidade } from '../../process.types';

interface PesquisaDominialidadeDraft extends Omit<PesquisaDominialidade, 'dataElaboracao'> {
  dataElaboracao: Date | null;
}

@Component({
  selector: 'app-pesquisa-dominialidade-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    DatePickerModule,
    InputTextModule,
    TextareaModule,
  ],
  templateUrl: './pesquisa-dominialidade-form.component.html',
  styleUrl: './pesquisa-dominialidade-form.component.scss',
})
export class PesquisaDominialidadeFormComponent implements OnChanges {
  @Input() model: PesquisaDominialidade | null = null;
  @Output() save = new EventEmitter<PesquisaDominialidade | null>();

  draft: PesquisaDominialidadeDraft = this.createDraft();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model']) {
      this.draft = this.createDraft();
    }
  }

  submit(): void {
    this.save.emit({
      ...this.draft,
      dataElaboracao: this.toDateString(this.draft.dataElaboracao),
    } as PesquisaDominialidade);
  }

  private createDraft(): PesquisaDominialidadeDraft {
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
      dataElaboracao: this.parseDate(this.model?.dataElaboracao),
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

  private generateId(): string {
    return crypto.randomUUID();
  }
}

