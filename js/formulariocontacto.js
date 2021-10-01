let btn = document.querySelector("#btnValidar");
btn.addEventListener("click", validar);
generarCaptcha();

function validar(event) {
    event.preventDefault();
    let inputCaptcha = document.querySelector("#inputCaptcha");
    let datoUsuario = inputCaptcha.value;
    let numero = document.querySelector("#aleatorio").innerHTML;
    if (datoUsuario == numero) {
        document.querySelector("#resultadoCaptcha").innerHTML = "El captcha es correcto";
    }
    else {
        document.querySelector("#resultadoCaptcha").innerHTML = "El captcha es incorrecto";
    }
}

function generarCaptcha() {
    let random = Math.floor(Math.random() * 1000);
    document.querySelector("#aleatorio").innerHTML = Math.floor(Math.random() * 1000);
}
