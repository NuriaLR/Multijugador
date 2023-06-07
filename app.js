let main = document.getElementsByTagName('main')[0]
let tablero = document.getElementById('tablero')

let nFilas = 10
let nColumnas = 10

let contadorJ1 = 0
let contadorJ2 = 0

tablero.classList.add('container')
tablero.addEventListener('load', inicio())


function inicio(){

    let posicionMeta = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
    let posicionJ1 = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
    let posicionJ2 = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]

    for (let i = 0; i < nFilas; i++){
        for (let j = 0; j < nColumnas; j++){
            //doy sitio y clase
            div = document.createElement('div')
            div.classList.add('card')

            //Le damos un identificador
            div.classList.add(i+ 'f');
            div.classList.add(j+'c');

            if(i == posicionMeta[0] && j == posicionMeta[1]){
                div.classList.add('objetivo')
            }
            if(i == posicionJ1[0] && j == posicionJ1[1]){
                div.classList.add('posicionJ1')
            }
            if(i == posicionJ2[0] && j == posicionJ2[1]){
                div.classList.add('posicionJ2')
            }
            tablero.appendChild(div)
        }
    }
}
document.addEventListener('keydown', mover)

/*
En la funcion mover, lo que hacemos es obtener el nombre que le proporcionamos anteriormente a las 
fichas que vamos a mover. Utilizamos el parseInt en las cuales se almacenara la poscion que se encuentran
dichas fichas.
*/
function mover(event){

    //obtenemos la posicion de ambos jugadores
    let jugador1  = document.getElementsByClassName('posicionJ1')[0]
    let jugador2  = document.getElementsByClassName('posicionJ2')[0]

    //de string a numero
    let moverJ1 = [parseInt(jugador1.classList[1]), parseInt(jugador1.classList[2])]
    let moverJ2 = [parseInt(jugador2.classList[1]), parseInt(jugador2.classList[2])]
   
    //jugador 1 -> flechas, jugador 2 -> letras
    switch(event['key']){
        //movimientos jugador1
        case 'ArrowUp':
            //Comprueba que esté dentro del cuadrado y después si el otro jugador está donde va a moverse (posición nueva)

           //limites
            if ((moverJ1[0] - 1) != -1){
                //colisiones
                if(!(moverJ1[0] - 1 == moverJ2[0] && moverJ1[1] == moverJ2[1])){
                    let arribaJ1 = document.getElementsByClassName((moverJ1[0] - 1) + 'f')[moverJ1[1]]
                    jugador1.classList.remove('posicionJ1')
                    arribaJ1.classList.add('posicionJ1')
                }
            }
            break
        case 'ArrowDown':
            if ((moverJ1[0] + 1) != 10){
                if(!(moverJ1[0] + 1 == moverJ2[0] && moverJ1[1] == moverJ2[1])){
                    let abajoJ1 = document.getElementsByClassName((moverJ1[0] + 1) + 'f')[moverJ1[1]]
                    jugador1.classList.remove('posicionJ1')
                    abajoJ1.classList.add('posicionJ1')
                }
            }
            break
        case 'ArrowLeft':
            if ((moverJ1[1] - 1) != -1){
                if(!(moverJ1[0] == moverJ2[0] && moverJ1[1] - 1 == moverJ2[1])){
                    console.log("has pulsado hacia izda");
                    let derechaJ1 = document.getElementsByClassName((moverJ1[1] - 1) + 'c')[moverJ1[0]]
                    jugador1.classList.remove('posicionJ1')
                    derechaJ1.classList.add('posicionJ1')
                }
            }
            break
        case 'ArrowRight':
            if ((moverJ1[1] + 1) != 10){
                if(!(moverJ1[0] == moverJ2[0] && moverJ1[1] + 1 == moverJ2[1])){
                    console.log("has pulsado hacia derecha");
                    let izquierdaJ1 = document.getElementsByClassName((moverJ1[1] + 1) + 'c')[moverJ1[0]]
                    jugador1.classList.remove('posicionJ1')
                    izquierdaJ1.classList.add('posicionJ1')
                }
            }
            break
        case 'w':
            if ((moverJ2[0] - 1) != -1){ 
                if(!(moverJ1[0] == moverJ2[0] - 1 && moverJ1[1] == moverJ2[1])){
                    let arribaJ2 = document.getElementsByClassName((moverJ2[0] - 1) + 'f')[moverJ2[1]]
                    jugador2.classList.remove('posicionJ2')
                    arribaJ2.classList.add('posicionJ2')
                }
            }

            break
        case 's':
            if ((moverJ2[0] + 1) != 10){
                if(!(moverJ1[0] == moverJ2[0] + 1 && moverJ1[1] == moverJ2[1])){
                    let abajoJ2 = document.getElementsByClassName((moverJ2[0] + 1) + 'f')[moverJ2[1]]
                    jugador2.classList.remove('posicionJ2')
                    abajoJ2.classList.add('posicionJ2')
                }
            }
            break
        case 'a':
            if ((moverJ2[1] - 1) != -1){
                if(!(moverJ1[0] == moverJ2[0] && moverJ1[1] == moverJ2[1] - 1)){
                    let derechaJ2 = document.getElementsByClassName((moverJ2[1] - 1) + 'c')[moverJ2[0]]
                    jugador2.classList.remove('posicionJ2')
                    derechaJ2.classList.add('posicionJ2')
                }
            }
            break
        case 'd':
            if ((moverJ2[1] + 1) != 10){
                if(!(moverJ1[0] == moverJ2[0] && moverJ1[1] == moverJ2[1] + 1)){
                    let izquierdaJ2 = document.getElementsByClassName((moverJ2[1] + 1) + 'c')[moverJ2[0]]
                    jugador2.classList.remove('posicionJ2')
                    izquierdaJ2.classList.add('posicionJ2')
                }
            }
            break
        default:
            break
    }
    //Se comprueba quien es el ganador entre el jugador 1 y jugador 2
    ganador()
}

