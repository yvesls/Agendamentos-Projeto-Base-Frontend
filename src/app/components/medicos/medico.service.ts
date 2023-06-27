import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Especialidade } from "./especialidades/especialidade";
import { Observable } from "rxjs";
import { Medico } from "./medico";

@Injectable({
    providedIn: "root",
})
export class MedicoService {
    private readonly API = "http://127.0.0.1:8080/agendamentos/api/";
    constructor(private http: HttpClient) {}

    buscarMedicos(): Observable<Medico[]> {
        const url = `${this.API}medico`;
        return this.http.get<Medico[]>(url);
    }

    criar(medico: Medico): Observable<Medico> {
        const url = `${this.API}medico`;
        return this.http.post<Medico>(url, medico);
    }
}
