import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "app-mensagem-sucesso",
    templateUrl: "./mensagem-sucesso.component.html",
    styleUrls: ["./mensagem-sucesso.component.css"],
})
export class MensagemSucessoComponent implements OnInit {
    caminho?: string | null;
    constructor(private router: Router, private route: ActivatedRoute) {
        this.route.params.subscribe((params) => (this.caminho = params["rota"]));
    }

    ngOnInit(): void {}

    irPara(): void {
        this.router.navigate(["/" + this.caminho]);
    }
}
