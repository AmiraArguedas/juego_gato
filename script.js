let tablero = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let jugadorActual = 'X';
let juegoActivo = true;

// función para manejar el clic en una celda del tablero (jugador)
function haceMovimiento(fila, col) { 

    if (tablero[fila][col] !== '') {
        alert('¡Esta celda ya está ocupada! Elige otra.');
        return; // no continuar si la celda ya está ocupada
    }

    if (juegoActivo && tablero[fila][col] === '') {
        tablero[fila][col] = jugadorActual;
        document.getElementById('board').rows[fila].cells[col].innerHTML = jugadorActual;
    }

    // verifica si hay un ganador
    if (verificarGanador(jugadorActual)) {
        document.getElementById('message').innerHTML = '¡' + jugadorActual + ' gana!';
        juegoActivo = false;
    } else {
        if (verificarEmpate()) {
            // verificar si hay empate
            document.getElementById('message').innerHTML = '¡Empate!';
            juegoActivo = false;
        } else {
            // cambiar el turno del jugador
            jugadorActual = 'O';
            document.getElementById('message').innerHTML = 'Turno de ' + jugadorActual;

            // realizar el movimiento de la máquina
            setTimeout(hacerMovimientoComputadora, 1000);
        }
    }
}

// función de manejar el movimiento de la máquina
function hacerMovimientoComputadora() {
    const movimientosDisponibles = obtenerMovimientosDisponibles();

    if (movimientosDisponibles.length > 0) {
        const indiceAleatorio = Math.floor(Math.random() * movimientosDisponibles.length);
        const movimiento = movimientosDisponibles[indiceAleatorio];

        // Actualizar el tablero con el movimiento de la máquina
        tablero[movimiento.fila][movimiento.col] = jugadorActual;
        document.getElementById('board').rows[movimiento.fila].cells[movimiento.col].innerHTML = jugadorActual;
    }

    // verificar si la máquina ha ganado
    if (verificarGanador(jugadorActual)) {
        document.getElementById('message').innerHTML = '¡La máquina ha ganado!';
        juegoActivo = false;
    } else if (verificarEmpate()) {
        // verificar si hay un empate
        document.getElementById('message').innerHTML = '¡Empate!';
        juegoActivo = false;
    } else {
        jugadorActual = 'X'; // cambiar el turno al jugador
        document.getElementById('message').innerHTML = 'Turno del jugador ' + jugadorActual;
    }
}

function reiniciarJuego() {
    // Reinicia el tablero y el mensaje
    tablero = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    juegoActivo = true;
    jugadorActual = 'X';
    document.getElementById('message').innerHTML = 'Turno de ' + jugadorActual;

    // Limpiar las celdas del tablero
    let cells = document.querySelectorAll('#board td');
    cells.forEach(cell => cell.innerHTML = '');
}

// Devuelve todos los movimientos posibles (celdas vacías)
function obtenerMovimientosDisponibles() {
    const movimientos = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (tablero[i][j] === '') {
                movimientos.push({ fila: i, col: j });
            }
        }
    }
    return movimientos;
}

// función para verificar si hay un ganador
function verificarGanador(jugador) {
    for (let index = 0; index < 3; index++) {

        // verificar filas
        if (tablero[index][0] === jugador && tablero[index][1] === jugador && tablero[index][2] === jugador) {
            return true;
        }

        // verificar columnas
        if (tablero[0][index] === jugador && tablero[1][index] === jugador && tablero[2][index] === jugador) {
            return true;
        }

        // verificar diagonales
        if (tablero[0][0] === jugador && tablero[1][1] === jugador && tablero[2][2] === jugador) {
            return true;
        }
        if (tablero[0][2] === jugador && tablero[1][1] === jugador && tablero[2][0] === jugador) {
            return true;
        }
    }
    return false;
}

// función para verificar si hay empate
function verificarEmpate() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (tablero[i][j] === '') {
                return false;
            }
        }
    }
    return true;
}
