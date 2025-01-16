# Comunicación con el servidor

## AJAX en JavaScript

**Lectura recomendada:** https://developer.mozilla.org/es/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data

AJAX, acrónimo de "Asynchronous JavaScript and XML", es un conjunto de tecnologías que permite a las aplicaciones web enviar y recibir datos del servidor de manera asíncrona, sin necesidad de recargar la página completa. Esto mejora significativamente el rendimiento y la experiencia del usuario. No obstante tiene unos inconvenientes que también hay que mencionar. De esta manera, originalmente, AJAX se compone de: 

1. **JavaScript**: El lenguaje de programación que controla la interacción y el comportamiento dinámico de la página web.
2. **XHTML y CSS**: Utilizados para estructurar y estilizar la página web.
3. **XML o JSON**: Formatos de datos que se envían y reciben desde el servidor.
4. **XMLHttpRequest**: El objeto que permite a JavaScript realizar solicitudes HTTP de manera asíncrona.

> Esta es la definición original de AJAX, no obstante, aunque se puede mantener el nombre a la metodología, algunas tecnologías han mejorado. Ahora, en general, se usa `JSON` y en vez de `XMLHttpRequest` se usa `fetch`. 

Con AJAX, JavaScript puede enviar o solicitar datos en formato XML o JSON al servidor sin recargar la página. El servidor responde a estas solicitudes, generalmente a través de una API REST o similar. El cliente, usando JavaScript, procesa la respuesta y actualiza el contenido de la página dinámicamente.

### Ejemplo Básico de AJAX

#### Enviar una solicitud AJAX con `XMLHttpRequest`

```html
<!DOCTYPE html>
<html>
<head>
    <title>AJAX Example</title>
</head>
<body>
    <button id="loadData">Load Data</button>
    <div id="result"></div>

    <script>
        document.getElementById('loadData').addEventListener('click', function() {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://api.example.com/data', true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var data = JSON.parse(xhr.responseText);
                    document.getElementById('result').innerText = data.message;
                }
            };
            xhr.send();
        });
    </script>
</body>
</html>
```

En este ejemplo, cuando se hace clic en el botón "Load Data", se envía una solicitud `GET` al servidor. La respuesta, que se espera esté en formato JSON, se procesa y se muestra en el `div` con el ID "result".

> Este ejemplo se puede considerar anticuado, a partir de ES6 es mejor hacerlo con fetch y promesas. No obstante, es interesante analizar este código y entender cómo funciona. Además, fetch no permite un control a tan bajo nivel de todas las etapas de una petición, por lo que sigue siendo necesario para hacer barras de progreso, cancelar peticiones... 

### Beneficios de AJAX

- **Mejora del Rendimiento**: Al no recargar la página completa, solo se actualizan las partes necesarias, lo que resulta en una experiencia de usuario más rápida y fluida.
- **Experiencia de Usuario Mejorada**: Las actualizaciones dinámicas permiten una interacción más rápida y eficiente.

### Problemas de AJAX

- **SEO**: Las páginas que utilizan AJAX pueden ser más difíciles de indexar por los motores de búsqueda, ya que gran parte del contenido se carga de manera dinámica.
- **Complejidad en el Desarrollo**: El desarrollo de aplicaciones AJAX puede ser más complicado debido a la necesidad de manejar las solicitudes asíncronas y actualizar el DOM dinámicamente.

### APIs

La comunicación entre el cliente y el servidor en una aplicación web puede llevarse a cabo de varias maneras. Dos enfoques comunes incluyen:

1. **Solicitudes de HTML:** JavaScript puede solicitar un HTML estático o dinámico y luego insertar el resultado en la página.
2. **Interacción con APIs:** JavaScript puede enviar y recibir datos en formato XML o JSON a través de una API.

Las APIs (Interfaz de Programación de Aplicaciones) permiten que diferentes software se comuniquen entre sí. Existen varios tipos de APIs, cada una con sus propias características y casos de uso:

#### Tipos de APIs

1. **SOAP (Simple Object Access Protocol):** 
   - Es un protocolo basado en XML.
   - Conocido por su complejidad y sobrecarga debido a la utilización de XML.
   - No está optimizado para HTTP.

2. **REST (Representational State Transfer):**
   - Basado en HTTP y utiliza URLs.
   - Aprovecha los verbos HTTP (GET, POST, PUT, DELETE, PATCH).
   - Es popular por su simplicidad y eficiencia.
   
