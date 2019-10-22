import { Time } from '@angular/common';

export interface Consultorio {

    id: number;
    nomeFantasia: string;
    razaoSocial: string;
    cnpj: string;
    endereco: string;
    numero: string;
    bairro: string;
    cep: string;
    cidade: string;
    uf: string;
    pais: string;
    email: string;
    telefone: string;
    celular: string;
    whatsapp: string;
    instagram: string;
    facebook: string;
    horaAbertura: Time;
    horaFechamento: Time;
}
