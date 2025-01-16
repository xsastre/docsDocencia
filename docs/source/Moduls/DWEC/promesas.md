# Asincronía y Promesas

Antes de estudiar las promesas, vamos a repasar algunos conceptos sobre cómo funciona internamente el motor de javascript. De esta manera será más fácil entender cómo funcionan las promesas y cómo usarlas. 

## El Motor de JavaScript

El motor de JavaScript dentro del navegador es responsable de compilar y ejecutar el código JavaScript, manejar la pila de funciones (call stack), gestionar el alojamiento de los objetos en memoria (heap) y recolectar la basura de los objetos que ya no se necesitan. Además, proporciona una API con utilidades del navegador, red, funciones asíncronas y más. En este capítulo, exploraremos cómo funciona el motor de JavaScript, incluyendo la ejecución de código síncrono y asíncrono, y los conceptos de contexto de ejecución y pila de llamadas.

### Entorno de Ejecución

JavaScript solo puede tener un hilo de ejecución (en principio). Esto significa que si solicitamos algo al servidor de forma síncrona, toda la web se detendrá hasta que llegue la respuesta. Sin embargo, los navegadores tienen un entorno de ejecución que permite que JavaScript realice solicitudes de forma asíncrona y continúe ejecutando otras tareas. Estas peticiones asíncronas las proporciona las `web APIs` y sus respuestas pueden ser gestionadas mediante Callbacks, Promesas o Async/Await. Para entender cómo funcionan las peticiones asíncronas en JavaScript, es fundamental comprender los conceptos de Contexto de Ejecución y Pila de Llamadas.

#### Contexto de Ejecución y Pila de Llamadas

##### Contexto de Ejecución

El contexto de ejecución es el entorno en el cual JavaScript se evalúa y ejecuta. Cada vez que se ejecuta un script o se llama a una función, se crea un nuevo contexto de ejecución. Existen dos tipos principales de contextos de ejecución: el contexto global y el contexto de función.

###### Contexto de Ejecución Global

El contexto de ejecución global se crea cuando se carga una página web o un archivo JavaScript en un entorno de ejecución, como un navegador o Node.js. Este contexto es el entorno predeterminado en el que se evalúa y ejecuta el código global, es decir, cualquier código que no esté dentro de una función.



```typescript
(()=>{
let globalVar = "I am global";

function showGlobalVar() {
  console.log(globalVar); // Puede acceder a globalVar porque está en el contexto global
}

showGlobalVar(); // I am global
})()
```

    I am global

En este ejemplo, `globalVar` se define en el contexto global, y la función `showGlobalVar` puede acceder a `globalVar` porque también se encuentra en el contexto global.


###### Contexto de Ejecución de Función

Cada vez que se llama a una función, se crea un nuevo contexto de ejecución para esa función. Este contexto de ejecución incluye el ámbito léxico de la función, el objeto `this`, y una referencia al contexto de ejecución de su entorno exterior (si lo hay).




```typescript
(()=>{
let globalVar = "I am global";

function outerFunction() {
  let outerVar = "I am outer";

  function innerFunction() {
    let innerVar = "I am inner";
    console.log(globalVar); // I am global
    console.log(outerVar);  // I am outer
    console.log(innerVar);  // I am inner
  }

  innerFunction();
}

outerFunction();
})();
```

    I am global
    I am outer
    I am inner




En este ejemplo, `outerFunction` crea su propio contexto de ejecución que incluye `outerVar`. Cuando `innerFunction` se llama, se crea un nuevo contexto de ejecución que incluye `innerVar`. `innerFunction` también tiene acceso a `outerVar` y `globalVar` debido a la cadena de ámbito léxico.

##### Pila de Llamadas (Call Stack)

La pila de llamadas es una estructura de datos LIFO (Last In, First Out) que almacena los contextos de ejecución en el orden en que deben ejecutarse. Cada vez que se llama a una función, su contexto de ejecución se agrega a la pila de llamadas. Cuando la función termina, su contexto se elimina de la pila.



```typescript
(()=>{
    function first() {
      console.log("Entering first");
      second();
      console.log("Exiting first");
    }
    
    function second() {
      console.log("Entering second");
      third();
      console.log("Exiting second");
    }
    
    function third() {
      console.log("Entering third");
      // Realiza alguna tarea
      console.log("Exiting third");
    }
    
    first();
    })();
```

    Entering first
    Entering second
    Entering third
    Exiting third
    Exiting second
    Exiting first



