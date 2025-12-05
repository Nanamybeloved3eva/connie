/* --------------------- ELEMENTOS --------------------- */

const splash = document.getElementById("splash");
const mainContent = document.getElementById("main");
const contadorSection = document.getElementById("contador");
const galeriaSection = document.getElementById("galeria");
const inicioSection = document.getElementById("inicio");

/* Pop-up */
const popup = document.getElementById("popup");
const popupText = document.getElementById("popup-text");
const popupBtn = document.getElementById("popup-next");

/* Botones */
const irAContadorBtn = document.getElementById("ir-contador");
const irAGaleriaBtn = document.getElementById("ir-galeria");
const irAPopupBtn = document.getElementById("ir-popup");
const volverInicioBtns = document.querySelectorAll(".volver-inicio");

/* --------------------- MÚSICA --------------------- */

let music = new Audio("audio/may_you_never_forget_me.mp3");
music.loop = true;

let popupMusic = new Audio("audio/Ricky_Montgomery_Line_Without_A_Hook.mp3");
popupMusic.loop = false;

/* Inicia música después del splash */
window.addEventListener("load", () => {
    setTimeout(() => {
        music.play().catch(() => {
            console.log("Autoplay bloqueado, se reproducirá al tocar la pantalla.");
        });
    }, 2000);
});

/* Reproducir si el usuario toca (para desbloquear autoplay en móviles) */
document.body.addEventListener("click", () => {
    music.play();
});

/* --------------------- VISUALIZACIÓN DE SECCIONES --------------------- */

function showSection(section) {
    inicioSection.style.display = "none";
    contadorSection.style.display = "none";
    galeriaSection.style.display = "none";

    section.style.display = "block";
    section.scrollIntoView({ behavior: "smooth" });
}

irAContadorBtn.onclick = () => showSection(contadorSection);
irAGaleriaBtn.onclick = () => showSection(galeriaSection);

volverInicioBtns.forEach(btn => {
    btn.onclick = () => showSection(inicioSection);
});

/* --------------------- CONTADOR --------------------- */

function actualizarContador() {
    const fechaMeta = new Date("2025-09-04T00:00:00");
    const ahora = new Date();
    const diff = fechaMeta - ahora;

    if (diff <= 0) {
        document.getElementById("contador-text").innerHTML =
            "¡Ya cumplimos nuestro primer año juntas! 💚✨";
        return;
    }

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diff / (1000 * 60)) % 60);
    const segundos = Math.floor((diff / 1000) % 60);

    document.getElementById("contador-text").innerHTML =
        `${dias} días, ${horas} horas, ${minutos} min, ${segundos} seg`;

    setTimeout(actualizarContador, 1000);
}

actualizarContador();

/* --------------------- POPUP TIPO ERROR --------------------- */

const letras = [
    "Oh, baby, I am a wreck when I'm without you",
    "I need you here to stay",
    "I broke all my bones that day I found you",
    "Crying at the lake",
    "Was it something I said to make you feel like you're a burden?",
    "Oh, and if I could take it all back",
    "I swear that I would pull you from the tide..."

];

function mostrarPopupError() {
  const popup = document.getElementById("popup-error");
  const letra = document.getElementById("letra-random");
  
  // Selecciona una frase al azar
  const randomIndex = Math.floor(Math.random() * letras.length);
  letra.textContent = letras[randomIndex];

  // Muestra el popup
  popup.style.display = "flex";
  music.pause();
  popupMusic.currentTime = 0;
  popupMusic.play();


  // Oculta automáticamente después de 4 segundos
  setTimeout(() => {
  popup.style.display = "none";
  popupMusic.pause();
  music.play();
}, 4000);

}

document.getElementById("btn-error").addEventListener("click", mostrarPopupError);

window.onload = () => {
  document.body.classList.add("mostrar");
};

