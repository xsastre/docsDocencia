<style>
    img { margin: 20px 0; border-radius: 8px; }

    .alert { color: #BD1550; }
    .warning { color: #E97F02; }
    .success { color: #8A9B0F; }

    .center { text-align: center; }
    .right { text-align: right; }

    .img-small { max-width: 200px; margin: auto; }
    .img-medium { max-width: 400px; margin: auto; }
    .img-large { max-width: 800px; margin: auto; }

    .leyenda {
        font-size: small;
        margin: 10px 0;
    }
</style>

# Acceso a datos


En esta unidad vamos a aprender a acceder a datos que se encuentran en un servidor; recuperando, editando y creando dichos datos a través de una base de datos.

A través de las distintas capas o niveles, de las cuales 2 de ellas ya conocemos (*Apache*, *PHP*) y *MySQL* la que vamos a estudiar en este tema.


<figure markdown="span" class="img-small">
  ![Foto Acces a dades](img/pexels-tima-miroshnichenko-6549364.jpg){ width="25%" }
  <a href="https://www.pexels.com/ca-es/foto/ordinador-monitor-mostrar-exhibicio-965345/"><figcaption style="font-size:0.7em;">Foto de Tima Miroshnichenko</figcaption></a>
</figure>

## Estructura de una base de datos

Sabemos que una base de datos tiene muchos campos con sus nombres y valores, pero además sabemos que la base de datos debe tener un nombre. por tanto tendríamos la siguiente estructura para una base de datos:

    NombreBaseDeDatos
        |__Tabla-#1
        |       |__DatosTabla-#1
        |
        |__Tabla-#2
        |       |__DatosTabla-#2
        |
        |__Tabla-#3
        |       |__DatosTabla-#3
        [...]


Veámoslo en un ejemplo real

    Ryanair
        |__pasajero
        |    |__id[*]
        |    |__nombre
        |    |__apellidos
        |    |__edad
        |    |__id_vuelo[^]
        |
        |__vuelo
        |    |__id[*]
        |    |__n_plazas
        |    |__disponible
        |    |__id_pais[^]
        |
        |__pais
             |__id[*]
             |__nombre

<div class="leyenda">
    [*] Clave primaria [^] Clave Foránea
</div>

<div class="center img-large">
    <img src="img/06-bbdd-estructura.png">
</div>

## CholloSevero

Como muy bien habéis elegido, a lo largo de esta unidad vamos a trabajar con una base de datos que iremos confeccionando conforme avancemos, donde almacenaremos la información relacionada con ofertas que publiquen los usuarios y los listaremos en función de varios filtros; nuevos, más votados, más vistos, más comentados entre otros, al más puro estilo ***[Chollometro](https://www.chollometro.com)***.

<div class="center img-large">
    <img src="img/06-chollometro.gif">
</div>

## SQL

Este lenguaje de consulta estructurada (*Structured Query Language*) es el que vamos a utilizar para realizar las consultas a nuestras bases de datos para mostrar el contenido en las distintas interfaces web que creemos a lo largo de la unidad. Si quieres saber más detalles visita [Wiki SQL](https://es.wikipedia.org/wiki/SQL)

Ejemplo de una sentencia SQL donde seleccionamos todas las filas y columnas de nuestra tabla llamada **'pais'**

``` sql
SELECT * FROM pais
```

Estas sentencias pueden invocarse desde la consola de comandos mediante el intérprete *mysql* (previamente instalado en el sistema) o a través de la herramienta phpMyAdmin.

Las sentencias SQL también las podemos usar dentro de nuestro código php, de tal manera que cuando se cargue nuestra interfaz web, lance una sentecia SQL para mostrar los datos que queramos.

``` php
<?php
    // Listado de clientes, ordenados por DNI de manera ASCendente
    $clientesOrdenadosPorDNI = "SELECT * FROM `pasajero` ORDER BY `dni`" ASC;
?>
```

## MySQLi

PHP hace uso de esta extensión mejorada para poder comunicarse con las bases de datos, ya sean MySQL (4.1 o superior) o MariaDB.

Cualquier consulta que queramos hacer a una base de datos necesitaremos hacer uso de la extensión mysqli()

Veamos como conectarnos con una base de datos a través del código PHP

``` php
<?php
    // ▒▒▒▒▒▒▒▒ pruebas.php ▒▒▒▒▒▒▒▒

    // "SERVIDOR", "USUARIO", "CONTRASEÑA", "BASE DE DATOS"
    $conexion = mysqli_connect("d939ebf6a741","tuUsuario","1234","pruebas");

    // COMPROBAMOS LA CONEXIÓN
    if(mysqli_connect_errno()) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
        exit();
    }

    echo "<h1>Bienvenid@ a MySQL !!</h1>";
?>
```

- `servidor`: El servidor donde se encuentra la base de datos que queremos usar suele ser **localhost**, pero en nuestro caso, al utilizar Docker será el nombre de la imagen <span class="warning">***mysql:8.0***</span> que aparece al dejar el ratón encima en el Visual Studio Code

<div class="center img-large">
    <img src="img/06-mysql-servidor-docker.gif">
</div>

- `usuarioDB`: El usuario de la base de datos
- `passwordDB`: La contraseña para ese usuario de la base de datos
- `baseDeDatos`: Nombre de la base de datos que queramos usar

Si todo ha salido bien habréis visto un mensaje diciendo <span class="success">***Bienvenid@ a MySQL !!***</span>

### Recuperando datos de una BD

Ahora que ya sabemos cómo conectarnos a una base de datos alojada en nuestro servidor, lo que necesitamos saber es cómo recuperar datos almacenados en la base de datos.

Durante la instalación de la imagen de Docker, se ha creado una tabla llamada **Pruebas** que contiene varios registros de distintas personas.

Vamos a recuperar esos datos para ver de qué forma se hace con PHP.

``` php
<?php
    // ▒▒▒▒▒▒▒▒ pruebas.php ▒▒▒▒▒▒▒▒

    $conexion = mysqli_connect("d939ebf6a741", "lupa", "1234", "pruebas");

    // COMPROBAMOS LA CONEXIÓN
    if (mysqli_connect_errno()) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
        exit();
    }

    // CONSULTA A LA BASE DE DATOS
    $consulta = "SELECT * FROM `Person`";
    $listaUsuarios = mysqli_query($conexion, $consulta);

    // COMPROBAMOS SI EL SERVIDOR NOS HA DEVUELTO RESULTADOS
    if($listaUsuarios) {

        // RECORREMOS CADA RESULTADO QUE NOS DEVUELVE EL SERVIDOR
        foreach ($listaUsuarios as $usuario) {
            echo "
                $usuario[id]
                $usuario[name]
                <br>
            ";
        }
    }
?>
```

Si todo ha salido bien, por pantalla verás el siguiente listado

    ▒▒▒▒▒▒▒▒ http://localhost/pruebas.php ▒▒▒▒▒▒▒▒

    1 William
    2 Marc
    3 John
    4 Antonio Moreno

## PHP Data Objects :: PDO

De la misma manera que hemos visto con mysqli, PHP Data Objects (o PDO) es un driver de PHP que se utiliza para trabajar bajo una interfaz de objetos con la base de datos. A día de hoy es lo que más se utiliza para manejar información desde una base de datos, ya sea relacional o no relacional.

De igual manera que pasaba con los objetos en PHP nativos, en la interfaz de MySQL la cosa cambia la hora de conectarnos con una base de datos.

``` php
<?php
    $conexion = new PDO('mysql:host=localhost; dbname=dwes', 'dwes', 'abc123');
```

Además, con PDO podemos usar las excepciones con try catch para gestionar los errores que se produzcan en nuestra aplicación, para ello, como hacíamos antes, debemos encapsular el código entre bloques try / catch.

``` php
<?php

    $dsn = 'mysql:dbname=prueba;host=127.0.0.1';
    $usuario = 'usuario';
    $contraseña = 'contraseña';

    try {
        $mbd = new PDO($dsn, $usuario, $contraseña);
        $mbd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        echo 'Falló la conexión: ' . $e->getMessage();
    }
```
En primer lugar, creamos la conexión con la base de datos a través del constructor PDO pasándole la información de la base de datos.

En segundo lugar, establecemos los parámetros para manejar las excepciones, en este caso hemos utilizado:

- `PDO::ATTR_ERRMODE` indicándole a PHP que queremos un reporte de errores.
- `PDO::ERRMODE_EXCEPTION` con este atributo obligamos a que lance excepciones, además de ser la opción más humana y legible que hay a la hora de controlar errores.

Cualquier error que se lance a través de PDO, el sistema lanzará una <span class="alert">**PDOException**</span>.

### Fichero de configuración de la BD

De la misma manera que creamos nuestro archivo de funciones `funciones-php` y albergamos todas las funciones que se usan de manera global en la aplicación, podemos establecer un archivo de constantes donde definamos los parámetros de conexión con la base de datos.

```php
<?php

    //  ▒▒▒▒▒▒▒▒ conexion.php ▒▒▒▒▒▒▒▒

    constDSN = "mysql:host=localhost;dbname=dwes";
    constUSUARIO = "dwes";
    constPASSWORD = "abc123";

    /*  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

        ▒▒▒▒▒▒▒▒ NO SUBAS ESTE ARCHIVO A git ▒▒▒▒▒

        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ */

```

Este archivo contiene información <span class="alert">**muy sensible**</span> así que no es recomendable que subas este archivo a git.

### Sentencias preparadas

Se trata de sentencias que se establecen como si fueran plantillas de la SQL que vamos a lanzar, aceptando parámetros que son establecidos a posteriori de la declaración de la sentencia preparada.

Las sentencias preparadas evitan la injección de SQL (SQL Injection) y mejoran el rendimiento de nuestras aplicaciónes o páginas web.

``` php
<?php
    $sql = "INSERT INTO Clientes VALUES (?, ?, ?, ?)";
```

Cada interrogante es un parámetro que estableceremos después, unas cuantas líneas más abajo.

Una vez tenemos la plantilla de nuestra consulta, debemos seguir con la preparación junto con 3 métodos más de PHP para su completa ejecución:

- `prepare:` prepara la sentencián antes de ser ejecutada
- `bind`: el tipo de unión (bind) de dato que puede ser mediante ' ? ' o ' :parametro '
- `execute` se ejecuta la consulta uniendo la plantilla con las bariables o parámetros que hemos establecido.

### Ejemplo parámetros

```php
<?php
    //  ▒▒▒▒▒▒▒▒ Borrando con parámetros ▒▒▒▒▒▒▒▒

    include "config/database.inc.php";

    $conexion = null;

    try { 
        $cantidad = $_GET["cantidad"];

        $conexion = new PDO(DSN, USUARIO, PASSWORD);
        $conexion -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "DELETE FROM stock WHERE unidades = ?";
        $sentencia = $conexion -> prepare($sql);

        $isOk = $sentencia -> execute([$cantidad]);
        $cantidadAfectada = $sentencia -> rowCount();

        echo $cantidadAfectada;
    } catch (PDOException $e) {
        echo $e -> getMessage();
    }

    $conexion = null
```

### Ejemplo bindParam

Muy parecido a utilizar parámetros pero esta vez la variable está dentro de la sentencia SQL, en este caso la hemos llamado `:cant`

```php
<?php
    include "config/database.inc.php";

    $conexion=null;

    try {
        $cantidad = $_GET["cantidad"] ?? 0;

        $conexion = new PDO(DSN, USUARIO, PASSWORD);
        $conexion -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "DELETE FROM stock WHERE unidades = :cant";

        $sentencia = $conexion -> prepare($sql);
        $sentencia -> bindParam(":cant", $cantidad);
        
        $isOk = $sentencia -> execute();
        
        $cantidadAfectada = $sentencia -> rowCount();
        
        echo $cantidadAfectada;
    } catch (PDOException $e) {
        echo $e -> getMessage();
    }

    $conexion = null;
```

### bindParam VS bindValue

Utilizaremos `bindValue()` cuando tengamos que insertar datos sólo una vez, en cambio, deberemos usar `bindParam()` cuando tengamos que pasar datos múltiples, como por ejemplo, un array.

```php
<?php
    // se asignan nombre a los parámetros
    $sql = "DELETE FROM stock WHERE unidades = :cant";
    $sentencia = $conexion -> prepare($sql);

    // bindParam enlaza por referencia
    $cantidad = 0;

    $sentencia -> bindParam(":cant", $cantidad);
    $cantidad = 1;

    // se eliminan con cant = 1
    $isOk = $sentencia -> execute();

    // bindValue enlaza por valor
    $cantidad = 0;

    $sentencia -> bindValue(":cant", $cantidad);
    $cantidad = 1;

    // se eliminan con cant = 0
    $isOk = $sentencia->execute();
```

Para más información y uso de las variables PDO [consulta el manual de PHP](https://www.php.net/manual/es/pdo.constants.php).

### Insertando registros

A la hora de insertar registros en una base de datos, debemos tener en cuenta que en la tabla puede haber valores autoincrementados. Para salvaguardar ésto, lo que debemos hacer es dejar ese cambpo autoincrementado vacío, pero a la hora de hacer la conexión, debemos recuperarlo con el método `lastInsertId()`.

``` php
<?php
    $nombre = $_GET["nombre"] ?? "SUCURSAL X";
    $telefono = $_GET["telefono"] ?? "636123456";

    $sql="INSERT INTO tienda(nombre, tlf) VALUES (:nombre, :telefono)";

    $sentencia = $conexion -> prepare($sql);
    $sentencia -> bindParam(":nombre", $nombre);
    $sentencia -> bindParam(":telefono", $telefono);

    $isOk = $sentencia -> execute();
    $idGenerado = $conexion -> lastInsertId();

    echo $idGenerado;
```

### Consultando registros

A la hora de recuperar los resultados de una consulta, bastará con invocar al método `PDOStatement::fetch` para listar las filas generadas por la consulta.

Pero debemos elegir el tipo de dato que queremos recibir entre los 3 que hay disponibles:

- `PDO::FETCH_ASSOC:` array indexado cuyos keys son el nombre de las columnas.
- `PDO::FETCH_NUM:` array indexado cuyos keys son números.
- `PDO::FETCH_BOTH:` valor por defecto. Devuelve un array indexado cuyos keys son tanto el nombre de las columnas como números.

<div class="center img-large">
    <img src="img/06-pdo-listado-fetch.png">
</div>

``` php
<?php
    //  ▒▒▒▒▒▒▒▒ consulta con array asociativo.php ▒▒▒▒▒▒▒▒

    include "config/database.inc.php";

    $conexion = null;

    try{
        $conexion = new PDO(DSN, USUARIO, PASSWORD);
        $conexion -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "select * from tienda";

        $sentencia = $conexion -> prepare($sql);
        $sentencia -> setFetchMode(PDO::FETCH_ASSOC);
        $sentencia -> execute();
        
        while($fila = $sentencia -> fetch()){
            echo "Codigo:" . $fila["cod"] . "<br />";
            echo "Nombre:" . $fila["nombre"] . "<br />";
            echo "Teléfono:" . $fila["tlf"] . "<br />";
        }

    }catch(PDOException $e) {
        echo $e -> getMessage();
    }

    $conexion = null;
```

Recuperando datos con una matriz como resultado de nuestra consulta

``` php
<?php
    //  ▒▒▒▒▒▒▒▒ consulta con array asociativo ▒▒▒▒▒▒▒▒

    $sql="SELECT * FROM tienda";

    $sentencia = $conexion -> prepare($sql);
    $sentencia -> setFetchMode(PDO::FETCH_ASSOC);
    $sentencia -> execute();

    $tiendas = $sentencia -> fetchAll();

    foreach($tiendasas$tienda) {
        echo"Codigo:" . $tienda["cod"] . "<br />";
        echo"Nombre:" . $tienda["nombre"] . "<br />";
    }
```
Pero si lo que queremos es leer datos con forma de objeto utilizando `PDO::FETCH_OBJ`, debemos crear un objeto con propiedades públicas con el mismo nombre que las columnas de la tabla que vayamos a consultar.

``` php
<?php
    //  ▒▒▒▒▒▒▒▒ consulta con formato de objeto ▒▒▒▒▒▒▒▒

    $sql="SELECT * FROM tienda";

    $sentencia = $conexion -> prepare($sql);
    $sentencia -> setFetchMode(PDO::FETCH_OBJ);
    $sentencia -> execute();

    while($t = $sentencia -> fetch()) {
        echo"Codigo:" . $t -> cod . "<br />";
        echo"Nombre:" . $t -> nombre . "<br />";
        echo"Teléfono:" . $t -> tlf . "<br />";
    }
```

### Consultas con modelos

Llevamos tiempo creando clases en PHP y las consultas también admiten este tipo de datos mediante el uso de `PDO::FETCH_CLASS`

Si usamos este método, debemos tener en cuenta que los nombres de los atributos privados deben coincidir con los nombres de las columnas de la tabla que vayamos a manejar.

Así pues, si por lo que sea cambiamos la estructura de la tabla <span class="alert">**DEBEMOS CAMBIAR**</span> nuestra clase para que todo siga funcionando.

``` php
<?php
    //  ▒▒▒▒▒▒▒▒ clase Tienda ▒▒▒▒▒▒▒▒

    classTienda {
        private int $cod;
        private string $nombre;
        private ? string $tlf;
        
        public function getCodigo() : int {
            return $this -> cod;
        }
        
        public function getNombre() : string {
            return $this -> nombre;
        }
        
        public function getTelefono() : ?string {
            return $this -> tlf;
        }
    }
```

``` php
<?php
    //  ▒▒▒▒▒▒▒▒ Consultando a través de la clase Tienda ▒▒▒▒▒▒▒▒

    $sql = "SELECT * FROM tienda";
    $sentencia = $conexion -> prepare($sql);

    // Aquí 'Tienda' es el nombre de nuestra clase
    $sentencia -> setFetchMode(PDO::FETCH_CLASS, "Tienda");
    $sentencia -> execute();

    while($t = $sentencia -> fetch()) {
        echo "Codigo: " . $t -> getCodigo() . "<br />";
        echo "Nombre: " . $t -> getNombre() . "<br />";
        echo "Teléfono: " . $t -> getTelefono() . "<br />";
        
        var_dump($t);
    }
```

Pero ¿qué pasa si nuestras clases tienen constructor? pues que debemos indicarle, al método FECTH, que rellene las propiedades después de llamar al constructor y para ello hacemos uso de `PDO::FETCH_PROPS_LATE`.

``` php
<?php
    //  ▒▒▒▒▒▒▒▒ Consulta para una clase con constructor ▒▒▒▒▒▒▒▒

    $sql = "SELECT * FROM tienda";

    $sentencia = $conexion -> prepare($sql);
    $sentencia -> setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, Tienda::class);
    $sentencia -> execute();

    $tiendas = $sentencia -> fetchAll();
```

### Consultas con LIKE

Para utilizar el comodín LIKE u otros comodines, debemos asociarlo al dato y NUNCA en la propia consulta.

``` php
<?php
    //  ▒▒▒▒▒▒▒▒ Utilizando comodines :: LIKE ▒▒▒▒▒▒▒▒

    $sql = "SELECT * FROM tienda where nombre like :nombre or tlf like :tlf";

    $sentencia = $conexion -> prepare($sql);
    $sentencia -> setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, Tienda::class);

    $cadBuscar = "%" . $busqueda . "%";

    $sentencia -> execute(["nombre" => $cadBuscar,"tlf" => $cadBuscar]);

    $result = $sentencia -> fetchAll();
```

Tenéis una lista de ejemplos muy completa en la [documentación oficial](https://phpdelusions.net/pdo/objects).

## Login & Password

<div class="center img-medium">
    <img src="img/06-login-password.gif">
</div>

Para manejar un sistema completo de login y password con contraseñas cifradas, necesitamos un método que cifre esos strings que el usuario introduce como contraseña; tanto en el formulario de registro como en el del login, ya que al codificar una contraseña, después tenemos que decodificarla para comprobar que ambas contrasñeas (la que instroduce el usuario en el login y la que tenemos en la base de datos) coincidan.

Necesitamos pues:

- `password_hash()` para almacenar la contraseña en la base de datos a la hora de hacer el INSERT
    - `PASSWORD_DEFAULT` almacenamos la contraseña usando el método de encriptación bcrypt

    - `PASSWORD_BCRYPT` almacenamos la contraseña usando el algoritmo CRYPT_BLOWFISH compatible con crypt()

- `password_verify()` para verificar el usuario y la contraseña

``` php
<?php
    //  ▒▒▒▒▒▒▒▒ Almacenando usuario y password en BD ▒▒▒▒▒▒▒▒

    $usu = $_POST["usuario"];
    $pas = $_POST["password"];

    $sql = "INSERT INTO usuarios(usuario, password) VALUES (:usuario, :password)";

    $sentencia = $conexion -> prepare($sql);

    $isOk = $sentencia -> execute([
        "usuario" => $usu,
        "password" => password_hash($pas,PASSWORD_DEFAULT)
    ]);
```

Ahora que tenemos el usuario codificado y guardado en la base de datos, vamos a recuperarlo para poder loguearlo correctamente.

``` php
<?php
    //  ▒▒▒▒▒▒▒▒ Recuperando usuario y password en BD ▒▒▒▒▒▒▒▒

    $usu = $_POST["login"] ?? "";

    $sql = "select * from usuarios where usuario = ?";

    $sentencia = $conexion -> prepare($sql);
    $sentencia -> execute([$usu]);

    $usuario = $sentencia -> fetch();

    if($usuario && password_verify($_POST['pass'], $usuario['password'])) {
        echo"OK!";
    } else {
        echo"KO";
    }
```

## Acceso a ficheros

Gracias a la funcion fopen() desde PHP podemos abrir archivos que se encuentren en nuestros servidor o una URL.

A esta función hay que pasarle 2 parámetros; el nombre del archivo que queremos abrir y el modo en el que se abrirá

``` php
$fp = fopen("miarchivo.txt", "r");
```

Muchas veces no podemos abrir el archivo porque éste no se encuentra o no tenemos acceso a él, por eso es recomendable comprobar que podemos hacerlo

``` php
if (!$fp = fopen("miarchivo.txt", "r")){
    echo "No se ha podido abrir el archivo";
}
```

### Modos de apertura de ficheros

- `r`:  Modo lectura. Puntero al principio del archivo.
- `r+`: Apertura para lectura y escritura. Puntero al principio del archivo
- `w`: Apertura para escritura. Puntero al principio del archivo y lo sobreescribe. Si no existe se intenta crear.
- `w+`: Apertura para lectura y escritura. Puntero al principio del archivo y lo sobreescribe. Si no existe se intenta crear.
- `a`: Apertura para escritura. Puntero al final del archivo. Si no existe se intenta crear.
- `a+`: Apertura para lectura y escritura. Puntero al final del archivo. Si no existe se intenta crear.
- `x`: Creación y apertura para sólo escritura. Puntero al principio del archivo. Si el archivo ya existe dará error E_WARNING. Si no existe se intenta crear.
- `x+`: Creación y apertura para lectura y escritura. Mismo comportamiento que x.
- `c`: Apertura para escritura. Si no existe se crea. Si existe no se sobreescribe ni da ningún error. Puntero al principio del archivo.
- `c+`: Apertura para lectura y escritura. Mismo comportamiento que C.
- `b`: Cuando se trabaja con archivos binarios como jpg, pdf, png y demás. Se suele colocar al final del modo, es decir rb, r+b, x+b, wb...

### Operaciones con archivos

Para poder **leer** un archivo necesitamos usar la función fread() de PHP

```php
//  ▒▒▒▒▒▒▒▒ Abriendo un archivo y leyendo su contenido ▒▒▒▒▒▒▒▒

$file = "miarchivo.txt";
$fp = fopen($file, "r");

// filesize() nos devuelve el tamaño del archivo en cuestión
$contents = fread($fp, filesize($file));

// Cerramos la conexión con el archivo
fclose();
```

Si lo que queremos es **escribir** en un archivo, deberemos hacer uso de la función fwrite()

```php
//  ▒▒▒▒▒▒▒▒ Escribiendo en un archivo ▒▒▒▒▒▒▒▒

$file = "miarchivo.txt";
$texto = "Hola que tal";

$fp = fopen($file, "w");

fwrite($fp, $texto);
fclose($fp);
```

### Información de un fichero

Con PHP y su método stat() podemos obtener información sobre los archivos que le indiquemos. Este método devuelve hasta un total de 12 elementos con ifnormación acerca de nuestro archivo.

    0	dev	        número de dispositivo
    1	ino	        número de i-nodo
    2	mode	    modo de protección del i-nodo
    3	nlink	    número de enlaces
    4	uid	        ID de usuario del propietario
    5	gid	        ID de grupo del propietario
    6	rdev	    tipo de dispositivo, si es un dispositivo i-nodo
    7	size	    tamaño en bytes
    8	atime	    momento del último acceso (tiempo Unix)
    9	mtime	    momento de la última modificación (tiempo Unix)
    10	ctime	    momento de la última modificación del i-nodo (tiempo Unix)
    11	blksize	    tamaño del bloque E/S del sistema de ficheros
    12	blocks	    número de bloques de 512 bytes asignados

Unos ejemplos...

``` php
<?php

//  ▒▒▒▒▒▒▒▒ Información del archivo ▒▒▒▒▒▒▒▒

$file = "miarchivo.txt";
$texto = "Todos somos muy ignorantes, lo que ocurre es que no todos ignoramos las mismas cosas.";

$fp = fopen($file, "w");
fwrite($fp, $texto);

$datos = stat($file);

echo $datos[3] . "<br>"; // Número de enlaces, 1
echo $datos[7] . "<br>"; // Tamaño en bytes, 85
echo $datos[8] . "<br>"; // Momento de último acceso, 1444138104
echo $datos[9] . "<br>"; // Momento de última modificación, 1444138251

?>
```

Echa un vistazo a [las funciones de directorios](https://www.php.net/manual/es/book.dir.php) que tiene PHP, es muy interesante.

### Archivos PDF


Con PHP podemos manejar todo tipo de archivos como ya hemos visto pero, ¿qué pasa si queremos generar ficheros PDF con datos sacados de una base de datos?

<div class="center img-small">
    <img src="img/06-pdf.png">
</div>


Gracias a una clase escrita en PHP, podemos generar archivos PDF sin necesidad de instalar librerías adicionales en nuestro servidor.

Para ello, como tenemos composer dentro de nuestra imagen de Docker, usaremos composer para instalar esta dependencia.

Acuérdate que debemes haber hecho `composer init` para empezar un proyecto con composer, de lo contrario no podrás añadir ningún paquete.

Veamos un ejemplo de Hello World convertido a PDF

```php
<?php

ob_end_clean();
require('fpdf/fpdf.php');
  
// Instanciamos la clase
// P = Portrait | mm = unidades en milímetros | A4 = formato
$pdf = new FPDF('P','mm','A4');
  
// Añadimos una página
$pdf->AddPage();
  
// Establecemos la fuente y el tamaño de letra
$pdf->SetFont('Arial', 'B', 18);
  
// Imprimimos una celda con el texto que nosotros queramos
$pdf->Cell(60,20,'Hello World!');
  
// Terminamos el PDF
$pdf->Output();
  
?>
```
Hay muchos ejemplos y tutoriales, así como documentación de la clase FPDF en la página oficial.

Visita [la sección de tutoriales y el manual](http://www.fpdf.org/) para sacar mayor partido a esta clase.

```php
<?php
  
require('fpdf/fpdf.php');
  
class PDF extends FPDF {
  
    // Cabecera
    function Header() {
          
        // Añadimos un logotipo
        $this->Image('logo.png',10,8,33);
          
        // establecemos la fuente y el tamaño
        $this->SetFont('Arial','B',20);
          
        // Movemos el contenido un poco a la derecha
        $this->Cell(80);
          
        // Pintamos la celda
        $this->Cell(50,10,'Cabecera',1,0,'C');
          
        // Pasamos a la siguiente línea
        $this->Ln(20);
    }
  
    // Pie de página
    function Footer() {
          
        // Nos posicionamos a 1.5 cm  desde abajo del todo de la página
        $this->SetY(-15);
          
        // Arial italic 8
        $this->SetFont('Arial','I',8);
          
        // Número de página
        $this->Cell(0,10,'Página ' . 
            $this->PageNo() . '/{nb}',0,0,'C');
    }
}
  
// Instanciamos la clase
$pdf = new PDF();
  
// Definimos un alias para la numeración de páginas
$pdf->AliasNbPages();

$pdf->AddPage();
$pdf->SetFont('Times','',14);
  
for($i = 1; $i <= 30; $i++)
    $pdf->Cell(0, 10, 'Número de línea ' 
            . $i, 0, 1);
$pdf->Output();
  
?>
```

<div class="center img-large">
    <img src="img/06-pdf-output.gif">
</div>

