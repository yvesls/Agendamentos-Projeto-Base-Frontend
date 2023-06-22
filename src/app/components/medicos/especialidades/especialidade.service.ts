import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Especialidade } from "./especialidade";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class EspecialidadeService {
    private readonly API = "http://127.0.0.1:8080/agendamentos/api/";
    constructor(private http: HttpClient) {}

    buscarEspecialidades(): Observable<Especialidade[]> {
        const url = `${this.API}especialidade`;
        return this.http.get<Especialidade[]>(url);
    }
}
