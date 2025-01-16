# Solucions exercicis expressions regulars

Aquí tens possibles solucions per als cinc exercicis amb expressions regulars en PHP:

??? note "Solució exercici 1: Validació de Correu Electrònic"

    ```php
    function validarEmail($email) {
        return preg_match('/^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,6}$/', $email);
    }
    
    // Exemple d'ús
    $email = "exemple@domini.com";
    if (validarEmail($email)) {
        echo "El correu electrònic és vàlid.";
    } else {
        echo "El correu electrònic no és vàlid.";
    }
    ```

??? note "Solució exercici 2: Extracció de Números de Telèfon"

    ```php
    function extreureNumerosTelefon($text) {
        preg_match_all('/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/', $text, $matches);
        return $matches[0];
    }
    
    // Exemple d'ús
    $text = "Contacta'ns al (123) 456-7890 o 123-456-7890.";
    $numeros = extreureNumerosTelefon($text);
    print_r($numeros);
    ```

??? note "Solució exercici 3: Validació de Contrasenyes"

    ```php
    function validarContrasenya($contrasenya) {
        return preg_match('/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/', $contrasenya);
    }
    
    // Exemple d'ús
    $contrasenya = "Exemple1!";
    if (validarContrasenya($contrasenya)) {
        echo "La contrasenya és vàlida.";
    } else {
        echo "La contrasenya no és vàlida.";
    }
    ```

??? note "Solució exercici 4: Extracció de URLs"

    ```php
    function extreureURLs($text) {
        preg_match_all('/\b(?:https?:\/\/|www\.)\S+\b/', $text, $matches);
        return $matches[0];
    }
    
    // Exemple d'ús
    $text = "Visita https://www.exemple.com o www.exemple.org per més informació.";
    $urls = extreureURLs($text);
    print_r($urls);
    ```

??? note "Solució exercici 5: Substitució de Paraules Prohibides"

    ```php
    function substituirParaulesProhibides($text, $paraules_prohibides) {
        $pattern = '/\b(' . implode('|', $paraules_prohibides) . ')\b/i';
        return preg_replace($pattern, '****', $text);
    }
    
    // Exemple d'ús
    $text = "Aquest text conté paraules prohibides com exemple i prova.";
    $paraules_prohibides = ['exemple', 'prova'];
    $text_nou = substituirParaulesProhibides($text, $paraules_prohibides);
    echo $text_nou;
    ```

