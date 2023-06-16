import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-menu-inclusao",
    templateUrl: "./menu-inclusao.component.html",
    styleUrls: ["./menu-inclusao.component.css"],
})
export class MenuInclusaoComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {}

    irParaCriarMedico(): void {
        this.router.navigate(["/criarMedico"]);
    }
}
