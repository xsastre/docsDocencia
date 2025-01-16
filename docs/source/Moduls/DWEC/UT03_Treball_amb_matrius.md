# Treball amb matrius en Javascript 

Hi ha diversos mètodes d'array en JavaScript que poden ser molt útils per treballar amb arrays de manera eficient i clara. Aquí tens alguns dels més comuns i útils:

### 1. `map()`
Crea un nou array amb els resultats de cridar una funció per a cada element de l'array original.

```javascript
const numeros = [1, 2, 3, 4, 5];
const dobles = numeros.map(num => num * 2);
console.log(dobles); // Sortida: [2, 4, 6, 8, 10]
```

### 2. `filter()`
Crea un nou array amb tots els elements que compleixen una condició especificada.

```javascript
const numeros = [1, 2, 3, 4, 5];
const parells = numeros.filter(num => num % 2 === 0);
console.log(parells); // Sortida: [2, 4]
```

### 3. `forEach()`
Executa una funció per a cada element de l'array. No retorna un nou array.

```javascript
const numeros = [1, 2, 3, 4, 5];
numeros.forEach(num => console.log(num * 2));
// Sortida: 2, 4, 6, 8, 10 (cada número en una línia separada)
```

### 4. `some()`
Comprova si almenys un element de l'array compleix una condició especificada. Retorna un booleà.

```javascript
const numeros = [1, 2, 3, 4, 5];
const hiHaParells = numeros.some(num => num % 2 === 0);
console.log(hiHaParells); // Sortida: true
```

### 5. `every()`
Comprova si tots els elements de l'array compleixen una condició especificada. Retorna un booleà.

```javascript
const numeros = [1, 2, 3, 4, 5];
const totsPositius = numeros.every(num => num > 0);
console.log(totsPositius); // Sortida: true
```

### 6. `find()`
Retorna el primer element de l'array que compleix una condició especificada. Si no troba cap element, retorna `undefined`.

```javascript
const numeros = [1, 2, 3, 4, 5];
const primerParell = numeros.find(num => num % 2 === 0);
console.log(primerParell); // Sortida: 2
```

### 7. `findIndex()`
Retorna l'índex del primer element de l'array que compleix una condició especificada. Si no troba cap element, retorna `-1`.

```javascript
const numeros = [1, 2, 3, 4, 5];
const indexPrimerParell = numeros.findIndex(num => num % 2 === 0);
console.log(indexPrimerParell); // Sortida: 1
```

### 8. `sort()`
Ordena els elements de l'array i retorna l'array ordenat. Per defecte, ordena els elements com a cadenes de text.

```javascript
const numeros = [5, 3, 8, 1, 2];
numeros.sort((a, b) => a - b);
console.log(numeros); // Sortida: [1, 2, 3, 5, 8]
```

### 9. `concat()`
Combina dos o més arrays i retorna un nou array.

```javascript
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const combinat = array1.concat(array2);
console.log(combinat); // Sortida: [1, 2, 3, 4, 5, 6]
```

### 10. `slice()`
Retorna una còpia superficial d'una porció de l'array en un nou array.

```javascript
const numeros = [1, 2, 3, 4, 5];
const part = numeros.slice(1, 3);
console.log(part); // Sortida: [2, 3]
```

