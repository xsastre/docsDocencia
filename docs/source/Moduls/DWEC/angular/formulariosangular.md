# Formularios en Angular

Los formularios son una parte fundamental de cualquier aplicación web, y Angular ofrece dos enfoques principales para manejarlos: formularios reactivos y formularios basados en plantillas.

| Característica          | Formularios Reactivos          | Formularios Basados en Plantillas |
|-------------------------|--------------------------------|-----------------------------------|
| Configuración del modelo de formulario | Explícita, creada en la clase del componente | Implícita, creada por directivas |
| Modelo de datos         | Estructurado e inmutable       | No estructurado y mutable         |
| Flujo de datos          | Sincrónico                     | Asincrónico                       |
| Validación del formulario | Funciones                      | Directivas                        |


## Formularios de Plantilla en Angular

Usaremos los formularios de plantilla para aquellos que sean muy simples y no requieran una validación o manejo de los datos sofisticados. 

### Configuración de Formularios Basados en Plantillas

Para empezar a trabajar con formularios basados en plantillas, necesitamos importar el módulo `FormsModule` en nuestro componente:

```typescript
import { FormsModule } from '@angular/forms';

...
  imports: [
    FormsModule,
    // otros módulos
  ],
...
```

#### Uso de ngModel y Validadores HTML5

Los formularios basados en plantillas en Angular permiten utilizar validadores HTML5 directamente en los elementos `input`. Estos validadores aplican automáticamente clases de estilo dependiendo del estado del formulario.

```html
<input
  type="text"
  class="form-control"
  [(ngModel)]="product.description"
  minlength="5"
  maxlength="600"
  required
/>
```

#### Modificar Estilos al Validar

Podemos cambiar los estilos de los elementos del formulario en función de su estado de validación utilizando clases CSS personalizadas y la referencia a `ngModel`.

```html
<input
  type="text"
  name="description"
  class="form-control"
  [(ngModel)]="product.description"
  minlength="5"
  maxlength="600"
  required
  #descriptionModel="ngModel"
  [ngClass]="{
    'is-valid': descriptionModel.touched && descriptionModel.valid,
    'is-invalid': descriptionModel.touched && !descriptionModel.valid
  }"
/>
<div>
  <div>{{ product | json }}</div>
  <div>Dirty: {{ descriptionModel.dirty }}</div>
  <div>Valid: {{ descriptionModel.valid }}</div>
  <div>Value: {{ descriptionModel.value }}</div>
  <div>Errors: {{ descriptionModel.errors | json }}</div>
</div>
```

#### Manipular la Entrada del Usuario en Tiempo Real

Podemos separar la vinculación del modelo y el evento `ngModelChange` para manipular la entrada del usuario en tiempo real.

```html
<input
  type="text"
  class="form-control"
  [ngModel]="product.description"
  (ngModelChange)="product.description = $event.toUpperCase()"
/>
```

### ngForm y Directiva noValidate

Por defecto, todos los formularios en Angular tienen la directiva `ngForm`. Podemos hacer una referencia a esta directiva para observar las propiedades generales del formulario. Es recomendable usar la directiva `novalidate` para desactivar la validación del navegador y permitir que Angular gestione la validación.

```html
<form #productForm="ngForm" novalidate>
  <input type="text" name="description" ... />
</form>
<div>
  <div>Touched: {{ productForm.touched }}</div>
  <div>Valid: {{ productForm.valid }}</div>
  <div>Value: {{ productForm.value | json }}</div>
  <div>Descripción: {{productForm.control.get('description').value | json}}</div>
</div>
```

#### Mostrar los Errores de Validación

Podemos combinar estilos de Bootstrap, validación HTML5, `ngIf` y referencias a `ngModel` para mostrar mensajes de error de validación.

```html
<form #productForm="ngForm" novalidate>
  <input
    type="text"
    name="description"
    class="form-control"
    [(ngModel)]="product.description"
    minlength="5"
    maxlength="600"
    required
    #descriptionModel="ngModel"
    [ngClass]="{
      'is-valid': descriptionModel.touched && descriptionModel.valid,
      'is-invalid': descriptionModel.touched && !descriptionModel.valid
    }"
  />
  <div *ngIf="descriptionModel.touched && descriptionModel.invalid" class="alert alert-danger">
    Descripción requerida (entre 5 y 60 caracteres)
  </div>
</form>
```

