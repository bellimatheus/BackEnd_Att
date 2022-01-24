const Local = require('../model/Localizacao')
const Alerta = require('../model/Alerta')
const Usuario = require('../model/Usuario')

const create = async (req, res) => {
    const data = req.body;

    const ret =  await Local.create(data)
    res.json(ret);
}

const read = async (req, res) => {
    let filtro = {}
    const id = req.params.id;

    if(id != undefined) filtro = {where : { id:id }}

    filtro.include = [
        { model: Usuario},
        { model: Alerta }
    ];
    const ret =  await Local.findAll(filtro);
    res.json(ret);
}

const remove = async (req, res) => {
    const id = req.params.id;

    const ret =  await Local.destroy({
        where : { id:id }
    })
    if (id == 1) {
        res.json(ret);
    }else{
        res.status(400)
    }
}


const update = async (req, res) => {
    const id = req.params.id;

    const data = req.body;

    let ret =  await Local.update(data, { where: { id:id } })

    ret = await Local.findAll({ where : { id:id } })
    res.json(ret);
}

module.exports = {
    create,
    read,
    update,
    remove
}
