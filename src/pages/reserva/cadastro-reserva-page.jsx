import { useSearchParams } from 'react-router'

import { ReservaFormContainer } from '@/components/app/reserva/reserva-form-container'

export function CadastroReservaPage() {
  const [parametros] = useSearchParams()
  const vagaIdSugerida = parametros.get('vagaId')

  return (
    <ReservaFormContainer
      key={vagaIdSugerida ?? 'nova'}
      titulo="Nova reserva"
      subtitulo="Realize uma nova reserva para uma vaga de estacionamento"
      vagaIdSugerida={vagaIdSugerida}
    />
  )
}
