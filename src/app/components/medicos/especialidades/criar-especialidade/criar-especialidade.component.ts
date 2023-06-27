import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Especialidade } from "./../especialidade";
import { Component, OnInit } from "@angular/core";
import { EspecialidadeService } from "../especialidade.service";
import { Rota } from "src/app/components/rota";

@Component({
    selector: "app-criar-especialidade",
    templateUrl: "./criar-especialidade.component.html",
    styleUrls: ["./criar-especialidade.component.css"],
})
export class CriarEspecialidadeComponent implements OnInit {
    formulario!: FormGroup;
    especialidade: Especialidade = {
        descricao: undefined,
    };
    rota?: Rota;

    constructor(private especialidadeService: EspecialidadeService, private formBuilder: FormBuilder, private router: Router) {}

    ngOnInit(): void {
        this.formulario = this.formBuilder.group({
            descricao: ["", Validators.compose([Validators.required, Validators.pattern(/(.|\s)*\S(.|\s)*/)])],
        });
    }

    criarEspecialidade() {
        if (this.formulario.valid) {
            this.defineEspecialidade();
            this.especialidadeService.criar(this.especialidade).subscribe((especialidadeSalva) => {
                this.rota = {
                    caminho: "criarEspecialidade",
                };
                if (especialidadeSalva != null) {
                    this.router.navigateByUrl("/sucesso/" + this.rota.caminho);
                } else {
                    this.router.navigateByUrl("/erro/" + this.rota.caminho);
                }
            });
        }
    }

    defineEspecialidade() {
        this.especialidade.descricao = this.formulario.get("descricao")?.value;
    }

    limparCampos() {
        this.formulario.controls["descricao"].setValue("");
    }
}
