import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-statistic-card-skeleton',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './statistic-card-skeleton.component.html',
  styleUrl: './statistic-card-skeleton.component.scss'
})
export class StatisticCardSkeletonComponent {
  count = input<number>(4);

  protected readonly items = Array.from({ length: 4 }); // Default fallback
}
