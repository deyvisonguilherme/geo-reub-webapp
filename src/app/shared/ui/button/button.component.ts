import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ButtonVariant } from '../../models/shared.types';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <p-button
      [label]="label()"
      [icon]="icon()"
      [disabled]="disabled() || loading()"
      [loading]="loading()"
      [severity]="getSeverity()"
      [text]="variant() === 'text'"
      (onClick)="onClick.emit($event)"
      [styleClass]="customClass()"
    >
      <ng-content></ng-content>
    </p-button>
  `,
  styles: [`
    :host ::ng-deep .p-button {
      border-radius: 6px;
      font-weight: 500;
      transition: all 0.2s ease;
    }
  `]
})
export class ButtonComponent {
  label = input<string>('');
  icon = input<string>('');
  variant = input<ButtonVariant>('primary');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  customClass = input<string>('');

  onClick = output<MouseEvent>();

  protected getSeverity(): any {
    switch (this.variant()) {
      case 'danger': return 'danger';
      case 'secondary': return 'secondary';
      default: return 'primary';
    }
  }
}
