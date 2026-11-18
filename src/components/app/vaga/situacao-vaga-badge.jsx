import { Badge } from '@/components/ui/badge'
import { SITUACAO_VAGA } from '@/models/situacao-vaga'

export function SituacaoVagaBadge({ situacao }) {
  const ocupada = situacao === SITUACAO_VAGA.OCUPADA

  return (
    <Badge
      variant={ocupada ? 'secondary' : 'outline'}
      className={
        ocupada
          ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
          : 'border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-900/30 dark:text-green-400'
      }
    >
      {situacao}
    </Badge>
  )
}
