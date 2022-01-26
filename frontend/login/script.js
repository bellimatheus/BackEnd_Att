const email = document.querySelector("#email");
const senha = document.querySelector("#senha");
const cam = document.querySelector("#cam");
const foto = document.querySelector("#foto");
const login = document.querySelector("#login");
const cadastrar = document.querySelector("a");


var imagem = "";

cam.addEventListener("click", () => {
    foto.click();
})

foto.addEventListener("change", (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = (data) => {
        //console.log(data.target.result)
        imagem = data.target.result;
    }

    reader.readAsDataURL(file)
});

function con() {
    let data = JSON.stringify({
        email: email.value,
        senha: md5(senha.value),
    });
    
    fetch("http://localhost:3000/login", {
        "method": 'POST',
        "headers": {
            "Content-Type": "application/json"
        },
        "body": data
    })
    .then(resp => { return resp.json() })
    .then(data => {
        if(data.length > 0){
            localStorage.setItem("userdata", JSON.stringify(data[0]))
            window.location.href = '../mapa'
        }else{
            alert("Usuário ou senha inválidos")
        }
    })
}

function registrar(){
    let data = JSON.stringify({
        email: email.value,
        senha: md5(senha.value),
        foto: imagem
    })
    fetch("http://localhost:3000/usuario", {
        "method": 'POST',
        "headers": {
            "Content-Type": "application/json"
        },
        "body": data
    })
    .then (resp => {return resp.json})
    .then (data => {
        console.log(data);
    })

}

function cad(){ 
    login.innerHTML = "Cadastrar";
    login.onclick = registrar;
    cadastrar.hidden = true;
    cam.hidden = false
}