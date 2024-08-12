import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/Produto/produto.service';
import { Produto } from '../../../models/Produto/Produto';
import { CommonModule } from '@angular/common';
import { Departamento } from '../../../models/Departamento/Departamento';
import { FormsModule, NgForm } from '@angular/forms';
import { DepartamentoService } from '../../services/Departamento/departamento.service';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.css'
})
export class ProdutoComponent implements OnInit{

  produtos: Produto[] = [];
  
  departamentos: Departamento[] = [];
  
  produto: Produto = {
    codigo: '',
    descricao: '',
    departamentoId: 0,
    preco: 0,
    status: true
  };

  isEditMode = false;
  alertMessage: string = '';
  alertType: string = '';
  formInvalid = false; 
  constructor(private produtoService:ProdutoService, private departamentoService:DepartamentoService){}


ngOnInit(): void {
  this.departamentoService.getDepartamentos().subscribe((dadoDepartamento) =>{
    this.departamentos = dadoDepartamento;
    console.log(dadoDepartamento);
  })

  this.buscaProduto();
}

getDepartamentoNome(departamentoId: number): string {
  const departamento = this.departamentos.find(dep => dep.id === departamentoId);
  return departamento ? departamento.descricao : 'Desconhecido';
}

onBuscarProdutos():void{
  this.produtoService.getProdutos().subscribe((dadoAPI) =>{
    this.produtos = dadoAPI;
  })
}

 onDeleteProduto(produto: Produto): void {
     if (produto.id !== undefined) {
       this.produtoService.deleteProduto(produto).subscribe(() => {
         this.produtos = this.produtos.filter((p) => p.id !== produto.id);
       });
       this.showAlert('Produto Excluido com Sucesso.', 'success');    
     } else {   
       this.showAlert('Não é possível excluir o produto.', 'danger');
     }
  }

  onEditarProduto(produto: Produto) {
  this.produto = { ...produto };
  this.isEditMode = true;
  }

  onCriarProduto(form: NgForm) {
    if (form.valid) {
      if(!this.isEditMode){

        this.produtoService.addProduto(this.produto).subscribe({
          next: (response) => {
            this.buscaProduto();
            form.resetForm();          
            this.showAlert('Produto criado com sucesso.', 'success');            
          },
          error: (error) => {      
            this.showAlert('Erro ao criar produto: '  + error, 'danger'); 
          }
        });

      }else{

        this.produtoService.updateProduto(this.produto).subscribe({
          next: (response) =>{
            form.resetForm();         
            this.showAlert('Produto editado com sucesso.', 'success');   
            this.isEditMode = false; 
            this.atualixarTabela(response);                     
          },
          error: (error) => {               
            this.showAlert('Erro ao editar produto: '  + error, 'danger'); 
          }
        });
      }    
    } else {  
      this.showAlert('Formulário inválido, por favor preencha todos os campos.', 'danger'); 
    }
  }

  atualixarTabela(produto:Produto){
    const index = this.produtos.findIndex(p => p.id === this.produto.id);
    if (index !== -1) {
      this.produtos[index] = { ...produto };
    }
    this.showAlert('Produto editado com sucesso.', 'success');   
  }

  showAlert(message: string, type: string) {
    
    this.alertMessage = message;
    this.alertType = type;
    this.formInvalid = true;
  }

  closeAlert(): void {
    this.formInvalid = false;
  }
  

  buscaProduto() : void {
    this.produtoService.getProdutos().subscribe((dadoAPI) =>{
      this.produtos = dadoAPI; 
    })  
  }

}
