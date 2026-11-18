import { placaValida } from '@/models/veiculo-model'

export const CAMPOS_FORMULARIO_RESERVA = [
  'vagaId',
  'blocoId',
  'apartamentoId',
  'veiculoPlaca',
  'veiculoModelo',
  'veiculoCor',
  'veiculoProprietario',
]

export function criarFormularioReservaVazio(valoresIniciais = {}) {
  return {
    vagaId: '',
    blocoId: '',
    apartamentoId: '',
    veiculoPlaca: '',
    veiculoModelo: '',
    veiculoCor: '',
    veiculoProprietario: '',
    ...valoresIniciais,
  }
}

export function reservaParaFormulario(reserva, apartamento) {
  return criarFormularioReservaVazio({
    vagaId: String(reserva.vagaId),
    blocoId: apartamento ? String(apartamento.blocoId) : '',
    apartamentoId: String(reserva.apartamentoId),
    veiculoPlaca: reserva.veiculoPlaca,
    veiculoModelo: reserva.veiculoModelo,
    veiculoCor: reserva.veiculoCor,
    veiculoProprietario: reserva.veiculoProprietario,
  })
}

export function formularioParaReserva(formulario, id) {
  return {
    id: id ?? null,
    vagaId: Number(formulario.vagaId),
    apartamentoId: Number(formulario.apartamentoId),
    veiculoPlaca: formulario.veiculoPlaca.trim(),
    veiculoCor: formulario.veiculoCor,
    veiculoModelo: formulario.veiculoModelo,
    veiculoProprietario: formulario.veiculoProprietario.trim(),
  }
}

export function validarFormularioReserva(formulario) {
  const erros = {}

  if (!formulario.vagaId) erros.vagaId = 'Selecione uma vaga.'
  if (!formulario.blocoId) erros.blocoId = 'Selecione um bloco.'
  if (!formulario.apartamentoId) erros.apartamentoId = 'Selecione um apartamento.'

  if (!formulario.veiculoPlaca.trim()) {
    erros.veiculoPlaca = 'Informe a placa do veículo.'
  } else if (!placaValida(formulario.veiculoPlaca)) {
    erros.veiculoPlaca = 'Placa inválida. Utilize o padrão Mercosul (ex.: ABC1D23).'
  }

  if (!formulario.veiculoModelo) erros.veiculoModelo = 'Selecione o modelo do veículo.'
  if (!formulario.veiculoCor) erros.veiculoCor = 'Selecione a cor do veículo.'
  if (!formulario.veiculoProprietario.trim()) {
    erros.veiculoProprietario = 'Informe o nome do proprietário.'
  }

  return erros
}

export function formulariosIguais(formularioA, formularioB) {
  return CAMPOS_FORMULARIO_RESERVA.every((campo) => formularioA[campo] === formularioB[campo])
}
