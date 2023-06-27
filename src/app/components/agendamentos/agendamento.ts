import { Cliente } from "../clientes/cliente";
import { MedicoEspecialidade } from "../medicos/medicoEspecialidade";

export interface Agendamento {
    id?: number;
    cliente?: Cliente;
    medicoEspecialidade?: MedicoEspecialidade;
    dataCriacao?: Date;
    dataCancelamento?: Date;
    dataConsulta?: Date;
    valor?: number;
    status?: String;
}
