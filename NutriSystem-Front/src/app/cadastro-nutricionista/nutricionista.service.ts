import { async } from '@angular/core/testing';
import { Nutricionista } from './../model/nutricionista.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class NutricionistaService {

   readonly apiUrl = 'https://localhost:44372'

  constructor(private readonly _http: HttpClient) { }

    getAllNutricionista() {
        return this._http.get<Nutricionista[]>(this.apiUrl + '/Nutricionista/GetAll');
    }
    getNutricionistaById(idNutricionista: string): Observable<any> {
        return this._http.get(this.apiUrl + '/Nutricionista/?id=' + idNutricionista);
    }
    saveNutricionista(nutricionista: Nutricionista) {
        $.ajax({
            type: "POST",
            url: this.apiUrl + '/Nutricionista/Create',
            content: "application/json; charset=utf-8",
            dataType: "json",
            data: nutricionista,
            error: function (xhr, textStatus, errorThrown) {
            }
        });


        return this._http.post(this.apiUrl + '/Nutricionista/Create', nutricionista);
    }
    editNutricionista(nutricionista: Nutricionista): Observable<any> {
        return this._http.put(this.apiUrl + '/Nutricinonista/Update' + nutricionista.id, nutricionista);
    }
    deleteNutricionista(idNutricinoista: number): Observable<any> {
        let responseDelete;
        $.ajax({
            type: "POST",
            url: this.apiUrl + '/Nutricionista/Delete',
            content: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            data: {id : idNutricinoista},
            success: function (response) {
                responseDelete =  response;
            },
            error: function (xhr, textStatus, errorThrown) {
                responseDelete = textStatus;
            }
        });
        return responseDelete;
    }

}
