import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consultorio } from '../model/consultorio.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultorioService {

    readonly apiUrl = 'https://localhost:44372/Consultorio'

    constructor(private readonly _http: HttpClient) { }
  
      getAllConsultorio(): Observable<any> {
          return this._http.get<Consultorio[]>(this.apiUrl + '/GetAll');
      }
      getConsultorioById(idConsultorio: string): Observable<any> {
          return this._http.get(this.apiUrl + '/Consultorio/?id=' + idConsultorio);
      }
      saveConsultorio(consultorio: Consultorio): Observable<any> {
          return this._http.post(this.apiUrl + '/Consultorio/Create', consultorio);
      }
      editConsultorio(consultorio: Consultorio): Observable<any> {
          return this._http.put(this.apiUrl + '/Consultorio/Update' + consultorio.id, consultorio);
      }
      deleteConsultorio(idConsultorio: number): Observable<any> {
          return this._http.delete(this.apiUrl + '/Consultorio/Delete/?id=' + idConsultorio);
      }

}
