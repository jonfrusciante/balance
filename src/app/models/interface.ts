export interface User {
  email: string,
  provider: number,
  name?: string,
  providerId?: string,
  providerUid?: string,
  photoURL?: string
}

export interface Leito {
  patient_id: string,
  internacao_id: string,
  status: string,
}

export interface Internacao {
  convenio: number;
  especialidade: string;
  pid: string,
  procedencia: string;
  tipo: string;
}

