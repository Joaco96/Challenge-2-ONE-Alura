var inputNueva = document.querySelector("#input-agregar-palabra");
var palabras2 = ["HOMBRE","FUEGO","TELEFONO","CHOCOLATE","DIVERSIDAD","MANEJAR","LLAVES","MOSTAZA","DEPORTE","PANTALLA"];

function agregarPalabra(){
    var nueva = inputNueva.value.toUpperCase();
    var test = validacion(nueva);
    if(test){
        palabras2.push(nueva);
        sessionStorage.setItem("nuevoArray",palabras2);    
        if(divInvisible.style.visibility == "visible"){
            divInvisible.style.visibility = "hidden";
        }
    }else{
        alert("Cantidad o Tipo de Caracteres inválidos");
    }
}

function validacion(e) {
    if (e.length == 1){
        if (e.codePointAt() <= 90 && e.codePointAt() >= 65 || e.codePointAt() == 165) {
            return true;
        }else {
            return false;
        }
    }
    else if (e.length <= 10){
        var valid = e.split("");
        var mapeo = valid.map(function (c){
        if (c.codePointAt() <= 90 && c.codePointAt() >= 65 || c.codePointAt() == 165) {
            return true;
        }else {
            return false;
        }
        });
        var validar = mapeo.includes(false);
        return !validar;
    } else{
        return false;
    }
}

function verificadorWin(){
    var letras = document.querySelectorAll("#espacios-caracteres li");
    var contador=0;
    for (let i = 0; i < letras.length; i++) {
        if(letras[i].style.visibility=='visible'){
            contador++;
        }            
    }
    if(contador==letras.length && letras.length!==0){
        alert("Felicitaciones Ganaste");
        resetTodo();
        return true;        
    }       
}

function mostrarLetrasUtilizadas(c){
    var listaErrores= document.querySelectorAll('#letras-utilizadas li');    
    if(listaErrores.length == 0){
        var ulErrores=document.querySelector('#letras-utilizadas');
        var liErrores=document.createElement('li')
        liErrores.textContent=c;
        ulErrores.appendChild(liErrores);
            
    }else{
        var contadorLetras=0;
        for (let i = 0; i < listaErrores.length; i++) {
                
            if(listaErrores[i].textContent != c){
                contadorLetras++;
                if(contadorLetras==listaErrores.length){
                    var ulErrores=document.querySelector('#letras-utilizadas');
                    var liErrores=document.createElement('li')
                    liErrores.textContent=c;
                    ulErrores.appendChild(liErrores);
                }
            }else{
                vidas=vidas+1;
            }           
        }
    }
}

function resetTodo(){
    espLetras.innerHTML = "";
    espGuiones.innerHTML = "";
    letrasUtil.innerHTML = "";
    vidas=7;
    dibujarAhorcado(vidas);
}
