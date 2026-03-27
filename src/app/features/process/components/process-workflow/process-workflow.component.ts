import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AberturaProcessoFormComponent } from '../../components/abertura-processo-form/abertura-processo-form.component';
import { BeneficiarioDocumentosFormComponent } from '../../components/beneficiario-documentos-form/beneficiario-documentos-form.component';
import { CadastroSocialBeneficiarioFormComponent } from '../../components/cadastro-social-beneficiario-form/cadastro-social-beneficiario-form.component';
import { EmissaoCrfFormComponent } from '../../components/emissao-crf-form/emissao-crf-form.component';
import { EstudoTecnicoFormComponent } from '../../components/estudo-tecnico-form/estudo-tecnico-form.component';
import { LevantamentosTopograficosFormComponent } from '../../components/levantamentos-topograficos-form/levantamentos-topograficos-form.component';
import { ObrasInfraestruturaFormComponent } from '../../components/obras-infraestrutura-form/obras-infraestrutura-form.component';
import { PesquisaDominialidadeFormComponent } from '../../components/pesquisa-dominialidade-form/pesquisa-dominialidade-form.component';
import { ProjetoUrbanisticoFormComponent } from '../../components/projeto-urbanistico-form/projeto-urbanistico-form.component';
import { RegistroTitulosFormComponent } from '../../components/registro-titulos-form/registro-titulos-form.component';
import { TermosCompromissoFormComponent } from '../../components/termos-compromisso-form/termos-compromisso-form.component';
import { TitularesConfrontantesFormComponent } from '../../components/titulares-confrontantes-form/titulares-confrontantes-form.component';
import { ProcessStore } from '../../process.store';
import { ButtonModule } from 'primeng/button';
import {
  Beneficiario,
  BeneficiarioDocumento,
  CertidaoCrf,
  EstudoTecnico,
  LevantamentoTopografico,
  ObraInfraestrutura,
  PesquisaDominialidade,
  ProjetoUrbanistico,
  RegistroTitulo,
  TermoCompromisso,
  TitularConfrontante,
} from '../../process.types';

type SectionKey =
  | 'abertura'
  | 'pesquisa'
  | 'titulares'
  | 'estudo'
  | 'levantamentos'
  | 'projeto'
  | 'obras'
  | 'termos'
  | 'beneficiarios'
  | 'documentos'
  | 'crf'
  | 'titulos';

interface TimelineStage {
  id: string;
  title: string;
  description: string;
  tone: 'tone-1' | 'tone-2' | 'tone-3' | 'tone-4' | 'tone-5';
  completed: boolean;
  sections: Array<{ key: SectionKey; label: string; helper: string }>;
}

