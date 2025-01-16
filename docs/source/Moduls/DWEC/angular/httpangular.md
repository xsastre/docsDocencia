# Comunicación con el servidor en Angular

## Servicios en Angular

En Angular, los servicios son componentes fundamentales que proporcionan datos y funcionalidades reutilizables a lo largo de la aplicación. Generalmente, los servicios manejan operaciones CRUD (Create, Read, Update, Delete) y permiten mantener la lógica de negocio y la gestión de datos de forma centralizada y persistente.

- **Provisión de Información**: Los servicios proporcionan datos a los componentes que los soliciten.
- **Operaciones CRUD**: Realizan operaciones básicas de creación, lectura, actualización y eliminación.
- **Persistencia de Datos**: Mantienen los datos de manera persistente a través de diferentes componentes.
- **Reutilizables**: Son reutilizables en toda la aplicación, promoviendo un código limpio y modular.

### Decorador @Injectable

Las clases de servicio en Angular están decoradas con `@Injectable()`. Este decorador indica al inyector de dependencias de Angular que debe proporcionar una instancia de la clase cuando sea necesario. Aquí hay un ejemplo de una clase de servicio:

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // Inicia que no hace falta que esté en providers
})
export class ProductService {
  // Métodos y lógica del servicio
}
```

El decorador `@Injectable` asegura que Angular gestione la instancia del servicio como un Singleton, lo que significa que se crea una única instancia del servicio y se comparte entre todos los componentes que lo requieran.

Si el servicio se declara con `providedIn: 'root'`, no es necesario agregarlo a `providers` porque Angular se encargará de su inyección automáticamente en toda la aplicación.

#### Inyección de Dependencias

En Angular, la inyección de dependencias (DI) es una técnica poderosa que permite a los componentes solicitar servicios de manera eficiente. En lugar de crear instancias de servicios con `new`, Angular maneja la creación y provisión de servicios mediante el constructor:

```typescript
import { Component } from '@angular/core';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent {
  constructor(private productService: ProductService) { }
}
```

Este enfoque hace que el código sea más legible y fácil de mantener. Además, permite que Angular gestione la creación de servicios como Singletons, asegurando que todos los componentes utilicen la misma instancia del servicio.

### HttpClientModule

Los servicios en Angular a menudo obtienen datos de un servidor a través de HTTP. Para hacer esto, se debe importar `HttpClientModule`:

```typescript
import { HttpClient, HttpClientModule } from '@angular/common/http';
....
```

#### Servicios como Clientes HTTP

Los servicios pueden utilizar `HttpClient` para realizar solicitudes HTTP. Esto se logra mediante la inyección de dependencias. Aquí hay un ejemplo de un servicio que obtiene productos de un servidor:

```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productURL = 'https://api.example.com/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<{products: Product[]}>(this.productURL).pipe(
      map(response => response.products)
    );
  }
}
```

En este ejemplo, `getProducts` realiza una solicitud HTTP GET para obtener una lista de productos. Utiliza `map` de RxJS para transformar la respuesta antes de devolverla como un `Observable`.

#### Envío de Datos con POST

Para enviar datos al servidor, se utiliza el método `post` de `HttpClient`. Aquí se muestra cómo hacerlo:

```typescript
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginURL = 'https://api.example.com/login';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  login(credentials: {username: string, password: string}): Observable<{token: string}> {
    return this.http.post<{token: string}>(this.loginURL, JSON.stringify(credentials), this.httpOptions);
  }
}
```

En este ejemplo, `login` envía credenciales de usuario al servidor utilizando una solicitud HTTP POST. Se configuran las cabeceras HTTP para especificar que el contenido es JSON.

### Datos asíncronos

En Angular, el manejo de datos asíncronos es una habilidad crucial para desarrollar aplicaciones web modernas y eficientes. Angular utiliza la librería RxJS para implementar una versión avanzada de manejo de datos asíncronos conocida como Observables, que ofrece capacidades más robustas en comparación con las Promesas tradicionales de JavaScript.

#### Promesas vs. Observables

Aunque se puede trabajar con promesas para obtener datos, Angular utiliza por defecto los Observables de RxJS debido a sus ventajas:

- **Valores Múltiples**: Mientras que una promesa retorna un solo valor o un error, un Observable puede emitir múltiples valores a lo largo del tiempo.
- **Lazy Loading**: Una promesa comienza su ejecución en el momento de su creación, mientras que un Observable sólo empieza a emitir valores cuando alguien se suscribe a él.
- **Cancelación**: Los observables pueden ser cancelados mediante la cancelación de las suscripciones, lo que permite un control más fino sobre el flujo de datos.
- **Operadores**: RxJS proporciona una amplia gama de operadores como `map`, `filter` y `reduce` que permiten manipular fácilmente los datos emitidos por los observables.

#### Uso de Operadores en Observables

Los operadores en RxJS son funciones que permiten transformar, filtrar y combinar flujos de datos de observables. Aquí hay un ejemplo de cómo se utilizan los operadores `map` y `filter`:

- **`map`**: Manipula los datos y los retorna.
- **`filter`**: Deja pasar sólo los datos que cumplen con una condición específica.

Estos operadores se aplican como parámetros del método `pipe` de la clase `Observable`.

```typescript
...
export class ProductService {
  private productURL = 'https://api.example.com/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<{products: Product[]}>(this.productURL).pipe(
      map(response => response.products),
      filter(product => product.price > 20)
    );
  }
}
```

#### Procesamiento de Respuestas de Observables

Un observable puede tener múltiples suscriptores y sólo comienza a emitir datos cuando alguien se suscribe a él. El método `subscribe()` acepta tres funciones como parámetros:

1. **Función de éxito**: Se ejecuta cuando el observable emite un valor.
2. **Función de error (opcional)**: Se ejecuta si el observable o alguno de sus operadores falla.
3. **Función de finalización (opcional)**: Se ejecuta siempre al finalizar la emisión de datos.

```typescript
products: Product[] = [];

