# Consejos y Mejores Prácticas para Desarrollar en Angular

Angular es un framework potente y flexible para desarrollar aplicaciones web modernas. Sin embargo, su complejidad puede ser abrumadora, especialmente en proyectos grandes. A continuación, se presentan una serie de consejos y mejores prácticas para organizar y estructurar tu código de Angular de manera efectiva.

### 1. Utilización de Herramientas y Funcionalidades de Angular

- **Componentes**: Utiliza componentes para dividir tu HTML en partes más pequeñas y con una entidad propia. Cada componente debería tener una responsabilidad clara y específica.

- **Rutas**: Usa el enrutador de Angular para gestionar la navegación dentro de tu aplicación. Define rutas en tu módulo de enrutamiento y asegúrate de que cada ruta apunte a un componente que se encargue de una sección específica de la aplicación.

- **Interpolación**: Muestra variables en el HTML usando `{{}}`. Esto enlaza las propiedades del componente con la vista de manera declarativa.

- **Estilos Dinámicos**: Cambia estilos de forma dinámica usando `ngStyle`, `ngClass` o las propiedades `[style]` y `[class]`.

- **Formularios**: Usa el binding bidireccional `[()]` para formularios simples y formularios reactivos para formularios más complejos. Los formularios reactivos ofrecen un mayor control desde el código del componente.

- **Eventos**: Maneja eventos individuales usando `()`. Esto enlaza eventos del DOM con métodos del componente.

- **Interfaces**: Utiliza interfaces para definir datos que serán compartidos entre varios componentes o servicios. Esto ayuda a mantener el código tipado y reduce errores.

- **Directivas de Atributo**: Usa directivas de atributo para manejar eventos recurrentes en varios componentes. Esto permite reutilizar lógica de manera eficiente.

- **Guards**: Protege las rutas de tu aplicación con guards. Los guards pueden controlar el acceso a las rutas basándose en condiciones específicas.

- **Servicios y Resolvers**: Usa servicios para guardar y servir datos tanto en el navegador como en el servidor. Los resolvers pueden precargar datos antes de activar una ruta, mejorando la experiencia del usuario.

- **Variables Globales**:
    - **Environment**: Usa variables de entorno (`environment.ts`) para configurar valores globales que pueden ser consultados por cualquier componente.
    - **Servicios con Observable**: Utiliza servicios que expongan Observables para reaccionar a cambios en tiempo real.

- **Módulos**: Divide tu aplicación en módulos. Los módulos permiten organizar tu código en partes diferenciadas y reutilizables, facilitando la escalabilidad y el mantenimiento.

### 2. Arquitectura y Estructura de la Aplicación

La arquitectura de tu aplicación Angular debe facilitar la localización de elementos, reducir la complejidad y evitar la duplicación de código. Aquí hay algunas pautas clave:

- **Claridad y Accesibilidad**: Organiza tu código de manera que cualquier desarrollador pueda encontrar fácilmente los elementos de la aplicación.

- **Reducción de Complejidad**: Divide la funcionalidad en módulos y componentes específicos para mantener el código manejable.

- **Evitar Duplicación de Código**: Adopta el principio DRY (Don’t Repeat Yourself). Reutiliza componentes y servicios siempre que sea posible.

