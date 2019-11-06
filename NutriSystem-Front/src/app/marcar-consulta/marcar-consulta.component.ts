import { NutricionistaService } from './../cadastro-nutricionista/nutricionista.service';
import { Nutricionista } from './../model/nutricionista.model';
import { Paciente } from './../model/paciente.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { MarcarConsultaService } from './marcar-consulta.service';
import { PacienteService } from '../cadastro-paciente/paciente.service';
import { Consulta } from '../model/consulta.model';
import { ConsultorioService } from '../cadastro-consultorio/consultorio.service';
import { Consultorio } from '../model/consultorio.model';

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
  nutricionistaList: Nutricionista[];
  idConsultorio: number;
  consultorioList: Consultorio[];
  dataSourcePaciente = new MatTableDataSource<Paciente>();
  dataSourceConsultorio = new MatTableDataSource<Consultorio>();
  dataSourceNutricionista = new MatTableDataSource<Nutricionista>();
  displayedColumns: string[] = ['dataConsulta', 'horaConsulta', 'status', 'action'];
  dataSource = new MatTableDataSource<Consulta>();
  todoDataSource: any[];
  @ViewChild('MatPaginator') MatPaginator: MatPaginator;

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _marcarConsultaService: MarcarConsultaService,
              private readonly _nutricionistaService: NutricionistaService,
              private readonly _pacienteService: PacienteService,
              private readonly _consultorioService: ConsultorioService,
              private readonly toastr: ToastrService) { }

  ngOnInit() {
    this.dataSource.paginator = this.MatPaginator;
    this.formsRegister = this._formBuilder.group({
      idConsulta: [''],
      dataConsulta: [''],
      horaConsulta: [''],
      statusConsulta: [''],
      idPaciente: [''],
      idNutricionista: [''],
      idConsultorio: ['']

    });

    this._nutricionistaService.getAllNutricionista()
        .subscribe((nutricionistas: Nutricionista[]) => {
          this.nutricionistaList = (!!nutricionistas) ? nutricionistas : [];
          this.dataSourceNutricionista.data = [...this.nutricionistaList];
      });

    this._pacienteService.getAllPaciente()
        .subscribe((pacientes: Paciente[]) => {
          this.pacienteList = (!!pacientes) ? pacientes : [];
          this.dataSourcePaciente.data = [...this.pacienteList];
      });

    this._consultorioService.getAllConsultorio()
      .subscribe((consultorios: Consultorio[]) => {
        this.consultorioList = (!!consultorios) ? consultorios : [];
       });

    this.filterFormConsulta = this._formBuilder.group({
        nomePacienteFilterCtrl: [''],
        dataConsultaFilterCtrl: [''],
        statusConsultaFilterCtrl: ['']
        });
    }

    // getNutricionistas() {
    //   debugger;
    //   this.nutricionistaList = [];
    //   this._marcarConsultaService.getNutricionistas().subscribe((res: any[]) => {
    //     this.nutricionistaList = res;
    //   });


    agendarConsulta() {
      debugger;
      const consulta: Consulta = {
        idConsulta: this.formsRegister.value.id,
        idPaciente: this.formsRegister.get('idPaciente').value,
        idNutricionista: this.formsRegister.get('idNutricionista').value,
        statusConsulta: this.formsRegister.get('statusConsulta').value,
        horaConsulta: this.formsRegister.get('horaConsulta').value,
        idConsultorio: this.formsRegister.get('idConsultorio').value,
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
            this._marcarConsultaService.agendarConsulta(consulta)
              .subscribe(() => this._marcarConsultaService.getAllConsulta().subscribe(consultaSave => {
                this.consulta = (!!consultaSave) ? consultaSave : [];
                this.dataSource.data = consultaSave;
                this.consultaList = this.dataSource.data;
                this.formsRegister.reset();
                this.toastr.success('Consulta marcada com sucesso!', 'Salvar');
              }));
      }
    }

    // getRowTableConsulta(value: any): void {
    //   this.formsRegister.get('id').setValue(value.consultaId);
    //   this.formsRegister.get('nome').setValue(value.Nome);
    //   this.formsRegister.get('email').setValue(value.Email);
    //   this.formsRegister.get('sexo').setValue(value.Sexo);
    //   this.formsRegister.get('cpf').setValue(value.Cpf);
    //   this.formsRegister.get('dataNascimento').setValue(value.dataNascimento);
    //   this.formsRegister.get('celular').setValue(value.Celular);

    //   this.formsRegister.value.id,
    //     this.formsRegister.get('idPaciente').value,
    //     idNutricionista: this.formsRegister.get('idNutricionista').value,
    //     statusConsulta: this.formsRegister.get('statusConsulta').value,
    //     horaConsulta: this.formsRegister.get('horaConsulta').value,
    //     idConsultorio: this.formsRegister.get('idConsultorio').value,
    //     dataConsulta: (this.formsRegister.get('dataConsulta').value).toLocaleDateString('pt-BR')
    //   }

    clearConsulta(): void {
      this.dataSource.data = this.consultaList;
      this.formsRegister.value.id = null;
      this.formsRegister.reset();
      this.toastr.info('Campos limpos com sucesso!', 'Limpar');
    }
  deleteConsulta(consultaId: number): void {
    this._marcarConsultaService.deleteConsulta(consultaId)
    .subscribe(() => this._marcarConsultaService.getAllConsulta()
    .subscribe((consulta: any) => {
      this.pacienteList = (!!consulta) ? consulta : [];
      this.dataSource.data = this.consultaList;
    }));
    this.toastr.success('Consulta deletado com sucesso!', 'Deletar');
  }
  filterTabelaConsulta(): void {
    let filteredTable: Consulta[] = this.consultaList;
    if (!this.filterFormConsulta.value.dataConsultaFilterCtrl
       && !this.filterFormConsulta.value.statusConsultaFilterCtrl && !
       this.filterFormConsulta.value.horaConsultaFilterCtrl) {
      this.dataSource.data = [...this.consultaList];
    }
    if (this.filterFormConsulta.value.nomePacienteFilterCtrl) {
      filteredTable = filteredTable.filter
      ( x =>
        x.dataConsulta.toUpperCase().includes(this.filterFormConsulta.value.dataConsultaFilterCtrl.toUpperCase())
      );
     }
    if (this.filterFormConsulta.value.statusConsultaFilterCtrl) {
        filteredTable = filteredTable.filter
        ( x =>
          x.statusConsulta.toUpperCase().includes(this.filterFormConsulta.value.statusConsultaFilterCtrl.toUpperCase())
        );
    }
    if (this.filterFormConsulta.value.horaConsultaFilterCtrl) {
      filteredTable = filteredTable.filter
      ( x =>
        x.horaConsulta.toUpperCase().includes(this.filterFormConsulta.value.horaConsultaFilterCtrl.toUpperCase())
      );
  }
    this.dataSource.data = filteredTable;
  }

  }
