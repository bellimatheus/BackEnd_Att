const { con } = require("./connectionBD")
const models = require("../modelo/funModel.js")

const pegar = (req, res) => {
    let string = 'SELECT * FROM funcionarios'
    con.query(string, (err, result) => {
        // res.json(result);
        let array = [];
        result.forEach(element => {
            array.push(models.calculate(element))
        });
        res.json(array);
    });
}

const enviar = (req, res) => {
    //let matricula = req.body.matricula;
    let nome_completo = "\""+req.body.nome_completo+"\"";
    let data_desligamento = "\""+req.body.data_desligamento+"\"";
    let ultimo_salario =  req.body.ultimo_salario;
    let string = `INSERT INTO funcionarios (nome_completo, data_desligamento, ultimo_salario) VALUES (${nome_completo}, ${data_desligamento}, ${ultimo_salario})`
    con.query(string, (err, result) => {
        if(result.affectedRows == 1){
            res.json(models.reformJson(req.body, result.insertId));
        }else{
            res.status(400).end();
        }
    })
}

const atualizar = (req, res) => {
    let matricula = req.body.matricula;
    let nome_completo = "\""+req.body.nome_completo+"\"";
    let data_desligamento = "\""+req.body.data_desligamento+"\"";
    let ultimo_salario =  req.body.ultimo_salario;

    let string =  `UPDATE funcionarios SET nome_completo = ${nome_completo}, data_desligamento = ${data_desligamento}, ultimo_salario = ${ultimo_salario} WHERE matricula = ${matricula}`

    con.query(string, (err, result) => {
        if(result.changedRows == 1) {
            res.json(req.body)
        }else{
            res.status(404).end()
        }
    })
}

const ap = (req, res) => {
    let matricula = req.params.matricula;
    let string = `DELETE FROM funcionarios WHERE matricula = ${matricula}`
    con.query(string, (err, result) => {
        if(result.affectedRows == 1) {
            res.json(result.affectedRows)
            res.status(201).end()
            
        }else{
            res.status(404).end()
        }
    })
}

const selectID = (req, res) => {
    let matricula = req.params.matricula;
    let string = `SELECT * FROM funcionarios WHERE matricula = ${matricula}`
    con.query(string, (err, result) => {
        if(result == ""){
            res.status(404).end()
        }else{
            res.json(result)
        }
    })
}

// const select = (req, res) => {
//     let string = `SELECT * FROM funcionarios WHERE
// }

module.exports = {
    pegar, 
    enviar, 
    atualizar,
    ap,
    selectID
}