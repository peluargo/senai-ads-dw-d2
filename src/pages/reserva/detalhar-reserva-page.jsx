import { useParams } from 'react-router'

import { ReservaFormContainer } from '@/components/app/reserva/reserva-form-container'

export function DetalharReservaPage() {
  const { reservaId } = useParams()

  return (
    <ReservaFormContainer
      key={reservaId}
      titulo="Visualizar reserva"
      subtitulo="Visualize, edite ou exclua a reserva da vaga de estacionamento"
      reservaId={reservaId}
    />
  )
}
