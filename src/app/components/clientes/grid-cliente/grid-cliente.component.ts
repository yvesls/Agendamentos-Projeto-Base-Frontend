import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente';
import { FiltroCliente } from './filtro-cliente';

@Component({
  selector: 'app-grid-cliente',
  templateUrl: './grid-cliente.component.html',
  styleUrls: ['./grid-cliente.component.css']
})
export class GridClienteComponent implements OnInit {
  formulario!: FormGroup;
  filtro!: FiltroCliente;
  totalPages!: number;
  page : number = 1 ;
  pageSize : number = 10;
  listaClientes!: Cliente[];
  inativoE: string = "Inativo";

  constructor(private formBuilder: FormBuilder, private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
        nome: [""],
        sexo: [""],
        cpf: [""],
        dataCriacaoInicio: [""],
        dataCriacaoFim: [""],
        telefone: [""],
        email: [""],
        pageSize: [this.pageSize],
        page: [this.page],
    });
    this.pesquisarCliente(this.page);
  }

  pesquisarCliente(paginaAtual: number) {
    this.formulario.controls["page"].setValue(paginaAtual);
    this.filtro = this.formulario.getRawValue();
    if(this.filtro.sexo == "") {
      delete this.filtro.sexo;
    }
    this.clienteService.filtrarClientes(this.filtro).subscribe((listaClientes) => {
      this.listaClientes = listaClientes;
    });
    if(paginaAtual == 1)
      this.buscarQuantidadeFiltro(this.filtro);
  }

  buscarQuantidadeFiltro(filtro: FiltroCliente) {
    this.clienteService.buscarQuantidade(filtro).subscribe((quantidade) => {
      this.totalPages = quantidade;
    });
  }

  exibirAtivoInativo(dataExclusao: Date | undefined): boolean {
      if(dataExclusao == null){
        return true;
      }
      return false;
  }

  limparCampos() {
    this.formulario.controls["nome"].setValue("");
    this.formulario.controls["sexo"].setValue("");
    this.formulario.controls["cpf"].setValue("");
    this.formulario.controls["telefone"].setValue("");
    this.formulario.controls["email"].setValue("");
    this.formulario.controls["dataCriacaoInicio"].setValue("");
    this.formulario.controls["dataCriacaoFim"].setValue("");
  }

}