**Análisis del Call Stack:**

1. `first()` se agrega a la pila de llamadas.
2. `console.log("Entering first")` se ejecuta dentro de `first()`.
3. `second()` se agrega a la pila de llamadas.
4. `console.log("Entering second")` se ejecuta dentro de `second()`.
5. `third()` se agrega a la pila de llamadas.
6. `console.log("Entering third")` se ejecuta dentro de `third()`.
7. `console.log("Exiting third")` se ejecuta dentro de `third()`.
8. `third()` se elimina de la pila de llamadas.
9. `console.log("Exiting second")` se ejecuta dentro de `second()`.
10. `second()` se elimina de la pila de llamadas.
11. `console.log("Exiting first")` se ejecuta dentro de `first()`.
12. `first()` se elimina de la pila de llamadas.

###### Herramientas para Analizar el Call Stack

En Firefox:

1. Presiona `F12` para abrir las herramientas de desarrollo.
2. Ve al panel de Depurador.
3. Coloca un punto de ruptura.
4. Ejecuta y analiza la pila de llamadas y el entorno de ejecución de las funciones.

También puedes usar `console.trace()` y `debugger;` en tu código para depurar y analizar el flujo de ejecución.



#### Tareas y Microtareas

JavaScript gestiona las operaciones asíncronas utilizando varias colas de tareas, cada una con una prioridad diferente. Estas colas incluyen la **cola de macrotareas** y la **cola de microtareas**.

##### Cola de Macrotareas y Microtareas

![microtasks.png](img%2Fmicrotasks.png){align="right", width="300px"}

Las **macrotareas** incluyen operaciones como los eventos del DOM, `setTimeout`, `setInterval` y otras operaciones asíncronas. Las macrotareas se gestionan en la "cola de macrotareas" y se procesan una por una.

Las **microtareas**, por otro lado, incluyen las promesas (`Promises`) y las mutaciones del DOM (a través de `MutationObserver`). Estas tareas se gestionan en la "cola de microtareas", que tiene una prioridad más alta que la de las macrotareas. Esto significa que después de cada macrotarea, el motor de JavaScript procesará todas las microtareas antes de continuar con la siguiente macrotarea.

Cuando se completa una macrotarea, el motor de JavaScript pasa a procesar todas las microtareas pendientes. Este ciclo de procesamiento asegura que las microtareas reciban atención inmediata después de cada macrotarea.


```typescript
(()=>{
let start = Date.now();

function count() {
  // Trabajo pesado
  let i = 0;
  for (let j = 0; j < 1e9; j++) {
    i++;
  }
  console.log("Done in " + (Date.now() - start) + 'ms');
}

// count();   // Esto bloquea el navegador
setTimeout(count, 0);
})();
```


1. La función `count` ejecuta una operación costosa (una larga iteración de bucle).
2. Si `count` se ejecuta directamente, bloquea el navegador porque el bucle es muy largo.
3. Utilizando `setTimeout(count, 0)`, la función `count` se coloca en la cola de macrotareas, permitiendo que el navegador procese otras tareas mientras tanto.

Este ejemplo ilustra cómo retrasar el bloqueo hasta que, por ejemplo, se ejecute todo el programa principal. Pero no soluciona el hecho de que, al final se va a quedar el navegador bloqueado, ya que se ejecutará en el único hilo de ejecución de Javascript. Si queremos tener más hilos, podemos usar `worker`. En el siguiente ejemplo se ve cómo dividir el trabajo para que, en medio, dé tiempo a renderizar o ejecutar otras tareas y microtareas como atender eventos:

##### Ejemplo de Dividir el Trabajo con `setTimeout`



```javascript
document.addEventListener("DOMContentLoaded", () => {
  let progress = document.querySelector("#progress");
  let i = 0;
  function count() {
    // Realiza una parte del trabajo pesado (*)
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e7) {
      setTimeout(count);
    }
  }
  count();
});
```

1. En lugar de hacer todo el trabajo pesado en una única ejecución, el trabajo se divide en trozos más pequeños.
2. La función `count` realiza una pequeña parte del trabajo (incrementar `i` y actualizar el texto de `progress`) antes de ceder el control al navegador con `setTimeout(count)`.
3. Esto permite que el navegador renderice el cambio en el DOM, evitando el bloqueo y ofreciendo una experiencia de usuario más fluida.

