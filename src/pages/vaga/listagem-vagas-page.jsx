import { Plus } from 'lucide-react'
import { Link } from 'react-router'

import { ConfirmacaoDialog } from '@/components/app/comum/confirmacao-dialog'
import { PaginaHeader } from '@/components/app/comum/pagina-header'
import { PaginacaoNav } from '@/components/app/comum/paginacao-nav'
import { FiltroVagasBar } from '@/components/app/vaga/filtro-vagas-bar'
import { VagasTable } from '@/components/app/vaga/vagas-table'
import { Button } from '@/components/ui/button'
import {
  OPCOES_ITENS_POR_PAGINA,
  useListagemVagasViewModel,
} from '@/viewmodels/use-listagem-vagas-view-model'

export function ListagemVagasPage() {
  const viewModel = useListagemVagasViewModel()
  const vagaParaExcluir = viewModel.vagaParaExcluir

  return (
    <>
      <PaginaHeader
        titulo="Vagas do Estacionamento"
        subtitulo="Listagem das vagas de estacionamento do condomínio"
      >
        <Button asChild>
          <Link to="/reservas/nova">
            <Plus data-icon="inline-start" />
            Nova reserva
          </Link>
        </Button>
      </PaginaHeader>

      <FiltroVagasBar
        pesquisa={viewModel.pesquisa}
        situacao={viewModel.situacao}
        aoAlterarPesquisa={viewModel.alterarPesquisa}
        aoLimparPesquisa={viewModel.limparPesquisa}
        aoAlterarSituacao={viewModel.alterarSituacao}
      />

      <VagasTable
        vagas={viewModel.vagasPagina}
        aoRealizarReserva={viewModel.realizarReserva}
        aoVisualizarReserva={viewModel.visualizarReserva}
        aoExcluirReserva={viewModel.solicitarExclusao}
      />

      <PaginacaoNav
        paginaAtual={viewModel.paginaAtual}
        totalPaginas={viewModel.totalPaginas}
        totalItens={viewModel.totalItens}
        itensPorPagina={viewModel.itensPorPagina}
        opcoesItensPorPagina={OPCOES_ITENS_POR_PAGINA}
        possuiPaginaAnterior={viewModel.possuiPaginaAnterior}
        possuiProximaPagina={viewModel.possuiProximaPagina}
        aoAlterarItensPorPagina={viewModel.alterarItensPorPagina}
        aoVoltar={viewModel.irParaPaginaAnterior}
        aoAvancar={viewModel.irParaProximaPagina}
      />

      <ConfirmacaoDialog
        aberto={Boolean(vagaParaExcluir)}
        aoAlterarAberto={(aberto) => !aberto && viewModel.cancelarExclusao()}
        titulo="Excluir reserva?"
        descricao={
          vagaParaExcluir
            ? `A reserva do veículo ${vagaParaExcluir.reserva?.veiculoPlaca} na vaga ${vagaParaExcluir.numero} será excluída e a vaga ficará disponível.`
            : ''
        }
        textoConfirmar="Excluir"
        destrutivo
        aoConfirmar={viewModel.confirmarExclusao}
      />
    </>
  )
}
