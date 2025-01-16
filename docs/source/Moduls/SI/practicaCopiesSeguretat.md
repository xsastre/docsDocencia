# Exercicis còpies de seguretat

### Exercici 2 (ús de la comanda tar, empaquetatge) 

Crear un contenidor o paquet anomenat *exemple.tar* dins de la carpeta */tmp* que contingui els arxius emmagatzemats dins de  */var/log*. Mostra el contingut d'aquest contenidor. S'ha reduït la mida dels arxius al empaquetar-los?

```shell
sudo tar -cvf /tmp/exemple.tar /var/log

tar -tvf exemple.tar
```


### Exercici 3 (empaquetatge \+ compressió)

Realitza el mateix que en l'exercici anterior però ara comprimint-lo amb *gzip exemple.tar.gz* i amb *bzip2 exemple.tar.bz2*. Compara la mida dels dos arxius. Quin compressor comprimeix més?

```shell
sudo tar -czvf /tmp/exemple.tar.gz /var/log

sudo tar -cjvf /tmp/exemple.tar.bz2 /var/log

//verificació gz

sudo tar -tvzf /tmp/exemple.tar.gz

```

### Exercici 4 (extracció i descompressió)

Extreu el contingut de l'arxiu *exemple.tar.gz*. en la carpeta */tmp/exemple*. Comprova que respecta l'estructura de carpetes original.
```shell
sudo tar -xzvf exemple.tar.gz -C /tmp/exemple
```
### Exercici 5 (compressió d'un llistat directoris o fitxers guardat en un arxiu)

Comprimeix el següent llistat de directoris i fitxers en un arxiu anomenat llista.tar.bz2 dins del directori /tmp (llista de directoris i fitxers: /boot/grub/locale, /etc/firefox, /etc/passwd, /etc/shadow). Comproveu que s'ha creat correctament.
```shell
sudo tar -cjvf /tmp/llista.tar.bz2 /boot/grub/locale /etc/firefox /etc/passwd /etc/shadow
```
### Exercici 6 (afegir data en el nom de l'arxiu de sortida)

Feu el mateix que en l'exercici anterior però l'arxiu de sortida ha de tenir el format següent: COP\_SEG\_dia\_mes\_any.tar.bz2 (per exemple COP\_SEG\_07\_11\_2011.tar.bz2). La data l'ha d'agafar automàticament del sistema.
```shell
sudo tar -cjvf /tmp/COP_SEG_`date +%d_%m_%Y`.tar.bz2 /boot/grub/locale /etc/firefox /etc/passwd /etc/shadow
```
### Exercici 7 (creació d'un script i programació d'execució automàtica)

Guarda la comanda anterior (sense el sudo) en un script amb el nom CopiaTotal.sh. Dona-li permisos d'execució (chmod u+x) Comproveu que teniu instal·lat a herramientas, si no és així instal·leu-lo, l'aplicació "cron" o tareas programadas. Executa l'script (simplement amb la ruta i el seu nom) per comprovar que funciona. Programa una tasca per tal que s'executi aquest script el dia 1 de cada mes a les 3 de la matinada.

1. Crees un fitxer anomenat /home/usuari/CopiaTotal.sh am el següent contingut:`
```shell
#!/bin/bash
tar -cjvf /tmp/COP_SEG_`date +%d_%m_%Y`.tar.bz2 /boot/grub/locale /etc/firefox /etc/passwd /etc/shadow
```
2.Canvia els permisos:
```shell
chmod +x CopiaTotal.sh
```
3.Crees una tarea al cron de la següent manera:
```shell
crontab -e
```
i al fitxer afegir la linea:
```shell
0 3 1 * * /home/usuari/CopiaTotal.sh
```
### Exercici 8 (creació d'un script de copia diferencial i programació execució)

Suposem que volem fer una còpia diferencial d'aquest fitxer **(llistat.txt que contindrà els directoris /boot/grub/locale /etc/firefox /etc/passwd /etc/shadow)**; els dies 7, 15 i 25 de cada mes. Escriu un script anomenat CopiaDiferencial.sh per fer aquesta còpia. Programa l'administrador de tasques per tal que l'executi cada mes en aquests dies també a les 3 de la matinada. El fitxer generat de cada còpia de seguretat diferencial s'ha de dir CD\_DataDarreraCopiaTotal-DataCopiaDiferencial.tar.bz2 (per exemple CD\_01nov11-7nov11.tar.bz2)

1. llistat es un fitxer que hi ha la seugüent informació:
```shell
/boot/grub/locale /etc/firefox /etc/passwd /etc/shadow
```
2.Crear un fitxer anomenat CopiaDiferencial.sh amb la següent informació:
```shell
#!/bin/bash
tar -cjvf /tmp/CD_SEG_01`date +%b%y`- `date +%d%b%y`.tar.bz2 $(cat /tmp/llistat.txt) -N 01`date +%b%y`
tar -cjvf /tmp/CD_01`date +%b%y`- `date +%d%b%y`.tar.bz2 $(cat /tmp/llistat.txt) -N 01`date +%b%y`
```

3.Canvia els permisos:
```shell
chmod +x CopiaDiferencial.sh
```
4.Crees una tarea al cron de la següent manera:
```shell
crontab -e