##### Código de Ejemplo con Promesas (Microtareas)




```typescript
(()=>{
  const messages = [];
  messages.push('Script start');
  setTimeout(() => {
    messages.push('SetTimeout');
    printMessages();
  }, 0);
  Promise.resolve().then(() => {
    messages.push('Promise 1');
  }).then(() => {
    messages.push('Promise 2');
  });
  messages.push('Script end');
  function printMessages() {
      console.log(messages.join('\n'));
  }
})();
```

    Done in 735ms
    Script start
    Script end
    Promise 1
    Promise 2
    SetTimeout


1. El log 'Script start' se imprime primero porque es código síncrono.
2. `setTimeout` coloca su función de callback en la cola de macrotareas.
3. La promesa se resuelve inmediatamente, colocando sus callbacks en la cola de microtareas.
4. El log 'Script end' se imprime porque es código síncrono.
5. Las microtareas (las promesas) se ejecutan antes de la macrotarea (`setTimeout`), imprimiendo 'Promise 1' y 'Promise 2'.
6. Finalmente, la función de `setTimeout` se ejecuta, imprimiendo 'SetTimeout'.

Este mecanismo de tareas y microtareas permite que JavaScript gestione de manera eficiente las operaciones asíncronas, asegurando que el código se ejecute de manera ordenada y que las tareas con mayor prioridad (microtareas) se completen antes de procesar tareas menos prioritarias (macrotareas).

## Callbacks en JavaScript

En JavaScript, un callback es una función que se pasa como argumento a otra función para que se ejecute después de que se complete alguna operación. Los callbacks son esenciales para manejar operaciones asíncronas como la comunicación con servidores, temporizadores, y eventos del DOM.
El propio lenguaje Javascript cuenta con multitud de funciones que aceptan funciones de callback, com forEach, map, filter, addEventListener... 


```typescript
(()=>{
function fetchData(callback) {
  setTimeout(() => {
    const data = { name: "John", age: 30 };
    callback(data);
  }, 3000);
}

// Ejecutar la función con un callback
fetchData(function(data) {
  console.log(data);
});

console.log("Data is being fetched...");
})();
```

    { name: "John", age: 30 }



1. La función `fetchData` toma un `callback` como argumento.
2. Dentro de `fetchData`, se usa `setTimeout` para simular una operación asíncrona que dura 3 segundos.
3. Después de 3 segundos, `setTimeout` ejecuta el `callback` pasando un objeto `data` como argumento.
4. `fetchData` se llama con una función anónima como callback que imprime el `data`.
5. Mientras `setTimeout` espera, el programa sigue ejecutando el código siguiente y muestra "Data is being fetched...".

### Callbacks en Operaciones Asíncronas

Los callbacks son útiles cuando se trabaja con operaciones asíncronas. En el siguiente ejemplo, la función `second` tiene código asíncrono que usa un callback para garantizar que la función `third` se ejecute después de que `second` haya terminado su tarea.




