import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';

type TagSeverity = 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast';

interface Nucleus {
  id: string;
  codigo: string;
  nome: string;
  descricao: string;
  situacaoGeografica: string;
  areaTotalM2: number | null;
  perimetroM: number | null;
  poligonalGeorreferenciada: string;
  centroide: string;
  consolidado: boolean;
  dataOcupacaoInicial: Date | null;
  numeroFamiliasEstimado: number | null;
  municipioId: string;
  criadoPor: string;
  criadoEm: Date;
  atualizadoPor: string;
  atualizadoEm: Date | null;
}

type NucleusFormModel = Omit<Nucleus, 'criadoEm' | 'atualizadoEm'>;

@Component({
  selector: 'app-nucleus',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TagModule,
    DialogModule,
    InputTextModule,
    TextareaModule,
    InputNumberModule,
    DatePickerModule,
    CheckboxModule,
  ],
  templateUrl: './nucleus.component.html',
  styleUrl: './nucleus.component.scss',
})
export class NucleusComponent {
  readonly rowSizeOptions = [
    { label: '10 linhas', value: 10 },
    { label: '20 linhas', value: 20 },
    { label: '50 linhas', value: 50 },
    { label: '100 linhas', value: 100 },
  ];

  readonly situacaoOptions = [
    { label: 'Perímetro urbano', value: 'Perímetro urbano' },
    { label: 'Zona de expansão urbana', value: 'Zona de expansão urbana' },
    { label: 'Área consolidada', value: 'Área consolidada' },
    { label: 'Área de interesse social', value: 'Área de interesse social' },
    { label: 'Faixa de proteção ambiental', value: 'Faixa de proteção ambiental' },
  ];

  nuclei: Nucleus[] = this.buildInitialNuclei();
  selectedNucleus: Nucleus | null = this.nuclei[0] ?? null;

  rows = 10;
  currentPage = 1;

  isFormDialogVisible = false;
  isDeleteDialogVisible = false;
  isEditing = false;

