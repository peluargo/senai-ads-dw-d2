export const SITUACAO_VAGA = Object.freeze({
  DISPONIVEL: 'DISPONIVEL',
  OCUPADA: 'OCUPADA',
  TODAS: 'TODAS',
})

export const OPCOES_SITUACAO_VAGA = [
  { valor: SITUACAO_VAGA.DISPONIVEL, rotulo: 'Disponível' },
  { valor: SITUACAO_VAGA.OCUPADA, rotulo: 'Ocupada' },
  { valor: SITUACAO_VAGA.TODAS, rotulo: 'Todas' },
]
