const reformJson = (item, matricula) => {
    item.matricula = matricula;
    return item;
}

module.exports = {
    reformJson
}