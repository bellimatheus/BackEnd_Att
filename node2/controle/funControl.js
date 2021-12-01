const { con } = require("./connectionBD")

const pegar = (req, res) => {
    let string = 'SELECT * FROM funcionarios'
    con.query(string, (err, result) => {
        res.json(result);
    });
}

const enviar = (req, res) => {
    let matricula = "\""+req.body.matricula+"\"";
    let nome_completo = "\""+req.body.nome_completo+"\"";
    let data_desligamento = "\""+req.body.data_desligamento+"\"";
    let ultimo_salario = "\""+req.body.ultimo_salario+"\"";
    let string = `INSERT INTO funcionarios (matricula, nome_completo, data_desligamento, ultimo_salario) VALUES (${matricula}, ${nome_completo}, ${data_desligamento}, ${ultimo_salario})`
    con.query("SELECT * FROM funcionarios", (err, result) => {
        let i = 0;
        result.forEach(e =>{
            result.forEach(e =>{
                if(e.matricula == matricula){
                    i++;
                }
            })
        })
        if(i == result.length){
            con.query(string, (err, result) =>{
                if(err) throw err;
                res.status(200).end()
            })
        }else{
            res.status(401).end()
        }
    })
}

module.exports = {
    pegar, enviar
}