3. **GraphQL:**
   - Permite consultas más granulares y controladas.
   - Envía un JSON con la consulta en la URL.
   - Independiente del protocolo HTTP.
   - Utiliza un lenguaje de definición de esquemas (IDL).

4. **gRPC (gRPC Remote Procedure Calls):**
   - Utiliza HTTP/2, permitiendo una comunicación más eficiente.
   - Ofrece soporte para múltiples lenguajes de programación.

##### API REST

Las APIs REST utilizan las peticiones HTTP como verbos del protocolo:

- **GET:** Recuperar recursos.
- **POST:** Crear nuevos recursos.
- **PUT:** Actualizar recursos existentes.
- **DELETE:** Eliminar recursos.
- **PATCH:** Actualizar parcialmente recursos.

**Características de las APIs REST:**

- Utilizan rutas URL para identificar los recursos.
- Los códigos de respuesta HTTP indican el estado de la solicitud (por ejemplo, 200 para éxito, 404 para no encontrado, 500 para error del servidor).
- Los datos (payload) pueden enviarse en XML o JSON.
- Una API que sigue estrictamente las características REST se denomina RESTful.

**Ejemplo de API REST:**

Supongamos una API para gestionar una colección de libros:

- `GET /books`: Recupera la lista de libros.
- `POST /books`: Crea un nuevo libro.
- `GET /books/:id`: Recupera un libro específico.
- `PUT /books/:id`: Actualiza un libro específico.
- `DELETE /books/:id`: Elimina un libro específico.

##### API GraphQL

GraphQL es una alternativa a REST que permite realizar consultas más precisas y específicas. En lugar de varias URLs, una sola URL acepta consultas en JSON.

**Características de las APIs GraphQL:**

- Permiten más control y granularidad en las consultas.
- Las peticiones son fáciles de entender y leer para los humanos.
- No están limitadas a HTTP.
- Utilizan el IDL (Schema Definition Language) para definir el esquema.

**Ejemplo de API GraphQL:**

Consulta para obtener el título y autor de un libro específico:

```graphql
{
  book(id: "1") {
    title
    author
  }
}
```

##### SDKs (Kits de Desarrollo de Software)

Las APIs pueden ser complejas, y herramientas como Firebase, MongoDB Realm, y Supabase ofrecen SDKs que simplifican tareas comunes como la autenticación de usuarios y las consultas avanzadas.

**Características de los SDKs:**

- Facilitan la interacción con las APIs al proporcionar bibliotecas preconstruidas.
- Ahorra tiempo en la programación de la comunicación entre el cliente y el servidor.
- No son estándar y dependen del proveedor del servicio.

> **Nota:** Aunque los SDKs pueden simplificar mucho el trabajo, en este curso evitaremos su uso para centrarnos en aprender los fundamentos de las APIs.


### Webs SPA (Single Page Application)

Las aplicaciones de una sola página (SPA) utilizan AJAX para cargar y actualizar contenido sin necesidad de recargar la página completa. Esto permite crear aplicaciones web más rápidas y con una experiencia de usuario similar a las aplicaciones de escritorio.

#### Ejemplo de SPA con AJAX

```html
<!DOCTYPE html>
<html>
<head>
    <title>SPA Example</title>
    <style>
        .hidden { display: none; }
    </style>
</head>
<body>
    <nav>
        <button onclick="loadPage('home')">Home</button>
        <button onclick="loadPage('about')">About</button>
        <button onclick="loadPage('contact')">Contact</button>
    </nav>
    <div id="content"></div>

    <script>
        function loadPage(page) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', page + '.html', true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    document.getElementById('content').innerHTML = xhr.responseText;
                }
            };
            xhr.send();
        }
    </script>
</body>
</html>
```

En este ejemplo, cada botón en la navegación carga contenido diferente en el `div` con el ID "content" utilizando AJAX. Esto permite que la página se actualice dinámicamente sin necesidad de recargarla por completo.


### XMLHttpRequest en JavaScript

XMLHttpRequest (XHR) es una API utilizada para enviar y recibir datos entre un cliente web y un servidor. A pesar de su nombre, XMLHttpRequest puede manejar diferentes tipos de datos, aunque en este capítulo nos centraremos principalmente en JSON debido a su popularidad en las aplicaciones web modernas.

#### Inicialización y Uso Básico

