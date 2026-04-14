import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule, TagModule],
  template: `
    <p-tag 
      [value]="label()" 
      [severity]="severity()" 
      [rounded]="true"
      [styleClass]="'text-[0.7rem] font-bold uppercase tracking-wider'"
    />
  `,
  styles: [`
    :host ::ng-deep .p-tag {
      padding: 0.25rem 0.75rem;
    }
  `]
})
export class StatusBadgeComponent {
  label = input.required<string>();
  severity = input<'success' | 'warn' | 'info' | 'danger' | 'secondary' | 'contrast'>('info');
}
