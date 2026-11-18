import { CalendarPlus, EllipsisVertical, Eye, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SITUACAO_VAGA } from '@/models/situacao-vaga'

export function AcoesVagaDropdown({
  vaga,
  aoRealizarReserva,
  aoVisualizarReserva,
  aoExcluirReserva,
}) {
  const disponivel = vaga.situacao === SITUACAO_VAGA.DISPONIVEL

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label={`Ações da vaga ${vaga.numero}`}>
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Vaga {vaga.numero}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {disponivel && (
          <DropdownMenuItem onSelect={() => aoRealizarReserva(vaga)}>
            <CalendarPlus />
            Realizar reserva
          </DropdownMenuItem>
        )}
        <DropdownMenuItem disabled={disponivel} onSelect={() => aoVisualizarReserva(vaga)}>
          <Eye />
          Visualizar reserva
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          disabled={disponivel}
          onSelect={() => aoExcluirReserva(vaga)}
        >
          <Trash2 />
          Excluir reserva
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
