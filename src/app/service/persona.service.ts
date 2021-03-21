import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonaI } from '../model/persona';
import { GLOBAL } from './urlglobal';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  url: string;

  constructor( private httpsc: HttpClient ) {  this.url = GLOBAL.url; }

  getpersonas(): Observable<Array<PersonaI>> {
    return this.httpsc.get<Array<PersonaI>>(this.url + '/api/persona');
  }
  getpersona(idpersona: string): Observable<PersonaI> {
    return this.httpsc.get<PersonaI>(this.url + '/api/persona' + idpersona);
  }
  savepersona(gpersona: PersonaI): Observable<PersonaI> {
    return this.httpsc.post<PersonaI>(this.url + '/api/persona', gpersona);
  }
  updatepersona(gpersona: PersonaI, idpersona: string): Observable<any> {
    return this.httpsc.patch(this.url + '/api/persona/' + idpersona, gpersona);
  }
  deletepersona(idpersona: string): Observable<any> {
    return this.httpsc.delete(this.url + '/api/persona/' + idpersona);
  }
}
