import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Especialidade } from "./../especialidade";
import { Component, OnInit } from "@angular/core";
import { EspecialidadeService } from "../especialidade.service";

@Component({
    selector: "app-criar-especialidade",
    templateUrl: "./criar-especialidade.component.html",
    styleUrls: ["./criar-especialidade.component.css"],
})
export class CriarEspecialidadeComponent implements OnInit {
    formulario!: FormGroup;

    constructor(private service: EspecialidadeService, private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.formulario = this.formBuilder.group({
            descricao: ["", Validators.compose([Validators.required, Validators.pattern(/(.|\s)*\S(.|\s)*/)])],
        });
    }

    criarEspecialidade() {
        if (this.formulario.valid) {
        }
    }

    limparCampos() {
        this.formulario.controls["descricao"].setValue("");
    }
}
