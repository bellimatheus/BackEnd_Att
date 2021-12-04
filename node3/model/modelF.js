const {json} = require('express');

const calc = (json) => {
    let valor = json.valorHr;
    let hora = parseFloat(json.horasTrab);

    let subTotal = valor*hora;
    let total = subTotal * 0.02;

    json.saldo = parseFloat(subTotal.toFixed(2));
    json.custo = parseFloat(total.toFixed(2));
    return json;
}

module.exports = {
    calc
}