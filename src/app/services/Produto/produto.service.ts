import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable , Subject } from 'rxjs';
import { Produto } from '../../../models/Produto/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiURL = 'http://localhost:5197/api/v1/Produto';
  private produtoAdicionado = new Subject<Produto>();
  private produtoParaEditar = new BehaviorSubject<Produto | null>(null);
  

  constructor(private http: HttpClient) { }

  getProdutos() : Observable<Produto[]>{
    return this.http.get<Produto[]>(this.apiURL)
  }

  addProduto(produto: Produto) : Observable<Produto>{
    return this.http.post<Produto>(`${this.apiURL}`, produto)
  }
 
  updateProduto(produto: Produto) : Observable<Produto>{
    return this.http.put<Produto>(`${this.apiURL}`, produto)
  }

  deleteProduto(produto: Produto): Observable<Produto>{
    return this.http.delete<Produto>(`${this.apiURL}/${produto.id}`); 
  }

}
