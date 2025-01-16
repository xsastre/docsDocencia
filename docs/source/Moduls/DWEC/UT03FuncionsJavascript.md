# Funcions a JavaScript

## Introducció

Les funcions són blocs fonamentals de codi a JavaScript. Permeten agrupar i reutilitzar codi, i són essencials per a la programació modular, estructurada i funcional.

!!! info "Amplia informació"

    Llegeix l'article [Què és una funció?](https://lenguajejs.com/javascript/introduccion/funciones-basicas/).

??? question "És el mateix un paràmetre que un argument?"

    En JavaScript, els termes "paràmetre" i "argument" sovint es confonen, però tenen significats diferents:
    
    - **Paràmetre**: És una variable que es defineix en la declaració d'una funció. Serveix com a marcador de posició per als valors que la funció rebrà quan sigui cridada. Per exemple, en la funció següent, `x` i `y` són paràmetres:
      ```javascript
      function suma(x, y) {
          return x + y;
      }
      ```
    
      - **Argument**: És el valor real que es passa a la funció quan aquesta és cridada. Els arguments substitueixen els paràmetres definits en la funció. Per exemple, en la crida següent, `5` i `3` són arguments:
        ```javascript
        let resultat = suma(5, 3);
        ```
    
    En resum, els paràmetres són les variables en la definició de la funció, mentre que els arguments són els valors que es passen a la funció quan es crida. Espero que això aclareixi la diferència! Si tens més preguntes, no dubtis a preguntar.


??? question "Què és una funció?"

    Les funcions ens permeten agrupar línies de codi en tasques amb un nom, perquè posteriorment puguem fer referència a aquest nom per realitzar tot el que s'agrupi en aquesta tasca.

??? question "És el mateix declarar una funció que executar una funció?"

    No.

!!! question "Què és un paràmetre/arguments?"

!!! question "Pot tenir una funció múltiples paràmetres? Quin és el límit?"

!!! question "Hi ha els paràmetres per defecte?"

!!! question "En què consisteix la devolució o el retorn de valors? Totes les funcions tornen alguna cosa?"

---

## Paràmetres d'una funció

Una característica notable de JavaScript és que no dóna error si crides a una funció amb més arguments dels que espera. Els arguments addicionals simplement són ignorats.

```javascript
function saludar(nom) {

    console.log("Hola, " + nom);

}

saludar("Joan", "extra"); // "Hola, Joan"
```

```text
Hola, Joan
```

L'ordre dels arguments és crucial. Els arguments s'assignen als paràmetres a l'ordre en què es passen.

Javascript, a les funcions, crea un objecte anomenant arguments que té els arguments passats, la posició com a clau i la quantitat d'arguments amb length.

```javascript
function a(){ console.log (arguments)}

a(1,2,3);
```

