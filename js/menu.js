let menu = document.querySelector("#menu");
menu.addEventListener("click", show);
function show() {
    document.querySelector("#nav").classList.toggle("mostrar");
}