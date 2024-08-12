import { Routes } from '@angular/router';
import { LoginComponent } from './conponents/login/login.component';
import { LayoutComponent } from './conponents/layout/layout.component';
import { HomeComponent } from './conponents/home/home.component';
import { ProdutoComponent } from './conponents/produto/produto.component';

export const routes: Routes = [
    {path:'login', 
      component:LoginComponent
    },

    {
      path: 'home' ,component: LayoutComponent,
      children:[
        {path: '', component:HomeComponent},
        {path:"Produto", component:ProdutoComponent}
      ]
    },

    {
      path:'**', component:LoginComponent,
    },
    {
      path:'', component:LoginComponent,
    }
];
