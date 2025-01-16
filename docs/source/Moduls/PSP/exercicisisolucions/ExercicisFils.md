# Col·lecció exercicis simples de programació multifil

Aquesta petita col·lecció d'exercicis és molt recomanable per agafar confiança amb la programació multifil i les seves eines. ÀNIM!

## Activitats d'iniciació

1. Imprimeix "Hola, món!" des d'un fil.
2. Imprimeix cinc vegades "Hola, món!" mitjançant cinc fils diferents.
3. Imprimeix cinc vegades mitjançant cinc fils diferents "Hola, sóc el fil X!" on X és el número o identificador del fil.
4. Amb dos fils, incrementa un sencer compartit en un repetidament, sense sincronització, 1.000.000 de vegades (500.000 cadascun) i imprimeix el resultat al final del programa.
5. Amb dos fils, incrementa un sencer compartit en un repetidament, amb sincronització, 1.000.000 de vegades (500.000 cadascun) i imprimeix el resultat al final del programa.
6. Llança dos fils simultàniament: un fil que incrementi un sencer en un 1.000.000 de vegades i un segon fil que imprimeixi el valor del sencer en aquell moment.
7. Llança dos fils simultàniament: un fil que incrementi un sencer en un 1 000 000 de vegades i un segon fil que esperi (mètode _wait()_ ) la notificació (mètode _notify()_ ) del primer que ha finalitzat per imprimir finalment aquest sencer .
8. Simula una cursa de relleus amb quatre corredors. Cada corredor és un fil que començarà a córrer quan l'altre s'acabi (excepte el primer). Usa els mètodes _start()_ i _join()_ alternativament per a cada fil.
9. Repeteix l'activitat anterior però aquesta vegada usant els mètodes _wait()_ i _notify()_.
10. Simula una cursa de 100 metres de cinc animals on cada animal és un fil que avança 1 metre en cada iteració d'un bucle. Mostra els progressos de cada animal i el rànquing final. Pots fer servir el mètode _yield()_ al final de cada iteració per fer la cursa més igualada.

