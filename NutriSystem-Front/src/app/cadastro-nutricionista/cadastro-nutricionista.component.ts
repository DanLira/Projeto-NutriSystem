import { Nutricionista } from './../model/nutricionista.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { NutricionistaService } from './nutricionista.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-cadastro-nutricionista',
  templateUrl: './cadastro-nutricionista.component.html',
  styleUrls: ['./cadastro-nutricionista.component.scss']
})
export class CadastroNutricionistaComponent implements OnInit {

  nutricionista: Nutricionista[];

  formsRegister: FormGroup;
  filterFormNutricionista: FormGroup;
  nutricionistaList: Nutricionista[];
  displayedColumns: string[] = ['nome', 'email', 'crn', 'action'];
  dataSource = new MatTableDataSource<Nutricionista>();
  todoDataSource: any[];
  @ViewChild('MatPaginator') MatPaginator: MatPaginator;



  constructor(private readonly _formBuilder: FormBuilder,
    private readonly _nutricionistaService: NutricionistaService, private readonly toastr: ToastrService) { }

  ngOnInit() {
    this.dataSource.paginator = this.MatPaginator;
    this.formsRegister = this._formBuilder.group({
      id: [''],
      nome: [''],
      crn: [''],
      sexo: [''],
      email: ['']

    });

    this.filterFormNutricionista = this._formBuilder.group({
      nomeFilterCtrl: [''],
      emailFilterCtrl: [''],
      crnFilterCtrl: ['']
    });

  }
  saveNutricionista() {
    const nutricionista: Nutricionista = {
      id: this.formsRegister.value.id,
      nome: this.formsRegister.get('nome').value,
      email: this.formsRegister.get('email').value,
      sexo: this.formsRegister.get('sexo').value,
      crn: this.formsRegister.get('crn').value
    };

    this._nutricionistaService.saveNutricionista(nutricionista)
      .subscribe(nutricionistaSave => {
        //this.nutricionista = (!!nutricionistaSave) ? nutricionistaSave : [];
        //this.dataSource.data = nutricionistaSave;
        this.formsRegister.reset();
      });
    this.toastr.success('Nutriconista salvo com sucesso!', 'Salvar');


    //if (this.nutricionistaList.filter(x => x.email === this.formsRegister.get('email').value).length <= 0) {

   // } else {
    //  this.toastr.info('Este email já existe!', '');
   // }

  }

  clearNutricionista(): void {
    this.dataSource.data = this.nutricionistaList;
    this.formsRegister.value.id = null;
    this.formsRegister.reset();
    this.toastr.info('Campos limpos com sucesso!', 'Limpar');
  }

}
