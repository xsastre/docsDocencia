---
draft: false
date: 2024-10-23T00:00:00.000Z
categories:
  - Javascript
  - DAW
  - DWEC
---

# Let o Var?

<!--[<span style="font-family:Papyrus; font-size:0.7em;">Foto de Markus Spiske </span>](https://www.pexels.com/ca-es/foto/ordinador-monitor-mostrar-exhibicio-965345/)-->

<figure markdown="span">
  ![Foto JS](../../imatges/pexels-markusspiske-965345.jpg){ width="100%" }
  <a href="https://www.pexels.com/ca-es/foto/ordinador-monitor-mostrar-exhibicio-965345/"><figcaption style="font-size:0.7em;">Foto de Markus Spiske (una mica retallada)</figcaption></a>
</figure>

**Quines són les diferències entre `let` i `var` en JavaScript?**

La tria entre `let` i `var` en JavaScript pot semblar trivial al principi, però té implicacions importants en el comportament del teu codi. Vegem les principals diferències:
<!-- more -->
### Abast (Scope)

* **var:** Té un abast funcional. Això significa que una variable declarada amb `var` dins d'una funció és accessible des de qualsevol part d'aquella funció, fins i tot si es declara dins d'un bloc (com un `if` o un `for`).
* **let:** Té un abast de bloc. Una variable declarada amb `let` només és accessible dins del bloc en què es declara. Si es declara dins d'un bloc, no estarà disponible fora d'ell.

### Redeclaració

* **var:** Pots redeclarar una variable `var` dins del mateix àmbit. La nova declaració simplement sobreescriurà l'anterior.
* **let:** No pots redeclarar una variable `let` dins del mateix àmbit. Això evitarà errors comuns i farà el teu codi més predictible.

### Hoisting [?](https://www.freecodecamp.org/espanol/news/que-es-hoisting-alzar-en-javascript/) 

* **var:** Les variables declarades amb `var` són "hoistejades", el que significa que la declaració es mou al principi de l'àmbit, fins i tot si la declaració real apareix més avall. No obstant això, el seu valor segueix sent `undefined` fins que se li assigna un valor.
* **let:** Les variables declarades amb `let` també són hoistejades, però no s'inicialitzen amb `undefined`. Si intentes utilitzar una variable `let` abans de declarar-la, obtindràs un error de referència.

### Resum de les diferències:

| Característica | var | let |
|---|---|---|
| Abast | Funcional | De bloc |
| Redeclaració | Permesa | No permesa |
| Hoisting | Sí, amb valor inicial undefined | Sí, però no s'inicialitza |

### Quan utilitzar què?

* **var:** Generalment s'evita utilitzar `var` en el JavaScript modern a causa del seu comportament menys predictible. No obstant això, pot ser útil en alguns casos específics, com quan es treballa amb codi heretat.
* **let:** És l'opció preferida per a la majoria dels casos, ja que proporciona un abast més controlat i evita errors comuns.
* **const:** Si el valor d'una variable no va a canviar, és recomanable utilitzar `const` per garantir que no es modifiqui accidentalment.

### Exemple:

```javascript
if (true) {
  var x = 10;
  let y = 20;
  const z = 30;
}

console.log(x); // Imprimeix 10 (x és accessible fora del bloc)
console.log(y); // Error: y is not defined (y només és accessible dins del bloc)
console.log(z); // Error: z is not defined (z només és accessible dins del bloc)
```

**En resum,** `let` ofereix un major control sobre l'abast de les variables i ajuda a evitar errors comuns. Per tant, és l'opció recomanada en la majoria dels casos.
