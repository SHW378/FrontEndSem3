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
btnTirarDado.addEventListener('click',lanzarDice)
btnDetenerse.addEventListener('click', detenerJuego)
btnReiniciar.addEventListener('click', reiniciar)
initGame();

// Reiniciamos los valores para iniciar el juego
initGame();

//Funcion oara inicializar las variables 
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

function updateScore(){
    playerscoreElement.textContent = playerscore.toFixed(1);
    rivalscoreElement.textContent = rivalscore.toFixed(1);
}

function clearContainers(){
    playerContainer.innerHTML = "";
    rivalContainer.innerHTML = "";
}

function lanzarDice(){
    if(gameover) return;
    
    //Generamos el numero aleatorio para nuestro intento
    const diceValue = Math.floor(Math.random() * 10) + 1;

    const diceElement = document.createElement('div');
    diceElement.classList.add('dice')
    
    //Determinamos si el numero es de 1 a 6 o es figura de 7 a 10
    if(diceValue <= 6) {
        diceElement.classList.add('dice-number');
        diceElement.textContent = diceValue;
        playerscore += diceValue 
    } else {
        diceElement.classList.add('dice-shape');
        diceElement.textContent = '1/2';
        playerscore += 0.5
    }

    playerContainer.appendChild(diceElement);
    updateScore();

}

//Funcion para detenerse
function detenerJuego(){
    if (gameover) return;

    //Deshabilitar los botones para que no continue
    btntirardado.disabled = true
    btnDetenerse.disabled = true;

    turnoRival();
}


function turnoRival() {

}

function reiniciar() {
    initGame();
}