# Enunciat de la Pràctica
!!! Example "Gestor de tasques"
    Crear una aplicació web bàsica per gestionar una llista de tasques.

    *Requisits:*

    **Base de Dades MySQL:**

    Crea una base de dades anomenada todolist.
    Crea una taula anomenada tasks amb les següents columnes:

    ```sql
    id (INT, AUTO_INCREMENT, PRIMARY KEY)
    task (VARCHAR(255))
    status (ENUM(‘pending’, ‘completed’))
    ```
    **Interfície HTML:**

    Crea una pàgina HTML amb un formulari per afegir noves tasques. El formulari ha de tenir un camp de text per a la tasca i un botó per enviar.
    Mostra la llista de tasques existents en una taula. Cada fila ha de tenir la tasca i el seu estat (pendent o completada).

    **PHP:**

    Crea un fitxer PHP per gestionar la connexió a la base de dades.
    Crea un fitxer PHP per processar el formulari d’afegir tasques. Aquest fitxer ha d’inserir la nova tasca a la base de dades.
    Crea un fitxer PHP per mostrar la llista de tasques des de la base de dades.

!!! Note "Com entregar-ho"
    Heu de crear un fitxer anomenat **DWESUT0501_PracticaInicialPHPBD_<inicialnom_llinatge>.html** i pujar-lo al hosting que teniu creat.
