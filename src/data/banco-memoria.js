import {
  apartamentosIniciais,
  blocosIniciais,
  reservasIniciais,
  vagasIniciais,
} from '@/data/dados-iniciais'

const tabelas = {
  blocos: blocosIniciais.map((bloco) => ({ ...bloco })),
  apartamentos: apartamentosIniciais.map((apartamento) => ({ ...apartamento })),
  vagas: vagasIniciais.map((vaga) => ({ ...vaga })),
  reservas: reservasIniciais.map((reserva) => ({ ...reserva })),
}

function copiar(registro) {
  return registro ? { ...registro } : null
}

export function listarRegistros(tabela) {
  return tabelas[tabela].map(copiar)
}

export function obterRegistro(tabela, id) {
  return copiar(tabelas[tabela].find((registro) => registro.id === Number(id)))
}

export function inserirRegistro(tabela, dados) {
  const proximoId = tabelas[tabela].reduce((maior, registro) => Math.max(maior, registro.id), 0) + 1
  const registro = { ...dados, id: proximoId }
  tabelas[tabela].push(registro)
  return copiar(registro)
}

export function atualizarRegistro(tabela, dados) {
  const indice = tabelas[tabela].findIndex((registro) => registro.id === Number(dados.id))
  if (indice < 0) return null
  tabelas[tabela][indice] = { ...tabelas[tabela][indice], ...dados }
  return copiar(tabelas[tabela][indice])
}

export function removerRegistro(tabela, id) {
  const indice = tabelas[tabela].findIndex((registro) => registro.id === Number(id))
  if (indice < 0) return false
  tabelas[tabela].splice(indice, 1)
  return true
}
