# Exercici Gestió Botiga

## **Gestió d'una botiga en línia amb productes i categories**

### Enunciat:

**Crea una aplicació PHP que simuli una botiga en línia. L'aplicació ha de permetre:**

* **Crear productes Cada producte tindrà un nom, una descripció, un preu i una categoria.**
* **Crear categories: Cada categoria tindrà un nom i una descripció.**
* **Assignar productes a categories: Un producte pot pertànyer a una o més categories.**
* **Mostrar una llista de productes: El llistat ha de permetre filtrar per categoria.**
* **Mostrar el detall d'un producte: En seleccionar un producte, es mostrarà tota la informació, incloent-hi les categories a què pertany.**

### Estructura del projecte:

* **index.php:**
    * Conté el codi principal del programa.
    * Inclou les dades inicials (productes, categories).
    * Truca a les funcions definides al fitxer `funcions.php` per fer les operacions.
* **funcions.php:**
    * Conté totes les funcions necessàries per gestionar els productes i les categories.

**index.php (exemple):**

``` php
<?php

require_once 'funcions.php';

// Dades inicials (exemple)

$producte1 = crearProducte('Samarreta', 'Samarreta de cotó', 19.99);

$producte2 = crearProducte('Pantalons', 'Pantalons vaquer', 39.99);

$categoria1 = crearCategoria('Roba', 'Secció de roba');

$categoria2 = crearCategoria('Home', 'Productes per a home');

agregarCategoriaAProducte($producte1, $categoria1);

agregarCategoriaAProducte($producte1, $categoria2);

agregarCategoriaAProducte($producte2, $categoria1);

// Mostrar productes de la categoria "Roba"

$productesRoba = obtenirProductesPorCategoria($categoria1);

mostrarProductes($productesRoba);
```

**funcions.php (exemple):**

``` php
<?php

class Producte {

    //... 

}

classe Categoria {

    //... 

}

function crearProducte($nom, $descripcio, $preu) {

    //...

}

function crearCategoria($nom, $descripcio) {

    //...

}

function agregarCategoriaAProducte(Producte $producte, Categoria $categoria) {

    //...

}

function obtenirProductsPorCategoria(Categoria $categoria) {

    //...

}

function mostrarProductes(array $productes) {

    //...

}
```

### Instruccions:

1. **Crear els fitxers:** Crea dos fitxers: `index.php` i `funcions.php`.
2. **Implementar les funcions:** Completa les funcions a `funcions.php` segons la descripció de lexercici.
3. **Utilitzar les funcions:** A `index.php`, crea els productes i categories necessaris i utilitza les funcions per realitzar les operacions sol·licitades.
4. **Mostra resultats:** La funció `mostrarProductes` ha d'imprimir a la pantalla la informació dels productes.

### Aspectes que s’avaluaran:

* **Correcció del codi:** Les funcions han de fer les tasques correctament.
* **Modularitat:** El codi ha d'estar ben organitzat en funcions.
* **Reutilització de codi:** Cal evitar duplicacions de codi.
* **Documentació:** Es recomana afegir comentaris a les funcions per explicar-ne el propòsit.

### Ampliacions:

* **Validació de dades:** Afegir validacions per assegurar que les dades ingressades siguin correctes.
* **Maneig d'errors:** Implementar un maneig d'errors adequat per evitar que el programa s'aturi inesperadament.
* **Persistència de dades:** Desar les dades en un fitxer o base de dades.
* **Interfície d'usuari:** Crear una interfície web simple utilitzant HTML i formularis per interactuar amb l'aplicació.
* **Sortida HTML:** Un cop funcioni el teu codi, prepara’l per presentar les dades de sortida en format HTML. Concretament utilitzant taules.
* **Sortida HTML utilitzant imatges dels productes**

### Comentaris i observacions:

En separar la lògica en funcions i fitxers separats el codi és més net, eficient i reutilitzable, preparant-los per a projectes més complexos.

* **Major organització:** El codi està més estructurat i és més fàcil entendre i mantenir.
* **Reutilització de codi:** Les funcions poden ser utilitzades a diferents parts del programa.
* **Facilitat de prova:** És més fàcil provar les funcions de manera individual.

---

## Exemple d'execució (sortida esperada del vostre codi)


**Dades d'entrada:**

* **Productes:**
    * Samarreta: Samarreta de cotó, 19.99€
    * Pantalons: Pantalons texans, 39.99€
* **Categories:**
    * Roba
    * Home

**Codi executat:** S'ha cridat a la funció `mostrarProductesPerCategoria` amb la categoria "Roba".

**Sortida per pantalla:**

Productes de la categoria "Roba":

Nom: Samarreta

Preu: 19.99€

Categories: Roba Home

Nom: Pantalons

Preu: 39.99€

Categories: Roba

**Explicació de la sortida:**

* Es mostren tots els productes que pertanyen a la categoria “Roba”.
* Per a cada producte es mostra el nom, el preu i les categories a què pertany.
* En aquest cas, tots dos productes (Samarreta i Pantalons) pertanyen a la categoria "Roba", per la qual cosa tots dos es mostren a la sortida.

**Un altre exemple:**

**Dades d'entrada:**

* Es busca el producte "Samarreta".

**Sortida per pantalla:**

Detall del producte:

Nom: Samarreta

Preu: 19.99€

Categories: Roba Home

**Explicació de la sortida:**

* Es mostra la informació detallada del producte "Samarreta", incloent-hi el nom, el preu i les categories a què pertany.

## Rúbrica d'avaluació

![Rúbrica_-_2425_rúbrica_gestió_botiga_en_línia.png](../img/R%C3%BAbrica_-_2425_r%C3%BAbrica_gesti%C3%B3_botiga_en_l%C3%ADnia.png)

[//]: <> ([<img src="../img/R%C3%BAbrica_-_2425_r%C3%BAbrica_gesti%C3%B3_botiga_en_l%C3%ADnia.png" alt="drawing" width="400"/>](../img/R%C3%BAbrica_-_2425_r%C3%BAbrica_gesti%C3%B3_botiga_en_l%C3%ADnia.png))

## Llista de verifiació

<a href="https://cesurformacion0-my.sharepoint.com/:x:/g/personal/xavier_sastre_cesurformacion_com/ESvtMQynhbxIviAPrdgfZGcB7Zpw6jIuBjfFkr7jMfZM8g?e=cwvHNF" target="_blank">Enllaç a la llista de verificació</a>