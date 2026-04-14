import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'area',
  standalone: true
})
export class AreaPipe implements PipeTransform {
  transform(value: number | string | null | undefined): string {
    if (value === null || value === undefined || value === '') return '0,00 m²';
    
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    
    if (isNaN(numValue)) return '0,00 m²';

    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numValue) + ' m²';
  }
}
