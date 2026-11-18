import { listarRegistros, obterRegistro } from '@/data/banco-memoria'

export const blocoService = {
  listar() {
    return listarRegistros('blocos').sort((a, b) => a.nome.localeCompare(b.nome))
  },

  obterPorId(id) {
    return obterRegistro('blocos', id)
  },
}
