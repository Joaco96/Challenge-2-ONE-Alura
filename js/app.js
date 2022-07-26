var divInvisible = document.querySelector("#div-invisible");
var comenzarJuego = document.querySelector("#comenzar-juego");
var espLetras = document.querySelector("#espacios-caracteres");
var espGuiones = document.querySelector("#espacio-guiones");
var liLetras = document.querySelectorAll("#espacios-caracteres li");
var letrasUtil=document.querySelector('#letras-utilizadas');
var palabras = sessionStorage.getItem('nuevoArray');
var palabrasBase = ["HOMBRE","FUEGO","TELEFONO","CHOCOLATE","DIVERSIDAD","MANEJAR","LLAVES","MOSTAZA","DEPORTE","PANTALLA"];
var vidas;
 
comenzarJuego.addEventListener("click",function(){
    comenzarJuego.blur();
    if(palabras!==null){
        var indice = generarNumeroRandom();
        var palabrasSplit = palabras.split(",");
        var palabraElegida = palabrasSplit[indice];
        resetTodo();
        construirLi(palabraElegida);
    }else{
        var indice = generarNumeroRandom();
        var palabraElegida = palabrasBase[indice];
        resetTodo();
        construirLi(palabraElegida);
    }
}); 

document.addEventListener("keypress", function (tecla){
    var liLetras = document.querySelectorAll("#espacios-caracteres li");
    var caracter = tecla.key.toUpperCase();
    var validar = validacion(caracter);
    var contadorErrores = 0;
    if (validar){
        dibujarAhorcado(vidas);
        verificadorWin();
        if (vidas == 0){
            alert("Perdiste");
            resetTodo();
            return;
        } else{
            for(let i=0; i<liLetras.length;i++){
                if(liLetras[i].textContent == caracter){
                    liLetras[i].style.visibility = "visible";
                } else{
                    contadorErrores ++;
                    if (contadorErrores==liLetras.length){
                        if(verificadorWin() !== true){
                            vidas = vidas -1;
                            mostrarLetrasUtilizadas(caracter);
                        }
                    }
                }
            }
        } if (vidas ==0){
            dibujarAhorcado(vidas);
            alert("Perdiste");
            resetTodo();
            return;
        } else {verificadorWin();}
            dibujarAhorcado(vidas);
    } else{
        alert("Caracter inválido");
    }
});

function visible(){
    divInvisible.style.visibility = "visible";
}

function generarNumeroRandom(){
    if(palabras!==null){
        var palabrasSplit = palabras.split(",");
        var numero = Math.round(Math.random()*((palabrasSplit.length)-1));
        return numero;
    }else{
        var numero = Math.round(Math.random()*((palabrasBase.length)-1));
        return numero;
    }
}

function construirLi (palabra){
    var caracteres = palabra.split("");
    for(i = 0; i < caracteres.length; i++){
        var liLetras = document.createElement("li");
        var liGuiones = document.createElement("li");
        liLetras.innerHTML = caracteres[i];
        liGuiones.innerHTML = "_";
        espLetras.appendChild(liLetras);
        espGuiones.appendChild(liGuiones);
        liLetras.classList.add("invisible");
    }
}

function resetTodo(){
    espLetras.innerHTML = "";
    espGuiones.innerHTML = "";
    letrasUtil.innerHTML = "";
    vidas=7;
    dibujarAhorcado(vidas);
}