@Component({
  selector: 'app-process-workflow',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ButtonModule,
    AberturaProcessoFormComponent,
    PesquisaDominialidadeFormComponent,
    TitularesConfrontantesFormComponent,
    EstudoTecnicoFormComponent,
    LevantamentosTopograficosFormComponent,
    ProjetoUrbanisticoFormComponent,
    ObrasInfraestruturaFormComponent,
    TermosCompromissoFormComponent,
    CadastroSocialBeneficiarioFormComponent,
    BeneficiarioDocumentosFormComponent,
    EmissaoCrfFormComponent,
    RegistroTitulosFormComponent,
  ],
  templateUrl: './process-workflow.component.html',
  styleUrl: './process-workflow.component.scss',
})
export class ProcessWorkflowComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(ProcessStore);

  readonly process = computed(() => {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    return this.store.getById(id) ?? null;
  });

  readonly activeSection = signal<SectionKey>('abertura');

  readonly stages = computed<TimelineStage[]>(() => {
    const process = this.process();
    if (!process) {
      return [];
    }

    return [
      {
        id: 'instauracao',
        title: '1. Instauração e Classificação',
        description:
          'Requerimento inicial, classificação da modalidade e prazo de admissibilidade.',
        tone: 'tone-1',
        completed: Boolean(
          process.numeroProcesso &&
          process.nucleoId &&
          process.legitimadoRequerenteId &&
          process.modalidade &&
          process.dataInstauracao,
        ),
        sections: [
          {
            key: 'abertura',
            label: 'Abertura de Processo',
            helper: process.modalidade || 'Defina modalidade e legitimado',
          },
        ],
      },
      {
        id: 'diagnostico',
        title: '2. Diagnóstico e Pesquisa Dominial',
        description: 'Leitura registral, sobreposição e confrontantes notificados.',
        tone: 'tone-2',
        completed: Boolean(process.pesquisaDominialidade && process.titularesConfrontantes.length),
        sections: [
          {
            key: 'pesquisa',
            label: 'Pesquisa Dominialidade',
            helper: process.pesquisaDominialidade ? 'Pesquisa registrada' : 'Pendente',
          },
          {
            key: 'titulares',
            label: 'Titulares Confrontantes',
            helper: `${process.titularesConfrontantes.length} cadastro(s)`,
          },
        ],
      },
      {
        id: 'prf',
        title: '3. Projeto de Regularização Fundiária',
        description: 'Estudos técnicos, topografia, projeto urbanístico e pactos de execução.',
        tone: 'tone-3',
        completed: Boolean(
          process.estudoTecnico &&
          process.levantamentosTopograficos.length &&
          process.projetoUrbanistico &&
          process.obrasInfraestrutura.length &&
          process.termosCompromisso.length,
        ),
        sections: [
          {
            key: 'estudo',
            label: 'Estudo Técnico Preliminar',
            helper: process.estudoTecnico?.titulo || 'Pendente',
          },
          {
            key: 'levantamentos',
            label: 'Levantamentos Topográficos',
            helper: `${process.levantamentosTopograficos.length} levantamento(s)`,
          },
          {
            key: 'projeto',
            label: 'Projeto Urbanístico',
            helper: process.projetoUrbanistico?.titulo || 'Pendente',
          },
          {
            key: 'obras',
            label: 'Obras Infraestrutura',
            helper: `${process.obrasInfraestrutura.length} obra(s)`,
          },
          {
            key: 'termos',
            label: 'Termos de Compromisso',
            helper: `${process.termosCompromisso.length} termo(s)`,
          },
        ],
      },
      {
        id: 'beneficiarios',
        title: '4. Cadastramento de Beneficiários',
        description: 'Cadastro social, renda familiar e validação documental.',
        tone: 'tone-4',
        completed: Boolean(process.beneficiarios.length),
        sections: [
          {
            key: 'beneficiarios',
            label: 'Cadastro Social do Beneficiário',
            helper: `${process.beneficiarios.length} beneficiário(s)`,
          },
          {
            key: 'documentos',
            label: 'Documentos dos Beneficiários',
            helper: `${process.beneficiarioDocumentos.length} documento(s)`,
          },
        ],
      },
      {
        id: 'registro',
        title: '5. Emissão da CRF e Registro Cartorial',
        description: 'Certidão final, isenções e listagem registral dos títulos.',
        tone: 'tone-5',
        completed: Boolean(process.certidaoCrf && process.registrosTitulos.length),
        sections: [
          {
            key: 'crf',
            label: 'Emissão de CRF',
            helper: process.certidaoCrf?.numeroCrf || 'Pendente',
          },
          {
            key: 'titulos',
            label: 'Registro de Títulos',
            helper: `${process.registrosTitulos.length} registro(s)`,
          },
        ],
      },
    ];
  });

  get processTitle(): string {
    const process = this.process();
    return process?.numeroProcesso || 'Novo processo REURB';
  }

  openSection(section: SectionKey): void {
    this.activeSection.set(section);
  }

  removeProcess(): void {
    const process = this.process();
    if (!process) {
      return;
    }

    this.store.deleteProcess(process.id);
    void this.router.navigate(['/process']);
  }

  saveAbertura(value: Partial<any>): void {
    const process = this.process();
    if (!process) {
      return;
    }
    this.store.updateProcess(process.id, value);
  }

  savePesquisa(value: PesquisaDominialidade | null): void {
    const process = this.process();
    if (process) {
      this.store.savePesquisaDominialidade(process.id, value);
    }
  }

  saveTitulares(value: TitularConfrontante[]): void {
    const process = this.process();
    if (process) {
      this.store.saveTitulares(process.id, value);
    }
  }

  saveEstudo(value: EstudoTecnico | null): void {
    const process = this.process();
    if (process) {
      this.store.saveEstudoTecnico(process.id, value);
    }
  }

  saveLevantamentos(value: LevantamentoTopografico[]): void {
    const process = this.process();
    if (process) {
      this.store.saveLevantamentos(process.id, value);
    }
  }

  saveProjeto(value: ProjetoUrbanistico | null): void {
    const process = this.process();
    if (process) {
      this.store.saveProjetoUrbanistico(process.id, value);
    }
  }

  saveObras(value: ObraInfraestrutura[]): void {
    const process = this.process();
    if (process) {
      this.store.saveObras(process.id, value);
    }
  }

  saveTermos(value: TermoCompromisso[]): void {
    const process = this.process();
    if (process) {
      this.store.saveTermos(process.id, value);
    }
  }

  saveBeneficiarios(value: Beneficiario[]): void {
    const process = this.process();
    if (process) {
      this.store.saveBeneficiarios(process.id, value);
    }
  }

  saveDocumentos(value: BeneficiarioDocumento[]): void {
    const process = this.process();
    if (process) {
      this.store.saveBeneficiarioDocumentos(process.id, value);
    }
  }

  saveCrf(value: CertidaoCrf | null): void {
    const process = this.process();
    if (process) {
      this.store.saveCertidaoCrf(process.id, value);
    }
  }

  saveTitulos(value: RegistroTitulo[]): void {
    const process = this.process();
    if (process) {
      this.store.saveRegistrosTitulos(process.id, value);
    }
  }
}
