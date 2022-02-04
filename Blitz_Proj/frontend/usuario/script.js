const view = document.querySelector("#alerts");
const TB = document.querySelector('tbody');
const img = document.querySelector('#imgUser');
const emailUser = document.querySelector('#emailUser');
const psw = document.querySelector('#pswUser');

const cam = document.querySelector("#cam");
const foto = document.querySelector("#foto");

const userData = JSON.parse(localStorage.getItem('userdata'))

var imagem = "";

cam.addEventListener("click", () => {
    foto.click();
});

foto.addEventListener("change", (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = (data) => {
        //console.log(data.target.result)
        imagem = data.target.result;
        img.src = imagem
    };

    reader.readAsDataURL(file);
});


function load() {
    carregarAlertas();
    carregarMeusAlertas();
    carregarDados();

}

function carregarMeusAlertas() {
    let idUser = userData.id;
    fetch("http://localhost:3000/local?id_user=" + idUser)

        .then(resp => { return resp.json() })
        .then(data => {
            data.forEach(local => {
                let tr = document.createElement("tr");
                let tdId = document.createElement("td");
                let tdCoord = document.createElement("td");
                let tdTipo = document.createElement("td");

                tdId.innerHTML = local.id;
                tdCoord.innerHTML = local.coordenadas;
                tdTipo.innerHTML = local.alertum.tipo;

                tdId.innerHTML = local.id;
                tdId.innerHTML = local.coordenadas;
                tdId.style.maxWidth = "250px";
                tdId.style.overflow = "word-break";
                tdId.innerHTML = local.alertum.tipo;

                tr.appendChild(tdId)
                tr.appendChild(tdCoord)
                tr.appendChild(tdTipo)

                TB.appendChild(tr)
            })
        })
}

function carregarAlertas() {
    let alertas = localStorage.getItem('alertas');

    fetch("http://localhost:3000/alerta")


        .then(resp => { return resp.json() })
        .then(data => {
            data.forEach(e => {
                let label = document.createElement("label");
                let checkbox = document.createElement("input");
                let alerta = document.createElement("div")

                label.innerHTML = e.tipo;
                label.for = e.id;

                checkbox.type = "checkbox"
                checkbox.name = e.id;
                
                if(alertas !== null){
                    if(alertas.includes(alerta.id)) checkbox.checked = true;
                }else{
                    checkbox.checked = true;
                }


                alerta.appendChild(checkbox);
                alerta.appendChild(label);
                view.appendChild(alerta);
            });
        })
}

function carregarDados() {
    img.src = (userData.foto !== "") ? userData.foto : '../assets/ava.png';
    emailUser.value = userData.email;

}

function atualizarDados() {
    let data = {};

    if (psw.value !== "") data.senha = md5(psw.value)
    if (emailUser !== userData.email) data.email = emailUser.value
    if (img.src !== userData.foto) data.foto = img.src

    fetch("http://localhost:3000/usuario/" + userData.id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(resp => { return resp.json() })
        .then(data => {
            if (data.length > 0) {
                localStorage.setItem('userdata', JSON.stringify(data[0]))
                window.location.reload();

            } else {
                alert("Nao foi possivrl atualizar os dados");
            }
        })
}

function mostrarMeusAlertas(e) {
    e.classList.toggle("up");
    e.parentNode.parentNode.classList.toggle("show");

}

function salvarAlertasAtivos() {
    let alertas = document.querySelector('#alerts').querySelectorAll('inputs');
    let arr = [];

    alertas.forEach(alerta => {
        if(alerta.checked === true) arr.push(alerta.name);
    });

    localStorage.setItem('alertas', arr);
    alert('Config salva')

}