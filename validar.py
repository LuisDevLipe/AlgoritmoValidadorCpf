PESO1 = [10,9,8,7,6,5,4,3,2]
PESO2 = [11,10,9,8,7,6,5,4,3,2]

cpf_input = list(input("Digite o cpf:"))

if len(cpf_input) < 11:
     print("cpf invalido")
elif len(cpf_input) > 11:
    print("cpf invalido")
else:
    for dig in cpf_input:
        if dig.isnumeric() == False:
            print("cpf invalido")

def validar_digito(peso,cpf):
    cpf = cpf[0:len(peso)]

    mult = []
    soma = 0
    for i,p in enumerate(peso):
        mult.append(p * int(cpf[i]))
    
    for t in mult:
        soma += t
    
    resultado = 11 - soma % 11 

    return "0" if resultado > 9 else str(resultado)

def validar():
    digito_1 = validar_digito(PESO1, cpf_input)
    digito_2 = validar_digito(PESO2, cpf_input)

    cpf_valido = False
    
    # print(digito_1 == cpf_input[10] and digito_2 == cpf_input[11])
    if digito_1 == cpf_input[9] and digito_2 == cpf_input[10]:
        cpf_valido = True

    return {
        'digito_1' :[ digito_1, cpf_input[9]],
        "digito_2" : [digito_2, cpf_input[10]],
        "cpf_valido": cpf_valido
        }

def origem_do_cpf(cpf):
    dig8 = cpf[8]
    if dig8 == "0":
        return ("RS")
    elif dig8 == "1":
        return ("DF","GO","MT","MS","TO")
    elif dig8 == "2":
        return ("PA","AM","AC","AP","RO","RR")   
    elif dig8 == "3":
        return ("CE","MA","PI")
    elif dig8 == "4":
        return ("PE","RN","PB","AL")
    elif dig8 == "5":
        return ("BA","SE")
    elif dig8 == "¨6":
        return ("MG")
    elif dig8 == "7":
        return ("RJ", "ES")
    elif dig8 == "8":
        return ("SP")
    else :
        return ("PR","SC")
entrada_pro_testador = validar()

def testador_de_verificadores(obj):
    dig1 = obj["digito_1"][0]
    dig2 = obj["digito_2"][0]
    print(dig1,dig2)
    if obj["cpf_valido"] == False:
        cpf_input[9] = dig1
        cpf_input[10] = dig2
        testador_de_verificadores(validar())
    else: print(f"passou" ,validar(),origem_do_cpf(cpf_input))

testador_de_verificadores(entrada_pro_testador)







# Primeiro passo para saber se um CPF é verdadeiro
# Em 90% dos casos, esta simples soma dos números do CPF demonstra a veracidade do documento.

# Nº: 003.939.708-41

# Somando-se os números do documento o resultado é 44. A soma dos números deve resultar sempre em dois números iguais.

# Passo dois para verificar a autenticidade de um CPF
# Outra maneira de verificar a veracidade do documento é conferir o último número antes do dígito, de acordo com a tabela abaixo:

# Exemplo: Nº:  003.939.708-41 = Código 8, corresponde ao Estado de São Paulo.

# Veja abaixo o código de Identificação por Estado:      

# Código 0:  Rio Grande do Sul    

# Código 1:  Distrito Federal – Goiás – Mato Grosso – Mato Grosso do Sul – Tocantins    

# Código 2:  Pará – Amazonas – Acre – Amapá – Rondônia – Roraima    

# Código 3:  Ceará – Maranhão – Piauí    

# Código 4:  Pernambuco – Rio Grande do Norte – Paraíba – Alagoas    

# Código 5:  Bahia – Sergipe    

# Código 6:  Minas Gerais    

# Código 7:  Rio de Janeiro – Espírito Santo

# Código 8:  São Paulo

# Código 9: Paraná – Santa Catarina
    