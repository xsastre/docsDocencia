// Utilitzam mode estrice
"use strict";


// Calcular lletraDNI
function lletraDNI(numeroDni) {
    let lletres = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
    return lletres[numeroDni % 23];
}

function funcioPrincipal() {
    let lletra;
    let cad = prompt("Posa el DNI o -1 per aturar", "12345678");
    if (cad === "-1") {
        // Utilitzam la variable global interval, aturam el setInterval
        clearInterval(interval);
        // Mostram la matriu
        alert(matriuDNIS.join(" ; "))
    }
    else {
        lletra = lletraDNI(cad);
        matriuDNIS.push(lletra);
    }
}


let interval = setInterval("funcioPrincipal();", 20000);
// [] Equivalente a new Array();
let matriuDNIS = [];
funcioPrincipal();