i al fitxer afegir la linea:

0 3 7 * * /home/usuari/CopiaDiferencial.sh

0 3 15 * * /home/usuari/CopiaDiferencial.sh

0 3 25 * * /home/usuari/CopiaDiferencial.sh
```
## Windows

### Eina pròpia de Windows

#### Exercici 1 (Backup complert)

Cerca l'eina de programació de còpies de seguretat de windows. Crea en una carpeta els fitxers de text següents:

* Escriu en el fitxer **file1** el text: “Aquest és el fitxer file1”
* Escriu en el fitxer **file2** el text: “Aquest és el fitxer file2”
* Escriu en el fitxer **file3** el text: “Aquest és el fitxer file3”
* Escriu en el fitxer **file4** el text: “Aquest és el fitxer file4”
* Escriu en el fitxer **file5** el text: “Aquest és el fitxer file5”

Programa un backup programat per un dia i una hora determinada de tot el directori Dades. Canvia l'hora i la data del sistema per a què es faci la copia programada.

Comprova que efectivament s'ha realitzat la còpia programada. Fes una captura de pantalla de l'arxiu log.

#### Exercici 2 (Backup incremental)

Dissenya un sistema de backups incrementals per a què es faci un **backup programat cada minut** del directori **Dades**.

Mentres es va realitzant el backup realitza (no ho facis molt ràpid) els següents canvis en els fitxers:

* Afegeix en el fitxer file1 el text: “Aquest és el fitxer file1” (debe estar dos veces)
* Afegeix en el fitxer file2 el text: “Aquest és el fitxer file2” (debe estar dos veces)
* Canvia el nom del fitxer “file3” per “file33”
* Esborra el “file5”.
* Esborra el contingut del file4, però no el fitxer.
* Afegeix en el fitxer file1 el text: “Aquest és el fitxer file1” (debe estar tres veces)
* Afegeix en el fitxer file2 el text: “Aquest és el fitxer file2” (debe estar tres veces)

Comprova que s'han efectuat les còpies programades. Indica quantes còpies s'han fet i què ha guardat cadascuna d'elles. Fes una captura de pantalla del contingut de l'arxiu log.

#### Exercici 3 (Restauració parcial)

Volem restaurar l'arxiu **file5**. Indica els passos que has de seguir per fer-ho i si s'ha restaurat.

Volem restaura l'arxiu **file1** en la seva primera versió indica els passos que hem de seguir per fer-ho i si ho ha restaurat correctament.

#### Exercici 4 (Restauració complerta)

Esborra tot el directori **Dades**. Executa una restauració complerta. Indica els passos que hem de seguir i què obtens al final.

Podem programar backups diferencials amb aquesta eina?

## Paragon Backup & Recovery- windows

[Descarrega el programari](https://www.paragon-software.com/free/br-free/)

Fes una còpia de seguretat de tot un directori i comprova que després pots recuperar el contingut amb la còpia que has fet.

## FREEFILESYNC- windows

[Descàrrega](https://freefilesync.org/)

Crear dues carpetes de fitxers "Principal" y "BackUp".

1\) crea 4 archivos en principal y otros 2 en Backupcrea 4 arxius en principal i altres 2 a Backup, utilitza la sincronització BIDIRECCIONAL dóna-li a COMPARAR i SINCRONITZAR.

2\) crea 2 arxius i elimina'n un altre a Principal, utilitza la sincronització MIRALL dóna-li a COMPARAR i SINCRONITZAR.

2.1) Què passa si esborres un arxiu al Backup?

3\) crea 2 arxius, utilitza la sincronització PERSONALITZADA dóna-li a COMPARAR i SINCRONITZAR.

## Eina Cobian Backup \-Windows

\==== Vídeotutorials còpies completes, diferencials i incrementals amb Cobian:

` https://www.youtube.com/watch?v=FAuvx1rGLtw`

**Exercici 1 (programació còpia de seguretat diferencial comprimida)**

Programeu una còpia de seguretat  **diferencial**, comprimida en zip i protegida amb contrasenya de la carpeta "Mis documentos" (heu de crear una "tarea nueva"). Aquesta còpia s'ha d'efectuar tots els divendres a les 23:30 hores.

**Exercici 2 (Programació còpia de seguretat incremental comprimida)**

Programeu una còpia de seguretat  **incremental**, comprimida en zip i protegida amb contrasenya de la carpeta "Mis documentos" (heu de crear una "tarea nueva"). Aquesta còpia s'ha d'efectuar tots els dies excepte els divendres a les 23:30 hores.

**Exercici 3 (Restauració còpia de seguretat comprimida)**

