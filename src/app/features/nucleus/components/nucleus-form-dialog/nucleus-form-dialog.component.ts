import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

import { NucleusFormModel } from '../../nucleus.types';

@Component({
  selector: 'app-nucleus-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    DatePickerModule,
    DialogModule,
    InputNumberModule,
    InputTextModule,
    TextareaModule,
  ],
  templateUrl: './nucleus-form-dialog.component.html',
  styleUrl: './nucleus-form-dialog.component.scss',
})
export class NucleusFormDialogComponent {
  @Input({ required: true }) title = '';
  @Input({ required: true }) visible = false;
  @Input({ required: true }) model: NucleusFormModel | null = null;
  @Input() situacaoOptions: ReadonlyArray<{ label: string; value: string }> = [];

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<void>();

  get saveDisabled(): boolean {
    return !this.model?.codigo || !this.model?.nome || !this.model?.criadoPor;
  }

  close(): void {
    this.visibleChange.emit(false);
  }

  submit(): void {
    this.save.emit();
  }
}
