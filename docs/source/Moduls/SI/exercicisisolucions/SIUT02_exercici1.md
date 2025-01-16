# Pràctica \- Copies de Seguretat - Realitzar una còpia de seguretat incremental en linux amb l'ordre tar.

1. Es crearan dos fitxers "fitxer1" i "fitxer2" a la carpeta "dades" i una altra carpeta "backup" on s'allotjaran les còpies de seguretat.

2. Es vol crear la còpia nivell 0, dins de la carpeta "backup" la primera vegada es crearà la total, a més dins del nom del fitxer posarà la [hora:minuts:segons](https://www.cyberciti.biz/faq/linux-unix-formatting-dates-for-display/).

``` {.shell .no-copy }
tar -cvzf backup/bkp0.tgz -g backup/snapshot.snar dades/

-c: crear l'arxiu

-v: verbose

-z: comprimir gzip, -j per bzip2, -J per XZ

-g: permet especificar un fitxer de snapshot incremental

Nota: arxiu de SNAPSHOT incremental emmagatzemarà metadades que ajudarà l'eina tar a determinar quins fitxers han canviat des del darrer incremental, quins s'han afegit, o quins s'han eliminat, de manera que tar podrà generar el següent backup incremental només dels canvis de l'anterior.

/*ho afegim dins de la cadena bkp0_`date +%d-%m-%y`.tgz */
```

3. Fem una còpia de seguretat nivell 1 (bkp1.tgz) però sense modificar cap dels fitxers.

4. Modifiquem el "fitxer1" afegint el vostre nom i fem la còpia de nivell 2 (bkp2.tgz).

5. Modifiquem el "fitxer2" afegint el vostre cognom i fem la còpia de nivell 3 (bkp3.tgz).

6. Modifiquem els dos fitxers afegint "SMX IES Politecnic" a cadascun i fem còpia de nivell4 (bkp4.tgz).

7. Comprovem i analitzem cadascun dels Backups

``` {.shell .no-copy }
tar -tvGf backup/bkp0.tgz

/*

-v : verbose
-G: incremental
Y: significa que el fitxer és al backup
N: significa que el fitxer NO és al backup

*/
```

**Restaurant la còpia de Seguretat**

8. Esborrem la carpeta "dades" del nostre escriptori simulant que hem perdut les dades i procedim a fer la recuperació amb cadascun dels arxius un a un.

``` {.shell .no-copy }
tar -xvGf backup/bkp0.tgz

/*
-x : extreure
-G: incremental  
*/
```

9. Llistem i comprovem tots els fitxers.

10. Ara cerca per Internet, utilitza IAs o allò que necessitis per crear un fitxer "script\Copia_incremental.sh", dóna permisos d'execució (chmod u+x), es tracta de programar una còpia completa el dia 1 de cada mes i cada dia fer-ne una còpia incremental. Pensa que hauras de recordar com fer un script amb bash, pensar la lògica de l'script i planificar l'execució de l'script amb el cron. Documenta (captura) el lloc d'on hagis tret la informació per poder-ho fer aquesta activitat i cerca una altra banda on confirmi que la informació és correcta. Aquest lloc també l'has de documentar.
11. Modifica el fitxer amb l'script anterior perquè en lloc de fer còpia incremental, faci còpia diferencial. Documenta d'on has tret la informació igual que abans.
 