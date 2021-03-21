import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HijoI } from '../model/hijo';
import { GLOBAL } from './urlglobal';

@Injectable({
  providedIn: 'root'
})
export class HijoService {

  url: string;

  constructor( private httpsc: HttpClient ) {  this.url = GLOBAL.url; }

  gethijos(): Observable<any> {
    return this.httpsc.get(this.url + '/api/hijo');
  }
  gethijo(id: string): Observable<HijoI> {
    return this.httpsc.get<HijoI>(this.url + '/api/hijo/'+ id);
  }
  gethijoByIdPersona(id: string): Observable<Array<HijoI>> {
    return this.httpsc.get<Array<HijoI>>(this.url + '/api/hijo/persona/'+ id);
  }
  savehijo(ghijos: HijoI): Observable<HijoI> {
    return this.httpsc.post<HijoI>(this.url + '/api/hijo', ghijos);
  }
  updatehijo(ghijos: HijoI, idhijo: string): Observable<any> {
    return this.httpsc.patch(this.url + '/api/hijo/' + idhijo, ghijos);
  }
  deletehijo(idhijo: string): Observable<any> {
    return this.httpsc.delete(this.url + '/api/hijo/' + idhijo);
  }
}
