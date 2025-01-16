# Exemples de com utilitzar prototypes en JavaScript:

### Exemple 1: Afegeix un mètode a un objecte

```javascript
function Persona(nom, edat) {
    this.nom = nom;
    this.edat = edat;
}

Persona.prototype.saluda = function() {
    console.log(`Hola, em dic ${this.nom} i tinc ${this.edat} anys.`);
};

const persona1 = new Persona('Joan', 30);
persona1.saluda(); // Hola, em dic Joan i tinc 30 anys.
```

### Exemple 2: Herència amb prototypes

```javascript
function Animal(nom) {
    this.nom = nom;
}

Animal.prototype.sona = function() {
    console.log(`${this.nom} fa un so.`);
};

function Gos(nom, raça) {
    Animal.call(this, nom);
    this.raça = raça;
}

Gos.prototype = Object.create(Animal.prototype);
Gos.prototype.constructor = Gos;

Gos.prototype.lladra = function() {
    console.log(`${this.nom} està lladrant.`);
};

const gos1 = new Gos('Rex', 'Pastor Alemany');
gos1.sona(); // Rex fa un so.
gos1.lladra(); // Rex està lladrant.
```

En el primer exemple, afegim un mètode `saluda` a l'objecte `Persona` mitjançant el seu prototype. En el segon exemple, creem una herència entre `Animal` i `Gos`, permetent que `Gos` hereti els mètodes de `Animal` i afegeixi els seus propis mètodes.

## Quan utilitzar _prototype_?

La decisió de si utilitzar `prototype` o incloure la funció dins la definició d'un objecte depèn de diversos factors.

### Quan utilitzar `prototype`:
1. **Mètodes compartits**: Si vols que tots els objectes creats a partir d'un constructor comparteixin el mateix mètode, utilitza `prototype`. Això estalvia memòria, ja que el mètode es defineix una sola vegada i es comparteix entre totes les instàncies.
    ```javascript
    function Persona(nom) {
        this.nom = nom;
    }

    Persona.prototype.saluda = function() {
        console.log(`Hola, em dic ${this.nom}.`);
    };

    const persona1 = new Persona('Joan');
    const persona2 = new Persona('Maria');
    persona1.saluda(); // Hola, em dic Joan.
    persona2.saluda(); // Hola, em dic Maria.
    ```

2. **Herència**: Quan necessites crear una jerarquia d'objectes amb herència, `prototype` és essencial per permetre que les subclasses heretin mètodes de les superclasses.
    ```javascript
    function Animal(nom) {
        this.nom = nom;
    }

    Animal.prototype.sona = function() {
        console.log(`${this.nom} fa un so.`);
    };

    function Gos(nom) {
        Animal.call(this, nom);
    }

    Gos.prototype = Object.create(Animal.prototype);
    Gos.prototype.constructor = Gos;

    Gos.prototype.lladra = function() {
        console.log(`${this.nom} està lladrant.`);
    };

    const gos1 = new Gos('Rex');
    gos1.sona(); // Rex fa un so.
    gos1.lladra(); // Rex està lladrant.
    ```

### Quan incloure la funció dins la definició d'un objecte:
1. **Mètodes específics per instància**: Si el mètode és específic per a cada instància i no es compartirà entre altres instàncies, pots definir-lo dins el constructor.
    ```javascript
    function Persona(nom) {
        this.nom = nom;
        this.saluda = function() {
            console.log(`Hola, em dic ${this.nom}.`);
        };
    }

    const persona1 = new Persona('Joan');
    const persona2 = new Persona('Maria');
    persona1.saluda(); // Hola, em dic Joan.
    persona2.saluda(); // Hola, em dic Maria.
    ```

2. **Simplicitat**: Per a objectes petits o quan no necessites herència o mètodes compartits, definir els mètodes dins el constructor pot ser més senzill i directe.

En resum, utilitza `prototype` per a mètodes compartits i herència, i defineix els mètodes dins el constructor per a mètodes específics per instància o per simplicitat. Si tens més dubtes o necessites més exemples, estic aquí per ajudar-te!