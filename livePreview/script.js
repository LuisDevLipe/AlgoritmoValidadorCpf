const form = document.getElementById("form")
form.addEventListener("submit", (e) => {
  e.preventDefault()
  const span = e.target.children[3]
  const span2 = e.target.children[4]
  const mensagem = {
    sucesso() {
      span.style.color = "green"
      return "Este número é um CPF válido"
    },
    falha() {
      span.style.color = "red"
      return "Este CPF não passou na verificação dos dígitos"
    },
    info(resultado) {
      const { cpf, digito1, digito2, IsValid } = resultado
      return `
        CPF digitado: ${cpf} <br>
        Digito calculado para o primeiro dígito: ${digito1}<br>
        Digito calculado para o segundo dígito: ${digito2}<br><br>
        Validade do CPF: ${IsValid ? this.sucesso() : this.falha()}
      `
    },
  }
  const cpf = e.target.entrada.value.toString()
  const resultado = new ValidarCPF(cpf).validar()
  span.textContent = resultado.IsValid ? mensagem.sucesso() : mensagem.falha()
  resultado.erro
    ? (span2.textContent = resultado.erro)
    : (span2.innerHTML = mensagem.info(resultado))
})

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
  #verificarErros() {
    if (this.cpf === "") return { erro: "O que você acha, que um cpf vazio será válido???" }
    if (this.cpf.length < 11 || this.cpf.length > 11) return { erro: "Tamanho do cpf errado" }

    // Esse regex retorna true quando a string contem somente números.
    // Nesse caso eu estou retornando erro somente se retornar false, ou seja, a string contém outros caracteres além de números.
    if (/^\d+$/.test(this.cpf) === false) return { erro: "Aqui só entra número seu cabeção" }
    // Essa função foi criada usando o BlackBox do vscode é um simples for of loop que testa se todos os números são iguais, retorna true quando forem iguais
    // Esse teste é necessária devido a natureza do algoritmo de validação que retornará true caso todos os digítos sejam iguais.
    // Culpem a receita não eu
    function isAllSame(strNum) {
      if (strNum.length === 0) {
        return true
      }
      const firstChar = strNum.charAt(0)
      for (const char of strNum) {
        if (char !== firstChar) {
          return false
        }
      }
      return true
    }
    if (isAllSame(this.cpf))
      return {
        erro: "Não pode ter todos os numeros iguais,dessa forma o CPF passaria na validação mesmo sendo um cpf inválido",
      }
    else return true
  }

  validar() {
    if (this.#verificarErros().erro) {
      return this.#verificarErros()
    } else {
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
}
