import { Paciente } from './../model/paciente.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { MarcarConsultaService } from './marcar-consulta.service';
import { PacienteService } from '../cadastro-paciente/paciente.service';
import { Consulta } from '../model/consulta.model';

@Component({
  selector: 'app-marcar-consulta',
  templateUrl: './marcar-consulta.component.html',
  styleUrls: ['./marcar-consulta.component.scss']
})
export class MarcarConsultaComponent implements OnInit {
  consulta: Consulta[];

  formsRegister: FormGroup;
  filterFormConsulta: FormGroup;
  pacienteList: Paciente[];
  consultaList: Consulta[];
  dataSourcePaciente = new MatTableDataSource<Paciente>();
  //todoDataSource: any[];
  displayedColumns: string[] = ['nome', 'dataConsulta', 'status', 'action'];
  dataSource = new MatTableDataSource<Consulta>();
  todoDataSource: any[];
  @ViewChild('MatPaginator') MatPaginator: MatPaginator;

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _marcarConsultaService: MarcarConsultaService,
              private readonly _pacienteService: PacienteService,
              private readonly toastr: ToastrService) { }

  ngOnInit() {
    this.dataSource.paginator = this.MatPaginator;
    this.formsRegister = this._formBuilder.group({
      consultaId: [''],
      dataConsulta: [''],
      horaConsulta: [''],
      statusConsulta: [''],
      pacienteId: [''],
      nutricionistaId: [''],
      consultorioId: ['']

    });

    this._pacienteService.getAllPaciente()
        .subscribe((pacientes: Paciente[]) => {
          this.pacienteList = (!!pacientes) ? pacientes : [];
          this.dataSourcePaciente.data = [...this.pacienteList];
      });

    this.filterFormConsulta = this._formBuilder.group({
        nomePacienteFilterCtrl: [''],
        dataConsultaFilterCtrl: [''],
        statusConsultaFilterCtrl: ['']
        });
    }

    agendarConsulta() {
      const consulta: Consulta = {
        consultaId: this.formsRegister.value.id,
        pacienteId: this.formsRegister.get('pacienteId').value,
        nutricionistaId: this.formsRegister.get('nutricionistaId').value,
        statusConsulta: this.formsRegister.get('statusConsulta').value,
        horaConsulta: this.formsRegister.get('horaConsulta').value,
        consultorioId: this.formsRegister.get('consultorioId').value,
        dataConsulta: (this.formsRegister.get('dataConsulta').value).toLocaleDateString('pt-BR')
      };
      if (!!this.formsRegister.value.id) {
          this._marcarConsultaService.editConsulta(consulta)
          .subscribe(() =>
            this._marcarConsultaService.getAllConsulta().subscribe(consultaEdit => {
              this.consulta = (!!consultaEdit) ? consultaEdit : [];
              this.dataSource.data = consultaEdit;
              this.consultaList = this.dataSource.data;
              this.formsRegister.reset();
            }));
          this.toastr.success('Consulta editado com sucesso!', 'Editar');
      } else {
          if (this.consultaList.filter(x =>
             x.horaConsulta === this.formsRegister.get('horaConsulta').value
              && x.statusConsulta === this.formsRegister.get('statusConsulta').value)) {
            this._marcarConsultaService.agendarConsulta(consulta)
              .subscribe(() => this._marcarConsultaService.getAllConsulta().subscribe(consultaSave => {
                this.consulta = (!!consultaSave) ? consultaSave : [];
                this.dataSource.data = consultaSave;
                this.consultaList = this.dataSource.data;
                this.formsRegister.reset();
                this.toastr.success('Consulta marcada com sucesso!', 'Salvar');
              }));
          } else {
            this.toastr.info('Horário não disponivel!', '');
          }
      }
    }

    getRowTableConsulta(value: any): void {
      this.formsRegister.get('id').setValue(value.idPaciente);
      this.formsRegister.get('nome').setValue(value.Nome);
      this.formsRegister.get('email').setValue(value.Email);
      this.formsRegister.get('sexo').setValue(value.Sexo);
      this.formsRegister.get('cpf').setValue(value.Cpf);
      this.formsRegister.get('dataNascimento').setValue(value.dataNascimento);
      this.formsRegister.get('celular').setValue(value.Celular);
      }
    
  //   clearPaciente(): void {
  //     this.dataSource.data = this.pacienteList;
  //     this.formsRegister.value.id = null;
  //     this.formsRegister.reset();
  //     this.toastr.info('Campos limpos com sucesso!', 'Limpar');
  //   }
  // deletePaciente(idPaciente: number): void {
  //   this._pacienteService.deletePaciente(idPaciente)
  //   .subscribe(() => this._pacienteService.getAllPaciente()
  //   .subscribe((paciente: any) => {
  //     this.pacienteList = (!!paciente) ? paciente : [];
  //     this.dataSource.data = this.pacienteList;
  //   }));
  //   this.toastr.success('Paciente deletado com sucesso!', 'Deletar');
  // }
  // filterTabelaPaciente(): void {
  //   let filteredTable: Paciente[] = this.pacienteList;
  //   if (!this.filterFormPaciente.value.nomeFilterCtrl) {
  //     this.dataSource.data = [...this.pacienteList];
  //   }
  //   if (this.filterFormPaciente.value.nomeFilterCtrl) {
  //     filteredTable = filteredTable.filter
  //     ( x =>
  //       x.nome.toUpperCase().includes(this.filterFormPaciente.value.nomeFilterCtrl.toUpperCase())
  //     );
  //    }
  //   if (this.filterFormPaciente.value.cpfFilterCtrl) {
  //       filteredTable = filteredTable.filter
  //       ( x =>
  //         x.cpf.toUpperCase().includes(this.filterFormPaciente.value.cpfFilterCtrl.toUpperCase())
  //       );
  //   }
  //   this.dataSource.data = filteredTable;
  // }

  }
