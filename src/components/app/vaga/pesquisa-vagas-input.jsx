import { Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export function PesquisaVagasInput({ valor, aoAlterar, aoLimpar }) {
  return (
    <Field className="flex-1">
      <FieldLabel htmlFor="pesquisa-vagas">Pesquisar:</FieldLabel>
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="pesquisa-vagas"
          type="text"
          value={valor}
          onChange={(evento) => aoAlterar(evento.target.value)}
          placeholder="Pesquisar por placa do veículo, número da vaga"
          className="pr-9 pl-8"
          autoComplete="off"
        />
        {valor && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                aria-label="Limpar"
                onClick={aoLimpar}
                className="absolute top-1/2 right-1.5 -translate-y-1/2"
              >
                <X />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Limpar</TooltipContent>
          </Tooltip>
        )}
      </div>
    </Field>
  )
}
