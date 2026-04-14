import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-table-skeleton',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './table-skeleton.component.html',
  styleUrl: './table-skeleton.component.scss'
})
export class TableSkeletonComponent {
  rows = input<number>(5);
  cols = input<number>(5);
}
