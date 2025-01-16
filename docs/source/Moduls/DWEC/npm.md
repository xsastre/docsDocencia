# NPM

npm (Node Package Manager) es una herramienta esencial en el desarrollo web moderno, especialmente para la gestión de paquetes y módulos JavaScript. Comprender sus componentes y cómo se integra en el flujo de trabajo del frontend es crucial.

**La página web:**
El sitio oficial de npm (https://www.npmjs.com/) permite descubrir nuevos paquetes, colaborar y reportar errores. Es similar a cómo funciona GitHub, proporcionando una plataforma centralizada para la comunidad de desarrolladores.

**El cliente por CLI:**
El cliente de línea de comandos de npm permite instalar, actualizar y gestionar paquetes y programas JavaScript de manera eficiente, similar a cómo `apt` gestiona paquetes en sistemas basados en Debian.

**El registro:**
npm mantiene un registro de paquetes que se pueden instalar y actualizar, facilitando la colaboración y la gestión de dependencias.

## Instalación de npm

Para comenzar a usar npm, es necesario tener Node.js instalado, ya que npm se incluye con Node.js. Aquí hay dos formas comunes de instalar Node.js y npm.

**Desde los repositorios de Ubuntu:**

```bash
node -v
npm -v
sudo apt install nodejs
sudo apt install npm
```

**Desde el control de versiones de Node:**

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash
nvm list-remote
nvm install v13.6.0
```

Mantener Node.js actualizado es importante para aprovechar las últimas características y mejoras de seguridad. Para actualizar Node.js, puedes usar npm:

```bash
sudo npm install -g n
sudo n stable
sudo npm install -g npm
```

## Administración de Paquetes con npm

npm facilita la instalación, actualización y gestión de paquetes en tus proyectos. Aquí tienes algunos comandos básicos:

- **Inicializar un nuevo proyecto:** 
  ```bash
  npm init
  ```

- **Instalar un paquete:** 
  ```bash
  npm install <nombre-paquete> (o npm i <nombre-paquete>)
  ```

- **Instalar un paquete globalmente:** 
  ```bash
  npm install -g <nombre-paquete>
  ```

- **Desinstalar un paquete:** 
  ```bash
  npm uninstall <nombre-paquete>
  ```

- **Actualizar un paquete:** 
  ```bash
  npm update <nombre-paquete>
  ```

- **Listar paquetes instalados:** 
  ```bash
  npm list
  ```

## El Archivo package.json

El `package.json` es el corazón de cualquier proyecto npm. Declara las bibliotecas instaladas y sus versiones, así como scripts que se pueden ejecutar con `npm run`.

**Ejemplo de package.json:**

```json
{
 "name": "webpackinicial",
 "version": "1.0.0",
 "description": "Projecte inicial npm",
 "main": "index.js",
 "scripts": {
   "test": "echo \"Error: no test specified\" && exit 1"
 },
 "author": "",
 "license": "ISC"
}
```

## Ejemplo: Instalación de jQuery

Para instalar y utilizar jQuery en un proyecto, sigue estos pasos:

1. Inicializa un nuevo proyecto npm:

    ```bash
    npm init
    ```

2. Instala jQuery:

    ```bash
    npm install jquery
    ```

3. Incluye jQuery en tu HTML:

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Document</title>
       <script src="./node_modules/jquery/dist/jquery.js"></script>
       <script>
         $(function() {
           console.log($);
         });
       </script>
    </head>
    <body>
    </body>
    </html>
    ```

## Motivaciones para Usar npm

La programación del frontend hoy en día puede ser tan compleja como la del backend. Mantener todo el código y las dependencias de terceros en archivos .html y .js puede ser complicado. Aquí es donde npm resulta invaluable:

- **Automatización de tareas:**
  - Recarga en vivo de los cambios.
  - Minificación y ofuscación del código.
  - Incrementar la compatibilidad entre navegadores.
  - Compilación de SASS, TypeScript, etc.

- **Gestión de dependencias:**
  - Mantener y actualizar bibliotecas de terceros


## Creación de un Nuevo Proyecto Node

Para crear un nuevo proyecto Node, asegúrate de tener versiones recientes de Node.js y npm:

```bash
node --version    # Debe ser superior a la 8
npm --version  # Debe ser superior a la 6
npm init 
```

Esto crea un archivo `package.json` en tu proyecto.

## Integración con Git

El directorio `node_modules` es muy grande y no debe subirse al repositorio. Asegúrate de incluirlo en tu `.gitignore`:

```bash
echo "node_modules" >> .gitignore
```

Cuando otros clonen tu repositorio, solo necesitan ejecutar `npm install` para instalar las dependencias listadas en `package.json`.
