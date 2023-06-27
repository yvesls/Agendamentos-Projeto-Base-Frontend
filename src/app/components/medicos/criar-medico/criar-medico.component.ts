import { MensagemSucessoComponent } from "./../../mensagem-sucesso/mensagem-sucesso.component";
import { Medico } from "./../medico";
import { Especialidade } from "./../especialidades/especialidade";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MedicoService } from "../medico.service";
import { EspecialidadeService } from "../especialidades/especialidade.service";
import { MensagemErroComponent } from "../../mensagem-erro/mensagem-erro.component";
import { Router } from "@angular/router";
import { Rota } from "../../rota";
import { MedicoEspecialidade } from "../medicoEspecialidade";
import { MedicoespecialidadeService } from "../medicoespecialidade.service";

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
    medicoEspecialidadesSalvas: Especialidade[] = [];
    especialidadesSelecionadasDescricao: string = "";
    rota?: Rota;
    medico: Medico = {
        id: -1,
        crm: "",
        pessoa: {
            nome: "",
            sexo: "",
            cpf: "",
            dataNascimento: undefined,
            peso: undefined,
            altura: undefined,
        },
        dataCriacao: undefined,
        dataExclusao: undefined,
    };
    medicoEspecialidade: MedicoEspecialidade = {
        id: undefined,
        especialidade: undefined,
        medico: undefined,
        dataCriacao: undefined,
        dataExclusao: undefined,
    };

    constructor(private medicoService: MedicoService, private especialidadeService: EspecialidadeService, private medicoEspecialidadeService: MedicoespecialidadeService, private formBuilder: FormBuilder, private router: Router) {}

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
            this.defineMedico();
            this.medicoService.criar(this.medico).subscribe((medicoSalvo) => {
                this.rota = {
                    caminho: "criarMedico",
                };
                if (medicoSalvo != null) {
                    this.medico = medicoSalvo;
                    this.criarEspecialidadesParaMedico();
                } else {
                    this.router.navigateByUrl("/erro/" + this.rota.caminho);
                }
            });
        }
    }

    criarEspecialidadesParaMedico() {
        this.criarMedicoEspecialidades()
            .then((savedItems) => {
                console.log("Lista de itens salva com sucesso:", savedItems);
            })
            .catch((error) => {
                console.error("Erro ao salvar a lista de itens:", error);
            });
    }

    async criarMedicoEspecialidades(): Promise<MedicoEspecialidade[]> {
        return new Promise<any[]>((resolve, reject) => {
            let medicoEspecialidade;
            let savedItems: number = 0;
            let success: boolean = false;

            this.especialidadesSelecionadas.forEach((especialidades) => {
                medicoEspecialidade = this.defineMedicoEspecialidade(especialidades);

                this.medicoEspecialidadeService.criar(medicoEspecialidade).subscribe((medicoEspecialidadeSalvo) => {
                    this.medicoEspecialidadesSalvas.push(medicoEspecialidadeSalvo);
                    savedItems++;
                });
            });
            if (savedItems == this.medicoEspecialidadesSalvas.length) {
                success = true;
            }

            this.rota = {
                caminho: "criarMedico",
            };

            if (success) {
                this.router.navigateByUrl("/sucesso/" + this.rota.caminho);
                resolve(this.medicoEspecialidadesSalvas);
            } else {
                reject(this.router.navigateByUrl("/erro/" + this.rota.caminho));
            }
        });
    }

    defineMedico() {
        this.medico.crm = this.formulario.get("crm")?.value;
        this.medico.pessoa.nome = this.formulario.get("nome")?.value;
        this.medico.pessoa.sexo = this.formulario.get("sexo")?.value.toUpperCase();
        this.medico.pessoa.cpf = this.formulario.get("cpf")?.value;
        this.medico.pessoa.dataNascimento = this.formulario.get("dataNascimento")?.value.substring(0, 10).concat("T00:00:00");
        this.medico.pessoa.altura = this.formulario.get("altura")?.value;
        this.medico.pessoa.peso = this.formulario.get("peso")?.value;
    }

    defineMedicoEspecialidade(especialidade: Especialidade): MedicoEspecialidade {
        return {
            especialidade: especialidade,
            medico: this.medico,
        };
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
