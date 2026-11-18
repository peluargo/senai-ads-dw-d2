import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

import {
  criarFormularioReservaVazio,
  formularioParaReserva,
  formulariosIguais,
  reservaParaFormulario,
  validarFormularioReserva,
} from '@/models/reserva-model'
import { CORES_VEICULO, MODELOS_VEICULO, normalizarPlaca } from '@/models/veiculo-model'
import { apartamentoService } from '@/services/apartamento-service'
import { blocoService } from '@/services/bloco-service'
import { reservaService } from '@/services/reserva-service'
import { vagaService } from '@/services/vaga-service'

const ROTA_LISTAGEM = '/vagas'

function carregarEstadoInicial(reservaId, vagaIdSugerida) {
  if (reservaId) {
    const reserva = reservaService.obterPorId(reservaId)
    if (!reserva) return { reserva: null, formulario: criarFormularioReservaVazio() }
    const apartamento = apartamentoService.obterPorId(reserva.apartamentoId)
    return { reserva, formulario: reservaParaFormulario(reserva, apartamento) }
  }

  const vagaSugeridaDisponivel = vagaService
    .listarDisponiveis()
    .some((vaga) => vaga.id === Number(vagaIdSugerida))

  return {
    reserva: null,
    formulario: criarFormularioReservaVazio({
      vagaId: vagaSugeridaDisponivel ? String(vagaIdSugerida) : '',
    }),
  }
}

export function useReservaFormViewModel({ reservaId = null, vagaIdSugerida = null } = {}) {
  const navigate = useNavigate()
  const modoEdicao = Boolean(reservaId)

  const [estadoInicial, setEstadoInicial] = useState(() =>
    carregarEstadoInicial(reservaId, vagaIdSugerida),
  )
  const [formulario, setFormulario] = useState(estadoInicial.formulario)
  const [camposTocados, setCamposTocados] = useState({})
  const [dialogoDescarteAberto, setDialogoDescarteAberto] = useState(false)
  const [dialogoExclusaoAberto, setDialogoExclusaoAberto] = useState(false)
  const [dialogoSucessoAberto, setDialogoSucessoAberto] = useState(false)

  const reservaNaoEncontrada = modoEdicao && !estadoInicial.reserva

  const vagas = useMemo(
    () => vagaService.listarDisponiveis(estadoInicial.reserva?.vagaId),
    [estadoInicial],
  )
  const blocos = useMemo(() => blocoService.listar(), [])
  const apartamentos = useMemo(
    () => (formulario.blocoId ? apartamentoService.listarPorBloco(formulario.blocoId) : []),
    [formulario.blocoId],
  )

  const erros = useMemo(() => validarFormularioReserva(formulario), [formulario])
  const formularioValido = Object.keys(erros).length === 0
  const formularioAlterado = !formulariosIguais(formulario, estadoInicial.formulario)
  const podeSalvar = formularioAlterado && formularioValido

  function obterErro(campo) {
    return camposTocados[campo] ? erros[campo] : undefined
  }

  function marcarComoTocado(campo) {
    setCamposTocados((atuais) => ({ ...atuais, [campo]: true }))
  }

  function alterarCampo(campo, valor) {
    setFormulario((atual) => {
      if (campo === 'blocoId') {
        return { ...atual, blocoId: valor, apartamentoId: '' }
      }
      if (campo === 'veiculoPlaca') {
        return { ...atual, veiculoPlaca: normalizarPlaca(valor) }
      }
      return { ...atual, [campo]: valor }
    })
    if (campo !== 'veiculoPlaca' && campo !== 'veiculoProprietario') {
      marcarComoTocado(campo)
    }
  }

  function salvar(evento) {
    evento?.preventDefault()
    if (!podeSalvar) return

    try {
      const payload = formularioParaReserva(formulario, estadoInicial.reserva?.id)
      const reservaSalva = reservaService.salvar(payload)
      console.log('Reserva salva:', reservaSalva)
      setEstadoInicial({ reserva: reservaSalva, formulario })
      setDialogoSucessoAberto(true)
    } catch (erro) {
      toast.error(erro.message)
    }
  }

  function concluirSucesso() {
    setDialogoSucessoAberto(false)
    navigate(ROTA_LISTAGEM)
  }

  function voltar() {
    if (formularioAlterado) {
      setDialogoDescarteAberto(true)
      return
    }
    navigate(ROTA_LISTAGEM)
  }

  function confirmarDescarte() {
    setDialogoDescarteAberto(false)
    navigate(ROTA_LISTAGEM)
  }

  function solicitarExclusao() {
    setDialogoExclusaoAberto(true)
  }

  function confirmarExclusao() {
    try {
      reservaService.remover(estadoInicial.reserva.id)
      toast.success('Reserva excluída com sucesso.')
      setDialogoExclusaoAberto(false)
      navigate(ROTA_LISTAGEM)
    } catch (erro) {
      toast.error(erro.message)
      setDialogoExclusaoAberto(false)
    }
  }

  return {
    modoEdicao,
    reservaNaoEncontrada,
    formulario,
    opcoes: {
      vagas,
      blocos,
      apartamentos,
      modelos: MODELOS_VEICULO,
      cores: CORES_VEICULO,
    },
    obterErro,
    podeSalvar,
    dialogoDescarteAberto,
    dialogoExclusaoAberto,
    dialogoSucessoAberto,
    alterarCampo,
    marcarComoTocado,
    salvar,
    concluirSucesso,
    voltar,
    confirmarDescarte,
    setDialogoDescarteAberto,
    solicitarExclusao,
    setDialogoExclusaoAberto,
    confirmarExclusao,
  }
}
