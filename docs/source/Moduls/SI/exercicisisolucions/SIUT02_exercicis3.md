# Eina Cobian Backup \-Windows

[Descàrrega](https://www.cobiansoft.com/cobianbackup.html)

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

Descàrrega

rsync és l'estandar sync per a la sincronització remota. La utilidad rsync se utiliza para sincronizar los archivos y directorios de un lugar a otro de una manera eficaz. La ubicació de còpia de seguretat podria estar en el servidor local o en un servidor remot.

Estructura de la instrucció: $ rsync \[opcions\] origen desti

Els comandaments més útils i utilitzats són:

**\-v \--verbose** Mostra informació a través del terminal.

**\-e \--rsh=command** Especifica la consola Shell a utilitzar.

**\-a \--archive** Mode arxivat: recursiu, còpia enllaços, manté els permisos, la data de modificació, la informació de grups, propietaris i els arxius de dispositius.

**\-r \--recursive** Recusivitat per a tots els directoris.

**\--delete** Elimina arxius aliens a la font d'origen.

**\-z \--compress** Comprimeix arxius durant la transferència.

**\-P \--progress** Mostra una barra de progrés

Ens connectarem des de la màquina física a la maquina virtual que estam utilitzant (openssh-server) 

**1\. Sincronitzar dos directoris en un servidor local**

Per exemple: rsync \-azv /var/opt/installation/inventory/ /root/temp/

**2\. Sincronitzar arxius de local a remot**

Per exemple: rsync \-avz ./Datos/ administrador@<ip>:/home/administrador/Escriptori/backup

**3\. Sincronitzar arxius de remot a local**

Per exemple: rsync \-avz administrador@<ip>:/home/administrador/Escriptori/backup ./Datos

**4\. Veure el progrés rsync durant la transferència**

Per exemple: rsync \-avz \--progress ./Datos/ administrador@<ip>:/home/administrador/Escriptori/backup

**5\. I si volguesim encriptar toda la informació?**

Per exemple: rsync \-e ssh \-avPz /origen usuario@172.168.106.250:/destino

[https://javierin.com/rsync-funcionamiento-opciones/](https://javierin.com/rsync-funcionamiento-opciones/)

[https://www.linuxparty.es/index.php/8177-copias-de-seguridad-remotas-en-linux-ejemplos-con-rsync](https://www.linuxparty.es/index.php/8177-copias-de-seguridad-remotas-en-linux-ejemplos-con-rsync)

[https://gigastur.es/copias-seguridad-linux-rsync](https://gigastur.es/copias-seguridad-linux-rsync)

