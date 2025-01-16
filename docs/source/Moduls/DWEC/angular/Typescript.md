# Typescript

En sus inicios, JavaScript se utilizaba principalmente para la validación de formularios y otras tareas sencillas en el navegador. Sin embargo, a medida que la complejidad de las aplicaciones web aumentó, surgieron bibliotecas como jQuery y frameworks como Angular para facilitar el desarrollo de proyectos más grandes y complejos. También aparecieron herramientas diseñadas para mejorar la disciplina de programación en JavaScript, siendo TypeScript una de las más destacadas.

TypeScript es un superconjunto tipado de JavaScript que compila a JavaScript plano. Introduce características como el tipado estático, que permite detectar errores en tiempo de escritura, y ofrece autocompletado en función del tipo de variable. Además, permite utilizar métodos estáticos de programación, clases y métodos (antes de ES6).

## Problemas de JavaScript

JavaScript, en su forma nativa, presenta varios problemas que pueden dificultar el desarrollo de aplicaciones complejas:

1. **Errores por variables no definidas**: No declarar una variable puede llevar a errores difíciles de depurar.
2. **Propiedades inexistentes en objetos:** Acceder a propiedades que no existen puede causar fallos en tiempo de ejecución.
3. **Funciones de terceros:** No siempre se sabe cómo funcionan las funciones importadas, lo que puede generar problemas.
4. **Sobrescritura de variables y funciones:** La flexibilidad de JavaScript permite sobrescribir variables y funciones, lo que puede resultar en comportamientos inesperados.
 
Con la llegada de ES6, muchos de estos problemas se mitigaron, pero TypeScript proporciona una capa adicional de seguridad y eficiencia.

## Transpilación de TypeScript

Los navegadores no entienden TypeScript directamente, por lo que es necesario transpilar el código TypeScript a JavaScript. Este proceso se realiza mediante herramientas automáticas que aseguran que el código resultante sea compatible con diferentes navegadores, incluidos los más antiguos.

Consideremos el siguiente código JavaScript:

```typescript
function saludar(nombre) {
  console.table('Hola ' + nombre); // Hola John
}
const persona = {
  nombre: 'John'
};
saludar(persona.nombre);
```

El código anterior funciona, pero no proporciona garantías de tipo. No se puede asegurar que la función saludar siempre reciba un string como argumento.

Ahora veamos cómo sería el mismo código en TypeScript:

```typescript
function saludar(nombre: string) {
  console.table('Hola ' + nombre);
}
const persona = {
  nombre: 'John'
};
saludar(persona.nombre);
```

Al cambiar la extensión de .js a .ts, Visual Studio y otros editores de texto pueden identificar y señalar errores de tipo, proporcionando una experiencia de desarrollo más robusta.

## Configuración de TypeScript

Para transpilar TypeScript a JavaScript, se utiliza el comando tsc app.ts. Sin embargo, podemos configurar TypeScript para que transpile automáticamente cada vez que guardamos un archivo:

1. Inicializar TypeScript: Ejecutar `tsc --init` crea un archivo `tsconfig.json`, que puede ser utilizado tanto por tsc como por Visual Studio.
2. Transpilación Automática: Ejecutar tsc -w mantiene el proceso en espera de cambios en los archivos `.ts` para transpilar automáticamente.

Frameworks como Angular ya vienen configurados para manejar esta transpilación de manera automática, simplificando aún más el proceso de desarrollo.

## Estándares en TypeScript

TypeScript, en su archivo `tsconfig.json`, transpila por defecto de TypeScript a JavaScript ES6. Aunque nosotros podemos programar en ES6, ES5 es más compatible con navegadores antiguos y puede realizar las mismas funciones que ES6. Las novedades de ES6, como las clases, let, const, y las funciones flecha, están diseñadas para mejorar la programación y son más parecidas a las características de TypeScript.

Transpila este ejemplo sencillo para entender cómo funciona la transpilación de ES6 a ES5:

```typescript
let nombre = 'Joaquin';
if(true){
    let nombre = 'Chimo';
}
console.log(nombre);

```

En este ejemplo, let declara variables con ámbito de bloque. Cuando se transpila a ES5, `let` se convierte en `var`, que no tiene ámbito de bloque, lo que puede cambiar el comportamiento del código.

## Tipos de Datos

TypeScript asigna un tipo de datos estático en la primera asignación no explícita. Sin embargo, es más recomendable declarar explícitamente los tipos de datos, como en otros lenguajes tipados. Si necesitamos tipado dinámico, podemos usar el tipo any, aunque no es recomendable.

Ejemplos de declaración de tipos en TypeScript:
```typescript
let nombre: string = 'Joaquin';
let numero: number = 123;  // (en minúscula)
let cualquierDato: any;
let booleano: boolean;
let hoy: Date = new Date();  // Tipo clase
let persona = {
    nombre: 'Pepe',
    edad: 30
};
let personajes: string[] = [];
let p: Array<string> = [];
```

Si intentamos asignar otros datos al objeto persona, TypeScript nos ayudará a detectar errores en tiempo de escritura.

## Parámetros de las Funciones y Valores de Retorno

TypeScript nos permite definir el tipo de los parámetros de las funciones y su valor de retorno. Esto ayuda a prevenir errores y a mejorar la autocompletación en los editores de texto.

