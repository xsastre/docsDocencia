# Més exercicis sobre còpies de seguretat en Linux

## UNISON- linux 

Copia Sincronizada Trataremos de hacer una copia de seguridad de un ordenador a otro, por ello necesitamos dos MV ubuntu 14\. (red internas, asignar unas ip 192.168.1.X)

En la primera instalaremos Unison-gtk y tendremos una carpeta llamada "Datos" en la que guardaremos imágenes y archivos (192.168.1.2)

En la segunda MV instalaremos un servidor ssh "openssh-server" y crearemos una carpeta vacia para guardar información. (192.168.1.3)

* 1\) Abrimos el programa Unison, ponemos conectarnos con **ssh** en HOST ponemos la dirección Ip del ordenador donde está el servidor ssh (192.168.1.2) y su nombre de usuario 'administrador'.

Seleccionamos el origen (datos que queremos copiar) y destino (ruta de la otra máquina) */home/administrador/Escriptori/copia* Activamos FAT. Aceptamos y ponemos contraseña. Luego botón Go

* 2\) Agregamos y borramos algún fichero de la máquina destino.¿Qué ocurre en el origen?

## GADMIN-RSYNC \- linux

Copia Sincronizada Trataremos de hacer una copia de seguridad de un ordenador a otro, por ello necesitamos dos MV ubuntu 14\. (red internas, asignar unas ip 192.168.1.X)

En la primera instalaremos gadmin-rsync y tendremos una carpeta llamada "Datos" en la que guardaremos imágenes y archivos (192.168.1.2)

En la segunda MV instalaremos un servidor ssh "openssh-server" y crearemos una carpeta vacia para guardar información. (192.168.1.3)

* 1\) Abrimos el programa gadmin-rsync, Creamos un nuevo perfil, y elegimos de Local a Remoto, rellenamos los parámetros. Y hacemos la copia en una carpeta llamada "backup\_gadmin"
* 2\) Modificamos algún fichero del destino y hacemos el procedimiento inverso, es decir, restauramos los valores de la copia de seguridad en el origen.

