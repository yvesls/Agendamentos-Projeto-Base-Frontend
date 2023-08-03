import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MenuPrincipalComponent } from "./components/menu-principal/menu-principal.component";
import { HomeComponent } from "./components/home/home.component";
import { MenuConsultaComponent } from "./components/menu-principal/menu-consulta/menu-consulta.component";
import { MenuInclusaoComponent } from "./components/menu-principal/menu-inclusao/menu-inclusao.component";
import { CriarMedicoComponent } from "./components/medicos/criar-medico/criar-medico.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CriarEspecialidadeComponent } from "./components/medicos/especialidades/criar-especialidade/criar-especialidade.component";
import { CriarClienteComponent } from "./components/clientes/criar-cliente/criar-cliente.component";
import { CriarAgendamentoComponent } from "./components/agendamentos/criar-agendamento/criar-agendamento.component";
import { MensagemSucessoComponent } from "./components/mensagem-sucesso/mensagem-sucesso.component";
import { MensagemErroComponent } from "./components/mensagem-erro/mensagem-erro.component";
import { GridClienteComponent } from './components/clientes/grid-cliente/grid-cliente.component';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
    declarations: [AppComponent, MenuPrincipalComponent, HomeComponent, MenuConsultaComponent, MenuInclusaoComponent, CriarMedicoComponent, CriarEspecialidadeComponent, CriarClienteComponent, CriarAgendamentoComponent, MensagemSucessoComponent, MensagemErroComponent, GridClienteComponent],
    imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, ReactiveFormsModule, NgxPaginationModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
