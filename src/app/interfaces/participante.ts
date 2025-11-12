import { Evento } from "./evento";
import { Usuario } from "./usuario";

export interface Participante {
  id?: number,
  nombreParticipante?: Pick<Usuario, 'nombre'>,
  eventosParticipante?: Evento[],
  amigos?: Participante[],
  created_at?: Date,
  updated_at?: Date,
  usuario_id?: Pick<Usuario, 'id'>;
}
