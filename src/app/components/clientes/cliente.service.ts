import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cliente } from "./cliente";

@Injectable({
    providedIn: "root",
})
export class ClienteService {
    private readonly API = "http://127.0.0.1:8080/agendamentos/api/";
    constructor(private http: HttpClient) {}

    buscarClientes(): Observable<Cliente[]> {
        const url = `${this.API}cliente`;
        return this.http.get<Cliente[]>(url);
    }

    criar(cliente: Cliente): Observable<Cliente> {
        const url = `${this.API}cliente`;
        return this.http.post<Cliente>(url, cliente);
    }
}
