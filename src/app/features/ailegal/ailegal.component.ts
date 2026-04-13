import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ScrollPanelModule } from 'primeng/scrollpanel';

interface Message {
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

@Component({
  selector: 'app-ailegal',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, ScrollPanelModule],
  templateUrl: './ailegal.component.html',
  styleUrl: './ailegal.component.scss',
})
export class AilegalComponent {
  @Output() close = new EventEmitter<void>();

  messages = signal<Message[]>([
    {
      text: 'Olá! Sou o assistente inteligente do GeoReub. Como posso ajudar você com os processos de regularização hoje?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);

  newMessage = '';

  sendMessage() {
    if (!this.newMessage.trim()) return;

    const userMsg: Message = {
      text: this.newMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    this.messages.update((prev) => [...prev, userMsg]);
    this.newMessage = '';

    // Simulação de resposta da IA
    setTimeout(() => {
      const aiMsg: Message = {
        text: 'Entendi sua solicitação. Estou processando as informações do núcleo urbano para te dar uma resposta precisa...',
        sender: 'ai',
        timestamp: new Date(),
      };
      this.messages.update((prev) => [...prev, aiMsg]);
    }, 1000);
  }
}
