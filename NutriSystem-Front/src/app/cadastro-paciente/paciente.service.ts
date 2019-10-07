import { Paciente } from './../model/paciente.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

   readonly apiUrl = 'https://localhost:44372/Paciente'

  constructor(private readonly _http: HttpClient) { }

    getAllPaciente() {
        return this._http.get<Paciente[]>(this.apiUrl + '/GetAll');
    }
    getPacienteById(idPaciente: string): Observable<any> {
        return this._http.get(this.apiUrl + '/Paciente/?id=' + idPaciente);
    }
    savePaciente(paciente: Paciente): Observable<any> {
        return this._http.post(this.apiUrl + '/Paciente/Create', paciente);
    }
    editPaciente(paciente: Paciente): Observable<any> {
        return this._http.put(this.apiUrl + '/Paciente/Update' + paciente.id, paciente);
    }
    deletePaciente(idPaciente: string): Observable<any> {
        return this._http.delete(this.apiUrl + '/Paciente/Delete/?id=' + idPaciente);
    }

}
