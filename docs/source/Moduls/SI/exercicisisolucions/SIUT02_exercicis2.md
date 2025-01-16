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
