```css
/* === IMPORTANT ===
   No modifiquis aquests estils, donat que són imprescindibles per a que la pàgina es vegi correctament.
   ================= */

/*-- Bàsic ----------------------------------------------------------*/
ul, ul li { margin: 0; padding: 0; list-style: none; }
h1, h2, h3, p, form { margin: 0; padding: 0; }
.clear { clear: both; }
img { border: none; }

/*-- Layout ----------------------------------------------------------*/
#contenedor {
    width: 90%;
    max-width: 900px;
    @media (max-width: 900px) {
        body {
            width: auto;
        }
    }

    @media (min-width: 901px) {
        body {
            width: 900px;
        }
    }
    margin: 0 auto;
}

#cabecera, #menu, #lateral, #contenido, #contenido #principal, #contenido #secundario, #pie {
    border: 2px solid #777;
}

#cabecera { clear: both; }
#menu { clear: both; }
#lateral { float: left; width: 20%; }
#contenido { float: right; width: 78%; }
#contenido #principal { float: left; width: 78%; }
#contenido #secundario { float: right; width: 20%; }
#pie { clear: both; }

/*-- Capçalera --------------------------------------------------------*/
#cabecera #logo { float: left; }
#cabecera #buscador { float: right; }

/*-- Menú ------------------------------------------------------------*/
#menu ul#menu_principal li { display: inline; float: left; }

/*-- Secció Principal -----------------------------------------------*/
#contenido #principal .articulo img { width: 100px; float: left; }

/*-- Peu de pàgina ---------------------------------------------------*/
#pie .enlaces   { float: left; }
#pie .copyright { float: right; }

/* === IMPORTANT ===
   A partir d'aquí, es poden afegir tots els estils propis que seguin necessàris.
   ================= */


#cabecera,
#menu,
#lateral,
#lateral #noticias,
#lateral #publicidad,
#contenido,
#contenido #principal,
#contenido #secundario,
#pie {
    padding: .5em;
}

#lateral {
    padding: 0;
}

#cabecera {
    padding: 1em;
}

#menu {
    margin-bottom: .5em;
}

#contenido {
    width: 77%;
    padding: 0;
}

#contenido #principal {
    width: 73%;
}

#pie {
    padding: .5em 0;
    margin-top: 1em;
}

#contenido #principal .articulo {
    margin-bottom: 1em;
}

#contenido #principal .articulo img {
    margin: .5em;
}

#lateral #publicidad {
    margin-top: 1em;
}
```