Para comenzar a utilizar XMLHttpRequest, primero debemos crear una instancia del objeto `XMLHttpRequest`.

```javascript
var req = new XMLHttpRequest();
```

Una vez creado el objeto, debemos configurar la solicitud utilizando el método `open`. Este método tiene tres parámetros principales:
1. **Método HTTP**: El método de la solicitud, como 'GET' o 'POST'.
2. **URL**: La URL a la que se envía la solicitud.
3. **Asíncrono**: Un valor booleano que indica si la solicitud debe ser asíncrona (`true`) o síncrona (`false`). En la mayoría de los casos, queremos que sea asíncrona para no bloquear la ejecución del script.

```javascript
req.open('GET', 'http://www.mozilla.org/', true);
```

XMLHttpRequest tiene un conjunto de estados que indican el progreso de la solicitud. Estos estados están representados por la propiedad `readyState` del objeto XHR. Los posibles valores de `readyState` son:
- `0` (UNSENT): La solicitud no ha sido inicializada.
- `1` (OPENED): Se ha establecido la conexión con el servidor.
- `2` (HEADERS_RECEIVED): Se han recibido los encabezados de la respuesta.
- `3` (LOADING): El cuerpo de la respuesta se está recibiendo.
- `4` (DONE): La solicitud se ha completado y la respuesta está lista.

Para realizar alguna acción cuando la solicitud cambie de estado, se utiliza la propiedad `onreadystatechange`, que se asigna a una función. Esta función se ejecutará cada vez que cambie el estado de la solicitud.

```javascript
req.onreadystatechange = function (aEvt) {
  if (req.readyState == 4) {
    if (req.status == 200) {
      console.log(req.responseText);
    } else {
      console.log("Error loading page\n");
    }
  }
};
```

Finalmente, enviamos la solicitud al servidor utilizando el método `send`. Si estamos enviando datos (por ejemplo, en una solicitud `POST`), estos se pasan como argumento a `send`. En una solicitud `GET`, simplemente pasamos `null`.

```javascript
req.send(null);
```

#### Ejemplo Completo

```javascript
var req = new XMLHttpRequest();
req.open('GET', 'http://www.mozilla.org/', true);
req.onreadystatechange = function (aEvt) {
  if (req.readyState == 4) {
    if (req.status == 200) {
      console.log(req.responseText);
    } else {
      console.log("Error loading page\n");
    }
  }
};
req.send(null);
```

1. **Crear el Objeto XHR**:
   ```javascript
   var req = new XMLHttpRequest();
   ```
   Aquí se crea una nueva instancia del objeto `XMLHttpRequest`.

2. **Configurar la Solicitud**:
   ```javascript
   req.open('GET', 'http://www.mozilla.org/', true);
   ```
   Se configura la solicitud para hacer una petición `GET` a la URL especificada. El tercer parámetro, `true`, indica que la solicitud debe ser asíncrona.

3. **Monitorear Cambios de Estado**:
   ```javascript
   req.onreadystatechange = function (aEvt) {
     if (req.readyState == 4) {
       if (req.status == 200) {
         console.log(req.responseText);
       } else {
         console.log("Error loading page\n");
       }
     }
   };
   ```
   Se define una función que se ejecuta cada vez que cambia el estado de la solicitud. Cuando `readyState` es `4`, significa que la solicitud se ha completado. Si `status` es `200`, significa que la solicitud fue exitosa y se imprime la respuesta en la consola. Si el estado es diferente, se imprime un mensaje de error.

4. **Enviar la Solicitud**:
   ```javascript
   req.send(null);
   ```
   Finalmente, se envía la solicitud al servidor.


> Este capítulo ha cubierto los conceptos básicos y la implementación de XMLHttpRequest. En capítulos posteriores, exploraremos métodos modernos como `fetch` y la forma en que se integran con las características más recientes de JavaScript, como las promesas y la sintaxis `async/await`.

## Fetch

La función `fetch` de JavaScript proporciona una manera sencilla y poderosa de realizar solicitudes HTTP. Es similar a `XMLHttpRequest` (XHR), pero utiliza promesas y tiene una sintaxis más moderna y limpia.



```typescript

(()=>{
fetch('http://127.0.0.1:5500/datos.json')
 .then(
   function(response) {
     if (response.status !== 200) {
       console.log('Looks like there was a problem. Status Code: ' + response.status);
       return;     
     }
     response.json().then(function(data) {
       console.log(data);
     });
   }
 )
 .catch(function(err) {
   console.log('Fetch Error : ', err);
 });
})();
```



