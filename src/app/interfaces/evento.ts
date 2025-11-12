import { Participante } from "./participante"

export interface Evento {
  id?:number,
  nombreEvento: string,
  tipoEvento?: string,
  fechaEvento?: Date,
  informacion?: string
  chat?: string,
  imagenEvento?: String,
  imagenArchivo?: File,
  administrador?: Participante[],
  participantesEvento?: Participante[],
  privado?: boolean,
  oculto?: boolean,
  maxNumParticipantes: number,
  created_at?: Date,
  updated_at?: Date,
}
