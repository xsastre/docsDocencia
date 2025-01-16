# Presentació diapositives UT02

## Programació multifil

**Taula de contingut**

[**1\. Presentació diapositives**](#presentació)

[**2\. Exemple us semàfors**](#exemple-us-semàfors)

### Presentació

![Imatge PSP 02](../img/ServeisiProcessos03.jpeg){width="25%"}

<iframe src="https://cesurformacion0-my.sharepoint.com/:p:/g/personal/xavier_sastre_cesurformacion_com/EfCSS4q06gBPkMa-ClyRJv4BHJkzjMdlFRdq_OvOxjEJKg?e=IhisQr&amp;action=embedview&amp;wdAr=1.7777777777777777" width="854px" height="480px" frameborder="0">Aquest és un presentació de <a target="_blank" href="https://office.com">Microsoft Office</a> incrustat, amb tecnologia de <a target="_blank" href="https://office.com/webapps">Office</a>.</iframe>

### Exemple us semàfors

Aquí teniu un exemple de com utilitzar semàfors. També el teniu al github.

```java
package docencia.xaviersastre.dam.psp.ut02;

import java.util.concurrent.Semaphore;
import java.util.concurrent.ThreadLocalRandom;

class RecursCompartit {
    private Semaphore semafor = new Semaphore(1);

    public void accessResource(String threadName) {
        try {
            // Adquireix el semàfor
            semafor.acquire();
            System.out.println(threadName + " està accedint al recurs.");
            // Simula  treball amb el recurs
            Thread.sleep(1000);
            System.out.println(threadName + " es fa amb el recurs.");
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            // Allibera el semàfor
            semafor.release();
        }
    }
}

class Fil extends Thread {
    private RecursCompartit recurs;
    private String nomFil;

    public Fil(RecursCompartit recurs, String nomFil) {
        this.recurs = recurs;
        this.nomFil = nomFil;
    }

    @Override
    public void run() {
        try {
            sleep(ThreadLocalRandom.current().nextInt(0, 2000)); // esperam un temps aleatori per evitar que sempre acabi el primer fil en primer lloc.
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        recurs.accessResource(nomFil);
    }
}

public class UT2Exemple19Exemple_Semafor {
    public static void main(String[] args) {
        RecursCompartit resource = new RecursCompartit();

        // Create multiple threads
        Thread t1 = new Fil(resource, "Thread 1");
        Thread t2 = new Fil(resource, "Thread 2");
        Thread t3 = new Fil(resource, "Thread 3");

        // Start the threads
        t1.start();
        t2.start();
        t3.start();
    }
}

```