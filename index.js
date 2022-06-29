"use strict";

let input = document.getElementById("input"), // botón de entrada/salida
  number = document.querySelectorAll(".numbers div"), // botones numéricos
  operator = document.querySelectorAll(".operators div"), // botones del operador
  result = document.getElementById("result"), // botón igual
  clear = document.getElementById("clear"), // botón borrar
  resultDisplayed = false; // display para ver resultado de salida

// agregar controladores de clic a los botones numéricos
for (let i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function (e) {
    // almacenar la cadena de entrada actual y su último carácter en las variables; se usa más adelante
    let currentString = input.innerHTML;
    let lastChar = currentString[currentString.length - 1];

    // si no se muestra el resultado, sigue agregando
    if (resultDisplayed === false) {
      input.innerHTML += e.target.innerHTML;
    } else if (
      (resultDisplayed === true && lastChar === "+") ||
      lastChar === "-" ||
      lastChar === "×" ||
      lastChar === "÷"
    ) {
      // si el resultado se muestra actualmente y el usuario presionó un operador
      // necesitamos seguir agregando a la cadena para la próxima operación
      resultDisplayed = false;
      input.innerHTML += e.target.innerHTML;
    } else {
      // si el resultado se muestra actualmente y el usuario presionó un número
      // necesitamos borrar la cadena de entrada y agregar la nueva entrada para iniciar la nueva operación
      resultDisplayed = false;
      input.innerHTML = "";
      input.innerHTML += e.target.innerHTML;
    }
  });
}

// agregar controladores de clic a los botones numéricos
for (let i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function (e) {
    // almacenar la cadena de entrada actual y su último carácter en las variables; se usa más adelante
    let currentString = input.innerHTML;
    let lastChar = currentString[currentString.length - 1];

    // si el último carácter ingresado es un operador, reemplácelo con el actualmente presionado
    if (
      lastChar === "+" ||
      lastChar === "-" ||
      lastChar === "×" ||
      lastChar === "÷"
    ) {
      let newString =
        currentString.substring(0, currentString.length - 1) +
        e.target.innerHTML;
      input.innerHTML = newString;
    } else if (currentString.length == 0) {
      // si la primera tecla presionada es un operador, no hace nada 
    } else {
      // de lo contrario, simplemente agregue el operador presionado a la entrada
      input.innerHTML += e.target.innerHTML;
    }
  });
}

// al hacer clic en el botón 'igual'
result.addEventListener("click", function () {
  // esta es la cadena que procesaremos, por ejemplo. -10+26+33-56*34/23
  let inputString = input.innerHTML;

  // formando una matriz de números. por ejemplo, para la cadena anterior será: números = ["10", "26", "33", "56", "34", "23"]
  let numbers = inputString.split(/\+|\-|\×|\÷/g);

  // formando un array de operadores. para la cadena anterior será: operadores = ["+", "+", "-", "*", "/"]
  // primero reemplazamos todos los números y puntos con una cadena vacía y luego dividimos

  let operators = inputString.replace(/[0-9]|\./g, "").split("");

  console.log(inputString);
  console.log(operators);
  console.log(numbers);
  console.log("----------------------------");

  // ahora estamos recorriendo el array y haciendo una operación a la vez.
  // primero divide, luego multiplica, luego resta y luego suma
  // a medida que nos movemos estamos alterando el array original de números y operadores
  // el elemento final que queda en el array será la salida

  let divide = operators.indexOf("÷");
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }

  let multiply = operators.indexOf("×");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  let subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  let add = operators.indexOf("+");
  while (add != -1) {
    // es necesario usar parseFloat, de lo contrario resultará en una concatenación de cadenas :)
    numbers.splice(
      add,
      2,
      parseFloat(numbers[add]) + parseFloat(numbers[add + 1])
    );
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  input.innerHTML = numbers[0]; // mostrando la salida

  resultDisplayed = true; 
});

// borrar la entrada al presionar borrar
clear.addEventListener("click", function () {
  input.innerHTML = "";
});
