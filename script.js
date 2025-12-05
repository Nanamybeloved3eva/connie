/* --------------------- ELEMENTOS --------------------- */
const splash = document.getElementById("splash");
const mainContent = document.getElementById("main");
const contadorSection = document.getElementById("contador");
const inicioSection = document.getElementById("inicio");
const cochonaSection = document.getElementById("cochona");

/* POPUPS */
const popup = document.getElementById("popup");
const lyricText = document.getElementById("lyricText");
const nextLyricBtn = document.getElementById("nextLyricBtn");
const closePopupBtn = document.getElementById("closePopupBtn");

/* BOTONES */
const irAContadorBtn = document.getElementById("ir-contador");
const irAPopupBtn = document.getElementById("ir-popup");
const volverInicioBtns = document.querySelectorAll(".volver-inicio");
const openLyricBtn = document.getElementById("openLyricBtn");

/* --------------------- MÚSICA --------------------- */
const music = new Audio("audio/may_you_never_forget_me.mp3");
music.loop = true;

const popupMusic = new Audio("audio/Ricky_Montgomery_Line_Without_A_Hook.mp3");
popupMusic.loop = false;

/* --------------------- INICIO APP --------------------- */
window.addEventListener("load", () => {
    // Ocultar splash después de 2 seg y mostrar main
    setTimeout(() => {
        splash.style.display = "none";
        mainContent.style.display = "block";
        music.play().catch(() => {
            console.log("Autoplay bloqueado, se reproducirá al tocar la pantalla.");
        });
    }, 2000);
});

// Permitir reproducir música al tocar la pantalla (móviles)
document.body.addEventListener("click", () => {
    music.play();
});

/* --------------------- FUNCIONES DE SECCIONES --------------------- */
function showSection(section) {
    // Ocultar todas las secciones
    inicioSection.style.display = "none";
    contadorSection.style.display = "none";
    cochonaSection.style.display = "none";

    // Mostrar la sección indicada
    section.style.display = "block";
    section.scrollIntoView({ behavior: "smooth" });
}

/* BOTONES DE NAVEGACIÓN */
irAContadorBtn.onclick = () => showSection(contadorSection);
irAPopupBtn.onclick = () => showSection(cochonaSection);

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
            "¡Ya cumplimos nuestro primer año juntas!";
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

/* --------------------- POPUP COCHONA --------------------- */
let currentLyric = 0;

// Aquí defines tus frases, por ejemplo:
const letras = [
"Oh, baby, I am a wreck when I'm without you", 
"I need you here to stay", 
"I broke all my bones that day I found you", 
"Crying at the lake", 
"Was it something I said to make you feel like you're a burden?", 
"Oh, and if I could take it all back", "I swear that I would pull you from the tide..."
];

openLyricBtn.onclick = () => {
    // Reinicia la letra
    currentLyric = 0;
    lyricText.textContent = letras[currentLyric];
    popup.style.display = "block";
    popupMusic.currentTime = 0;
    popupMusic.play();
};

nextLyricBtn.onclick = () => {
    currentLyric++;
    if (currentLyric < letras.length) {
        lyricText.textContent = letras[currentLyric];
    } else {
        popup.style.display = "none";
        popupMusic.pause();
        music.play();
    }
};

closePopupBtn.onclick = () => {
    popup.style.display = "none";
    popupMusic.pause();
    music.play();
};


