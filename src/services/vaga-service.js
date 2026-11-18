import { listarRegistros, obterRegistro } from '@/data/banco-memoria'
import { SITUACAO_VAGA } from '@/models/situacao-vaga'
import { reservaService } from '@/services/reserva-service'

export const vagaService = {
  listar() {
    return listarRegistros('vagas').sort((a, b) => a.numero - b.numero)
  },

  obterPorId(id) {
    return obterRegistro('vagas', id)
  },

  listarComSituacao() {
    const reservasPorVaga = new Map(
      reservaService.listar().map((reserva) => [reserva.vagaId, reserva]),
    )

    return this.listar().map((vaga) => {
      const reserva = reservasPorVaga.get(vaga.id) ?? null
      return {
        ...vaga,
        reserva,
        situacao: reserva ? SITUACAO_VAGA.OCUPADA : SITUACAO_VAGA.DISPONIVEL,
      }
    })
  },

  listarDisponiveis(vagaIdPermitida) {
    const vagasOcupadas = new Set(reservaService.listar().map((reserva) => reserva.vagaId))
    return this.listar().filter(
      (vaga) => !vagasOcupadas.has(vaga.id) || vaga.id === Number(vagaIdPermitida),
    )
  },
}
