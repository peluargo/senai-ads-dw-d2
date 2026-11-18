import { Link } from 'react-router'

import { PaginaHeader } from '@/components/app/comum/pagina-header'
import { Button } from '@/components/ui/button'

export function NaoEncontradaPage() {
  return (
    <>
      <PaginaHeader titulo="Página não encontrada" subtitulo="O endereço acessado não existe." />
      <div>
        <Button asChild variant="outline">
          <Link to="/vagas">Ir para a listagem de vagas</Link>
        </Button>
      </div>
    </>
  )
}