ngOnInit(): void {
  this.productsService.getProducts().subscribe(
    prods => this.products = prods, // Función de éxito
    error => console.error(error),  // Función de error (opcional)
    () => console.log('Products loaded') // Función de finalización (opcional)
  );
}
```

#### Mostrar Datos Asíncronos

La carga de datos asíncronos puede retrasarse, lo que puede causar errores si Angular intenta acceder a datos que aún no están disponibles. Para manejar esto, se pueden utilizar varias técnicas:

- **Objetos Vacíos**: Crear un objeto con datos vacíos para evitar errores.
- **Directiva `@if`**: Mostrar los datos sólo cuando estén completamente cargados.
- **Operador `?`**: Asegurar que los datos no se accedan hasta que tengan un valor válido.

#### Signals

Las señales (`signals`) son una opción más simple y menos potente que los observables para tareas reactivas básicas. Desde Angular 17, se consideran una buena opción para tareas reactivas simples.

```typescript
constructor(){
  effect(()=>{console.log(`Valor de num: ${this.num()}`); });
}
num = signal(0);
updateNum(){ this.num.update((n: number) => n + 1); }
ngOnInit(): void { this.num.set(1); }
```

#### Resolver

A veces es necesario obtener datos del servidor antes de acceder a una ruta específica. Para esto, se utiliza un tipo especial de servicio llamado Resolver. 

Un Resolver es un servicio que implementa el método `resolve`, el cual obtiene los datos antes de que la ruta se cargue:

```typescript
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductService } from './product.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from './product.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<Product> {
  constructor(private productsService: ProductService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product | Observable<Product> | Promise<Product> {
    return this.productsService.getProduct(route.params.id).pipe(
      catchError(error => {
        this.router.navigate(['/products']);
        return of(null);
      })
    );
  }
}
```

Este resolver utiliza el servicio real para obtener los productos y maneja cualquier error redirigiendo al usuario a una ruta segura.

##### Configuración de Rutas con Resolver

Las rutas pueden configurarse para utilizar un resolver, asegurando que los datos necesarios estén disponibles antes de cargar el componente:

```typescript
const routes: Routes = [
  { path: 'product/edit/:id',
    canActivate: [ProductDetailGuard],
    canDeactivate: [LeavePageGuard],
    resolve: { product: ProductResolver },
    component: ProductEditComponent
  },
  // Otras rutas
];
```

## Autenticación con Angular

La autenticación es un aspecto crucial de las aplicaciones web modernas. En Angular, la autenticación puede ser manejada de varias formas, dependiendo de si la aplicación está alojada en el mismo servidor que el backend o si se utiliza un servicio externo. En este capítulo, exploraremos diferentes técnicas de autenticación y autorización en Angular, incluyendo el uso de cookies, tokens, interceptores, y guards.

### Cookies y Tokens

Si la aplicación web y el servidor están alojados en el mismo dominio, se pueden utilizar cookies para la autenticación. Sin embargo, cuando se utiliza un servicio externo, es común utilizar tokens de autenticación, como los JSON Web Tokens (JWT).

**Cookies:**
- Son enviadas automáticamente por el navegador en cada petición al servidor.
- Simplifican la gestión de sesiones cuando el frontend y el backend comparten el mismo dominio.

**Tokens:**
- Deben ser enviados manualmente en cada petición.
- Se almacenan en `localStorage` o `sessionStorage`.
- Proporcionan una mayor flexibilidad, especialmente cuando el frontend y el backend están en dominios diferentes.

### Interceptores

Los interceptores en Angular permiten interceptar y manipular solicitudes HTTP antes de que se envíen al servidor. Esto es útil para agregar tokens de autenticación a cada petición automáticamente.

**Ejemplo de Interceptor de Autenticación:**

```typescript
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('idToken'); // Token de localStorage
    if (token) {
      // Clonamos la petición y añadimos el token
      const authReq = req.clone({ url: req.url.concat(`?auth=${token}`) });
      // Enviamos la petición con el token
      return next.handle(authReq);
    }
    // Sin token, enviamos la petición original
    return next.handle(req);
  }
}
```

Para utilizar este interceptor, se debe proporcionar en el módulo principal:

```typescript
providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,
  },
],
```

### Guards

Los guards son servicios que permiten o deniegan el acceso a ciertas rutas en una aplicación Angular. El guard `CanActivate` se utiliza para proteger rutas y asegurar que solo usuarios autenticados puedan acceder a ellas.

**Ejemplo de Guard `CanActivate`:**

```typescript
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const id = route.params.id;
    if (isNaN(id) || id < 1) {
      console.log('La ID no es válida');
      return this.router.parseUrl('/catalog');
    }
    return true;
  }
}
```

**Configuración de la ruta con Guard:**

```typescript
{ path: 'product/:id', canActivate: [ProductDetailGuard], component: ProductDetailComponent },
```

## Variables como Observables

En una aplicación autenticada, es importante que los componentes reaccionen a los cambios en el estado de autenticación sin necesidad de recargar la página. Esto se puede lograr usando `BehaviorSubject` o `Subject` para mantener y observar el estado de autenticación.

**Ejemplo de Uso de `BehaviorSubject`:**

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loguedInfo: BehaviorSubject<boolean>;

  constructor() {
    this.loguedInfo = new BehaviorSubject<boolean>(false);
  }

  isLogued(): Observable<boolean> {
    return this.loguedInfo.asObservable();
  }

  login() {
    // Lógica de autenticación
    this.loguedInfo.next(true);
  }

  logout() {
    // Lógica de cierre de sesión
    this.loguedInfo.next(false);
  }
}
```

