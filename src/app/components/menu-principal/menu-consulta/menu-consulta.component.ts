import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-consulta',
  templateUrl: './menu-consulta.component.html',
  styleUrls: ['./menu-consulta.component.css']
})
export class MenuConsultaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  irParaGridCliente() {
    this.router.navigate(["/gridCliente"]);
  }
}
