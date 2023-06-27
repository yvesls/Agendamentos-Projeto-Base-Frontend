import { MedicoespecialidadeService } from "./../../medicos/medicoespecialidade.service";
import { MedicoEspecialidade } from "./../../medicos/medicoEspecialidade";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Cliente } from "../../clientes/cliente";
import { AgendamentoService } from "../agendamento.service";
import { ClienteService } from "../../clientes/cliente.service";
import { Medico } from "../../medicos/medico";
import { MedicoService } from "../../medicos/medico.service";
import { Router } from "@angular/router";
import { Rota } from "../../rota";
import { Agendamento } from "../agendamento";
@Component({
    selector: "app-criar-agendamento",
    templateUrl: "./criar-agendamento.component.html",
    styleUrls: ["./criar-agendamento.component.css"],
})
export class CriarAgendamentoComponent implements OnInit {
    formulario!: FormGroup;
    listaMedicoEspecialidades: MedicoEspecialidade[] = [];
    listaClientes: Cliente[] = [];
    medicoEspecialidadeSelecionado?: MedicoEspecialidade;
    clienteSelecionado?: Cliente;
    agendamento: Agendamento = {};
    rota?: Rota;

    constructor(private agendamentoService: AgendamentoService, private medicoService: MedicoService, private clienteService: ClienteService, private formBuilder: FormBuilder, private router: Router, private medicoEspecialidadeService: MedicoespecialidadeService) {}

    ngOnInit(): void {
        this.formulario = this.formBuilder.group({
            valor: ["", Validators.compose([Validators.required, Validators.min(0), Validators.max(100000)])],
            medico: ["", [Validators.required]],
            cliente: ["", Validators.required],
            dataConsulta: ["", [Validators.required]],
            status: ["ABERTA"],
        });
        this.medicoEspecialidadeService.buscarMedicoEspecialidades().subscribe((listaMedicoEspecialidades) => {
            this.listaMedicoEspecialidades = listaMedicoEspecialidades;
        });
        this.clienteService.buscarClientes().subscribe((listaClientes) => {
            this.listaClientes = listaClientes;
        });
    }

    criarAgendamento() {
        if (this.formulario.valid) {
            this.defineAgendamento();
            console.log(this.agendamento);
            this.agendamentoService.criar(this.agendamento).subscribe((especialidadeSalva) => {
                this.rota = {
                    caminho: "criarAgendamento",
                };
                if (especialidadeSalva != null) {
                    this.router.navigateByUrl("/sucesso/" + this.rota.caminho);
                } else {
                    this.router.navigateByUrl("/erro/" + this.rota.caminho);
                }
            });
        }
    }

    defineAgendamento() {
        this.agendamento.medicoEspecialidade = this.medicoEspecialidadeSelecionado;
        this.agendamento.cliente = this.clienteSelecionado;
        this.agendamento.valor = this.formulario.get("valor")?.value;
        this.agendamento.status = this.formulario.get("status")?.value.toUpperCase();
        this.agendamento.dataConsulta = this.formulario.get("dataConsulta")?.value.substring(0, 10).concat("T00:00:00");
    }

    limparCampos() {
        this.formulario.controls["valor"].setValue("");
        this.formulario.controls["medico"].setValue("");
        this.formulario.controls["cliente"].setValue("");
        this.formulario.controls["dataConsulta"].setValue("");
        this.formulario.controls["status"].setValue("");
    }

    capturarMedicoEspecialidade(): void {
        let medicoEspecialidadeForm = this.formulario.get("medico")?.value;
        this.medicoEspecialidadeSelecionado = this.listaMedicoEspecialidades.find((medicoEspecialidade) => {
            return medicoEspecialidade.medico?.pessoa?.nome === medicoEspecialidadeForm;
        });
    }

    capturarCliente(): void {
        let clienteForm = this.formulario.get("cliente")?.value;
        this.clienteSelecionado = this.listaClientes.find((cliente) => {
            return cliente.pessoa?.nome === clienteForm;
        });
    }
}
