---
draft: false
date: 2024-11-18T22:17:20.026Z
categories:
  - JS
  - PHP
  - DAW
  - HTML
  - DWEC
  - DWES
author:
  - xsastre
---
# Exemple formulari HTML+JS+PHP+POO

<figure markdown="span">
  ![codi](../../imatges/codi.jpeg){style="height:200px; width:1800px; object-fit:cover"}
  <a href="https://www.pexels.com/ca-es/foto/ordenador-portatil-oficina-internet-tecnologia-177598/"><figcaption style="font-size:0.7em;">Foto de Markus Spiske </figcaption></a>
</figure>

###  **Codi**

A continuació teniu el codi que hem vist avui a classe <!-- more -->, separat amb tres arxiux:

* script.js
* formulari.html
* formulari.php


=== "HTML - _formulari.html_"

    ```html
    <!DOCTYPE html>
    <html lang="cat">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Formulari Persona</title>
    </head>
    <body>
    <h1>Formulario de Persona</h1>
    <form id="personaForm" action="formulari.php" method="get">
        <label for="nom">Nombre:</label>
        <input type="text" id="nom" name="nom" required><br><br>
    
        <label for="edad">Edad:</label>
        <input type="number" id="edat" name="edat" required><br><br>
    
        <label for="dni">DNI:</label>
        <input type="text" id="dni" name="dni" required><br><br>
    
        <button type="submit">Enviar</button>
    </form>
    
    <script src="./script.js"></script>
    </body>
    </html>
    ```

=== "Javascript - _script.js_"

    ``` Javascript
    document.getElementById('personaForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita enviament per defecte
    
        // Crear la classe Persona
        class Persona {
            constructor(nom, edat, dni) {
                this.nom = nom;
                this.edat = edat;
                this.dni = dni;
            }
        }
    
        // Obtenir els valors del formulari
        const nom = document.getElementById('nom').value;
        const edat = document.getElementById('edat').value;
        const dni = document.getElementById('dni').value;
    
        // Crear una instancia de Persona
        const persona = new Persona(nom, edat, dni);
    
        // Construir la URL amb els parametres
        debugger;
        const url = new URL('formulari.php', window.location.href);
        url.searchParams.append('nom', persona.nom);
        url.searchParams.append('edat', persona.edat);
        url.searchParams.append('dni', persona.dni);
    
        // Redirigir a la URL amb els paràmetres
        window.location.href = url;
    });
    ```

=== "PHP - _formulari.php_"

    ``` PHP
    <?php
    if ($_SERVER["REQUEST_METHOD"] == "GET") {
        $nom = $_GET['nom'];
        $edat = $_GET['edat'];
        $dni = $_GET['dni'];
    
        // Aquí puedes procesar los datos como desees
        echo "Nom: $nom, Edat: $edat, DNI: $dni";
    }
    ?>
    ```

Podeu comprovar el funcionament [aquí](https://www.xn--codiartes-y1a.cat/xsastre/classepersonaformulari/formulari.html):

!!! Example

    <iframe src="https://www.xn--codiartes-y1a.cat/xsastre/classepersonaformulari/formulari.html" width="400" height="400"></iframe>