### Creación de Validadores Personalizados

Angular permite la creación de validadores personalizados mediante directivas. Estos validadores se registran como validadores de Angular utilizando el proveedor `NG_VALIDATORS`.

```typescript
import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appMinPrice]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MinPriceDirective, multi: true }]
})
export class MinPriceDirective implements Validator {
  @Input('appMinPrice') minPrice: number;

  constructor() { }

  validate(c: AbstractControl): { [key: string]: any } | null {
    if (this.minPrice && c.value) {
      if (this.minPrice > c.value) {
        return { minPrice: true };
      }
    }
    return null;
  }
}
```

### Enviar el Formulario

Podemos enviar el formulario y realizar validaciones adicionales antes de enviarlo. Además, podemos desactivar el botón de envío hasta que el formulario sea válido.

```html
<form #productForm="ngForm" (ngSubmit)="editar(productForm)" novalidate>
  <input type="text" name="description" ... />
  <button type="submit" class="btn btn-primary" [disabled]="productForm.invalid">Submit</button>
</form>
```

En el componente, obtenemos el formulario utilizando `@ViewChild` y la variable de referencia:

```typescript
@ViewChild('editForm', { static: true }) editForm: NgForm;

editar(productForm: NgForm) {
  if (this.editForm.valid) {
    this.productService.editProduct(this.product).subscribe(
      ok => this.router.navigate(['/product/', this.product.id])
    );
  }
}
```

## Formularios Reactivos

En Angular, los formularios reactivos representan un conjunto de técnicas que permiten controlar mejor el comportamiento de los formularios desde el código del componente en lugar de desde la plantilla. Aunque el uso de `[(ngModel)]` en formularios basados en plantillas ya proporciona cierto comportamiento reactivo, los formularios reactivos ofrecen una manera más estructurada y potente de manejar formularios complejos. Es recomendable usar formularios reactivos, especialmente en formularios más avanzados que van más allá de simples búsquedas o inicios de sesión.


Para trabajar con formularios reactivos, debemos importar el módulo `ReactiveFormsModule`

```typescript
import { ReactiveFormsModule } from '@angular/forms';

...
  imports: [
    ReactiveFormsModule,
    // otros módulos
  ],
...
```

En los formularios reactivos, declaramos directamente en el código los objetos `FormControl`, `FormGroup` y `FormArray`. A continuación, se muestra un ejemplo básico de cómo configurar un formulario reactivo:

1. **Definir el Formulario en el Componente**

En el componente, necesitamos una variable de tipo `FormGroup` inicializada en el constructor. Utilizaremos un servicio inyectado llamado `FormBuilder` para construir el formulario.

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent {
  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.crearFormulario();
  }

  crearFormulario() {
    this.formulario = this.formBuilder.group({
      name: [''],
      price: [0],
      description: [''],
    });
  }

  crear() {
    // Lógica para crear el producto
  }
}
```

2. **HTML del Formulario**

En el HTML del formulario, solo necesitamos agregar `[formGroup]` y `formControlName` en cada `input`.

```html
<form [formGroup]="formulario" (ngSubmit)="crear()">
  <div class="form-group">
    <label for="inputName">Name</label>
    <input type="text" class="form-control" id="inputName" formControlName="name">
  </div>
  <div class="form-group">
    <label for="inputPrice">Price</label>
    <input type="number" class="form-control" id="inputPrice" formControlName="price">
  </div>
  <div class="form-group">
    <label for="inputDescription">Description</label>
    <input type="text" class="form-control" id="inputDescription" formControlName="description">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

### Validaciones Síncronas

En los formularios reactivos, las validaciones son más sencillas y se pueden declarar directamente en el código del componente usando `Validators`.

```typescript
import { Validators } from '@angular/forms';

crearFormulario() {
  this.formulario = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(5), Validators.pattern('.*[a-zA-Z].*')]],
    price: [0, Validators.min(0.01)],
    description: [''],
  });
}

get nameNotValid() {
  return this.formulario.get('name').invalid && this.formulario.get('name').touched;
}
```

Para aplicar las validaciones visualmente en el HTML, podemos utilizar getters:

```html
<input type="text" class="form-control" id="inputName" formControlName="name" 
  [ngClass]="nameNotValid ? 'is-invalid' : 'is-valid'">
```

### Creación de Validadores Personalizados