/*
Comprueba la posición como antes entre las fichas (colisiones) pero ahora entre ficha y objetivo.
Cuando gane uno de los jugadores, aumentara su correspondiente contador y se reinicia el tablero.
*/
function ganador(){

    jugador1  = document.getElementsByClassName('posicionJ1')[0]
    jugador2  = document.getElementsByClassName('posicionJ2')[0]
    objetivo = document.getElementsByClassName('objetivo')[0]

    moverJ1 = [parseInt(jugador1.classList[1]), parseInt(jugador1.classList[2])]
    moverJ2 = [parseInt(jugador2.classList[1]), parseInt(jugador2.classList[2])]
    let posObjetivo = [parseInt(objetivo.classList[1]), parseInt(objetivo.classList[2])]

    if (moverJ1[0] == posObjetivo[0] && moverJ1[1] == posObjetivo[1]) {
        contadorJ1++
        document.getElementById('mensaje').classList.add('visible')
        document.getElementById('mensaje').innerHTML = '¡HA GANADO KOALA!'
        añadirPuntuacion()
        tablero.textContent = ""
        inicio()
    }else if (moverJ2[0] == posObjetivo[0] && moverJ2[1] == posObjetivo[1]) {
        contadorJ2 ++
        document.getElementById('mensaje').classList.add('visible')
        document.getElementById('mensaje').innerHTML = '¡HA GANADO PANDA!'
        añadirPuntuacion()
        tablero.textContent = ""
        inicio()
    }
}


//el contador va sumando a medida que se compueba quien es el ganador

function añadirPuntuacion(){
    let contadorJugador1 = document.getElementById('jugador1')
    let contadorJugador2 = document.getElementById('jugador2')

    contadorJugador1.textContent = contadorJ1
    contadorJugador2.textContent = contadorJ2
}

//Para reiniciar puntación, vuelve a 0
function botonReiniciar(){
    contadorJ1 = 0
    contadorJ2 = 0

    document.getElementById('jugador1').innerHTML = contadorJ1
    document.getElementById('jugador2').innerHTML = contadorJ2

    tablero.textContent = ""
    document.getElementById('mensaje').innerHTML = ''

    inicio()
}

boton.addEventListener('click', botonReiniciar)



