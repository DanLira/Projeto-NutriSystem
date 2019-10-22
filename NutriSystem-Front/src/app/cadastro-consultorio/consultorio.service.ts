import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consultorio } from '../model/consultorio.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultorioService {

    readonly apiUrl = 'https://localhost:44372/Consultorio';

    constructor(private readonly _http: HttpClient) { }

      getAllPaciente(): Observable<any> {
          return this._http.get<Consultorio[]>(this.apiUrl + '/GetAll');
      }
      getPacienteById(idPaciente: string): Observable<any> {
          return this._http.get(this.apiUrl + '/Paciente/?id=' + idPaciente);
      }
      savePaciente(paciente: Consultorio): Observable<any> {
          return this._http.post(this.apiUrl + '/Consultorio/Create', paciente);
      }
      editPaciente(consultorio: Consultorio): Observable<any> {
          return this._http.put(this.apiUrl + '/Consultorio/Update' + consultorio.id, consultorio);
      }
      deletePaciente(idPaciente: string): Observable<any> {
          return this._http.delete(this.apiUrl + '/Consultorio/Delete/?id=' + idPaciente);
      }

}
