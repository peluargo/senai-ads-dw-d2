import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function PaginacaoNav({
  paginaAtual,
  totalPaginas,
  totalItens,
  itensPorPagina,
  opcoesItensPorPagina,
  possuiPaginaAnterior,
  possuiProximaPagina,
  aoAlterarItensPorPagina,
  aoVoltar,
  aoAvancar,
}) {
  return (
    <nav
      aria-label="Paginação"
      className="flex flex-wrap items-center justify-between gap-4 text-sm"
    >
      <div className="flex items-center gap-2">
        <Label htmlFor="itens-por-pagina" className="font-normal text-muted-foreground">
          Itens por página
        </Label>
        <Select value={String(itensPorPagina)} onValueChange={aoAlterarItensPorPagina}>
          <SelectTrigger id="itens-por-pagina" size="sm" className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {opcoesItensPorPagina.map((opcao) => (
              <SelectItem key={opcao} value={String(opcao)}>
                {opcao}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-muted-foreground">
          {totalItens} {totalItens === 1 ? 'registro' : 'registros'}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">
          Página {paginaAtual} de {totalPaginas}
        </span>
        <Button variant="outline" size="sm" onClick={aoVoltar} disabled={!possuiPaginaAnterior}>
          <ChevronLeft data-icon="inline-start" />
          Voltar
        </Button>
        <Button variant="outline" size="sm" onClick={aoAvancar} disabled={!possuiProximaPagina}>
          Próxima
          <ChevronRight data-icon="inline-end" />
        </Button>
      </div>
    </nav>
  )
}
