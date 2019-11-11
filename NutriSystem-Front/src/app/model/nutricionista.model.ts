
export interface Nutricionista {
    idNutricionista: number;
    nome: string;
    sexo: string;
    crn: string;
    email: string;
    tipoAtendimento?: boolean;
    senha: string;
    confirmarSenha: string;
    nutPediatrica: boolean;
    nutClinica: boolean;
    nutHospitalar: boolean;
    nutAmbulatorial: boolean;
    nutDomiciliar: boolean;
    nutConsultoria: boolean;
    nutEsportiva: boolean;
    nutGastronomica: boolean;
  }
