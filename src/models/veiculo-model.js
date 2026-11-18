export const PADRAO_PLACA_MERCOSUL = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/

export const OPCAO_OUTRO = 'Outro'

export const MODELOS_VEICULO = [
  'Chevrolet - Onix',
  'Fiat - Argo',
  'Fiat - Strada',
  'Honda - Civic',
  'Hyundai - HB20',
  'Jeep - Compass',
  'Toyota - Corolla',
  'Volkswagen - Gol',
  'Volkswagen - T-Cross',
  OPCAO_OUTRO,
]

export const CORES_VEICULO = [
  'Amarelo',
  'Azul',
  'Bege',
  'Branco',
  'Cinza',
  'Marrom',
  'Prata',
  'Preto',
  'Vermelho',
  OPCAO_OUTRO,
]

export function normalizarPlaca(placa) {
  return (placa ?? '')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 7)
}

export function placaValida(placa) {
  return PADRAO_PLACA_MERCOSUL.test(placa ?? '')
}
