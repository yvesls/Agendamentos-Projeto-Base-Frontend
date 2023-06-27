import { Email } from "./email";
import { Telefone } from "./telefone";

export interface Cliente {
    id?: number;
    pessoa: {
        id?: number;
        nome?: string;
        sexo?: string;
        cpf?: string;
        dataNascimento?: Date;
        peso?: number;
        altura?: number;
    };
    emails?: Email[];
    telefones?: Telefone[];
    dataCriacao?: Date;
    dataExclusao?: Date;
}
