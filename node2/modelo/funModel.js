const { json } = require("express");

const reformJson = (item, matricula) => {
    item.matricula = matricula;
    return item;
}
const calculate = (json) => {
    let total = 0;

    if (json.ultimo_salario <= 2000.00) {
        total = 0;
        
    } else if (json.ultimo_salario < 3000.90) {
        total = 0.075 * json.ultimo_salario;

    } else if (json.ultimo_salario < 4000.90) {
        total = 0.150 * json.ultimo_salario;

    } else if (json.ultimo_salario < 5000.90) {
        total = 0.225 * json.ultimo_salario;

    } else {
        total = 0.275 * json.ultimo_salario;
    }
    json.irrf = total.toFixed(2);
    return json;
}

module.exports = {
    reformJson,
    calculate
}