En este ejemplo, `fetch` solicita un archivo JSON. Si la respuesta tiene un estado diferente de 200 (OK), se imprime un mensaje de error. Si la respuesta es correcta, se convierte a JSON y se imprime.

### Objeto Response

Si la solicitud tiene éxito, `fetch` devuelve un objeto `Response`, que es un flujo (stream) con varias propiedades y métodos útiles.




```typescript
(()=>{
fetch('https://github.com/').then(function(response) {
   console.log(response.headers.get('Content-Type'));
   console.log(response.headers.get('Date'));
   console.log(response.status);
   console.log(response.statusText);
   console.log(response.type);
   console.log(response.url);
});
})();
```

    Fetch Error :  TypeError: error sending request for url (http://127.0.0.1:5500/datos.json): error trying to connect: tcp connect error: Connection refused (os error 111)
        at async mainFetch (ext:deno_fetch/26_fetch.js:170:12)
        at async fetch (ext:deno_fetch/26_fetch.js:391:7)




Este ejemplo muestra cómo acceder a diferentes propiedades del objeto `Response`, como los encabezados y el estado de la solicitud.

#### Guardar los Datos

`fetch` permite obtener el texto o un objeto de la respuesta. Las funciones `response.json()` y `response.text()` devuelven promesas que se resuelven con el contenido adecuado. No es posible usar ambas funciones en una misma petición.



```typescript

(()=>{
fetch("https://dwec-daw-default-rtdb.firebaseio.com/productos.json")
       .then(response => response.json())
       .then(data => console.log(data));

fetch("https://dwec-daw-default-rtdb.firebaseio.com/productos.json")
       .then(response => response.text())
       .then(data => console.log(data));
})();
```

    https://github.com/




En estos ejemplos, se hace una solicitud a una URL y se procesan los datos como JSON en el primer caso y como texto en el segundo.

### Encadenar Promesas

Es posible encadenar promesas para manejar el flujo de la solicitud de manera más estructurada.




```typescript
(()=>{
function showStatus(response) {
   if (response.status >= 200 && response.status < 300) {
     return Promise.resolve(response);
   } else {
     return Promise.reject(new Error(response.statusText));
   }
}

function json(response) { 
  return response.json();  
}

fetch('datos.json')
   .then(showStatus)
   .then(json)
   .then(function(data) {
     console.log('Request succeeded with JSON response', data);
   }).catch(function(error) {
     console.log('Request failed: ', error);
   });
  })();
```

    {
      "error" : "Permission denied"
    }
    




En este ejemplo, la función `status` verifica si la respuesta es correcta, y la función `json` convierte la respuesta en un objeto JSON. Luego, se manejan los datos o se capturan errores según corresponda.

### Enviar Datos con Fetch

#### Usar el método POST

Para enviar datos a un servidor, se puede usar el método `POST` con `fetch`.

```javascript
fetch(url, {
       method: 'post',
       headers: {
         "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
       },
       body: 'foo=bar&lorem=ipsum'
     })
     .then(response => response.json())
     .then(function (data) {
       console.log('Request succeeded with JSON response', data);
     })
     .catch(function (error) {
       console.log('Request failed', error);
     });
```

En este ejemplo, se envían datos codificados en la URL (formato de formulario) al servidor.

#### Enviar JSON

Para enviar datos en formato JSON, se debe configurar el encabezado `Content-Type` y convertir el objeto de datos a JSON.

```javascript
let datos = {username: 'example'};

fetch(url, {
       method: 'post',
       headers: {
         "Content-type": "application/json; charset=UTF-8"
       },
       body: JSON.stringify(datos)
     })
     .then(response => response.json())
     .then(function (data) {
       console.log('Request succeeded with JSON response', data);
     })
     .catch(function (error) {
       console.log('Request failed', error);
     });
```

En este ejemplo, un objeto JavaScript se convierte a JSON y se envía al servidor.

### Uso de FormData

`FormData` es un objeto predefinido en JavaScript que se utiliza para crear pares clave-valor para enviar formularios mediante `XMLHttpRequest` o `fetch`.

```javascript
let formElement = document.getElementById("myFormElement"); // Un formulario HTML
let formData = new FormData(formElement); // Constructor de FormData con un formulario

formData.append("serialnumber", serialNumber++); // Añadir más datos
formData.append("afile", fileInputElement.files[0]); // Añadir un archivo

fetch('http://localhost:3000/upload', { method: 'POST', body: formData });
```

Este ejemplo muestra cómo crear un objeto `FormData` a partir de un formulario HTML y enviar datos adicionales, incluyendo un archivo, al servidor.

#### Convertir FormData a JSON

Para enviar `FormData` como JSON, se puede convertir a un objeto JavaScript y luego a una cadena JSON.

```javascript
let data = new FormData(form);
let body = JSON.stringify(Object.fromEntries(data));

return fetch(url, {
   method: 'POST',
   headers: {
       "Content-type": "application/json; charset=UTF-8"
   },
   body
}).then(response => response.json());
```

En este ejemplo, se convierte `FormData` en un objeto JSON antes de enviarlo.

### Cargar Imágenes en Segundo Plano

Es posible cargar imágenes en segundo plano utilizando `fetch` y el método `blob`.

```javascript
<img src="placeholder.png" alt="${name}">

fetch(image_url)
.then(response => response.status == 200 ? response : Promise.reject(response.status))
.then(response => response.blob())
.then(imageBlob => {
   let imageURL = URL.createObjectURL(imageBlob);
   document.querySelector('img').src = imageURL;
})
.catch(error => console.log(error));
```

Este ejemplo muestra cómo cargar una imagen en segundo plano y actualizar la fuente de una etiqueta `<img>` con la URL del `blob` de la imagen.

La función URL.createObjectURL(blob) es un método del API de URL en JavaScript que permite crear una URL temporal, de tipo "blob", que representa un objeto de datos (Blob o File) en el navegador. Esta URL puede ser utilizada para acceder y manipular el contenido del objeto de datos como si fuera un archivo disponible en una URL normal. 

`URL.createObjectURL(blob)` crea una URL única que representa el objeto `Blob` (o `File`). Esta URL es válida mientras el documento que la creó esté en memoria, y se puede usar como referencia al contenido del objeto de datos. La URL generada permite acceder y manipular el contenido del `Blob` como si fuera un archivo remoto. La URL no requiere que los datos sean enviados a un servidor; todo se maneja localmente en el navegador. La URL generada puede ser asignada a elementos HTML, como `<img>`, `<video>`, `<audio>`, o cualquier otro elemento que acepte una URL de recursos. También se puede usar para descargar archivos, mostrar previsualizaciones, o procesar datos de archivos de manera local.

Las URLs creadas con `URL.createObjectURL(blob)` ocupan recursos en el navegador. Para liberar estos recursos cuando ya no se necesite la URL, se debe llamar a `URL.revokeObjectURL(url)`:

```javascript
const objectURL = URL.createObjectURL(file);
// Usar la URL...
URL.revokeObjectURL(objectURL); // Liberar la URL cuando ya no sea necesaria
```




### Construcción de URLs

`fetch` puede utilizar URLs construidas dinámicamente. Esto es útil cuando los parámetros de la consulta cambian en tiempo de ejecución.

```javascript
let country = `Saint Vincent & the Grenadines`;

fetch(`/api/cities?country=${country}`);
//"/api/cities?country=Saint Vincent & the Grenadines"

url = `/api/cities?${new URLSearchParams([['country', country]])}`;

fetch(url);
//"/api/cities?country=Saint+Vincent+%26+the+Grenadines"
```

En este ejemplo, se construye una URL con parámetros de consulta utilizando `URLSearchParams`, asegurándose de que los caracteres especiales estén correctamente codificados.


Si usamos el constructor con una URL ya formada nos retorna un objeto URLSearchParams, que es un iterable con los datos:

```javascript
const url = new URL("http://example.com/search?query=%40");
const searchParams3 = new URLSearchParams(url.search);
console.log(searchParams3.has("query")); // true
```

## WebSockets

WebSocket es una tecnología que proporciona un canal de comunicación full-duplex sobre un único socket TCP. Es decir, permite establecer una conexión persistente entre el cliente y el servidor, donde ambos pueden enviar y recibir datos en tiempo real. Esto es especialmente útil para aplicaciones que requieren comunicación bidireccional constante, como chats en línea, notificaciones en tiempo real, y juegos multijugador.

A continuación, analizamos un ejemplo de uso de WebSocket en JavaScript.

### Establecer una Conexión WebSocket

```javascript
let socket = new WebSocket("ws://localhost:8080");
```

Esta línea crea una nueva instancia de WebSocket, abriendo una conexión a la URL proporcionada. En este caso, la URL es `"ws://localhost:8080"`, lo que indica que se está intentando conectar a un servidor WebSocket que está ejecutándose en `localhost` en el puerto `8080`.

### Manejadores de Eventos

#### Evento `open`

```javascript
socket.addEventListener("open", function(event) {
   console.log("Conexión establecida.");
   socket.send("¡Hola, servidor!");
});
```

El evento `open` se dispara cuando la conexión WebSocket se ha establecido con éxito. En este manejador, se imprime un mensaje en la consola indicando que la conexión se ha establecido, y se envía un mensaje al servidor utilizando `socket.send("¡Hola, servidor!");`.

#### Evento `message`

```javascript
socket.addEventListener("message", function(event) {
   console.log("Mensaje recibido del servidor: " + event.data);
});
```

El evento `message` se dispara cada vez que el cliente recibe datos del servidor. El objeto `event` contiene la propiedad `data`, que almacena los datos recibidos. En este manejador, los datos recibidos se imprimen en la consola.

#### Evento `error`

```javascript
socket.addEventListener("error", function(error) {
   console.log("Error en la conexión: " + error);
});
```

El evento `error` se dispara cuando ocurre un error en la comunicación WebSocket. En este manejador, el error se imprime en la consola.

#### Evento `close`

```javascript
socket.addEventListener("close", function(event) {
   console.log("Conexión cerrada. Código: " + event.code);
});
```

El evento `close` se dispara cuando la conexión WebSocket se cierra. El objeto `event` contiene una propiedad `code`, que indica el código de cierre de la conexión. En este manejador, se imprime un mensaje en la consola indicando que la conexión se ha cerrado y mostrando el código de cierre.

## Tratamiento de los Datos

En las aplicaciones web modernas, es común recibir datos del servidor en formato JSON, que es un formato ligero para el intercambio de datos. JavaScript proporciona herramientas potentes para trabajar con JSON, permitiendo convertir objetos en JSON y viceversa. Además, también es importante poder almacenar datos en el lado del cliente para mejorar la experiencia del usuario. En este capítulo, exploraremos cómo convertir objetos a JSON y cómo trabajar con almacenamiento en el lado del cliente, incluyendo cookies y LocalStorage.

### Convertir Objetos a JSON

JavaScript permite convertir objetos en cadenas JSON utilizando el método `JSON.stringify`. Este método es útil cuando necesitamos enviar datos al servidor o almacenarlos en el lado del cliente.




```typescript
(()=>{
class Apple {
  constructor(type){
     this.type = type;
     this.color = "red";
  }
}
let  apple1 = new Apple('Golden'); // Se crea una instancia
let appleJson = JSON.stringify(apple1);
console.log(appleJson);
})();
```

    {"type":"Golden","color":"red"}




En este ejemplo:
1. **Definimos una clase `Apple`** que tiene un constructor que inicializa el tipo y el color de la manzana.
2. **Creamos una instancia** de `Apple` con el tipo 'Golden'.
3. **Convertimos la instancia en una cadena JSON** usando `JSON.stringify`.
4. **Imprimimos la cadena JSON** resultante en la consola.

El resultado en la consola será: `{"type":"Golden","color":"red"}`, que es la representación JSON del objeto `apple1`.

### Convertir JSON a Objetos

Para convertir una cadena JSON en un objeto de JavaScript, utilizamos el método `JSON.parse`. Esto es útil cuando recibimos datos del servidor en formato JSON y necesitamos trabajar con ellos en nuestro código.




```typescript
(()=>{
class Hero {
  constructor(name, car){
     this.name = name;
     this.car = car;
  }
}
let heroJSON = '{"name":"Max","car":"V8"}';
let heroObject = JSON.parse(heroJSON);
let heroClass = Object.assign(new Hero, heroObject);
console.log(heroObject, heroClass);
})();
```

    { name: "Max", car: "V8" } Hero { name: "Max", car: "V8" }


En este ejemplo:
1. **Definimos una clase `Hero`** que tiene un constructor que inicializa el nombre y el coche del héroe.
2. **Creamos una cadena JSON** que representa un héroe.
3. **Convertimos la cadena JSON en un objeto** usando `JSON.parse`.
4. **Asignamos las propiedades del objeto JSON** a una nueva instancia de `Hero` usando `Object.assign`.
5. **Imprimimos el objeto JSON y la instancia de `Hero`** en la consola.

El resultado en la consola mostrará el objeto plano y la instancia de `Hero` con las propiedades correspondientes.

### Conversión de binarios para enviar como JSON

Si se necesita enviar un binario dentro de un mensaje JSON, podemos convertirlo a Base64:

```javascript
document.getElementById('fileForm').addEventListener('submit', event => {
    event.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('loadend', () => {
        const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
        const jsonData = {
            fileName: file.name,
            fileType: file.type,
            fileData: base64String
        };

        fetch('/upload-json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    });

    reader.readAsDataURL(file);
});

```

## Almacenamiento en el Lado del Cliente

### Cookies

Las cookies son pequeños fragmentos de datos almacenados en el navegador del usuario. Son útiles para almacenar información persistente que debe enviarse con cada solicitud HTTP al servidor, como sesiones de usuario.

#### Ejemplo

```javascript
document.cookie = "username=John Doe; expires=Thu, 18 Dec 2021 12:00:00 UTC; path=/;";
```

En este ejemplo:
1. **Creamos una cookie** llamada `username` con el valor `John Doe`.
2. **Establecemos una fecha de expiración** para la cookie.
3. **Definimos el `path`** para especificar la ruta en la que la cookie está disponible.

### Manipular Cookies

```javascript
var x = document.cookie;  // Leer todas las cookies
document.cookie = "username=John Smith; expires=Thu, 18 Dec 2021 12:00:00 UTC; path=/;";  // Modificar una cookie
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";  // Borrar una cookie
```

En este ejemplo:
1. **Leemos todas las cookies** disponibles.
2. **Modificamos la cookie `username`**.
3. **Borramos la cookie `username`** estableciendo una fecha de expiración pasada.

Para una gestión más avanzada de cookies, se recomienda utilizar las funciones proporcionadas por la W3C: [W3Schools - Cookies](https://www.w3schools.com/js/js_cookies.asp).

### LocalStorage

LocalStorage permite almacenar datos en el navegador de forma persistente. Los datos persisten incluso después de cerrar el navegador.

#### Ejemplo

```javascript
// Guardar
localStorage.setItem("lastname", "Smith");
// Obtener
var lastname = localStorage.getItem("lastname");
// Borrar
localStorage.removeItem("lastname");
```

En este ejemplo:
1. **Guardamos un valor** con la clave `lastname` en LocalStorage.
2. **Recuperamos el valor** almacenado usando la clave `lastname`.
3. **Eliminamos el valor** asociado a la clave `lastname`.

### IndexedDB

IndexedDB es una API de bajo nivel para almacenar grandes cantidades de datos estructurados. Es una base de datos transaccional y asíncrona que permite almacenar archivos y realizar búsquedas avanzadas.

#### Características de IndexedDB

- **Hasta 50MB** de almacenamiento.
- **API asíncrona** para operaciones de lectura y escritura.
- **Transaccional** para garantizar la integridad de los datos.
- **Más compleja** que LocalStorage.

### Ejemplo Básico de IndexedDB

IndexedDB es más compleja de manejar que LocalStorage o cookies, pero ofrece muchas más capacidades. Aquí presentamos un ejemplo muy básico para ilustrar su uso:

```javascript
let request = indexedDB.open("myDatabase", 1);

request.onupgradeneeded = function(event) {
  let db = event.target.result;
  let objectStore = db.createObjectStore("customers", { keyPath: "id" });
  objectStore.createIndex("name", "name", { unique: false });
  objectStore.createIndex("email", "email", { unique: true });
};

request.onsuccess = function(event) {
  let db = event.target.result;
  let transaction = db.transaction(["customers"], "readwrite");
  let objectStore = transaction.objectStore("customers");
  let request = objectStore.add({ id: 1, name: "John Doe", email: "john.doe@example.com" });

  request.onsuccess = function(event) {
    console.log("Customer added to the database");
  };

  request.onerror = function(event) {
    console.log("Error adding customer: ", event.target.error);
  };
};
```

En este ejemplo:
1. **Abrimos una conexión a IndexedDB** y, si es la primera vez, se crea o actualiza la base de datos.
2. **Definimos un `objectStore`** para almacenar datos de clientes con un índice para `name` y `email`.
3. **Añadimos un cliente** a la base de datos dentro de una transacción y manejamos los eventos de éxito y error.


```typescript

```
