const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btn5 = document.getElementById("btn5");
const btn6 = document.getElementById("btn6");
const btn7 = document.getElementById("btn7");
const btn8 = document.getElementById("btn8");
const btn9 = document.getElementById("btn9");
const btn0 = document.getElementById("btn0");
const btnComa = document.getElementById("btnComa");
const btnNeg = document.getElementById("btnNeg");

const borrar = document.getElementById("btnBorrar");
const btnMas = document.getElementById("btn+");
const btnMenos = document.getElementById("btn-");
const btnX = document.getElementById("btnX");
const btnDiv = document.getElementById("btn/");
const btnIgual = document.getElementById("btn=");

const operacion = document.getElementById("operacionPantalla");
const impResultado = document.getElementById("numeroPantalla");

let numerosSignos = [];
let numerosConcatenar = [];
let operacionPantalla = [];

let numeroIngresado = undefined;
let nuemroResultado = undefined;

let numeroHabilitados = true;
let signoHabilitado = false;
let comaHabilitada = true;
let numeroNegativo = false;
let igualHabiitado = false;
let concatenarHabilitado = true;

btn1.addEventListener("click",() => {
    if(numeroHabilitados === true){
        numerosConcatenar.push(1); 
        signoHabilitado = true; 
        igualHabiitado = true;
        concatenarHabilitado = true;
    }
});

btn2.addEventListener("click",() => {
    if(numeroHabilitados === true){
        numerosConcatenar.push(2); 
        signoHabilitado = true; 
        igualHabiitado = true;
        concatenarHabilitado = true;
    }
});

btn3.addEventListener("click",() => {
    if(numeroHabilitados === true){
        numerosConcatenar.push(3); 
        signoHabilitado = true; 
        igualHabiitado = true;
        concatenarHabilitado = true;
    }
});

btn4.addEventListener("click",() => {
    if(numeroHabilitados === true){
        numerosConcatenar.push(4); 
        signoHabilitado = true; 
        igualHabiitado = true;
        concatenarHabilitado = true;
    }
});

btn5.addEventListener("click",() => {
    if(numeroHabilitados === true){
        numerosConcatenar.push(5); 
        signoHabilitado = true; 
        igualHabiitado = true;
        concatenarHabilitado = true;
    }
});

btn6.addEventListener("click",() => {
    if(numeroHabilitados === true){
        numerosConcatenar.push(6); 
        signoHabilitado = true; 
        igualHabiitado = true;
        concatenarHabilitado = true;
    }
});

btn7.addEventListener("click",() => {
    if(numeroHabilitados === true){
        numerosConcatenar.push(7); 
        signoHabilitado = true; 
        igualHabiitado = true;
        concatenarHabilitado = true;
    }
});

btn8.addEventListener("click",() => {
    if(numeroHabilitados === true){
        numerosConcatenar.push(8); 
        signoHabilitado = true; 
        igualHabiitado = true;
        concatenarHabilitado = true;
    }
});

btn9.addEventListener("click",() => {
    if(numeroHabilitados === true){
        numerosConcatenar.push(9); 
        signoHabilitado = true; 
        igualHabiitado = true;
        concatenarHabilitado = true;
    }
});

btn0.addEventListener("click",() => {
    if(numeroHabilitados === true){
        numerosConcatenar.push(0); 
        signoHabilitado = true; 
        igualHabiitado = true;
        concatenarHabilitado = true;
    }
});

btnComa.addEventListener("click",() => {
    if(numeroHabilitados === true && comaHabilitada === true){
        numerosConcatenar.push(".");
        comaHabilitada = false; 
        signoHabilitado = true;
    }
});

btnNeg.addEventListener("click",() => {
    if(numeroHabilitados === true){
        if(numeroNegativo === false){
            btnNeg.classList.toggle("colorAlert"); 
            numeroNegativo = true;
        }
        else{
            btnNeg.classList.toggle("colorAlert"); 
            numeroNegativo = false;
        } 
    }
});

borrar.addEventListener("click",() => {
    if(numeroNegativo === true){btnNeg.classList.toggle("colorAlert"); numeroNegativo = false;}
    numerosSignos = [];
    numerosConcatenar = [];
    numeroIngresado = undefined;
    nuemroResultado = undefined;
    numeroNegativo = false;
    signoHabilitado = false;
    numeroHabilitados = true;
    concatenarHabilitado = true;
    comaHabilitada = true;
    igualHabiitado = false;
    impResultado.innerText = 0;
});

