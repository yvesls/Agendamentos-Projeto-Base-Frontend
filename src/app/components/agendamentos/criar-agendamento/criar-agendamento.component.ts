import { MedicoespecialidadeService } from "./../../medicos/medicoespecialidade.service";
import { MedicoEspecialidade } from "./../../medicos/medicoEspecialidade";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Cliente } from "../../clientes/cliente";
import { AgendamentoService } from "../agendamento.service";
import { ClienteService } from "../../clientes/cliente.service";
import { Medico } from "../../medicos/medico";
import { MedicoService } from "../../medicos/medico.service";

@Component({
    selector: "app-criar-agendamento",
    templateUrl: "./criar-agendamento.component.html",
    styleUrls: ["./criar-agendamento.component.css"],
})
export class CriarAgendamentoComponent implements OnInit {
    formulario!: FormGroup;
    listaMedicos: Medico[] = [];
    listaClientes: Cliente[] = [];

    constructor(private agendamentoService: AgendamentoService, private medicoService: MedicoService, private clienteService: ClienteService, private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.formulario = this.formBuilder.group({
            valor: ["", Validators.compose([Validators.required, Validators.min(0), Validators.max(100000)])],
            medico: ["", Validators.compose([Validators.required])],
            cliente: ["", Validators.required],
            dataConsulta: ["", [Validators.required]],
            status: ["ABERTA"],
        });
        this.medicoService.buscarMedicos().subscribe((listaMedicos) => {
            this.listaMedicos = listaMedicos;
        });
        this.clienteService.buscarClientes().subscribe((listaClientes) => {
            this.listaClientes = listaClientes;
        });
    }

    criarAgendamento() {
        if (this.formulario.valid) {
        }
    }

    limparCampos() {
        this.formulario.controls["valor"].setValue("");
        this.formulario.controls["medicoEspecialidade"].setValue("");
        this.formulario.controls["cliente"].setValue("");
        this.formulario.controls["dataConsulta"].setValue("");
        this.formulario.controls["status"].setValue("");
    }
}
