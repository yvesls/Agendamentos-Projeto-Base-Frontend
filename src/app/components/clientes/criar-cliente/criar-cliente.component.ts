import { Component, OnInit } from "@angular/core";
import { ClienteService } from "../cliente.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-criar-cliente",
    templateUrl: "./criar-cliente.component.html",
    styleUrls: ["./criar-cliente.component.css"],
})
export class CriarClienteComponent implements OnInit {
    formulario!: FormGroup;
    constructor(private service: ClienteService, private formBuilder: FormBuilder) {}

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
    }

    criarCliente() {
        if (this.formulario.valid) {
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

    testeValidacao() {
        console.log(this.formulario.valid);
        console.log(this.formulario.get("telefones")?.errors);
        console.log(this.formulario.get("nome")?.errors);
        console.log(this.formulario.get("sexo")?.errors);
        console.log(this.formulario.get("cpf")?.errors);
        console.log(this.formulario.get("emails")?.errors);
        console.log(this.formulario.get("altura")?.errors);
        console.log(this.formulario.get("peso")?.errors);
        console.log(this.formulario.get("dataNascimento")?.errors);
    }
}