btnMas.addEventListener("click",() => {
   if(signoHabilitado === true){    
        if(concatenarHabilitado === true){concatenarNumeros();
        numerosSignos.push(numeroIngresado);
        };
        numerosSignos.push("+");
        calcular();
        numeroHabilitados = true;
        signoHabilitado = false;
    }
    if(numeroNegativo === true){
        btnNeg.classList.toggle("colorAlert"); 
        numeroNegativo = false;
    }
    comaHabilitada = true;    
});

btnMenos.addEventListener("click",() => {
    if(signoHabilitado === true){    
        if(concatenarHabilitado === true){concatenarNumeros();
        numerosSignos.push(numeroIngresado);
        };
        numerosSignos.push("-");
        calcular();
        numeroHabilitados = true;
        signoHabilitado = false;
    }
    if(numeroNegativo === true){
        btnNeg.classList.toggle("colorAlert"); 
        numeroNegativo = false;
    }
    comaHabilitada = true;
});

btnX.addEventListener("click",() => {
    if(signoHabilitado === true){    
        if(concatenarHabilitado === true){concatenarNumeros();
        numerosSignos.push(numeroIngresado);
        };
        numerosSignos.push("x");
        calcular();
        numeroHabilitados = true;
        signoHabilitado = false;
    }
    if(numeroNegativo === true){
        btnNeg.classList.toggle("colorAlert"); 
        numeroNegativo = false; 
    }
    comaHabilitada = true;
});

btnDiv.addEventListener("click",() =>{
    if(signoHabilitado === true){    
        if(concatenarHabilitado === true){concatenarNumeros();
        numerosSignos.push(numeroIngresado);
        };
        numerosSignos.push("/");
        calcular();
        numeroHabilitados = true;
        signoHabilitado = false;
    }
    if(numeroNegativo === true){
        btnNeg.classList.toggle("colorAlert"); 
        numeroNegativo = false; 
    }
    comaHabilitada = true;
});

btnIgual.addEventListener("click",() =>{
    if(igualHabiitado === true){
        if(signoHabilitado === true){ 
            igualHabiitado = false;
            concatenarNumeros();   
            concatenarHabilitado = false;
            numerosSignos.push(numeroIngresado);
            numeroHabilitados = false;
        if(numerosSignos.length === 1){impResultado.innerText = numeroIngresado};
        if(numerosSignos.length === 3){calcular(); impResultado.innerText = nuemroResultado;};
        }
    }
    if(numeroNegativo === true){
        btnNeg.classList.toggle("colorAlert"); 
        numeroNegativo = false; 
    }
    comaHabilitada = true;
});


function concatenarNumeros(){
    if(numerosConcatenar.length > 1){
        let numeroX = undefined;
        numerosConcatenar.map(numero => {
        if(numeroX === undefined){numeroX = numero;}
            else{numeroX = numeroX.toString() + numero.toString();numeroIngresado = Number(numeroX);}
        });
    numerosConcatenar = [];
    }    
    if(numerosConcatenar.length === 1){numeroIngresado = Number(numerosConcatenar[0]);numerosConcatenar = [];}  
    if(numeroNegativo === true){ 
        numeroIngresado = numeroIngresado -(numeroIngresado*2); 
        numeroNegativo = false; 
        btnNeg.classList.toggle("colorAlert");
    }    
};          
        

function sumar(num1,num2){  
  nuemroResultado = num1 + num2;
  return nuemroResultado
}

function restar(num1,num2){
   nuemroResultado = num1 - num2;
   return nuemroResultado
}

function multiplicar(num1,num2){
    nuemroResultado = num1 * num2;
    return nuemroResultado
}

function dividir(num1,num2){
    nuemroResultado = num1 / num2;
    return nuemroResultado
}  

function calcular(){ 
    console.log(numerosSignos);
    if(numerosSignos.length === 3 || numerosSignos.length === 4){
        num1 = numerosSignos[0];
        num2 = numerosSignos[2];
        switch(numerosSignos[1]){
            case "+": sumar(num1,num2);
                break;
            case "-": restar(num1,num2);
                break;
            case "x": multiplicar(num1,num2);
                break;
            case "/": dividir(num1,num2);
                break;
        };
    numerosSignos.splice(0,3,nuemroResultado);
    };
}