```typescript
(()=>{
function first() {
  console.log(1);
}

function second(callback) {
  setTimeout(() => {
    console.log(2);
    callback();
  }, 0);
}

function third() {
  console.log(3);
}

first();
second(third);
// Salida: 1 2 3
})();
```

    [33m1[39m



1. `first` imprime `1`.
2. `second` toma una función `callback` como argumento y usa `setTimeout` con un retardo de 0 milisegundos para simular una operación asíncrona.
3. `second` imprime `2` y luego llama al `callback` pasado (en este caso, `third`).
4. `third` imprime `3`.

En este ejemplo, `first` se ejecuta primero, seguido de `second` que llama a `third` después de su operación asíncrona.

### Callback Hell (Infierno de Callbacks)

El uso excesivo de callbacks puede llevar a una situación conocida como "Callback Hell" o "Pyramid of Doom", donde el código se vuelve difícil de leer y mantener debido a la anidación profunda de funciones.

```javascript
getData(function(a) {
  getMoreData(a, function(b) {
    getEvenMoreData(b, function(c) {
      getEvenEvenMoreData(c, function(d) {
        getFinalData(d, function(finalData) {
          console.log(finalData);
        });
      });
    });
  });
});
```

En este ejemplo, cada función depende de los datos obtenidos por la función anterior. Esta cadena de dependencias se anida cada vez más profundamente, resultando en un código que es difícil de mantener. 

Veamos un ejemplo de código que puede suponer un Callback Hell:

```javascript
document.addEventListener("DOMContentLoaded", () => {

    function hacerPeticion(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                callback(null, data);
            } else if (xhr.readyState === 4) {

                callback(new Error(`Error al hacer la petición a ${url}`));
            }
        };
        xhr.send();
    }

    // 2. Leer un archivo del input
    function leerArchivo(callback) {
        const inputArchivo = document.getElementById('archivoInput');
        const archivo = inputArchivo.files[0];

        if (!archivo) {
            callback(new Error('No se ha seleccionado ningún archivo'));
            return;
        }
        const lector = new FileReader();
        lector.onload = function (evento) {
            const contenido = evento.target.result;
            callback(null, contenido);
        };
        lector.onerror = function () {
            callback(new Error('Error al leer el archivo'));
        };
        lector.readAsText(archivo);
    }

    // 3. Guardar los datos en IndexedDB
    function guardarEnIndexedDB(datos, callback) {
        const solicitudDB = indexedDB.open('miBaseDeDatos', 1);

        solicitudDB.onupgradeneeded = function (evento) {
            const db = evento.target.result;
            db.createObjectStore('archivos', { keyPath: 'id', autoIncrement: true });
        };

        solicitudDB.onsuccess = function (evento) {
            const db = evento.target.result;
            const transaccion = db.transaction('archivos', 'readwrite');
            const almacen = transaccion.objectStore('archivos');

            const solicitudInsertar = almacen.add({ contenido: datos });

            solicitudInsertar.onsuccess = function () {
                callback(null, 'Datos guardados correctamente en IndexedDB');
            };

            solicitudInsertar.onerror = function () {
                callback(new Error('Error al guardar en IndexedDB'));
            };
        };

        solicitudDB.onerror = function () {
            callback(new Error('Error al abrir IndexedDB'));
        };
    }

    // Iniciamos la cadena de callbacks (Callback Hell)

    document.querySelector("#boton").addEventListener("click", (event) => {
        event.preventDefault();
        
        // 1. Petición al servidor
        hacerPeticion('http://localhost:5500/datos.json', function (error, datosServidor) {
            if (error) {
                console.error(error);
                return;
            }
            console.log('Datos recibidos del servidor:', datosServidor);
            
            // 2. Leer archivo con retraso
            setTimeout(() => {
                leerArchivo(function (error, contenidoArchivo) {
                    if (error) {
                        console.error('Error al leer el archivo:', error);
                        return;
                    }
                    console.log('Contenido del archivo leído:', contenidoArchivo);

                    // 3. Guardar los datos en IndexedDB
                    guardarEnIndexedDB(contenidoArchivo + datosServidor, function (error, mensaje) {
                        if (error) {
                            console.error('Error al guardar en IndexedDB:', error);
                            return;
                        }
                        console.log(mensaje);
                        console.log('Todas las operaciones se completaron con éxito.');
                    });
                });
            }, 1000);
        });

    });

});

```

Podemos ver que las funciones asíncronas aceptan una función de `callback`. Tenemos la función de tratamiento del evento del botón. La de hacer la petición al servidor, que hacemos con `XMLHttpRequest` para no usar promesas. Tenemos un setTimeOut que usamos para retrasar la función que le pasamos, la cual lee un fichero que el usuario ha puesto en un input. Esta función recibe como callback una en la que guardamos el resultado en una base de datos `indexedDB`. Todas son peticiones asíncronas a la API del navegador y necesitan un callback. 

Como se puede ver, mantener este código puede ser complicado. Después lo volveremos a escribir con `fetch` y con promesas y la sintaxi `async/await`y se demostrará que el código queda más límpio.  

## Promesas

Las promesas en JavaScript son objetos que representan la eventual finalización (o falla) de una operación asíncrona y su valor resultante. Proporcionan una forma de manejar operaciones asíncronas de manera más manejable y predecible, evitando los problemas del "callback hell". A continuación, exploraremos cómo funcionan las promesas y cómo pueden ser utilizadas en diferentes contextos.

Una promesa se crea (manualmente) utilizando el constructor `Promise`, que acepta una función ejecutora como argumento. Esta función ejecutora recibe dos funciones como parámetros: `resolve` y `reject`.




```typescript
(()=>{
const promise = new Promise((resolve, reject) => { // Función ejecutora
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve("Resolving an asynchronous request!");
    } else {
      reject("Rejecting an asynchronous request!");
    }
  }, 2000);
});

promise.then((response) => { //.then si se resuelve
  console.log(response);
}).catch((response) => { // .catch si falla
  console.log(response);
});
})();
```

    [33m2[39m
    [33m3[39m




### Estados de las Promesas

Las promesas pueden estar en uno de los siguientes estados:

1. **Pendiente (Pending)**: Estado inicial, la promesa aún no se ha cumplido ni ha sido rechazada.
2. **Cumplida (Fulfilled)**: La operación se completó con éxito y se resolvió la promesa.
3. **Rechazada (Rejected)**: La operación falló y la promesa fue rechazada.

En el ejemplo anterior, la promesa tiene un 50% de probabilidad de resolverse o rechazarse después de 2 segundos. Dependiendo del resultado, se ejecuta la función correspondiente en `then` o `catch`.

### Uso de Promesas

#### Promesas Síncronas y Asíncronas

Las promesas permiten retornar un objeto de forma síncrona con el que se puede trabajar, representando un valor que puede estar disponible ahora, en el futuro o nunca. Esto permite lanzar peticiones asíncronas sin bloquear la ejecución del código.




```typescript
(()=>{
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = {name: "John", age: 30};
      resolve(data);
    }, 3000);
  });
}

fetchData().then((data) => {
  console.log(data);
});

console.log("Data is being fetched...");
})();
```

    Data is being fetched...




En este ejemplo, la función `fetchData` retorna una promesa que se resuelve con datos después de 3 segundos. Mientras se espera la resolución de la promesa, el código sigue ejecutándose y se imprime "Data is being fetched...".

#### Encadenar Promesas

El método `then` de las promesas permite encadenar varias operaciones asíncronas de manera secuencial. Esto es útil cuando necesitamos ejecutar una serie de tareas asíncronas una tras otra.

```javascript
fetchData().then((data) => {
  console.log("First then:", data);
  return data.name;
}).then((name) => {
  console.log("Second then:", name);
});
```

En este ejemplo, la segunda llamada a `then` solo se ejecuta después de que la primera promesa se resuelva, garantizando un flujo secuencial de operaciones.

#### Manejo de Errores

El método `catch` se utiliza para manejar errores que ocurren durante la ejecución de una promesa. Este se puede encadenar después de uno o varios `then`.

```javascript
fetchData().then((data) => {
  console.log(data);
  throw new Error("Something went wrong!");
}).catch((error) => {
  console.log("Caught error:", error.message);
});
```

Aquí, si ocurre algún error en cualquiera de las funciones `then`, será capturado por `catch`.

#### Promise.all()

El método `Promise.all` permite ejecutar múltiples promesas en paralelo y esperar a que todas se resuelvan antes de continuar. Si alguna de las promesas se rechaza, `Promise.all` también se rechazará.




```typescript
(()=>{
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values); // [3, 42, "foo"]
});

})();
```


En este ejemplo, `Promise.all` espera a que todas las promesas se resuelvan y luego imprime los valores resueltos en un array.

#### Arrays y promesas

En ocasiones es necesario recorrer un array y generar una promesa con cada elemento del array. Las situaciones pueden ser distintas, por ejemplo:

* **No importa el orden ni si se cumplen las promesas**: Se puede ejecutar un `.forEach()` sobre el array y crear las promesas independientemente. 


```typescript
(()=>{
const array = [1, 2, 3, 4, 5];

array.forEach(item => {
  someAsyncFunction(item)
    .then(result => {
      console.log(`Result for item ${item}:`, result);
    })
    .catch(error => {
      console.error(`Error for item ${item}:`, error);
    });
});

function someAsyncFunction(item) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Processed ${item}`);
    }, Math.random() * 1000);
  });
}
})();

