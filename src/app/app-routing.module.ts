import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { CriarMedicoComponent } from "./components/medicos/criar-medico/criar-medico.component";
import { CriarEspecialidadeComponent } from "./components/medicos/especialidades/criar-especialidade/criar-especialidade.component";
import { CriarClienteComponent } from "./components/clientes/criar-cliente/criar-cliente.component";
import { CriarAgendamentoComponent } from "./components/agendamentos/criar-agendamento/criar-agendamento.component";
import { MensagemSucessoComponent } from "./components/mensagem-sucesso/mensagem-sucesso.component";
import { MensagemErroComponent } from "./components/mensagem-erro/mensagem-erro.component";
import { GridClienteComponent } from "./components/clientes/grid-cliente/grid-cliente.component";

const routes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
    },
    {
        path: "home",
        component: HomeComponent,
    },
    {
        path: "criarMedico",
        component: CriarMedicoComponent,
    },
    {
        path: "criarEspecialidade",
        component: CriarEspecialidadeComponent,
    },
    {
        path: "criarCliente",
        component: CriarClienteComponent,
    },
    {
        path: "gridCliente",
        component: GridClienteComponent,
    },
    {
        path: "criarAgendamento",
        component: CriarAgendamentoComponent,
    },
    {
        path: "sucesso/:rota",
        component: MensagemSucessoComponent,
    },
    {
        path: "erro",
        component: MensagemErroComponent,
    },
    {
        path: "erro/:rota",
        component: MensagemErroComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
