export interface Medico {
    id: number;
    pessoa: {
        id?: number;
        nome?: string;
        sexo?: string;
        cpf?: string;
        dataNascimento?: Date;
        peso?: number;
        altura?: number;
    };
    crm?: string;
    dataCriacao?: Date;
    dataExclusao?: Date;
}