```



* **No importa el orden, pero queremos hacer algo si se cumplen todas**: Podemos transformar el array en un array de promesas con `.map()` y pasarlo a un `Promise.all()`.



```typescript
(()=>{
const array = [1, 2, 3, 4, 5];

const promises = array.map(item => someAsyncFunction(item));

Promise.all(promises)
  .then(results => {
    console.log('All promises resolved:', results);
  })
  .catch(error => {
    console.error('One or more promises rejected:', error);
  });

function someAsyncFunction(item) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Processed ${item}`);
    }, Math.random() * 1000);
  });
}
})();
```

    Result for item 3: Processed 3



* **Las promesas se deben ejecutar en un cierto orden**: No se puede hacer con `.forEach()` ni `.map()`, ya que no trata las promesas correctamente ni async/await. Es mejor usar un `for-of` con `async/await`.    


```typescript
(()=>{
const array = [1, 2, 3, 4, 5];

async function processArrayInOrder() {
  for (const item of array) {
    try {
      const result = await someAsyncFunction(item);
      console.log(`Result for item ${item}:`, result);
    } catch (error) {
      console.error(`Error for item ${item}:`, error);
    }
  }
}

processArrayInOrder();

function someAsyncFunction(item) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Processed ${item}`);
    }, Math.random() * 1000);
  });
}
})();
```

    All promises resolved: [
      "Processed 1",
      "Processed 2",
      "Processed 3",
      "Processed 4",
      "Processed 5"
    ]


## Async/Await en JavaScript

El uso de `async` y `await` en JavaScript ofrece una forma más concisa y legible de trabajar con promesas. Introducida en ECMAScript 2017, esta sintaxis facilita la gestión de operaciones asíncronas, permitiendo escribir código que parece síncrono mientras maneja promesas en segundo plano. 

Una función definida con la palabra clave `async` automáticamente retorna una promesa. Esto significa que incluso si la función parece devolver un valor regular, en realidad estará devolviendo una promesa que se resuelve con ese valor.

El uso de `async` y `await` en JavaScript simplifica la gestión de operaciones asíncronas, proporcionando una sintaxis más limpia y manejable en comparación con el uso tradicional de promesas con `.then()` y `.catch()`. Con la introducción del top-level `await`, ahora es posible manejar operaciones asíncronas de manera aún más directa en el nivel superior de los módulos. 




```typescript
(()=>{
async function getUser() {
  const response = await fetch('https://api.github.com/users/octocat');
  const data = await response.json();
  console.log(data);
}

// Ejecutar función asíncrona
getUser();
})();
```


1. **Definición de la función `async`**:
   ```javascript
   async function getUser() {
   ```
   Aquí, `async` antes de la función indica que esta función es asíncrona y retornará una promesa.

2. **Uso de `await`**:
   ```javascript
   const response = await fetch('https://api.github.com/users/octocat');
   const data = await response.json();
   ```
   Dentro de una función `async`, se puede usar `await` antes de una promesa para esperar su resolución. En este caso, `await fetch` espera a que la promesa devuelta por `fetch` se resuelva, es decir, que la solicitud HTTP se complete y se reciba una respuesta. Del mismo modo, `await response.json()` espera a que se procese la respuesta en formato JSON.

3. **Ejecutar la función asíncrona**:
   ```javascript
   getUser();
   ```
   Llamar a `getUser()` ejecuta la función asíncrona. Dado que `getUser` retorna una promesa, se podría encadenar con `.then()` si fuera necesario.

### Top-Level Await


Introducido en 2024, el top-level `await` permite usar `await` directamente en el nivel superior de los módulos, sin necesidad de envolver el código en una función `async`. Esto simplifica el código y mejora su legibilidad cuando se trabaja con operaciones asíncronas en el contexto global del módulo.


```javascript
const colors = fetch("../data/colors.json").then((response) => response.json());
export default await colors;
```
1. **Fetch con `await` a nivel superior**:
   ```javascript
   const colors = fetch("../data/colors.json").then((response) => response.json());
   export default await colors;
   ```
   En este ejemplo, se está utilizando `await` directamente en el nivel superior del módulo para esperar la resolución de la promesa devuelta por `fetch`. Esto permite que `colors` contenga el resultado de la operación asíncrona sin necesidad de definir una función `async`.

### Ventajas de `async`/`await`

1. **Sintaxis más limpia y legible**:
   El código asíncrono escrito con `async`/`await` es más fácil de leer y entender, ya que se parece más a código síncrono. Esto facilita la identificación de la lógica y el flujo del programa.

2. **Manejo de errores simplificado**:
   Se pueden usar bloques `try/catch` para manejar errores en funciones `async`, lo que proporciona una forma clara y estructurada de gestionar excepciones.

   



```typescript
(()=>{
   async function getUser() {
     try {
       const response = await fetch('https://api.github.com/users/octocat');
       if (!response.ok) throw new Error('Network response was not ok');
       const data = await response.json();
       console.log(data);
     } catch (error) {
       console.error('Fetching user failed:', error);
     }
   }
   getUser();
   
  })();
```


   En este ejemplo, cualquier error que ocurra dentro de la función `getUser` será capturado y manejado en el bloque `catch`.

3. **Ejecución secuencial de operaciones asíncronas**:
   Utilizando `await`, se puede asegurar que las operaciones asíncronas se ejecuten de manera secuencial, lo cual es útil cuando una operación depende de los resultados de otra.

   



```typescript
(()=>{
async function fetchData() {
     const user = await fetch('https://api.github.com/users/octocat').then(res => res.json());
     const repos = await fetch(user.repos_url).then(res => res.json());
     console.log(repos);
   }
   fetchData();
})();

```


   Aquí, la segunda solicitud `fetch` solo se ejecuta después de que la primera solicitud se haya completado y se haya obtenido la URL de los repositorios del usuario.




Veamos ahora el ejemplo largo del `callback Hell` escrito con `async/await`:

```javascript
document.addEventListener("DOMContentLoaded", () => {
    // 1. Petición al servidor utilizando Fetch y Promesas
    async function hacerPeticion(url) {
        try {
            const respuesta = await fetch(url);
            if (!respuesta.ok) {
                throw new Error(`Error al hacer la petición a ${url}. Status: ${respuesta.status}`);
            }
            const datos = await respuesta.json();
            return datos;
        } catch (error) {
            throw error;
        }
    }
    // 2. Leer un archivo del input utilizando Promesas
    function leerArchivo() {
        return new Promise((resolve, reject) => {
            const inputArchivo = document.getElementById('archivoInput');
            const archivo = inputArchivo.files[0];
            if (!archivo) {
                reject(new Error('No se ha seleccionado ningún archivo'));
                return;
            }
            const lector = new FileReader();
            lector.onload = function (evento) {
                resolve(evento.target.result);
            };
            lector.onerror = function () {
                reject(new Error('Error al leer el archivo'));
            };
            lector.readAsText(archivo);
        });
    }
    // 3. Guardar los datos en IndexedDB utilizando Promesas
    function guardarEnIndexedDB(datos) {
        return new Promise((resolve, reject) => {
            const solicitudDB = indexedDB.open('miBaseDeDatos', 1);
            solicitudDB.onupgradeneeded = function (evento) {
                const db = evento.target.result;
                db.createObjectStore('archivos', { keyPath: 'id', autoIncrement: true });
            };
            solicitudDB.onsuccess = function (evento) {
                const db = evento.target.result;
                const transaccion = db.transaction('archivos', 'readwrite');
                const almacen = transaccion.objectStore('archivos');
                const solicitudInsertar = almacen.add({ contenido: datos });
                solicitudInsertar.onsuccess = function () {
                    resolve('Datos guardados correctamente en IndexedDB');
                };
                solicitudInsertar.onerror = function () {
                    reject(new Error('Error al guardar en IndexedDB'));
                };
            };
            solicitudDB.onerror = function () {
                reject(new Error('Error al abrir IndexedDB'));
            };
        });
    }

    // Manejo del botón y ejecución secuencial de las funciones
    document.querySelector("#boton").addEventListener("click", async (event) => {
        event.preventDefault();
        try {
            // 1. Petición al servidor
            const datosServidor = await hacerPeticion('http://localhost:5500/datos.json');
            console.log('Datos recibidos del servidor:', datosServidor);

            // 2. Leer el archivo después de un retraso simulado
            await new Promise(resolve => setTimeout(resolve, 1000)); // Retraso de 1 segundo
            const contenidoArchivo = await leerArchivo();
            console.log('Contenido del archivo leído:', contenidoArchivo);

            // 3. Guardar los datos en IndexedDB
            const mensaje = await guardarEnIndexedDB(contenidoArchivo + datosServidor);
            console.log(mensaje);
            console.log('Todas las operaciones se completaron con éxito.');
        } catch (error) {
            console.error(error.message);
        }
    });
});
```

El código de las funciones no se ha complicado demasiado. De hecho, el código de la del fetch es mucho más sencillo. Estas funciones retornan una promesa a la que podemos esperar dentro de una función `async` con un `await` y hemos reducido los callback a 1, el del evento del click. 


```typescript

```