**Suscripción al Estado de Autenticación en un Componente:**

```typescript
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  template: `<div *ngIf="logued">Usuario autenticado</div>`
})
export class AppComponent implements OnInit {
  logued = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.isLogued().subscribe(logued => {
      this.logued = logued;
    });
  }
}
```

## Integración de Angular con Supabase

Supabase es una plataforma de backend como servicio (BaaS) que ofrece una variedad de servicios para aplicaciones web y móviles, como bases de datos en tiempo real, autenticación y almacenamiento. Supabase es compatible con TypeScript, lo que facilita su integración con aplicaciones Angular. En este capítulo, veremos cómo configurar y utilizar Supabase en una aplicación Angular.

Para comenzar, necesitamos instalar el SDK de Supabase utilizando npm:

```sh
npm install @supabase/supabase-js
```

Después de instalar el SDK, configuramos nuestras credenciales de Supabase en el archivo `environment.ts`. Este archivo es utilizado por Angular para gestionar diferentes configuraciones de entorno, como las variables de entorno para desarrollo y producción.

En `src/environments/environment.ts`, añade las siguientes líneas:

```typescript
export const environment = {
  production: false,
  supabaseUrl: 'YOUR_SUPABASE_URL',
  supabaseKey: 'YOUR_SUPABASE_KEY',
};
```

Asegúrate de reemplazar `'YOUR_SUPABASE_URL'` y `'YOUR_SUPABASE_KEY'` con tus credenciales de Supabase.


A continuación, creamos un servicio en Angular para inicializar y gestionar Supabase. Este servicio será responsable de la configuración inicial y de proporcionar métodos para interactuar con la base de datos.

Crea un nuevo servicio utilizando Angular CLI:

```sh
ng generate service supabase
```

En el archivo `supabase.service.ts`, inicializa Supabase de la siguiente manera:

```typescript
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // Métodos para interactuar con Supabase
  async getData(table: string) {
    const { data, error } = await this.supabase.from(table).select('*');
    if (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
    return data;
  }

  async insertData(table: string, row: any) {
    const { data, error } = await this.supabase.from(table).insert(row);
    if (error) {
      console.error('Error inserting data:', error);
      throw error;
    }
    return data;
  }

  async updateData(table: string, row: any, id: number) {
    const { data, error } = await this.supabase.from(table).update(row).eq('id', id);
    if (error) {
      console.error('Error updating data:', error);
      throw error;
    }
    return data;
  }

  async deleteData(table: string, id: number) {
    const { data, error } = await this.supabase.from(table).delete().eq('id', id);
    if (error) {
      console.error('Error deleting data:', error);
      throw error;
    }
    return data;
  }
}
```

### Conversión de Promesas a Observables

El SDK de Supabase funciona con promesas, pero en Angular es común trabajar con Observables para aprovechar las capacidades de programación reactiva de RxJS. Podemos convertir promesas a observables utilizando el operador `from` de RxJS.

```typescript
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  getDataObservable(table: string): Observable<any> {
    return from(this.getData(table));
  }

  private async getData(table: string) {
    const { data, error } = await this.supabase.from(table).select('*');
    if (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
    return data;
  }
}
```

En el componente, podemos suscribirnos al Observable para obtener los datos:

```typescript
import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent implements OnInit {
  data: any[] = [];

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit() {
    this.supabaseService.getDataObservable('your_table_name').subscribe(
      (data) => {
        this.data = data;
      },
      (error) => {
        console.error('Error loading data:', error);
      }
    );
  }
}
```
