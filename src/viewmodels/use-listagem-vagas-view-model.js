import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

import { useDebounce } from '@/hooks/use-debounce'
import { SITUACAO_VAGA } from '@/models/situacao-vaga'
import { reservaService } from '@/services/reserva-service'
import { vagaService } from '@/services/vaga-service'

export const TEMPO_DEBOUNCE_PESQUISA = 200
export const OPCOES_ITENS_POR_PAGINA = [10, 20, 50]

function normalizarTexto(texto) {
  return String(texto ?? '')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
}

function filtrarVagas(vagas, pesquisa, situacao) {
  const termo = normalizarTexto(pesquisa)

  return vagas.filter((vaga) => {
    const atendeSituacao = situacao === SITUACAO_VAGA.TODAS || vaga.situacao === situacao
    if (!atendeSituacao) return false
    if (!termo) return true

    const placa = normalizarTexto(vaga.reserva?.veiculoPlaca)
    return String(vaga.numero).includes(termo) || placa.includes(termo)
  })
}

export function useListagemVagasViewModel() {
  const navigate = useNavigate()
  const [vagas, setVagas] = useState(() => vagaService.listarComSituacao())
  const [pesquisa, setPesquisa] = useState('')
  const [situacao, setSituacao] = useState(SITUACAO_VAGA.TODAS)
  const [pagina, setPagina] = useState(1)
  const [itensPorPagina, setItensPorPagina] = useState(OPCOES_ITENS_POR_PAGINA[0])
  const [vagaParaExcluir, setVagaParaExcluir] = useState(null)

  const pesquisaComDebounce = useDebounce(pesquisa, TEMPO_DEBOUNCE_PESQUISA)
  const pesquisaAplicada = pesquisa ? pesquisaComDebounce : ''

  const vagasFiltradas = useMemo(
    () => filtrarVagas(vagas, pesquisaAplicada, situacao),
    [vagas, pesquisaAplicada, situacao],
  )

  const totalItens = vagasFiltradas.length
  const totalPaginas = Math.max(1, Math.ceil(totalItens / itensPorPagina))
  const paginaAtual = Math.min(pagina, totalPaginas)
  const inicio = (paginaAtual - 1) * itensPorPagina
  const vagasPagina = vagasFiltradas.slice(inicio, inicio + itensPorPagina)

  function recarregar() {
    setVagas(vagaService.listarComSituacao())
  }

  function alterarPesquisa(valor) {
    setPesquisa(valor)
    setPagina(1)
  }

  function limparPesquisa() {
    setPesquisa('')
    setPagina(1)
  }

  function alterarSituacao(valor) {
    setSituacao(valor)
    setPagina(1)
  }

  function alterarItensPorPagina(valor) {
    setItensPorPagina(Number(valor))
    setPagina(1)
  }

  function irParaPaginaAnterior() {
    setPagina(Math.max(1, paginaAtual - 1))
  }

  function irParaProximaPagina() {
    setPagina(Math.min(totalPaginas, paginaAtual + 1))
  }

  function realizarReserva(vaga) {
    navigate(`/reservas/nova?vagaId=${vaga.id}`)
  }

  function visualizarReserva(vaga) {
    if (vaga.reserva) navigate(`/reservas/${vaga.reserva.id}`)
  }

  function solicitarExclusao(vaga) {
    if (vaga.reserva) setVagaParaExcluir(vaga)
  }

  function cancelarExclusao() {
    setVagaParaExcluir(null)
  }

  function confirmarExclusao() {
    if (!vagaParaExcluir?.reserva) return

    try {
      reservaService.remover(vagaParaExcluir.reserva.id)
      toast.success(`Reserva da vaga ${vagaParaExcluir.numero} excluída com sucesso.`)
    } catch (erro) {
      toast.error(erro.message)
    } finally {
      setVagaParaExcluir(null)
      recarregar()
    }
  }

  return {
    pesquisa,
    situacao,
    vagasPagina,
    totalItens,
    paginaAtual,
    totalPaginas,
    itensPorPagina,
    possuiPaginaAnterior: paginaAtual > 1,
    possuiProximaPagina: paginaAtual < totalPaginas,
    vagaParaExcluir,
    alterarPesquisa,
    limparPesquisa,
    alterarSituacao,
    alterarItensPorPagina,
    irParaPaginaAnterior,
    irParaProximaPagina,
    realizarReserva,
    visualizarReserva,
    solicitarExclusao,
    cancelarExclusao,
    confirmarExclusao,
  }
}
