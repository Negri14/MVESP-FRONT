import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Municipio } from '../dto/municipio.response';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  constructor(private http: HttpClient) { }

  obterMunicipios() : Observable<Array<Municipio>> {
    return this.http.get<Array<Municipio>>('https://mvesp.herokuapp.com/listaMunicipios');
  }

}
