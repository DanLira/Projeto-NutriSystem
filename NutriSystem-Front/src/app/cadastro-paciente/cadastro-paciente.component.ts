import { Paciente } from './../model/paciente.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { PacienteService } from './paciente.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.scss']
})
export class CadastroPacienteComponent implements OnInit {
  paciente: Paciente[];

  formsRegister: FormGroup;
  filterFormPaciente: FormGroup;
  pacienteList: Paciente[];
  displayedColumns: string[] = ['nome', 'email', 'cpf', 'action'];
  dataSource = new MatTableDataSource<Paciente>();
  todoDataSource: any[];
  @ViewChild('MatPaginator') MatPaginator: MatPaginator;

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _pacienteService: PacienteService,
              private readonly toastr: ToastrService) { }

  ngOnInit() {
    this.dataSource.paginator = this.MatPaginator;
    this.formsRegister = this._formBuilder.group({
    id: [''],
    nome: [''],
    cpf: [''],
    sexo: [''],
    email: [''],
    dataNascimento: [''],
    celular: ['']

    });

    this._pacienteService.getAllPaciente()
        .subscribe((pacientes: Paciente[]) => {
          this.pacienteList = (!!pacientes) ? pacientes : [];
          this.dataSource.data = [...this.pacienteList];
          console.log(this.dataSource.data);
      });
    this.filterFormPaciente = this._formBuilder.group({
        nomeFilterCtrl: [''],
        emailFilterCtrl: [''],
        cpfFilterCtrl: ['']
        });
    }
    savePaciente() {
      const paciente: Paciente = {
        idPaciente: this.formsRegister.value.id,
        nome: this.formsRegister.get('nome').value,
        email: this.formsRegister.get('email').value,
        sexo: this.formsRegister.get('sexo').value,
        cpf: this.formsRegister.get('cpf').value,
        celular: this.formsRegister.get('celular').value,
        dataNascimento: (this.formsRegister.get('dataNascimento').value).toLocaleDateString('pt-BR')
      };
      if (!!this.formsRegister.value.id) {
          this._pacienteService.editPaciente(paciente)
          .subscribe(() =>
            this._pacienteService.getAllPaciente().subscribe(pacienteEdit => {
              this.paciente = (!!pacienteEdit) ? pacienteEdit : [];
              this.dataSource.data = pacienteEdit;
              this.pacienteList = this.dataSource.data;
              this.formsRegister.reset();
            }));
          this.toastr.success('Paciente editado com sucesso!', 'Editar');
      } else {
          if (this.pacienteList.filter(x => x.email === this.formsRegister.get('email').value).length <= 0) {
            this._pacienteService.savePaciente(paciente)
              .subscribe(() => this._pacienteService.getAllPaciente().subscribe(pacienteSave => {
                this.paciente = (!!pacienteSave) ? pacienteSave : [];
                this.dataSource.data = pacienteSave;
                this.pacienteList = this.dataSource.data;
                this.formsRegister.reset();
              }));
            this.toastr.success('Paciente salvo com sucesso!', 'Salvar');
          } else {
            this.toastr.info('Este email já existe!', '');
          }
      }
    }
    getRowTablePaciente(value: any): void {
      this.formsRegister.get('id').setValue(value.idPaciente);
      this.formsRegister.get('nome').setValue(value.Nome);
      this.formsRegister.get('email').setValue(value.Email);
      this.formsRegister.get('sexo').setValue(value.Sexo);
      this.formsRegister.get('cpf').setValue(value.Cpf);
      this.formsRegister.get('dataNascimento').setValue(value.dataNascimento);
      this.formsRegister.get('celular').setValue(value.Celular);
      }
    clearPaciente(): void {
      this.dataSource.data = this.pacienteList;
      this.formsRegister.value.id = null;
      this.formsRegister.reset();
      this.toastr.info('Campos limpos com sucesso!', 'Limpar');
    }
  deletePaciente(idPaciente: number): void {
    this._pacienteService.deletePaciente(idPaciente)
    .subscribe(() => this._pacienteService.getAllPaciente()
    .subscribe((paciente: any) => {
      this.pacienteList = (!!paciente) ? paciente : [];
      this.dataSource.data = this.pacienteList;
    }));
    this.toastr.success('Paciente deletado com sucesso!', 'Deletar');
  }
  filterTabelaPaciente(): void {
    let filteredTable: Paciente[] = this.pacienteList;
    if (!this.filterFormPaciente.value.nomeFilterCtrl) {
      this.dataSource.data = [...this.pacienteList];
    }
    if (this.filterFormPaciente.value.nomeFilterCtrl) {
      filteredTable = filteredTable.filter
      ( x =>
        x.nome.toUpperCase().includes(this.filterFormPaciente.value.nomeFilterCtrl.toUpperCase())
      );
     }
    if (this.filterFormPaciente.value.cpfFilterCtrl) {
        filteredTable = filteredTable.filter
        ( x =>
          x.cpf.toUpperCase().includes(this.filterFormPaciente.value.cpfFilterCtrl.toUpperCase())
        );
    }
    this.dataSource.data = filteredTable;
  }

  }