??? info "Mètode _yield()_"

    Ves [aquí](https://www.javamadesoeasy.com/2015/03/differences-and-similarities-between.html) per veure més informació

## Activitats

11. Donat un enter n divisible per 5, calcula la suma de tots els enters des de 1 fins a n , ambdós inclosos. Divideix la feina en almenys 5 fils.
12. Donat un String, calcula el nombre de vocals que hi ha. Per això, llança cinc fils: un per a cada vocal. Mostra el total per a cada vocal i el total de vocals.
13. Repeteix l'activitat anterior, però donat un fitxer de text.
14. Donades dues matrius d'enters 3 × 3, calcula'n la multiplicació. Per això, llança nou fils: un per calcular cada element.

??? example "Com calcular un producte de matrius"

    <div style="background-color:rgba(250, 230, 7, 1);">

    Anem a detallar com s'han calculat alguns dels seus elements.

    $$
    \left( \begin{array}{ccc} 2 & 5 & 1 \\ 4 & -2 & 0 \\ 1 & 6 & 2 \end{array} \right) \cdot \left( \begin{array}{ccc} 1 & 2 & 3 \\ 3 & 4 & 1 \\ 1 & -4 & 2 \end{array} \right) = \left( \begin{array}{ccc} 18 & 20 & 13 \\ -2 & 0 & 10 \\ 21 & 18 & 13 \end{array} \right)
    $$

    L'element \(a_{11}\) s'obté multiplicant primera fila per primera columna:

    $$
    \left( \begin{array}{ccc} \fbox{2} & \fbox{5} & \fbox{1} \\ 4 & -2 & 0 \\ 1 & 6 & 2 \end{array} \right) \cdot \left( \begin{array}{ccc} \fbox{1} & 2 & 3 \\ \fbox{3} & 4 & 1 \\ \fbox{1} & -4 & 2 \end{array} \right) = \left( \begin{array}{ccc} \fbox{18} & 20 & 13 \\ -2 & 0 & 10 \\ 21 & 18 & 13 \end{array} \right)
    $$

    $$
    2\cdot1+5\cdot3+1\cdot1=2+15+1=18
    $$

    L'element \(a_{23}\) s'obté multiplicant segona fila per tercera columna:

    $$
    \left( \begin{array}{ccc} 2 & 5 & 1 \\ \fbox{4} & \fbox{-2} & \fbox{0} \\ 1 & 6 & 2 \end{array} \right) \cdot \left( \begin{array}{ccc} 1 & 2 & \fbox{3} \\ 3 & 4 & \fbox{1} \\ 1 & -4 & \fbox{2} \end{array} \right) = \left( \begin{array}{ccc} 18 & 20 & 13 \\ -2 & 0 & \fbox{10} \\ 21 & 18 & 13 \end{array} \right)
    $$

    $$
    4\cdot3+(-2)\cdot1+0\cdot2=12-2+0=10
    $$

    L'element \(a_{31}\) s'obté multiplicant tercera fila per primera columna:

    $$
    \left( \begin{array}{ccc} 2 & 5 & 1 \\ 4 & -2 & 0 \\ \fbox{1} & \fbox{6} & \fbox{2} \end{array} \right) \cdot \left( \begin{array}{ccc} \fbox{1} & 2 & 3 \\ \fbox{3} & 4 & 1 \\ \fbox{1} & -4 & 2 \end{array} \right) = \left( \begin{array}{ccc} 18 & 20 & 13 \\ -2 & 0 & 10 \\ \fbox{21} & 18 & 13 \end{array} \right)
    $$

    $$
    1\cdot1+6\cdot3+1\cdot2=1+18+2=21
    $$

    L'element \(a_{22}\) s'obté multiplicant segona fila per segona columna:

    $$
    \left( \begin{array}{ccc} 2 & 5 & 1 \\ \fbox{4} & \fbox{-2} & \fbox{0} \\ 1 & 6 & 2 \end{array} \right) \cdot \left( \begin{array}{ccc} 1 & \fbox{2} & 3 \\ 3 & \fbox{4} & 1 \\ 1 & \fbox{-4} & 2 \end{array} \right) = \left( \begin{array}{ccc} 18 & 20 & 13 \\ -2 & \fbox{0} & 10 \\ 21 & 18 & 13 \end{array} \right)
    $$

    $$
    4\cdot2+(-2)\cdot4+0\cdot2=8-8+0=0
    $$

    Els elements restants de la matriu producte es calculen seguint el mateix mètode.
    </div>

15. Simula un convertidor d'escala de grisos a binari. Per això, donada una matriu 100 × 100 d'enters aleatoris entre 0 i 255 (tots dos inclosos), converteix-la en una nova matriu 100 × 100 on els valors de 0 a 127 passin a 0 i els valors de 128 a 255 a 1. Divideix el treball a 4 fils, un per cada regió de 50 × 50.
16. Repeteix l'activitat anterior però atesa una imatge. Pistes: [1](https://stackoverflow.com/a/15972640) , [2](https://stackoverflow.com/a/10392050).
17. Simula una cursa de relleus amb quatre corredors i amb pas de testimoni. Cada corredor és un fil que començarà a córrer quan l'altre s'acabi (excepte el primer). Utilitza synchronized() , wait() i notify() per al pas del testimoni.
18. Repeteix l'activitat anterior però fent servir la classe Semaphore.
19. (lector-escriptor). Simula l'accés i l'escriptura a una base de dades. Per fer-ho, llança 20 fils simultàniament, 10 de lectura i 10 d'escriptura d'un enter. Els fils d'escriptura s'han d'incrementar en un sencer mentre no hi hagi un altre fil d'escriptura escrivint o un fil de lectura llegint. Els de lectura poden llegir i imprimir sencer encara que hi hagi altres fils de lectura però no mentre n'hi hagi un d'escriptura escrivint. Fes servir la classe Semaphore de Java.

## Activitats d'ampliació

21. Donades dues matrius d'enters aleatoris 100 × 100, calcula'n la multiplicació sense fer servir fils. A continuació, fes-ho de nou però amb 10.000 fils: un per calcular cada element. Finalment, calcula el temps d'execució amb fils i sense.

!!! example "22. Problema del supermercat:"
    
    Escriu una classe anomenada Parking que implementi el funcionament de N caixes d'un supermercat. Els M clients del supermercat estaran un temps aleatori comprant i amb posterioritat seleccionaran aleatòriament en quina caixa posicionar-se per situar-se en la seva cua corresponent. Quan els toqui el torn seran atesos procedint al pagament corresponent i guardant aquesta quantitat a la variable Resultats del supermercat. S'han de crear tants threads com a clients hi hagi i els paràmetres M i N s’han de passar com a arguments al programa. Per simplificar la implementació, el valor de pagament de cada client pot ser aleatori.

!!! example "22a. Problema del supermercat modern:"

    Escriu una classe anomenada ParkingModern que implementi el funcionament de N caixes d’un supermercat. Els M clients del supermercat realitzaran el mateix procés que a l’exercici anterior del supermercat, però en aquest cas, en haver acabat la compra, els clients es col·locaran en una única coa. Quan una caixa estigui disponible, el primer de la coa serà atès a la caixa corresponent. Codificau M i N com a constants dins la vostra classe. De igual manera que a l’exercici original, simulau amb temps aleatori els següents processos:

    - Temps de compra

    - Temps que tarda el caixer de cada una de les caixes en cobrar a un client.

    Guardar en una variable el resultat del cobro de totes les caixes.

!!! example "22b. Què és més òptim una única coa o tantes coes com caixes?"

    ![coes](../img/coes2.jpeg){ style="height:100px; margin:10px; float:right; object-fit:cover"}

    Fes les dues versions del problema del pàrking. A continuació demostra a través de les modificacions als dos codis que consideris oportunes, quin dels dos mètodes és més eficient.
    
    Quan hagis arribat a la teva conclusió, llegeix [aquesta entrada del bloc.](../../../blog/posts/UnaOMultiplesCoes.md)

!!! example "23. Simulació parking"

    ![coes](../img/aparcament.jpeg){ style="height:100px; margin:10px; float:right; object-fit:cover"}

    Escriu una classe que simuli el funcionament d'un aparcament. Fes-ho de tal manera que contengui en dues constants el nombre de places del pàrquing i el nombre de cotxes existents en el sistema. S'han de crear tants threads com cotxes hi hagi. L'aparcament disposarà d'una única entrada i una única sortida. A l'entrada de vehicles hi haurà un dispositiu de control que permeti o impedeixi l'accés dels mateixos al pàrquing, depenent de l'estat actual del mateix (places d'aparcament disponibles). Els temps d'espera dels vehicles dins del pàrquing són aleatoris. En el moment en què un vehicle surt del pàrquing, notifica al dispositiu de control el número de la plaça que tenia assignada i s'allibera la plaça que estigués ocupant, quedant així aquestes novament disponibles.

    Un vehicle que ha sortit del pàrquing esperarà un temps aleatori per tornar a entrar novament en el mateix. Per tant, els vehicles han d'estar entrant i sortint indefinidament del pàrquing. És important que es dissenyi el programa de tal manera que s’asseguri que, abans o després, un vehicle que roman esperant a l'entrada del pàrquing entrarà en el mateix (no es produeixi inanició).

    Aquest exercici l’heu de plantejar utilitzant notify i wait. 

!!! example "24. Simulació bany"
    
    ![bany.jpeg](../img/bany.jpeg){ style="height:100px; margin:10px; float:right; object-fit:cover"}    

    Heu de fer un programa que simuli el procés d'un bany public. Ha d'estar fet utilitzant _wait()_ i _notify()_ però on tres persones (Tofol, Biel i Pep) arriben de forma aleatòria al bany i l'ordre d'arribada ha de ser l'ordre d'entrada al bany (FIFO).
    Feis un document de text 📄 amb l'explicació a alt nivell del vostre plantejament del programa. Es tracta d'explicar els detalls tècnics relacionats amb els fils que heu creat (no heu d'explicar el que és un bucle ni les variables utilitzades a no ser que tingui rellevància amb el problema que resoleu. Per exemple, si utilitzeu una booleana per sincronitzar part d'un procés o un integer per garantir l'ordre, aleshores sí).