```text
[Arguments] { "0": 1, "1": 2, "2": 3 }

```
!!! info "Amplia informació"
    Llegeix l'article [Paràmetres d'una funció](https://lenguajejs.com/fundamentos/funciones/parametros/). 

!!! question "Quantes maneres hi ha de declarar una funció? Hi ha alguna no recomanada?"

!!! question "Com executem una funció que no té nom?"

??? question "Què és una funció anònima?"

    Llegir [apartat Funcions anònimes de Funcions](https://lenguajejs.com/javascript/fundamentos/funciones/#funciones-an%C3%B3nimas)



## Return en funcions

Les funcions poden tenir un valor de retorn o no. Si no s'especifica un return, la funció torna undefined per defecte. Les funcions només retornen un valor. Si volem retornar-ne més d'un els podem agrupar en arrays o objectes.

```javascript
function senseRetorn() {

    let missatge = "Hola";

}

function ambRetorn() {

    let missatge = "Hola";

    return missatge;

}

console.log(sinRetorno(),conRetorno());
```
```text
undefined Hola
```

## Invocació de funcions

En utilitzar parèntesis `()`, invoques a la funció. Sense parèntesis, fas referència a l'objecte que representa la funció.

## Les funcions són objectes

A JavaScript, les funcions són objectes de primera classe. Això significa que poden ser assignades a variables, passades com a arguments i tornades per altres funcions.

```javascript

function multiplicar(x, y) {

    return  x * y;

}

let operacio =  multiplicar;

console.log(operacio(2, 3)); // 6

```
```text
6

```

La capacitat de Javascript de tractar les funcions com a objectes us permet facilitar l'ús de funcions de Callback i la programació funcional, que veurem en el seu capítol.

!!! question "Què és un callback?"

??? question "Què és una funció autoexecutable?"

    Una funció autoexecutable és una funció en JavaScript que es defineix i s'executa automàticament a l'hora de ser interpretada. La seva estructura característica permet executar una funció immediatament sense necessitat de trucar-la explícitament després de la seva definició.

    La sintaxi bàsica d'una funció autoexecutable és la següent:

    ```javascript
    (function () {
        // Codi de la funció
    })();
    ```
    O bé:
    ```javascript
    (() => {
        // Codi de la funció
    })();
    ```
    Exemple amb paràmetres:
    ```javascript
    (function(nom) {
        console.log(`Hola, ${nom}!`);
    })("Joan");
    ```
    

## Declaració de funcions

Les funcions poden ser declarades de manera explícita. Aquest tipus de declaració es carrega en temps de compilació, permetent-ne l'ús abans de la declaració (hoisting).
```javascript
console.log(suma(2, 3)); // 5

function suma(a, b) {
return a + b;
}
```
```text
5
```

Les funcions també es poden definir mitjançant expressions. Aquest tipus de funció savalua en temps dexecució i no suporta hoisting.

```javascript
let restar = function(a, b) {
  return a - b;
};

console.log(restar(5, 3)); // 2
```
```text
2
```

Les expressions de funció poden ser anònimes, és a dir, no tenir nom. Com que no tenen nom, no es poden invocar a si mateixes, per la qual cosa no es poden fer recursives. Si no tenen nom i són assignades a una variable amb una expressió de funció, adquireixen el nom de la variable. Se solen utilitzar com a funcions de “Callback”, encara que no és el més recomanable perquè després compliquen la traçabilitat dels errors.
```javascript
let dividir = function(a, b) {
    return a / b;
};
console.log(dividir(10, 2)); // 5
```
```text
5
```


## Funcions fletxa

Una arrow function és una manera més abreujada/simplificada d'escriure funcions anònimes. Això les fa més complicades d'entendre fins que t'acostumes a fer servir. Aquestes són les seves principals característiques:

- **Sintaxi Concisa**: No cal utilitzar la paraula clau function, return, ni utilitzar claus {} si la funció només té una expressió.
- **Constants per Defecte**: Es recomana declarar funcions fletxa utilitzant const en lloc de var o let, ja que un cop assignades, no poden ser reassignades a un altre valor.
- **No tenen aquest propi**: A diferència de les funcions regulars, les funcions fletxa no tenen el seu propi context this. Al seu lloc, hereten el this del context en què van ser creades.
- **No són hoisted**: les funcions fletxa no són elevades (hoisted) com les funcions tradicionals. Això significa que no poden ser invocades abans de la seva declaració al codi.
- **Ús de {} i return**: Si la funció fletxa té més d'una línia de codi o més d'una instrucció, cal utilitzar claus {} i la paraula clau return explícitament.
- **No poden ser mètodes**: Com que no tenen el seu propi this, no poden ser utilitzades com a mètodes en objectes.

A continuació us mostro com passar d'una funció anònima a una funció fletxa:

```javascript
// Funció tradicional

(function (a){
    return a + 100;
});

// Desglossament de la funció fletxa

// 1. Elimina la paraula "function" i col·loca la fletxa entre l'argument i el claudàtor d'obertura.
    
(a) => {
    return a + 100;
}

// 2. Treu els claudàtors del cos i la paraula "return" — el return està implícit.

(a) => a + 100;

// 3. Suprimeix els parèntesis dels arguments

a => a + 100;

```

## Bibliografia

- [Ministeri d'Educació i Formació Professional](https://www.educacionyfp.gob.es/portada.html)
- [https://xxjcaxx.github.io/libro_dwec/desarrollofrontend.html](https://xxjcaxx.github.io/libro_dwec/desarrollofrontend.html)
- [Lloc web de Marcos Ruiz](https://marcosruiz.github.io)