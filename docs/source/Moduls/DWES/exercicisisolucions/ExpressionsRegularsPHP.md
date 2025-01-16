# Exercicis expressions regulars en PHP:

### ✏️   Exercici 118: Validació de Correu Electrònic
Crea una funció que validi si una cadena és un correu electrònic vàlid. La funció ha de retornar `true` si la cadena és un correu electrònic vàlid i `false` en cas contrari.

??? note "Pista"

    Utilitza una expressió regular que busqui el patró d'un correu electrònic, com ara `'/^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,6}$/'`.

### ✏️   Exercici 119: Extracció de Números de Telèfon
Escriu una funció que extregui tots els números de telèfon d'una cadena de text. Els números de telèfon poden estar en diferents formats, com ara `(123) 456-7890`, `123-456-7890`, o `123.456.7890`.

??? note "Pista"

    Utilitza una expressió regular que busqui patrons de números de telèfon, com ara `'/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/'`.

### ✏️   Exercici 120: Validació de Contrasenyes
Crea una funció que validi si una contrasenya compleix amb els següents requisits:
- Almenys 8 caràcters de llargada.
- Conté almenys una lletra majúscula.
- Conté almenys una lletra minúscula.
- Conté almenys un número.
- Conté almenys un caràcter especial (com ara `!@#$%^&*`).

??? note "Pista"

    Utilitza una expressió regular que combini aquests requisits, com ara `'/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/'`.

### ✏️   Exercici 121: Extracció de URLs
Escriu una funció que extregui totes les URLs d'una cadena de text. Les URLs poden començar amb `http://`, `https://`, o `www.`.

??? note "Pista"

    Utilitza una expressió regular que busqui patrons de URLs, com ara `'/\b(?:https?:\/\/|www\.)\S+\b/'`.

### ✏️   Exercici 122: Substitució de Paraules Prohibides
Crea una funció que substitueixi totes les paraules prohibides d'una cadena de text per una sèrie d'asteriscs (`*`). La llista de paraules prohibides ha de ser un array passat com a paràmetre a la funció.

??? note "Pista"

    Utilitza una expressió regular que busqui les paraules prohibides dins de la cadena, com ara `'/\b(' . implode('|', $paraules_prohibides) . ')\b/i'`.

