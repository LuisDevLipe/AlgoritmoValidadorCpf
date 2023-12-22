class ValidarCPF {
  #PESO1 = ["10", "9", "8", "7", "6", "5", "4", "3", "2"]
  #PESO2 = ["11", "10", "9", "8", "7", "6", "5", "4", "3", "2"]

  constructor(cpf) {
    this.cpf = cpf
  }
  #arr(a, b) {
    return Array.from(this.cpf.slice(a, b))
  }

  #calcularDigito(a, b, peso) {
    const cpf = this.#arr(a, b)
    let resultado =
      cpf
        .map((numero, indice) => numero * peso[indice])
        .reduce((acumlador, total) => acumlador + total) % 11

    resultado = 11 - resultado
    return resultado > 9 ? "0" : resultado.toString()
  }

  validar() {
    if (this.cpf.length < 11) console.error("Tamanho do cpf errado")
    const digito1 = this.#calcularDigito(0, 9, this.#PESO1)
    const digito2 = this.#calcularDigito(0, 10, this.#PESO2)

    const IsValid = () => {
      if (digito1 === this.cpf[9] && digito2 === this.cpf[10]) return true
      else return false
    }

    return {
      cpf: this.cpf,
      digito1,
      digito2,
      IsValid: IsValid(),
    }
  }
}

function pede_cpf_do_usuario() {
  process.stdout.write("Informe o seu cpf, somente números: \n")
  process.stdout.on("data", function (data) {
    cpf = data.toString().replace("\n", "")
    process.stdout.write(`Rodando a validação para o cpf: ${cpf}\n`)
    const validar = new ValidarCPF(cpf)
    const resultado = validar.validar()
    process.stdout.write(JSON.stringify(resultado) + "\n")
    process.exit()
  })
}
pede_cpf_do_usuario()