Feu que s'executin les tasques anteriorment programades. Elimineu la carpeta mis documentos i restaureu-la. El Cobian posseeix alguna eina de restauració? Creieu que és necessari o es pot fer manualment?

**Exercici 4 (Programació còpia de seguretat comprimida i encriptada)**

Programeu una còpia de seguretat comprimida i encriptada de la carpeta “imatges” que s'executi cada 12 hores.

**Exercici 5 (Restauració còpia de seguretat comprimida i encriptada)**

Elimineu algunes imatges de la carpeta i restaureu-la. Indiqueu els passos que hem de seguir per tal de restaurar una carpeta encriptada com aquesta.

## RSYNC-linux

rsync es el standar sync para la sincronización remota.La utilidad rsync se utiliza para sincronizar los archivos y directorios de un lugar a otro de una manera eficaz. La ubicación de copia de seguridad podría estar en el servidor local o en un servidor remoto

Estructura del comando: $ rsync \[opciones\] origen destino

Los comandos más útiles y utilizados son:

**\-v \--verbose** Muestra información a través del terminal.

**\-e \--rsh=command** Especifica la consola Shell a utilizar.

**\-a \--archive** Modo archivado: recursivo, copia enlaces, mantiene los permisos, la fecha de modificación, la información de grupos, propietarios y los archivos de dispositivos.

**\-r \--recursive** Recusividad para todos los directorios.

**\--delete** Elimina archivos ajenos a la fuente de origen.

**\-z \--compress** Comprime archivos durante la transferencia.

**\-P \--progress** Muestra una barra de progreso

Nos conectaremos desde la máquina Real a una maquina Virtual (openssh-server) activamos el proxy aula

**1\. Sincronizar dos directorios en un servidor local**

rsync \-azv /var/opt/installation/inventory/ /root/temp/

**2\. Sincronizar archivos de local a remoto**

rsync \-avz ./Datos/ administrador@172.16.104.2:/home/administrador/Escriptori/backup

**3\. Sincronizar archivos de remoto a local**

rsync \-avz administrador@172.16.104.2:/home/administrador/Escriptori/backup ./Datos

**4\. Ver el progreso rsync durante la transferencia**

rsync \-avz \--progress ./Datos/ administrador@172.16.104.2:/home/administrador/Escriptori/backup

**5\. I si volguesim encriptar toda la informació?**

rsync \-e ssh \-avPz /origen usuario@172.168.106.250:/destino

[https://javierin.com/rsync-funcionamiento-opciones/](https://javierin.com/rsync-funcionamiento-opciones/)

[https://www.linuxparty.es/index.php/8177-copias-de-seguridad-remotas-en-linux-ejemplos-con-rsync](https://www.linuxparty.es/index.php/8177-copias-de-seguridad-remotas-en-linux-ejemplos-con-rsync)

[https://gigastur.es/copias-seguridad-linux-rsync](https://gigastur.es/copias-seguridad-linux-rsync)

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

## BUSCA

Busca, prueba y documenta UN programa que realice copias de seguridad en windows (FREEFILESYNC, Rclone, cobian...) y otro en linux(Grsync, Gadmin-rsync... ).

## Enlaces Interés

[https://www.2brightsparks.com/syncback/syncback-hub.html](https://www.2brightsparks.com/syncback/syncback-hub.html)

[https://www.softzone.es/2012/08/04/freefilesync-5-6-uno-de-los-mas-interesantes-sincronizadores-de-archivos-se-actualiza/](https://www.softzone.es/2012/08/04/freefilesync-5-6-uno-de-los-mas-interesantes-sincronizadores-de-archivos-se-actualiza/) [https://www.freefilesync.org/](https://www.freefilesync.org/)

[http://www.laguialinux.es/sincronizacion-directorios-remotos-rsync](http://www.laguialinux.es/sincronizacion-directorios-remotos-rsync)

[http://blog.elhacker.net/2014/02/ejemplos-rsync-para-hacer-copias-de-seguridad-remotas-backup.html](http://blog.elhacker.net/2014/02/ejemplos-rsync-para-hacer-copias-de-seguridad-remotas-backup.html)

[https://www.smythsys.es/8740/rclonebrowser-maneja-sincroniza-visualiza-unidades-la-nube-rclone/](https://www.smythsys.es/8740/rclonebrowser-maneja-sincroniza-visualiza-unidades-la-nube-rclone/)

[https://blog.desdelinux.net/rclone-sincronizar-archivos-y-directorios-entre-nubes/](https://blog.desdelinux.net/rclone-sincronizar-archivos-y-directorios-entre-nubes/)

[https://www.youtube.com/watch?v=qTNHPyoXols](https://www.youtube.com/watch?v=qTNHPyoXols)

[http://www.abcdatos.com/programa/sincroniza-archivos.html](http://www.abcdatos.com/programa/sincroniza-archivos.html)

* 
