import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroNutricionistaComponent } from './cadastro-nutricionista/cadastro-nutricionista.component';
import { CadastroPacienteComponent } from './cadastro-paciente/cadastro-paciente.component';
import { CadastroConsultorioComponent } from './cadastro-consultorio/cadastro-consultorio.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';


const routes: Routes = [

    {
        path: 'home',
        component: AppComponent
    },

    {
        path: 'login',
        component: LoginComponent
    },

    {
        path: 'cadastroNutricionista',
        component: CadastroNutricionistaComponent,
    },

    {
        path: 'cadastroPaciente',
        component: CadastroPacienteComponent,
    },

    {
        path: 'cadastroConsultorio',
        component: CadastroConsultorioComponent
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
