// Declaración de las variables del juego
let playerscore = 0;
let rivalscore = 0;
let gameover = false;

//Declaramos los elementos graficos a utilizar
const playerscoreElement = document.getElementById("player-score");
const rivalscoreElement = document.getElementById("rival-score");
const playerContainer = document.getElementById("player-dice");
const rivalContainer = document.getElementById("rival-dice");
const btnTirarDado = document.getElementById("btnTirarDado");
const btnDetenerse = document.getElementById("btnDetenerse");
const btnReiniciar = document.getElementById("btnReiniciar");
const mensaje = document.getElementById("mensaje");

//Agregamos los eventos a los controles 
btnTirarDado.addEventListener('click', lanzarDice);
btnDetenerse.addEventListener('click', detenerJuego);
btnReiniciar.addEventListener('click', reiniciar);

// Reiniciamos los valores para iniciar el juego (solo una vez)
initGame();

//Funcion para inicializar las variables 
function initGame() {
    playerscore = 0;
    rivalscore = 0;
    gameover = false;
    btnTirarDado.disabled = false;
    btnDetenerse.disabled = false;
    mensaje.classList.add("d-none");
    updateScore();
    clearContainers();
}

function updateScore() {
    playerscoreElement.textContent = playerscore.toFixed(1);
    rivalscoreElement.textContent = rivalscore.toFixed(1);
}

function clearContainers() {
    playerContainer.innerHTML = "";
    rivalContainer.innerHTML = "";
}

function lanzarDice() {
    if (gameover) return;

    //Generamos el numero aleatorio para nuestro intento
    const diceValue = Math.floor(Math.random() * 10) + 1;

    const diceElement = document.createElement('div');
    diceElement.classList.add('dice');

    //Determinamos si el numero es de 1 a 6 o es figura de 7 a 10
    if (diceValue <= 6) {
        diceElement.classList.add('dice-number');
        diceElement.textContent = diceValue;
        playerscore += diceValue;
    } else {
        diceElement.classList.add('dice-shape');
        diceElement.textContent = '1/2';
        playerscore += 0.5;
    }

    playerContainer.appendChild(diceElement);
    updateScore();

    // Verificar si el jugador se pasó de 7.5
    if (playerscore > 7.5) {
        endGame("Te pasaste del límite, ¡perdiste!");
        return;
    }
}

//Funcion para detenerse
function detenerJuego() {
    if (gameover) return;

    //Deshabilitar los botones para que no continue
    btnTirarDado.disabled = true;
    btnDetenerse.disabled = true;

    turnoRival();
}

function turnoRival() {
    // Ejecutar el turno en automatico del rival con un delay
    const interval = setInterval(() => {
        if (rivalscore < playerscore && rivalscore <= 7.5) {
            const valorDado = Math.floor(Math.random() * 10) + 1;

            // Generamos el dado en pantalla
            const dadoElement = document.createElement('div');
            dadoElement.classList.add('dice');

            //Determinamos si el numero es de 1 a 6 o de 7 a 10
            if (valorDado <= 6) {
                dadoElement.classList.add('dice-number');
                dadoElement.textContent = valorDado;
                rivalscore = rivalscore + valorDado;
            } else {
                dadoElement.classList.add('dice-shape');
                dadoElement.textContent = '1/2';
                rivalscore = rivalscore + 0.5;
            }

            // Agregamos el elemento visual al contenedor
            rivalContainer.appendChild(dadoElement);
            updateScore();

            // Comprobamos si el rival se ha pasado el máximo
            if (rivalscore > 7.5) {
                clearInterval(interval);
                endGame("El rival se pasó del límite, ¡tú ganaste!");
            }
        } else {
            clearInterval(interval);
            determinarGanador();
        }
    }, 1000);
}

function determinarGanador() {
    if (playerscore > rivalscore) {
        endGame("¡Felicidades, ganaste el juego!");
    } else if (rivalscore > playerscore) {
        endGame("El rival ganó, ¡tú perdiste!");
    } else {
        endGame("¡Es un empate!");
    }
}

function endGame(message) {
    gameover = true;
    mensaje.textContent = message;
    mensaje.classList.remove("d-none");

    //Agregamos un poco de diseño con clases dependiendo del resultado
    if (message.includes("ganaste") || message.includes("Felicidades")) {
        mensaje.classList.remove("alert-danger", "alert-info");
        mensaje.classList.add("alert-success");
    } else if (message.includes("rival") || message.includes("perdiste")) {
        mensaje.classList.remove("alert-success", "alert-info");
        mensaje.classList.add("alert-danger");
    } else {
        mensaje.classList.remove("alert-success", "alert-danger");
        mensaje.classList.add("alert-info");
    }
}

function reiniciar() {
    initGame();
}