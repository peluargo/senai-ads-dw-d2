import { listarRegistros, obterRegistro } from '@/data/banco-memoria'

export const apartamentoService = {
  listar() {
    return listarRegistros('apartamentos').sort((a, b) => a.numero - b.numero)
  },

  listarPorBloco(blocoId) {
    return this.listar().filter((apartamento) => apartamento.blocoId === Number(blocoId))
  },

  obterPorId(id) {
    return obterRegistro('apartamentos', id)
  },
}
