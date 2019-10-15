import { async } from '@angular/core/testing';
import { Paciente } from './../model/paciente.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

   readonly apiUrl = 'https://localhost:44372'

  constructor(private readonly _http: HttpClient) { }

    getAllPaciente() {
        return this._http.get<Paciente[]>(this.apiUrl + '/Paciente/GetAll');
    }
    getPacienteById(idPaciente: string): Observable<any> {
        return this._http.get(this.apiUrl + '/Paciente/?id=' + idPaciente);
    }
    savePaciente(paciente: Paciente) {
        $.ajax({
            type: "POST",
            url: this.apiUrl + '/Paciente/Create',
            content: "application/json; charset=utf-8",
            dataType: "json",
            data: paciente,
            error: function (xhr, textStatus, errorThrown) {
            }
        });


        return this._http.post(this.apiUrl + '/Paciente/Create', paciente);
    }
    editPaciente(paciente: Paciente): Observable<any> {
        return this._http.put(this.apiUrl + '/Paciente/Update' + paciente.id, paciente);
    }
    deletePaciente(idPaciente: number): Observable<any> {
        let responseDelete;
        $.ajax({
            type: "POST",
            url: this.apiUrl + '/Paciente/Delete',
            content: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            data: {id : idPaciente},
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
