import { Component, input, output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TacitAgreement } from '../../comunication.types';

@Component({
  selector: 'app-tacit-agreements',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    ButtonModule,
    TooltipModule,
    DatePipe
  ],
  templateUrl: './tacit-agreements.component.html'
})
export class TacitAgreementsComponent {
  agreements = input.required<TacitAgreement[]>();
  consolidate = output<TacitAgreement>();

  getTacitSeverity(status: string): any {
    return status === 'CONSOLIDADO' ? 'success' : 'warn';
  }
}
