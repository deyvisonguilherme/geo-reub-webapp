import { Component, input, output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { RegistryDeadline } from '../../comunication.types';

@Component({
  selector: 'app-registry-deadlines',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    ButtonModule,
    TooltipModule,
    DatePipe
  ],
  templateUrl: './registry-deadlines.component.html'
})
export class RegistryDeadlinesComponent {
  deadlines = input.required<RegistryDeadline[]>();
  viewDetails = output<RegistryDeadline>();
}