```typescript
function sumar(a: number, b: number): number {
    return a + b;
}
```

En este ejemplo, los parámetros a y b son de tipo `number`, y la función retorna un valor de tipo `number`.

## Funciones Flecha: ES6 a ES5

Las funciones flecha de ES6 ofrecen una sintaxis más concisa para escribir funciones anónimas y no tienen su propio contexto this, lo que puede ser beneficioso en muchos casos. Al transpilar a ES5, estas funciones se convierten en funciones normales.

Ejemplo de una función flecha:
```typescript
const saludar = (nombre: string): void => {
    console.log('Hola ' + nombre);
};
```
Transpilado a ES5:
```typescript
var saludar = function (nombre) {
    console.log('Hola ' + nombre);
};
```
## Promesas y Tipado en TypeScript

A continuación, se muestra un ejemplo de cómo se pueden usar promesas en TypeScript:
```typescript
(() => {
    const recogerEsencia = (cantidad: number): Promise<number> => {
        let cantidadActual = 1000;
        return new Promise((resolve, reject) => {
            if (cantidad > cantidadActual) {
                reject('No queda');
            } else {
                cantidadActual -= cantidad;
                resolve(cantidadActual);
            }
        });
    }
    recogerEsencia(500)
        .then(cantidadActual => console.log(`Queda ${cantidadActual}`))
        .catch(err => console.warn(err));
})();
```
En este ejemplo, la función recogerEsencia retorna una promesa que resuelve con la cantidad actual de esencia si hay suficiente, o rechaza con un mensaje de error si no hay suficiente. La función está tipada para retornar una Promise<number>, lo que facilita la comprensión y el mantenimiento del código.

### Transpilación a ES6

ES5 no soporta promesas de manera nativa, por lo que TypeScript no puede transpilar promesas a ES5. Para solucionar esto, debemos cambiar el objetivo de la transpilación a ES6 en el archivo tsconfig.json. Angular ya utiliza bibliotecas que permiten que las promesas funcionen incluso en ES5.
```typescript
{
    "compilerOptions": {
        "target": "ES6"
    }
}
```
## Interfaces

Las interfaces en TypeScript nos permiten definir la forma de los objetos, lo que facilita la validación y el autocompletado en tiempo de desarrollo.
```typescript
(() => {
    function enviar(persona: { nombre: string }) { // Problemático
        console.log(`Enviando a ${persona.nombre} a Arrakis`);
    }
        
    let persona = { nombre: 'Jessica', edad: 30 };
    enviar(persona);

    ///////////////////// Interfaces ///////////////////////
    interface Caracter {
        nombre: string,
        edad: number,
        familia?: string // opcional
    }

    let personaInterface: Caracter = { nombre: 'Hawat', edad: 80 };

    function enviarInterface(persona: Caracter) { // Más fácil de mantener
        console.log(`Enviando a ${persona.nombre} a Arrakis`);
    }

    enviarInterface(personaInterface);
})();
```
En este ejemplo, la interfaz Caracter define la estructura del objeto personaInterface. Usar interfaces hace que el código sea más fácil de mantener y refactorizar.

## Clases
```typescript
(() => {
    class Recolector {
        private piloto: string = 'fremen';
        constructor(
            public identificador: string, 
            public propietario: string, 
            public buenEstado: boolean = true, 
            private lugar?: string
        ) {}
    }

    let rec = new Recolector('1234', 'cofradia', true, 'desierto');
    console.log(rec.piloto);
})();
```
En este ejemplo, la clase Recolector tiene propiedades públicas y privadas, y un constructor que inicializa estas propiedades. Además, hay valores por defecto y parámetros opcionales.

En TypeScript, puedes definir los parámetros del constructor directamente en la lista de parámetros del constructor y usar modificadores de acceso (public, private, protected, readonly). Esto automáticamente crea e inicializa esos atributos en la clase, lo que elimina la necesidad de declarar y asignar manualmente estos parámetros dentro del cuerpo del constructor usando this.

Si lo transpilamos a ES5:
```typescript
var Recolector = /** @class */ (function () {
    function Recolector(identificador, propietario, buenEstado, lugar) {
        if (buenEstado === void 0) { buenEstado = true; }
        this.identificador = identificador;
        this.propietario = propietario;
        this.buenEstado = buenEstado;
        this.lugar = lugar;
    }
    return Recolector;
}());

var recolector = new Recolector('1234', 'cofradia', true, 'desierto');
```
## Decoradores

Los decoradores en TypeScript son una característica experimental que se usa extensivamente en Angular para añadir metadatos a clases y sus miembros.
```typescript
(() => {
    function imprimirConsola(constructorClase: Function) {
        console.log(constructorClase);
    }

    @imprimirConsola  // Necesita habilitar experimentalDecorators en tsconfig
    class Recolector {
        constructor(
            public identificador: string, 
            public propietario: string, 
            public buenEstado: boolean = true, 
            private lugar?: string
        ) {}
    }

    let rec = new Recolector('1234', 'cofradia', true, 'desierto');
})();
```
Para utilizar decoradores, debemos habilitar experimentalDecorators en tsconfig.json:
```typescript
{
    "compilerOptions": {
        "experimentalDecorators": true
    }
}
```
Aunque nosotros no crearemos decoradores, Angular los utiliza ampliamente para definir componentes, servicios, y otros elementos.