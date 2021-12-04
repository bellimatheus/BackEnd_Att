const {con} = require('./ConnectionDB.js');

// model será usado (por exemplo) para calculos, pois o node pega os atributos pelo banco de dados
const models = require('../model/modelF.js'); 

const criando = (req, res) => {
    let prestador = "\""+req.body.prestador+"\"";
    let horasTrab = "\""+req.body.horasTrab+"\"";
    let valorHr = req.body.valorHr;
    
    let string = `INSERT INTO func (prestador, horasTrab, valorHr) VALUES (${prestador}, ${horasTrab}, ${valorHr})`;
    con.query(string, (err, result) => {
        if(result.affectedRows == 1){
            res.status(201).end();
        }else{
            res.status(400).end();
        }
    })
}

const lendo = (req, res) => {
    let string = "SELECT * FROM func"
    con.query(string, (err, result) => {
        //res.json(result)

        //para adicionar a listagem, por exemplo um calculo
        let array = [];
        result.forEach(element => {
            array.push(models.calc(element))
        });
        res.json(array);
    })
}

const alterando = (req, res) => {
    let idPrest = req.body.idPrest;
    let prestador = "\""+req.body.prestador+"\"";
    let horasTrab = "\""+req.body.horasTrab+"\"";
    let valorHr = req.body.valorHr;
    
    let string = `UPDATE func SET prestador = ${prestador}, horasTrab = ${horasTrab}, valorHr = ${valorHr} WHERE idPrest = ${idPrest}`;
    con.query(string, (err, result) => {
        if(result.changedRows == 1){
            res.json(req.body);
        }else{
            res.status(400).end();
        }
    })
}

const deletando = (req, res) => {
    let idPrest = req.params.idPrest;
    let string = `DELETE FROM func WHERE idPrest = ${idPrest}`;
    con.query(string, (err, result) => {
        if(result.affectedRows == 1) {
            res.json("Deletado");
            res.status(201).end();
        }else{
            res.status(404).end();
        }
    })
}

module.exports = {
    criando, lendo, alterando, deletando
}