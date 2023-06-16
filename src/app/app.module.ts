import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MenuPrincipalComponent } from "./components/menu-principal/menu-principal.component";
import { HomeComponent } from "./components/home/home.component";
import { MenuConsultaComponent } from "./components/menu-principal/menu-consulta/menu-consulta.component";
import { MenuInclusaoComponent } from "./components/menu-principal/menu-inclusao/menu-inclusao.component";
import { CriarMedicoComponent } from "./components/criar/criar-medico/criar-medico.component";

@NgModule({
    declarations: [AppComponent, MenuPrincipalComponent, HomeComponent, MenuConsultaComponent, MenuInclusaoComponent, CriarMedicoComponent],
    imports: [BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
