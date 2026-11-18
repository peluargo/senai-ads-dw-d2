const NOMES_BLOCOS = ['A', 'B', 'C', 'D']
const ANDARES = 4
const APARTAMENTOS_POR_ANDAR = 4
const TOTAL_VAGAS = 60

export const blocosIniciais = NOMES_BLOCOS.map((nome, indice) => ({
  id: indice + 1,
  nome: `Bloco ${nome}`,
}))

export const apartamentosIniciais = blocosIniciais.flatMap((bloco, indiceBloco) =>
  Array.from({ length: ANDARES * APARTAMENTOS_POR_ANDAR }, (_, indice) => {
    const andar = Math.floor(indice / APARTAMENTOS_POR_ANDAR) + 1
    const unidade = (indice % APARTAMENTOS_POR_ANDAR) + 1
    return {
      id: indiceBloco * ANDARES * APARTAMENTOS_POR_ANDAR + indice + 1,
      numero: andar * 100 + unidade,
      blocoId: bloco.id,
    }
  }),
)

export const vagasIniciais = Array.from({ length: TOTAL_VAGAS }, (_, indice) => ({
  id: indice + 1,
  numero: indice + 1,
}))

export const reservasIniciais = [
  {
    vagaId: 1,
    apartamentoId: 1,
    veiculoPlaca: 'ABC1D23',
    veiculoCor: 'Preto',
    veiculoModelo: 'Toyota - Corolla',
    veiculoProprietario: 'Ana Souza',
  },
  {
    vagaId: 2,
    apartamentoId: 2,
    veiculoPlaca: 'BRA2E19',
    veiculoCor: 'Branco',
    veiculoModelo: 'Fiat - Argo',
    veiculoProprietario: 'Bruno Lima',
  },
  {
    vagaId: 4,
    apartamentoId: 5,
    veiculoPlaca: 'QWE3R45',
    veiculoCor: 'Prata',
    veiculoModelo: 'Hyundai - HB20',
    veiculoProprietario: 'Carla Mendes',
  },
  {
    vagaId: 7,
    apartamentoId: 9,
    veiculoPlaca: 'RTY4U56',
    veiculoCor: 'Vermelho',
    veiculoModelo: 'Volkswagen - Gol',
    veiculoProprietario: 'Diego Alves',
  },
  {
    vagaId: 8,
    apartamentoId: 17,
    veiculoPlaca: 'GHI5J67',
    veiculoCor: 'Cinza',
    veiculoModelo: 'Jeep - Compass',
    veiculoProprietario: 'Eduarda Costa',
  },
  {
    vagaId: 11,
    apartamentoId: 18,
    veiculoPlaca: 'KLM6N78',
    veiculoCor: 'Azul',
    veiculoModelo: 'Honda - Civic',
    veiculoProprietario: 'Felipe Rocha',
  },
  {
    vagaId: 12,
    apartamentoId: 22,
    veiculoPlaca: 'OPQ7R89',
    veiculoCor: 'Preto',
    veiculoModelo: 'Chevrolet - Onix',
    veiculoProprietario: 'Gabriela Martins',
  },
  {
    vagaId: 15,
    apartamentoId: 26,
    veiculoPlaca: 'STU8V90',
    veiculoCor: 'Branco',
    veiculoModelo: 'Fiat - Strada',
    veiculoProprietario: 'Henrique Barbosa',
  },
  {
    vagaId: 18,
    apartamentoId: 33,
    veiculoPlaca: 'WXY9Z01',
    veiculoCor: 'Prata',
    veiculoModelo: 'Volkswagen - T-Cross',
    veiculoProprietario: 'Isabela Ferreira',
  },
  {
    vagaId: 21,
    apartamentoId: 35,
    veiculoPlaca: 'DEF0G12',
    veiculoCor: 'Bege',
    veiculoModelo: 'Toyota - Corolla',
    veiculoProprietario: 'João Pereira',
  },
  {
    vagaId: 23,
    apartamentoId: 40,
    veiculoPlaca: 'HJK1L34',
    veiculoCor: 'Marrom',
    veiculoModelo: 'Outro',
    veiculoProprietario: 'Karina Oliveira',
  },
  {
    vagaId: 26,
    apartamentoId: 44,
    veiculoPlaca: 'MNP2Q56',
    veiculoCor: 'Cinza',
    veiculoModelo: 'Hyundai - HB20',
    veiculoProprietario: 'Lucas Ribeiro',
  },
  {
    vagaId: 30,
    apartamentoId: 49,
    veiculoPlaca: 'RST3U78',
    veiculoCor: 'Azul',
    veiculoModelo: 'Chevrolet - Onix',
    veiculoProprietario: 'Mariana Carvalho',
  },
  {
    vagaId: 33,
    apartamentoId: 51,
    veiculoPlaca: 'VWX4Y90',
    veiculoCor: 'Amarelo',
    veiculoModelo: 'Fiat - Argo',
    veiculoProprietario: 'Nicolas Gomes',
  },
  {
    vagaId: 37,
    apartamentoId: 55,
    veiculoPlaca: 'ZAB5C12',
    veiculoCor: 'Preto',
    veiculoModelo: 'Jeep - Compass',
    veiculoProprietario: 'Olívia Santos',
  },
  {
    vagaId: 42,
    apartamentoId: 58,
    veiculoPlaca: 'CDE6F34',
    veiculoCor: 'Outro',
    veiculoModelo: 'Volkswagen - Gol',
    veiculoProprietario: 'Paulo Araújo',
  },
  {
    vagaId: 48,
    apartamentoId: 61,
    veiculoPlaca: 'FGH7I56',
    veiculoCor: 'Branco',
    veiculoModelo: 'Honda - Civic',
    veiculoProprietario: 'Rafaela Dias',
  },
  {
    vagaId: 55,
    apartamentoId: 64,
    veiculoPlaca: 'IJK8L78',
    veiculoCor: 'Vermelho',
    veiculoModelo: 'Fiat - Strada',
    veiculoProprietario: 'Thiago Nunes',
  },
].map((reserva, indice) => ({ id: indice + 1, ...reserva }))