  formModel: NucleusFormModel = this.createEmptyForm();
  nucleusPendingDelete: Nucleus | null = null;

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.nuclei.length / this.rows));
  }

  get paginatedNuclei(): Nucleus[] {
    const start = (this.currentPage - 1) * this.rows;
    return this.nuclei.slice(start, start + this.rows);
  }

  get pageStart(): number {
    if (this.nuclei.length === 0) {
      return 0;
    }

    return (this.currentPage - 1) * this.rows + 1;
  }

  get pageEnd(): number {
    return Math.min(this.currentPage * this.rows, this.nuclei.length);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  get dialogTitle(): string {
    return this.isEditing ? 'Editar núcleo urbano' : 'Cadastrar núcleo urbano';
  }

  onRowsChange(rows: number): void {
    this.rows = Number(rows);
    this.currentPage = 1;
  }

  goToPage(page: number): void {
    this.currentPage = Math.min(Math.max(page, 1), this.totalPages);
  }

  openCreateDialog(): void {
    this.isEditing = false;
    this.formModel = this.createEmptyForm();
    this.isFormDialogVisible = true;
  }

  openEditDialog(nucleus: Nucleus): void {
    this.isEditing = true;
    this.formModel = {
      id: nucleus.id,
      codigo: nucleus.codigo,
      nome: nucleus.nome,
      descricao: nucleus.descricao,
      situacaoGeografica: nucleus.situacaoGeografica,
      areaTotalM2: nucleus.areaTotalM2,
      perimetroM: nucleus.perimetroM,
      poligonalGeorreferenciada: nucleus.poligonalGeorreferenciada,
      centroide: nucleus.centroide,
      consolidado: nucleus.consolidado,
      dataOcupacaoInicial: nucleus.dataOcupacaoInicial ? new Date(nucleus.dataOcupacaoInicial) : null,
      numeroFamiliasEstimado: nucleus.numeroFamiliasEstimado,
      municipioId: nucleus.municipioId,
      criadoPor: nucleus.criadoPor,
      atualizadoPor: nucleus.atualizadoPor,
    };
    this.isFormDialogVisible = true;
  }

  openDeleteDialog(nucleus: Nucleus): void {
    this.nucleusPendingDelete = nucleus;
    this.isDeleteDialogVisible = true;
  }

  saveNucleus(): void {
    const now = new Date();

    if (this.isEditing) {
      this.nuclei = this.nuclei.map((nucleus) =>
        nucleus.id === this.formModel.id
          ? {
              ...nucleus,
              ...this.formModel,
              dataOcupacaoInicial: this.cloneDate(this.formModel.dataOcupacaoInicial),
              atualizadoEm: now,
              atualizadoPor: this.formModel.atualizadoPor || this.formModel.criadoPor,
            }
          : nucleus,
      );
    } else {
      const newNucleus: Nucleus = {
        ...this.formModel,
        id: this.formModel.id || this.generateUuid(),
        dataOcupacaoInicial: this.cloneDate(this.formModel.dataOcupacaoInicial),
        criadoEm: now,
        atualizadoEm: null,
      };
      this.nuclei = [newNucleus, ...this.nuclei];
      this.selectedNucleus = newNucleus;
    }

    const refreshedSelection = this.nuclei.find((nucleus) => nucleus.id === this.formModel.id);
    if (refreshedSelection) {
      this.selectedNucleus = refreshedSelection;
    }

    this.isFormDialogVisible = false;
  }

  confirmDelete(): void {
    if (!this.nucleusPendingDelete) {
      return;
    }

    const deletedId = this.nucleusPendingDelete.id;
    this.nuclei = this.nuclei.filter((nucleus) => nucleus.id !== deletedId);

    if (this.selectedNucleus?.id === deletedId) {
      this.selectedNucleus = this.nuclei[0] ?? null;
    }

    this.nucleusPendingDelete = null;
    this.isDeleteDialogVisible = false;
    this.currentPage = Math.min(this.currentPage, this.totalPages);
  }

  selectNucleus(nucleus: Nucleus): void {
    this.selectedNucleus = nucleus;
  }

  getConsolidadoSeverity(value: boolean): TagSeverity {
    return value ? 'success' : 'warn';
  }

  getAreaLabel(areaTotalM2: number | null): string {
    if (!areaTotalM2) {
      return 'Não informada';
    }

    return `${(areaTotalM2 / 10000).toLocaleString('pt-BR', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })} ha`;
  }

  getPerimetroLabel(perimetroM: number | null): string {
    if (!perimetroM) {
      return 'Não informado';
    }

    return `${perimetroM.toLocaleString('pt-BR', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })} m`;
  }

  getDateLabel(value: Date | null): string {
    return value ? new Intl.DateTimeFormat('pt-BR').format(value) : 'Não informada';
  }

  private createEmptyForm(): NucleusFormModel {
    return {
      id: '',
      codigo: '',
      nome: '',
      descricao: '',
      situacaoGeografica: '',
      areaTotalM2: null,
      perimetroM: null,
      poligonalGeorreferenciada: '',
      centroide: '',
      consolidado: false,
      dataOcupacaoInicial: null,
      numeroFamiliasEstimado: null,
      municipioId: '',
      criadoPor: '',
      atualizadoPor: '',
    };
  }

  private cloneDate(value: Date | null): Date | null {
    return value ? new Date(value) : null;
  }

  private buildInitialNuclei(): Nucleus[] {
    return [
      {
        id: 'f6b14f2f-9c78-44c2-8c4d-b9ec89b6df75',
        codigo: 'NUC-001',
        nome: 'Vila Nova Esperança',
        descricao: 'Núcleo com ocupação consolidada em área urbana, com demanda prioritária de infraestrutura.',
        situacaoGeografica: 'Perímetro urbano',
        areaTotalM2: 152340.58,
        perimetroM: 1934.11,
        poligonalGeorreferenciada: 'POLYGON((-48.489 -1.452,-48.487 -1.451,-48.485 -1.454,-48.489 -1.452))',
        centroide: 'POINT(-48.487 -1.452)',
        consolidado: true,
        dataOcupacaoInicial: new Date('2007-03-15'),
        numeroFamiliasEstimado: 318,
        municipioId: '1ddae6e2-5f62-4caf-b19e-35b4f3ae9a82',
        criadoPor: '8fe8cde6-8d07-4615-9d50-5f446dce42fb',
        criadoEm: new Date('2025-01-12T10:30:00'),
        atualizadoPor: '8fe8cde6-8d07-4615-9d50-5f446dce42fb',
        atualizadoEm: new Date('2025-02-04T15:10:00'),
      },
      {
        id: '4a0ed74b-c8e8-4da4-8c9a-df9e7d6cb129',
        codigo: 'NUC-002',
        nome: 'Jardim Primavera II',
        descricao: 'Área em expansão urbana com necessidade de atualização perimetral e cadastro social.',
        situacaoGeografica: 'Zona de expansão urbana',
        areaTotalM2: 98421.9,
        perimetroM: 1410.65,
        poligonalGeorreferenciada: 'POLYGON((-48.501 -1.461,-48.498 -1.459,-48.495 -1.462,-48.501 -1.461))',
        centroide: 'POINT(-48.498 -1.461)',
        consolidado: false,
        dataOcupacaoInicial: new Date('2012-08-09'),
        numeroFamiliasEstimado: 204,
        municipioId: 'f9e0c0b7-a84b-4b62-82e9-11db5f8bd4c8',
        criadoPor: '392b8b6f-4d66-49fb-bfe7-6d979b2693b5',
        criadoEm: new Date('2025-01-18T09:00:00'),
        atualizadoPor: '392b8b6f-4d66-49fb-bfe7-6d979b2693b5',
        atualizadoEm: new Date('2025-02-11T13:40:00'),
      },
      {
        id: '6db66f96-2a69-4e85-8c5f-33d9bfcb6bf6',
        codigo: 'NUC-003',
        nome: 'Santa Luzia',
        descricao: 'Núcleo com levantamento topográfico concluído e pendência documental dos ocupantes.',
        situacaoGeografica: 'Área consolidada',
        areaTotalM2: 231220.25,
        perimetroM: 2205.48,
        poligonalGeorreferenciada: 'POLYGON((-48.472 -1.447,-48.469 -1.446,-48.466 -1.449,-48.472 -1.447))',
        centroide: 'POINT(-48.469 -1.447)',
        consolidado: true,
        dataOcupacaoInicial: new Date('1999-11-20'),
        numeroFamiliasEstimado: 421,
        municipioId: '491df8bf-d994-43d8-91cb-7da59276aa1e',
        criadoPor: '9b5f2cb6-c5f7-4daa-a986-eb2f56db4f45',
        criadoEm: new Date('2025-02-02T11:25:00'),
        atualizadoPor: '9b5f2cb6-c5f7-4daa-a986-eb2f56db4f45',
        atualizadoEm: new Date('2025-02-20T16:20:00'),
      },
      {
        id: '17f2ac58-6a4f-4f04-a360-80d3d97153f5',
        codigo: 'NUC-004',
        nome: 'Comunidade Boa Vista',
        descricao: 'Área com restrições ambientais e necessidade de compatibilização do polígono.',
        situacaoGeografica: 'Faixa de proteção ambiental',
        areaTotalM2: 73455.12,
        perimetroM: 1172.31,
        poligonalGeorreferenciada: 'POLYGON((-48.512 -1.469,-48.509 -1.468,-48.507 -1.471,-48.512 -1.469))',
        centroide: 'POINT(-48.509 -1.469)',
        consolidado: false,
        dataOcupacaoInicial: new Date('2016-01-14'),
        numeroFamiliasEstimado: 96,
        municipioId: '00d5c6e8-1574-4d3e-8eb9-67d72749be72',
        criadoPor: 'b35e3523-4eb3-45e3-a3ff-848b493c88d0',
        criadoEm: new Date('2025-02-10T08:50:00'),
        atualizadoPor: 'b35e3523-4eb3-45e3-a3ff-848b493c88d0',
        atualizadoEm: null,
      },
      {
        id: '958445fb-cfe8-45b0-a1b2-723ae7ad8a9d',
        codigo: 'NUC-005',
        nome: 'Residencial São João',
        descricao: 'Núcleo elegível para regularização com cadastro socioeconômico em andamento.',
        situacaoGeografica: 'Área de interesse social',
        areaTotalM2: 126000,
        perimetroM: 1688.43,
        poligonalGeorreferenciada: 'POLYGON((-48.482 -1.474,-48.479 -1.472,-48.477 -1.476,-48.482 -1.474))',
        centroide: 'POINT(-48.480 -1.474)',
        consolidado: true,
        dataOcupacaoInicial: new Date('2004-05-27'),
        numeroFamiliasEstimado: 287,
        municipioId: '6ee16939-a3df-4f9b-a958-64d5426fe970',
        criadoPor: 'defdc629-a0a9-47ff-a009-2b073fc6f213',
        criadoEm: new Date('2025-02-18T14:15:00'),
        atualizadoPor: 'defdc629-a0a9-47ff-a009-2b073fc6f213',
        atualizadoEm: new Date('2025-03-01T10:05:00'),
      },
      {
        id: 'dc52f2ad-0ca3-4196-8ee9-7344ca9f7500',
        codigo: 'NUC-006',
        nome: 'Parque das Mangueiras',
        descricao: 'Área com baixa densidade e necessidade de revisão cadastral do perímetro.',
        situacaoGeografica: 'Zona de expansão urbana',
        areaTotalM2: 189332.74,
        perimetroM: 2084.9,
        poligonalGeorreferenciada: 'POLYGON((-48.493 -1.438,-48.491 -1.436,-48.488 -1.439,-48.493 -1.438))',
        centroide: 'POINT(-48.491 -1.438)',
        consolidado: false,
        dataOcupacaoInicial: new Date('2018-07-03'),
        numeroFamiliasEstimado: 144,
        municipioId: '3ba45724-cf53-4c17-aaf7-677a81785933',
        criadoPor: '1af8e439-4cc6-4dfd-9ef1-6b6a3c955807',
        criadoEm: new Date('2025-03-07T12:10:00'),
        atualizadoPor: '1af8e439-4cc6-4dfd-9ef1-6b6a3c955807',
        atualizadoEm: null,
      },
    ];
  }

  private generateUuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
      const random = Math.floor(Math.random() * 16);
      const value = char === 'x' ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  }
}
