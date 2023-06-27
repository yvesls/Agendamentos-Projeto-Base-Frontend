import { Component, Injectable, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "app-mensagem-erro",
    templateUrl: "./mensagem-erro.component.html",
    styleUrls: ["./mensagem-erro.component.css"],
})
export class MensagemErroComponent implements OnInit {
    caminho?: string | null;
    constructor(private router: Router, private route: ActivatedRoute) {
        this.route.params.subscribe((params) => (this.caminho = params["rota"]));
    }

    ngOnInit(): void {}

    irPara(): void {
        this.router.navigate(["/" + this.caminho]);
    }
}
