import {
  atualizarRegistro,
  inserirRegistro,
  listarRegistros,
  obterRegistro,
  removerRegistro,
} from '@/data/banco-memoria'

export const reservaService = {
  listar() {
    return listarRegistros('reservas')
  },

  obterPorId(id) {
    return obterRegistro('reservas', id)
  },

  obterPorVagaId(vagaId) {
    return this.listar().find((reserva) => reserva.vagaId === Number(vagaId)) ?? null
  },

  salvar(reserva) {
    const reservaExistente = this.obterPorVagaId(reserva.vagaId)
    if (reservaExistente && reservaExistente.id !== reserva.id) {
      throw new Error('A vaga selecionada já possui uma reserva.')
    }

    if (!obterRegistro('vagas', reserva.vagaId)) {
      throw new Error('Vaga não encontrada.')
    }

    if (!obterRegistro('apartamentos', reserva.apartamentoId)) {
      throw new Error('Apartamento não encontrado.')
    }

    if (reserva.id) {
      const reservaAtualizada = atualizarRegistro('reservas', reserva)
      if (!reservaAtualizada) throw new Error('Reserva não encontrada.')
      return reservaAtualizada
    }

    const { id: _id, ...dados } = reserva
    return inserirRegistro('reservas', dados)
  },

  remover(id) {
    if (!removerRegistro('reservas', id)) {
      throw new Error('Reserva não encontrada.')
    }
  },
}
