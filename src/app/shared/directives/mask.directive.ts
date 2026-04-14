import { Directive, input, HostListener, inject, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMask]',
  standalone: true
})
export class MaskDirective {
  private el = inject(ElementRef);
  
  appMask = input.required<'cpf' | 'cnpj' | 'cep'>();

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = this.el.nativeElement as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    
    switch (this.appMask()) {
      case 'cpf':
        if (value.length > 11) value = value.slice(0, 11);
        input.value = this.applyCpfMask(value);
        break;
      case 'cnpj':
        if (value.length > 14) value = value.slice(0, 14);
        input.value = this.applyCnpjMask(value);
        break;
      case 'cep':
        if (value.length > 8) value = value.slice(0, 8);
        input.value = this.applyCepMask(value);
        break;
    }
  }

  private applyCpfMask(v: string): string {
    if (v.length <= 3) return v;
    if (v.length <= 6) return v.replace(/(\d{3})(\d+)/, '$1.$2');
    if (v.length <= 9) return v.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    return v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  private applyCnpjMask(v: string): string {
    if (v.length <= 2) return v;
    if (v.length <= 5) return v.replace(/(\d{2})(\d+)/, '$1.$2');
    if (v.length <= 8) return v.replace(/(\d{2})(\d{3})(\d+)/, '$1.$2.$3');
    if (v.length <= 12) return v.replace(/(\d{2})(\d{3})(\d{3})(\d+)/, '$1.$2.$3/$4');
    return v.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  private applyCepMask(v: string): string {
    if (v.length <= 5) return v;
    return v.replace(/(\d{5})(\d+)/, '$1-$2');
  }
}
