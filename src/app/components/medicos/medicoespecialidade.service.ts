import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MedicoEspecialidade } from "./medicoEspecialidade";
import { Observable } from "rxjs";
import { MedicoEspecialidadeFilter } from "./medicoEspecialidadeFilter";

@Injectable({
    providedIn: "root",
})
export class MedicoespecialidadeService {
    private readonly API = "http://127.0.0.1:8080/agendamentos/api/";
    constructor(private http: HttpClient) {}

    buscarMedicoEspecialidades(): Observable<MedicoEspecialidade[]> {
        const url = `${this.API}medicoespecialidade`;
        return this.http.get<MedicoEspecialidade[]>(url);
    }
    criar(medicoEspecialidade: MedicoEspecialidade): Observable<MedicoEspecialidade> {
        const url = `${this.API}medicoespecialidade`;
        return this.http.post<MedicoEspecialidade>(url, medicoEspecialidade);
    }

    buscar(filter: MedicoEspecialidadeFilter): Observable<MedicoEspecialidade[]> {
        const url = `${this.API}medicoespecialidade/search`;
        return this.http.post<MedicoEspecialidade[]>(url, filter);
    }
}
