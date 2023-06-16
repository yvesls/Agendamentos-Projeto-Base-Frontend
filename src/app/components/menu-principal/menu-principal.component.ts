import { Component, OnInit } from "@angular/core";
import { Route, Router } from "@angular/router";

@Component({
    selector: "app-menu-principal",
    templateUrl: "./menu-principal.component.html",
    styleUrls: ["./menu-principal.component.css"],
})
export class MenuPrincipalComponent implements OnInit {
    constructor(private router: Router) {}
    isExibidoConsulta: boolean = false;
    isExibidoInclusao: boolean = false;

    ngOnInit(): void {}

    exibirMenubarConsulta(): boolean {
        if (this.isExibidoConsulta) {
            this.isExibidoConsulta = false;
            return false;
        }
        this.isExibidoConsulta = true;
        return true;
    }

    exibirMenubarInclusao(): boolean {
        if (this.isExibidoInclusao) {
            this.isExibidoInclusao = false;
            return false;
        }
        this.isExibidoInclusao = true;
        return true;
    }

    habilitarClasseMenubarConsulta(): string {
        if (this.isExibidoConsulta) {
            return "exibir-menubar-consulta";
        }
        return "esconder-menubar-consulta";
    }

    habilitarClasseMenubarInclusao(): string {
        if (this.isExibidoInclusao) {
            return "exibir-menubar-inclusao";
        }
        return "esconder-menubar-inclusao";
    }

    irParaHome(): void {
        this.router.navigate(["/home"]);
    }
}