Los validadores personalizados en formularios reactivos son funciones que devuelven una `ValidatorFn`. Aquí mostramos cómo crear un validador personalizado para fechas mínimas:

```typescript
import { AbstractControl, ValidatorFn } from '@angular/forms';

function minDateValidator(minInputDate: string): ValidatorFn {
  return (c: AbstractControl): { [key: string]: any } | null => {
    if (c.value) {
      const minDate = new Date(minInputDate);
      const inputDate = new Date(c.value);
      return minDate <= inputDate ? null : { 'minDate': minDate.toLocaleDateString() };
    }
    return null;
  };
}
```

#### Validación de Campos Cruzados

Podemos crear validadores personalizados para evaluar un campo en función de otros campos en el formulario. Aquí un ejemplo para validar que dos campos de contraseña coincidan:

```typescript
this.registerForm = this.formBuilder.group({
  password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
  confirm_password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]]
}, {
  validators: passwordValidator
});

const passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirm_password');
  return password && confirmPassword && password.value === confirmPassword.value ? null : { passwordValidator: true };
};
```

### Agrupar Campos

Podemos agrupar campos en un `FormGroup` dentro de otro `FormGroup`:

```typescript
this.formulario = this.formBuilder.group({
  name: ['', [Validators.required, Validators.minLength(5), Validators.pattern('.*[a-zA-Z].*')]],
  price: [0, Validators.min(0.01)],
  description: [''],
  address: this.formBuilder.group({
    street: [''],
    city: ['']
  })
});
```

Y en el HTML:

```html
<div class="form-group row mb-3" formGroupName="address">
  <label for="inputStreet" class="col-sm-2 col-form-label">Street</label>
  <div class="form-row col">
    <div class="col">
      <input class="form-control" id="inputStreet" placeholder="Street" formControlName="street">
    </div>
    <div class="col">
      <input class="form-control" id="inputCity" placeholder="City" formControlName="city">
    </div>
  </div>
</div>
```

### Cargar Datos en el Formulario

Si estamos trabajando en un formulario de edición, podemos cargar los valores en los controles de formulario utilizando `setValue()`, `patchValue()` o `reset()`.

```typescript
this.formulario.setValue(this.product);  // Necesita todos los campos

// Para resetear con valores por defecto
this.formulario.reset({
  name: 'Default Name',
  price: 0,
  description: 'Default Description'
});

// Para actualizar solo algunos campos
this.formulario.patchValue({
  name: 'Updated Name'
});
```

### Detección de Cambios

Los `FormGroup` y `FormControl` contienen un Observable llamado `valueChanges` que emite el valor actual del control cada vez que cambia. Podemos suscribirnos a este Observable para realizar acciones en respuesta a los cambios.

```typescript
export class AppComponent implements OnInit {
  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      notifications: [false]
    });

    this.formulario.get('notifications').valueChanges
      .subscribe(value => this.updateNotificationMethod(value));
  }

  updateNotificationMethod(value: boolean) {
    // Lógica para manejar cambios en las notificaciones
  }
}
```

### Formularios Dinámicos

Los `FormArray` permiten crear formularios dinámicos donde los controles pueden añadirse o eliminarse en tiempo de ejecución.

```typescript
this.formulario = this.formBuilder.group({
  production: this.formBuilder.array([this.getProductionControl()])
});

getProductionControl(): FormControl {
  const control = this.formBuilder.control(0);
  control.setValidators(Validators.min(100));
  return control;
}

get productionArray(): FormArray {
  return <FormArray>this.formulario.get('production');
}

addProduction() {
  this.productionArray.push(this.getProductionControl());
}

delProduction(index: number) {
  this.productionArray.removeAt(index);
}
```

Y en el HTML:

```html
<div class="row row-cols-6 g-3" formArrayName="production">
  <div class="col" *ngFor="let prod of productionArray.controls; let i=index">
    <input type="number" class="form-control col" [formControlName]="i" placeholder="Production {{i}}" 
      [ngClass]="{
        'is-valid': productionArray.controls[i].valid && productionArray.controls[i].touched,
        'is-invalid': productionArray.controls[i].invalid && productionArray.controls[i].touched
      }">
    <button type="button" class="col btn btn-outline-danger" (click)="delProduction(i)">🗑</button>
  </div>
  <button type="button" class="col btn btn-primary" (click)="addProduction()">Add Production</button>
</div>
```
