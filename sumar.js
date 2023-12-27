const FIL = 6;
const COL = 6;
const MIN = 1;
const MAX = 10;
const CANTIDAD = (FIL-1) * (COL-1);
const ID_TABLA_SUMA = "tablaSuma";

window.addEventListener("DOMContentLoaded", main);

function main(){
    inicializarTabla();
    const btnResetear = document.getElementById("resetear");
    if(btnResetear) btnResetear.addEventListener("click", inicializarTabla);
}

function inicializarTabla(){
    const contTabla = document.getElementById("contenedorTabla");
    if(contTabla){
        const numeros = aleatorios(CANTIDAD, MIN, MAX);
        let tabla = document.getElementById(ID_TABLA_SUMA);
        if(!tabla){
        tabla = generarTabla(FIL, COL, ID_TABLA_SUMA);
        tabla.classList.add("tabla-sumar");
        } else {
            // borrar los resultados de sumar
            const celdasResultado = tabla.querySelectorAll("tr:not(:last-child) td:last-child, tr:last-child td");
            celdasResultado.forEach(element => element.textContent = "");
        }

        escribirTabla(tabla, numeros);
        tabla.addEventListener("click", sumarFilColListener);
        contTabla.appendChild(tabla);
    }
}


function generarTabla(filas = 0, columnas = 0, id = ""){
    let tabla = document.createElement("table");

    if(typeof id === 'string' && id != "") tabla.setAttribute("id", id);

    for(let i = 0; i < filas ; i++){
        let fila = document.createElement("tr");
        for(let j = 0; j < columnas; j++){
            let celda = document.createElement("td");
            fila.appendChild(celda);
        }

        tabla.appendChild(fila);
    }

    return tabla;
}


// numeros aleatorios entre un minimo y un maximo
function aleatorios(cantidad=0, min=0, max=0){

    let numeros = [];

    if(min < max){
        for(let i = 0; i < cantidad; i++){
            let numero = Math.floor(Math.random() * (max - min + 1)) + min;
            numeros.push(numero);
        }
    }

    return numeros;
}


function escribirTabla(tabla, datos = []){

    if(typeof(tabla) == "object" && tabla.tagName == 'TABLE' && Array.isArray(datos)){
        let celdas = tabla.querySelectorAll("tr:not(:last-child) td:not(:last-child)");
        let fin = datos.length > celdas.length ? celdas.length : datos.length
    
        for(let i = 0; i < fin; i++){
            if(datos[i] != null) celdas[i].textContent = datos[i];
        }
    }

}


function sumarFilColListener(e){
    let celda = e.target;

    if(celda.tagName == "TD"){
        let filaIndex = celda.parentNode.rowIndex;
        let columnaIndex = celda.cellIndex;
        if(filaIndex < FIL-1 && columnaIndex < COL-1){

            // sumar la fila
            const fila = celda.parentNode.cells;
            const numerosFila = [];
            for(let i = 0; i < fila.length-1; i++){
              numerosFila.push(parseInt(fila[i].textContent));  
            }
            fila[fila.length-1].textContent = sumar(numerosFila);

            // sumar la columna
            const columna = document.querySelectorAll(`#${ID_TABLA_SUMA} td:nth-child(${columnaIndex + 1})`);
            const numerosColumna = [];
            for(let i = 0; i < columna.length-1; i++){
              numerosColumna.push(parseInt(columna[i].textContent));  
            }
            columna[columna.length-1].textContent = sumar(numerosColumna);

        }
        
      
    }
}

function sumar(numeros = []){
    let suma = 0;

    if(Array.isArray(numeros) && numeros.every(num => Number.isInteger(num))){
        for(num of numeros){
            if(Number.isInteger(num)) suma += num;
        }
    }

    return suma;
}