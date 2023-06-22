import { Especialidade } from "./especialidades/especialidade";
import { Medico } from "./medico";

export interface MedicoEspecialidade {
    id?: number;
    especialidade: Especialidade;
    medico: Medico;
    dataCriacao?: Date;
    dataExclusao?: Date;
}