- **Guía de Estilos**: Sigue las recomendaciones de la [guía de estilos de Angular](https://angular.io/guide/styleguide) para mantener un código limpio y coherente.

### 3. Principios de Programación

- **Programación Funcional y Reactiva**: Prefiere la programación funcional y reactiva sobre la orientación a objetos o imperativa. Usa RxJS para manejar flujos de datos asincrónicos.

- **Composición sobre Herencia**: En la programación orientada a objetos, la composición es preferible a la herencia. Esto permite crear componentes más flexibles y reutilizables.

- **Principio de Responsabilidad Única (SRP)**: Mantén tus archivos pequeños y enfocados en una única responsabilidad. Cada clase, componente o interfaz debería estar en su propio archivo.

### 4. Componentes

- **Mantén Componentes Pequeños**: Los componentes deben ser pequeños y enfocados. Es mejor tener varios componentes hijos que un único componente complejo.

- **Componentes de Presentación y Contenedores**:
    - **Dumb Components**: Estos componentes solo se encargan de la presentación. Reciben datos a través de `@Input` y emiten eventos mediante `@Output`.
    - **Smart Components**: Estos componentes manejan la lógica de la aplicación. Se conectan a servicios para obtener o enviar datos. Las rutas generalmente apuntan a componentes inteligentes.

### 5. Estructura de Directorios

Organiza tu código en directorios de manera que refleje la estructura de tu aplicación:

- **Core**: Contiene servicios singleton, guardias, y cualquier otro código que solo debe cargarse una vez.
- **Shared**: Contiene componentes, directivas y pipes reutilizables.
- **Features**: Cada funcionalidad principal de la aplicación tiene su propio módulo y directorio.
- **App**: Contiene el módulo principal de la aplicación, el módulo de enrutamiento principal y el componente raíz.

Ejemplo de estructura de directorios:

```
/src
  /app
    /core
      /services
      /guards
      core.module.ts
    /shared
      /components
      /directives
      /pipes
      shared.module.ts
    /features
      /products
        /components
        /services
        /models
        products.module.ts
      /customers
        /components
        /services
        /models
        customers.module.ts
    /app-routing
    app.module.ts
    app.component.ts
```



## Integración de Bibliotecas de Terceros

Angular, al ser un framework altamente extensible, permite la integración de diversas bibliotecas de terceros que facilitan el desarrollo y mejoran la funcionalidad de nuestras aplicaciones. A continuación, se describen algunas de las bibliotecas más populares y cómo integrarlas en tu proyecto Angular.

### 1. Bootstrap

Bootstrap es un framework de CSS que facilita la creación de interfaces web responsivas y modernas. Hay varias maneras de integrarlo en un proyecto Angular:

#### Uso del CDN de Bootstrap

Esta es la forma más simple y rápida de agregar Bootstrap a tu proyecto.

**Ventajas:**
- Puede estar en la caché del navegador del cliente.
- Siempre estará actualizado.

**Desventajas:**
- No siempre necesitas todos los componentes de Bootstrap.
- Necesitas estar conectado a Internet.

Para usar el CDN, simplemente agrega los siguientes enlaces en el archivo `index.html` de tu proyecto Angular:

```html
<link
  rel="stylesheet"
  href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
/>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>
```

#### Descarga Manual

Otra opción es descargar el archivo comprimido de Bootstrap y colocarlo en el directorio `assets` de tu proyecto.

#### Instalación vía npm

La forma más recomendada para proyectos Angular es instalar Bootstrap a través de npm, ya que facilita la gestión de dependencias.

```bash
npm install bootstrap
npm install --save-dev @types/bootstrap
```

Luego, agrega las rutas a los archivos de Bootstrap en tu archivo `angular.json`:

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.scss"
],
"scripts": [
  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
]
```

### 2. Angular Material

Angular Material es una biblioteca de componentes UI basada en Material Design, desarrollada específicamente para Angular.


Para instalar Angular Material, utiliza el siguiente comando:

```bash
ng add @angular/material
```

Este comando configurará Angular Material en tu proyecto, incluyendo los temas y animaciones necesarias. También puedes seguir la [guía de inicio rápido](https://material.angular.io/guide/getting-started) en la documentación oficial.

#### Uso

Una vez instalado, puedes empezar a usar los componentes de Angular Material importándolos en tus módulos. Por ejemplo, para usar un botón de Angular Material:

```typescript
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    MatButtonModule
  ]
})
export class AppModule { }
```

Y en tu plantilla HTML:

```html
<button mat-button>Click me!</button>
```

### 3. Ngx Charts

Ngx Charts es una biblioteca para crear gráficos y visualizaciones interactivas en Angular.

Para instalar Ngx Charts, ejecuta el siguiente comando:

```bash
npm install @swimlane/ngx-charts --save
```

Luego, importa el módulo en `app.module.ts`:

```typescript
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    NgxChartsModule
  ]
})
export class AppModule { }
```

#### Uso

Puedes encontrar ejemplos y documentación detallada en la [web oficial de Ngx Charts](https://swimlane.gitbook.io/ngx-charts/). Aquí tienes un ejemplo básico de cómo usar un gráfico de barras:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ngx-charts-bar-vertical
      [view]="[700, 400]"
      [scheme]="colorScheme"
      [results]="single"
      [gradient]="gradient"
      [xAxis]="showXAxis"
      [yAxis]="showYAxis"
      [legend]="showLegend"
      [showXAxisLabel]="showXAxisLabel"
      [showYAxisLabel]="showYAxisLabel"
      [xAxisLabel]="xAxisLabel"
      [yAxisLabel]="yAxisLabel">
    </ngx-charts-bar-vertical>
  `
})
export class AppComponent {
  single = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    }
  ];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
}
```
