import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departamento } from '../../../models/Departamento/Departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private apiURL = 'http://localhost:5197/api/v1/Departamento';

  constructor(private http: HttpClient) { }

  getDepartamentos() : Observable<Departamento[]>{
    return this.http.get<Departamento[]>(this.apiURL)
  }

}
