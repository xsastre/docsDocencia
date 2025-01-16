## Rutas en Angular

Angular es comúnmente utilizado para desarrollar Single Page Applications (SPA). A pesar de ser una SPA, la aplicación debe comportarse de manera similar a los sitios web tradicionales en términos de URLs (Uniform Resource Identifiers). Esto implica que necesitamos poder referenciar externamente las diferentes partes de la aplicación, tener la capacidad de navegar hacia atrás y adelante en el historial del navegador y manejar rutas virtuales adecuadamente.

Las rutas en Angular se definen en el archivo `app-routing.module.ts`. Las rutas son objetos que contienen el camino (`path`) y el componente al que hacen referencia. Las páginas en una SPA de Angular son representadas por componentes, y el enrutador carga las rutas dentro de un `<router-outlet>` en la plantilla principal de la aplicación.

### Ejemplo Básico de Rutas

El siguiente es un ejemplo de cómo configurar rutas básicas en Angular:

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlanetListComponent } from './planets/planet-list/planet-list.component';
import { SunComponent } from './sun/sun.component';
import { PlanetDetailComponent } from './planets/planet-detail/planet-detail.component';
import { PlanetEditComponent } from './planets/planet-edit/planet-edit.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { PlanetResolveService } from './planets/planet-resolve.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'planets', canActivate: [AuthGuard], component: PlanetListComponent },
  { path: 'suns', canActivate: [AuthGuard], component: SunComponent },
  { path: 'planet/:id', canActivate: [AuthGuard], component: PlanetDetailComponent },
  { path: 'planet/edit/:id', canActivate: [AuthGuard], resolve: { planet: PlanetResolveService }, component: PlanetEditComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

- `path`: Define el URI para la ruta.
- `component`: El componente que se carga cuando se navega a esa ruta.
- `canActivate`: Define guardias que protegen las rutas.
- `resolve`: Permite precargar datos antes de que el componente se cargue.

### Rutas con Hash

Una manera de implementar SPA sin manipular el servidor es usar una almohadilla (`#`) al principio de la ruta:

```html
http://localhost:4200/#/home
```

Esto es más antiguo, pero funciona en todos los navegadores, simplifica el envío de parámetros y evita la manipulación del servidor. Para que funcione, se debe agregar `withHashLocation()` al los providers del bootstrap:

```typescript
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withHashLocation()),
  ],
});
```

### Creación de Rutas

- **Ruta Básica**: Define un camino y el componente que se activa.

```typescript
{ path: 'home', component: HomeComponent }
```

- **Ruta con Guard**: Protege rutas usando guardias.

```typescript
{ path: 'planets', canActivate: [AuthGuard], component: PlanetListComponent }
```

- **Ruta con Parámetros**: Permite pasar parámetros en la URL.

```typescript
{ path: 'planet/:id', canActivate: [AuthGuard], component: PlanetDetailComponent }
```

- **Ruta con Resolve**: Precarga datos necesarios para el componente.

```typescript
{ path: 'planet/edit/:id', canActivate: [AuthGuard], resolve: { planet: PlanetResolveService }, component: PlanetEditComponent }
```

- **Ruta por Defecto**: Redirige a una ruta específica si la ruta no existe.

```typescript
{ path: '**', pathMatch: 'full', redirectTo: 'home' }
```

### Enlaces de Navegación

Para crear enlaces de navegación en Angular, se utiliza `[routerLink]` en lugar de `href`:

```html
<a class="nav-link active" aria-current="page" [routerLink]="['home']">Home</a>
```

Si la ruta tiene más niveles, se usarán elementos adicionales en el array.

```html
<a class="nav-link" aria-current="page" [routerLink]="['home']" [routerLinkActive]="['active']">Home</a>
```

El atributo `routerLinkActive` puede estar sin corchetes y aplicarse al elemento padre del enlace si es necesario.

### Navegación por Código

Para navegar por código en Angular, se importa el `Router` y se inyecta en el constructor:

```typescript
import { Router } from '@angular/router';

constructor(private router: Router) {}

detailsProduct(id: number): void {
  this.router.navigate(['/product', id]);
}
```

### Obtener Parámetros de las Rutas

Las rutas pueden contener parámetros, como un `id`. Para obtener estos parámetros, se utiliza `ActivatedRoute`:

```typescript
import { ActivatedRoute } from '@angular/router';

constructor(private activatedRoute: ActivatedRoute) { }

ngOnInit(): void {
  this.activatedRoute.params.subscribe(params => {
    console.log(params);
  });
}
```

Los parámetros (`params`) son un observable al que nos suscribimos para recibir los valores pasados en la URL.

A partir de Angular 16, se pueden configurar los parámetros del router para aceptarlos mediante `@Input()` usando `withComponentInputBinding()`.

```typescript
bootstrapApplication(App, {
  providers: [
    provideRouter(routes, 
        //... other features
        withComponentInputBinding() // <-- enable this feature
    )
  ],
});
```
En el componente:

```typescript
 @Input() query?: string; // Normal
 @Input('q') queryParam?: string; // Renombrar el parámetro
```

En el router: 
```typescript
{ path: 'planet/:query', canActivate: [AuthGuard], component: PlanetDetailComponent }
```


### Transiciones en Angular (2024)

Las transiciones en Angular permiten crear animaciones fluidas entre diferentes estados de la aplicación. En la actualidad, la funcionalidad completa de estas transiciones solo está totalmente disponible en Google Chrome. A continuación, se detalla cómo implementar y personalizar las transiciones en Angular.

#### Definición de Animaciones en CSS

Primero, definimos las animaciones CSS utilizando `@keyframes`. Esto permite rotar los elementos durante las transiciones.

```css
@keyframes rotate-out {
  to {
    transform: rotate(90deg);
  }
}

@keyframes rotate-in {
  from {
    transform: rotate(-90deg);
  }
}

::view-transition-old(count),
::view-transition-new(count) {
  animation-duration: 200ms;
  animation-name: -ua-view-transition-fade-in, rotate-in;
}

::view-transition-old(count) {
  animation-name: -ua-view-transition-fade-out, rotate-out;
}
```

En este ejemplo:
- `rotate-out`: rota un elemento 90 grados.
- `rotate-in`: rota un elemento desde -90 grados hasta su posición original.
- `::view-transition-old(count)` y `::view-transition-new(count)`: aplican las animaciones durante la transición.

#### Configuración de Rutas en Angular

Para habilitar las transiciones, configuramos las rutas en `app-routing.module.ts` utilizando `provideRouter` y añadiendo `withViewTransitions()`.

```typescript
providers: [
  provideRouter(
    [
      { path: '', pathMatch: 'full', redirectTo: '/0' },
      { path: ':count', component: Counter },
    ],
    withViewTransitions(),
    withComponentInputBinding()
  ),
],
```

- `provideRouter`: Define las rutas de la aplicación.
- `withViewTransitions()`: Habilita las transiciones de vista.
- `withComponentInputBinding()`: Permite el enlace de entrada del componente.

#### Personalización de Transiciones

Es posible personalizar las transiciones en el archivo CSS.

```css
::view-transition-old(count),
::view-transition-new(count) {
  animation-duration: 200ms;
  animation-name: -ua-view-transition-fade-in, rotate-in;
}

::view-transition-old(count) {
  animation-name: -ua-view-transition-fade-out, rotate-out;
}
```

Aquí, se definen las duraciones y los nombres de las animaciones para las transiciones de entrada y salida.

#### Uso de `onViewTransitionCreated`

`withViewTransitions` acepta un objeto con la función `onViewTransitionCreated` para manejar eventos de transición.

```typescript
withViewTransitions({
  onViewTransitionCreated: ({ transition }) => {
    const router = inject(Router);
    const targetUrl = router.getCurrentNavigation()!.finalUrl!;
    
    const config = { 
      paths: 'exact', 
      matrixParams: 'exact',
      fragment: 'ignored',
      queryParams: 'ignored',
    };

    if (router.isActive(targetUrl, config)) {
      transition.skipTransition();
    }
  },
}),
```

En este ejemplo:
- `onViewTransitionCreated`: Se invoca cuando se crea una transición de vista.
- `transition.skipTransition()`: Cancela la animación si solo cambian el fragmento o los parámetros de consulta.
