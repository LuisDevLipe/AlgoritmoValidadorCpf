// Pegar o cpf do usuário

const mensagem = {
  erro: "CPF inválido",
  sucesso: "CPF válido",
}

const PESOS1 = ["10", "9", "8", "7", "6", "5", "4", "3", "2"]
const PESOS2 = ["11", "10", "9", "8", "7", "6", "5", "4", "3", "2"]

process.stdout.write("Informe o seu cpf, somente números: \n")
process.stdin.on("data", function (data) {
  const cpf = data.toString()

  const CPF1 = arrayCpf(cpf.slice(0, 9))
  const CPF2 = arrayCpf(cpf.slice(0, 10))

  const digito1 = calculoDigito(CPF1, PESOS1)
  const digito2 = calculoDigito(CPF2, PESOS2)

  if (validaCPF(cpf, digito1, digito2)) {
    console.log(mensagem.sucesso)
  } else {
    console.log(mensagem.erro)
  }

  process.exit()
})

function arrayCpf(CPF) {
  let arrayCpf = []
  for (let i = 0; i < CPF.length; i++) {
    arrayCpf.push(CPF[i])
  }
  return arrayCpf
}

function calculoDigito(CPF, PESOS) {
  const somatoria =
    CPF.map((num, i) => {
      return num * PESOS[i]
    }).reduce((acc, total) => acc + total) % 11

  const resultado = 11 - somatoria
  if (resultado > 9) return 0
  else return resultado
}

function validaCPF(Entrada, calculoDigito1, calculoDigito2) {
  if (Entrada[9] === calculoDigito1.toString()) {
    if (Entrada[10] === calculoDigito2.toString()) {
      return true
    } else return false
  } else return false
}
