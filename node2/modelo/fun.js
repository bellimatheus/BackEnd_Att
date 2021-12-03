const funcionario = (parara) => {
    const total = {
        "matricula": parara.matricula,
        "nome_completo": parara.nome_completo,
        "data_desligamento": parara.data_desligamento,
        "ultimo_salario": parara.ultimo_salario,
        "irrf": "R$ "
    }

    if (parara.ultimo_salario <= 2000.00) {
        total += 0;
        
    } else if (parara.ultimo_salario < 3000.90) {
        total.irrf += 0.075 * parara.ultimo_salario;

    } else if (parara.ultimo_salario < 4000.90) {
        total.irrf += 0.150 * parara.ultimo_salario;

    } else if (parara.ultimo_salario < 5000.90) {
        total.irrf += 0.225 * parara.ultimo_salario;

    } else {
        total += 0.275 * parara.ultimo_salario;
    }
    total.irrf.toFixed(2);
    return total;
}