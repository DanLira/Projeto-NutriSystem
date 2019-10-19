import { Consultorio } from './../model/consultorio.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ConsultorioService } from './consultorio.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-cadastro-consultorio',
  templateUrl: './cadastro-consultorio.component.html',
  styleUrls: ['./cadastro-consultorio.component.scss']
})
export class CadastroConsultorioComponent implements OnInit {

  consultorio: Consultorio[];

  formsRegister: FormGroup;
  filterFormConsultorio: FormGroup;
  consultorioList: Consultorio[];
  displayedColumns: string[] = [
    'nomeFantasia', 'razaoSocial', 'cnpj', 'endereco', 'numero', 'bairro', 'cep', 'cidade', 'uf', 'pais', 'email',
    'telefone', 'celular', 'whatsapp', 'instagram', 'facebook', 'horaAbertura', 'horaFechamento', 'action'];
  dataSource = new MatTableDataSource<Consultorio>();
  todoDataSource: any[];
  @ViewChild('MatPaginator') MatPaginator: MatPaginator;


  router: Router;
  constructor(http: HttpClient, router: Router, private readonly _formBuilder: FormBuilder,
    private readonly _consultorioService: ConsultorioService, private readonly toastr: ToastrService) { }

  ngOnInit() {
    this.dataSource.paginator = this.MatPaginator;
    this.formsRegister = this._formBuilder.group({
      id: [''],
      nomeFantasia: [''],
      razaoSocial: [''],
      cnpj: [''],
      endereco: [''],
      numero: [''],
      bairro: [''],
      cep: [''],
      cidade: [''],
      uf: [''],
      pais: [''],
      email: [''],
      telefone: [''],
      celular: [''],
      whatsapp: [''],
      instagram: [''],
      facebook: ['']

    });

    this.filterFormConsultorio = this._formBuilder.group({
      nomeFantasiaFilterCtrl: [''],
      razaoSocialFilterCtrl: [''],
      cnpjFilterCtrl: [''],
      enderecoFilterCtrl: [''],
      numeroFilterCtrl: [''],
      bairroFilterCtrl: [''],
      cepFilterCtrl: [''],
      cidadeFilterCtrl: [''],
      ufFilterCtrl: [''],
      paisFilterCtrl: [''],
      emailFilterCtrl: [''],
      telefoneFilterCtrl: [''],
      celularFilterCtrl: [''],
      whatsappFilterCtrl: [''],
      instagramFilterCtrl: [''],
      facebookFilterCtrl: [''],
      horaAberturaFilterCtrl: [''],
      horaFechamentoFilterCtrl: ['']
    });

  }
  saveConsultorio() {
    const consultorio: Consultorio = {
      id: this.formsRegister.value.id,
      nomeFantasia: this.formsRegister.get('nomeFantasia').value,
      razaoSocial: this.formsRegister.get('razaoSocial').value,
      cnpj: this.formsRegister.get('cnpj').value,
      endereco: this.formsRegister.get('endereco').value,
      numero: this.formsRegister.get('numero').value,
      bairro: this.formsRegister.get('bairro').value,
      cep: this.formsRegister.get('cep').value,
      cidade: this.formsRegister.get('cidade').value,
      uf: this.formsRegister.get('uf').value,
      pais: this.formsRegister.get('pais').value,
      email: this.formsRegister.get('email').value,
      telefone: this.formsRegister.get('telefone').value,
      celular: this.formsRegister.get('celular').value,
      whatsapp: this.formsRegister.get('whatsapp').value,
      instagram: this.formsRegister.get('instagram').value,
      facebook: this.formsRegister.get('facebook').value,
      horaAbertura: this.formsRegister.get('horaAbertura').value,
      horaFechamento: this.formsRegister.get('horaFechamento').value,
    };

    this._consultorioService.saveConsultorio(consultorio)
      .subscribe(nutricionistaSave => {
        this.formsRegister.reset();
      });
    this.toastr.success('Consultorio salvo com sucesso!', 'Salvar');
    this.router.navigate(['/', 'home']);
  }

  clearConsultorio(): void {
    this.dataSource.data = this.consultorioList;
    this.formsRegister.value.id = null;
    this.formsRegister.reset();
    this.toastr.info('Campos limpos com sucesso!', 'Limpar');
  }
  deleteConsultorio(idConsultorio: number): void {
    this._consultorioService.deleteConsultorio(idConsultorio)
      .subscribe(() => this._consultorioService.getAllConsultorio()
        .subscribe((consultorio: any) => {
          this.consultorioList = (!!consultorio) ? consultorio : [];
          this.dataSource.data = this.consultorioList;
        }));
    this.toastr.success('Consultório deletado com sucesso!', 'Deletar');
  }

}
