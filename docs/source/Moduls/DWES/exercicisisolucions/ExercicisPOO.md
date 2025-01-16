### Exercicis PHP Orientat a objectes

✏️   EXERCICI 112	(`exercici112Empleat.php`): Crea una classe Empleat amb el seu nom, llinatges i sou. Encapsula les propietats mitjançant `getters/setters` i afegeix mètodes per a:

* Obtenir el seu nom complet → getNomComplet(): string
 
* Que retorni un booleà indicant si ha de pagar o no impostos (es paguen quan el sou és superior a3333€) → hadePagarImpostos(): bool

✏️   EXERCICI 113 (`exercici113EmpleatTelefons.php`): Còpia la classe de l'exercici 112 i modifica-la. Afegeix una propietat privada que emmagatzemi una matriu de números de telèfons. Afegeix els mètodes següents:
 
* `public function afegirTelefon(int $telefono) : void` → Afegeix un telèfon a la matriu
* `public function llistarTelefons(): string` → Mostra els telèfons separats per comes
* `public function buidarTelefons(): void` → Elimina tots els telèfons

✏️   EXERCICI 114 (`exercici114EmpleatConstructor.php`): Copia la classe de l'exercici 113 i modifica-la.
Elimina els *setters* de `nom` y `llinatges`, de manera que aquestes dades s'assignin mitjançant el constructor (utilitza la sintaxi de PHP7).
Si el constructor rep un tercer paràmetre, serà el sou del `Empleat`. Si no, se li assignaran 1000€ com a sou inicial.

`exercici114EmpleatConstructor8.php`: Modifica la classe i utilitza la sintaxi del PHP 8 de promoció de les propietats del constructor.

✏️   EXERCICI 115 (`exercici115EmpleatConstant.php`): Copia la classe de l'exercici 114 i modifica-la.
Afegeix una constant `SOU_MAXIM` amb el valor del sou que ha de pagar impostos, i modifica el codi per utilitzar la constant.

✏️   EXERCICI 116 (`exercici116EmpleatSou.php`):Copia la classe de l'exercici 115 i modifica-la.
Canvia la constant per una variable estàtica `souMaxim`, de manera que mitjançant `getter/setter` puguis modificar el seu valor.

✏️   EXERCICI 117 (`exercici117EmpleatStatic.php`: Copia la classe de l'exercici 116 i modifica-la.
     Completa el mètode següent amb una cadena HTML que mostri les dades d'un empleat dins d'un paràgraf i tots els telèfons mitjançant una llista ordenada (per a això, hauràs de crear un *getter* per als telèfons):

* `public static function toHtml(Empleat $emp): string`
