import { Component, OnInit } from "@angular/core";
import { ClienteService } from "../cliente.service";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Rota } from "../../rota";
import { Cliente } from "../cliente";
import { Telefone } from "../telefone";

@Component({
    selector: "app-criar-cliente",
    templateUrl: "./criar-cliente.component.html",
    styleUrls: ["./criar-cliente.component.css"],
})
export class CriarClienteComponent implements OnInit {
    formulario!: FormGroup;
    rota?: Rota;
    telefoneForm!: FormGroup;
    emailForm!: FormGroup;
    cliente: Cliente = {
        id: undefined,
        pessoa: {
            nome: "",
            sexo: "",
            cpf: "",
            dataNascimento: undefined,
            peso: undefined,
            altura: undefined,
        },
        telefones: [],
        emails: [],
        dataCriacao: undefined,
        dataExclusao: undefined,
    };

    constructor(private clienteService: ClienteService, private formBuilder: FormBuilder, private router: Router) {}

    ngOnInit(): void {
        this.formulario = this.formBuilder.group({
            nome: ["", Validators.compose([Validators.required, Validators.pattern(/(.|\s)*\S(.|\s)*/)])],
            sexo: ["", Validators.compose([Validators.required])],
            cpf: ["", Validators.compose([Validators.required, Validators.minLength(14), Validators.maxLength(14)])],
            dataNascimento: ["", [Validators.required]],
            peso: ["", Validators.compose([Validators.required, Validators.min(0), Validators.max(500)])],
            altura: ["", Validators.compose([Validators.required, Validators.min(0), Validators.max(2.5)])],
            telefones: [""],
            emails: [""],
        });
        this.telefoneForm = this.formBuilder.group({
            telefones: this.formBuilder.array([]),
        });
        this.emailForm = this.formBuilder.group({
            emails: this.formBuilder.array([]),
        });
    }

    criarCliente() {
        if (this.formulario.valid) {
            this.defineCliente();
            console.log(this.cliente);
            this.clienteService.criar(this.cliente).subscribe((clienteSalvo) => {
                this.rota = {
                    caminho: "criarCliente",
                };
                if (clienteSalvo != null) {
                    this.router.navigateByUrl("/sucesso/" + this.rota.caminho);
                } else {
                    this.router.navigateByUrl("/erro/" + this.rota.caminho);
                }
            });
        }
    }

    defineCliente() {
        this.cliente.telefones = this.telefones.value;
        this.cliente.emails = this.emails.value;
        this.cliente.pessoa.nome = this.formulario.get("nome")?.value;
        this.cliente.pessoa.sexo = this.formulario.get("sexo")?.value.toUpperCase();
        this.cliente.pessoa.cpf = this.formulario.get("cpf")?.value;
        this.cliente.pessoa.dataNascimento = this.formulario.get("dataNascimento")?.value.substring(0, 10).concat("T00:00:00");
        this.cliente.pessoa.altura = this.formulario.get("altura")?.value;
        this.cliente.pessoa.peso = this.formulario.get("peso")?.value;
    }

    get telefones(): FormArray {
        return this.telefoneForm?.get("telefones") as FormArray;
    }

    get emails(): FormArray {
        return this.emailForm?.get("emails") as FormArray;
    }

    adicionarTelefone(): void {
        const telefoneGroup = this.formBuilder.group({
            numTelefone: "",
        });
        this.telefones.push(telefoneGroup);
    }

    adicionarEmail(): void {
        const emailGroup = this.formBuilder.group({
            enderecoEmail: "",
        });
        this.emails.push(emailGroup);
    }

    removerTelefone(index: number): void {
        if (index >= 0 && index < this.telefones.length) {
            this.telefones.removeAt(index);
        }
    }

    removerEmail(index: number): void {
        if (index >= 0 && index < this.emails.length) {
            this.emails.removeAt(index);
        }
    }

    limparCampos() {
        this.formulario.controls["nome"].setValue("");
        this.formulario.controls["sexo"].setValue("");
        this.formulario.controls["cpf"].setValue("");
        this.formulario.controls["telefones"].setValue("");
        this.formulario.controls["emails"].setValue("");
        this.formulario.controls["altura"].setValue("");
        this.formulario.controls["peso"].setValue("");
        this.formulario.controls["dataNascimento"].setValue("");
    }
}
