import { SearchX } from 'lucide-react'

import { AcoesVagaDropdown } from '@/components/app/vaga/acoes-vaga-dropdown'
import { SituacaoVagaBadge } from '@/components/app/vaga/situacao-vaga-badge'
import { PlacaVeiculoBadge } from '@/components/app/veiculo/placa-veiculo-badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function VagasTable({ vagas, aoRealizarReserva, aoVisualizarReserva, aoExcluirReserva }) {
  return (
    <div className="overflow-hidden rounded-lg border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-32 pl-4">Vaga</TableHead>
            <TableHead>Situação</TableHead>
            <TableHead>Placa do veículo</TableHead>
            <TableHead className="w-28 pr-4 text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vagas.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                <div className="flex flex-col items-center gap-2">
                  <SearchX className="size-6" />
                  Nenhum resultado encontrado
                </div>
              </TableCell>
            </TableRow>
          ) : (
            vagas.map((vaga) => (
              <TableRow key={vaga.id}>
                <TableCell className="pl-4 font-medium">Vaga {vaga.numero}</TableCell>
                <TableCell>
                  <SituacaoVagaBadge situacao={vaga.situacao} />
                </TableCell>
                <TableCell>
                  <PlacaVeiculoBadge placa={vaga.reserva?.veiculoPlaca} />
                </TableCell>
                <TableCell className="pr-4 text-right">
                  <AcoesVagaDropdown
                    vaga={vaga}
                    aoRealizarReserva={aoRealizarReserva}
                    aoVisualizarReserva={aoVisualizarReserva}
                    aoExcluirReserva={aoExcluirReserva}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
