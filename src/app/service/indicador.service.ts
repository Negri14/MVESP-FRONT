import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Indicador } from '../dto/indicador.response';

@Injectable({
  providedIn: 'root'
})
export class IndicadorService {

  constructor(private http: HttpClient) { }

  obterListaIndicadoresMapa() : Observable<Array<Indicador>> {
    return this.http.get<Array<Indicador>>('https://mvesp.herokuapp.com/listaIndicadoresMapa');
  }

  obterListaIndicadores() : Observable<Array<Indicador>> {
    return this.http.get<Array<Indicador>>('https://mvesp.herokuapp.com/listaIndicadores');
  }
}
