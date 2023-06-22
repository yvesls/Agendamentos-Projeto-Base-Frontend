import { Especialidade } from "./../especialidades/especialidade";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MedicoService } from "../medico.service";
import { EspecialidadeService } from "../especialidades/especialidade.service";

@Component({
    selector: "app-criar-medico",
    templateUrl: "./criar-medico.component.html",
    styleUrls: ["./criar-medico.component.css"],
})
export class CriarMedicoComponent implements OnInit {
    formulario!: FormGroup;
    listaEspecialidades: Especialidade[] = [];
    especialidadesIsExibida: boolean = false;
    especialidadesSelecionadas: Especialidade[] = [];
    especialidadesSelecionadasDescricao: string = "";

    constructor(private medicoService: MedicoService, private especialidadeService: EspecialidadeService, private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.formulario = this.formBuilder.group({
            nome: ["", Validators.compose([Validators.required, Validators.pattern(/(.|\s)*\S(.|\s)*/)])],
            sexo: ["", Validators.compose([Validators.required])],
            cpf: ["", Validators.compose([Validators.required, Validators.minLength(14), Validators.maxLength(14)])],
            dataNascimento: ["", [Validators.required]],
            peso: ["", Validators.compose([Validators.required, Validators.min(0), Validators.max(500)])],
            altura: ["", Validators.compose([Validators.required, Validators.min(0), Validators.max(2.5)])],
            crm: ["", Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(9)])],
            especialidades: ["", [Validators.required]],
        });
        this.especialidadeService.buscarEspecialidades().subscribe((listaEspecialidades) => {
            this.listaEspecialidades = listaEspecialidades;
        });
    }

    criarMedico() {
        if (this.formulario.valid) {
        }
    }

    exibirEspecialidades() {
        this.especialidadesIsExibida = true;
    }

    ocultarEspecialidades() {
        this.especialidadesIsExibida = false;
    }

    togleExibirEspecialidades() {
        if (this.especialidadesIsExibida) {
            return "exibir-especialidades";
        }
        return "ocultar-especialidades";
    }

    adicionarEspecialidadeSelecionada(especialidade: Especialidade) {
        let virgula = ", ";
        if (this.especialidadesSelecionadas.length == 0) {
            virgula = "";
        }
        this.especialidadesSelecionadas.push(especialidade);
        this.especialidadesSelecionadasDescricao += virgula + especialidade.descricao;
        this.formulario.controls["especialidades"].setValue(this.especialidadesSelecionadasDescricao);
        /*
        console.log(this.formulario.get("especialidades")?.errors);
        console.log(this.formulario.get("nome")?.errors);
        console.log(this.formulario.get("sexo")?.errors);
        console.log(this.formulario.get("cpf")?.errors);
        console.log(this.formulario.get("crm")?.errors);
        console.log(this.formulario.get("altura")?.errors);
        console.log(this.formulario.get("peso")?.errors);
        console.log(this.formulario.get("dataNascimento")?.errors);
        */
    }

    limparCampos() {
        this.formulario.controls["especialidades"].setValue("");
        this.formulario.controls["nome"].setValue("");
        this.formulario.controls["sexo"].setValue("");
        this.formulario.controls["cpf"].setValue("");
        this.formulario.controls["crm"].setValue("");
        this.formulario.controls["altura"].setValue("");
        this.formulario.controls["peso"].setValue("");
        this.formulario.controls["dataNascimento"].setValue("");
    }
}
