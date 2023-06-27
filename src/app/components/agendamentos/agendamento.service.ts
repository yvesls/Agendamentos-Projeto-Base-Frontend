import { Injectable } from "@angular/core";
import { Agendamento } from "./agendamento";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class AgendamentoService {
    private readonly API = "http://127.0.0.1:8080/agendamentos/api/";
    constructor(private http: HttpClient) {}

    criar(agendamento: Agendamento): Observable<Agendamento> {
        const url = `${this.API}consulta`;
        return this.http.post<Agendamento>(url, agendamento);
    }
}
