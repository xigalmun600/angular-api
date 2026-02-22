/*
  Archivo del componente de la página de contacto (Contact)
  Este componente muestra un formulario de contacto
  Permite a los usuarios enviar mensajes a través de un formulario
*/

// Importa las funciones y decoradores de Angular
// Component: decorador que define un componente Angular
// inject: función para inyectar dependencias
import { Component, inject } from '@angular/core';

// Importa el formulario reactivo de Angular
// FormBuilder: servicio para crear formularios reactivos
// ReactiveFormsModule: módulo para formularios reactivos
// Validators: validadores para formularios
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

// Importa el módulo común de Angular
// Proporciona directivas como ngIf, ngFor, etc.
import { CommonModule } from '@angular/common';

/*
  Decorador @Component que define las propiedades del componente Contact
  Parámetros:
  - selector: etiqueta HTML que representa este componente (<app-contact>)
  - imports: componentes y directivas que se pueden usar en la plantilla
  - templateUrl: ruta al archivo HTML que contiene la plantilla
  - styleUrl: ruta al archivo CSS que contiene los estilos
*/
@Component({
  // Selector CSS para el componente
  // Este selector se usa en el HTML para renderizar el componente
  selector: 'app-contact',
  
  // Componentes y directivas que se pueden usar en la plantilla
  // ReactiveFormsModule: para formularios reactivos
  // CommonModule: para usar ngIf, ngFor, etc.
  imports: [ReactiveFormsModule, CommonModule],
  
  // Archivo de plantilla HTML
  // Contiene la estructura HTML del componente de contacto
  templateUrl: './contact.html',
  
  // Archivo de estilos CSS
  // Contiene los estilos específicos para el componente de contacto
  styleUrl: './contact.css',
})
/*
  Clase del componente Contact
  Esta clase contiene la lógica y los datos del componente
*/
export class Contact {
  // Inyección de dependencias usando el método inject de Angular
  // FormBuilder: para crear formularios reactivos
  private fb = inject(FormBuilder);

  // Formulario de contacto reactivo
  // Contiene tres campos: name, email y message
  // Cada campo tiene validadores específicos
  contactForm = this.fb.group({
    // Campo nombre: requerido
    name: ['', Validators.required],
    
    // Campo email: requerido y debe ser un email válido
    email: ['', [Validators.required, Validators.email]],
    
    // Campo mensaje: requerido y mínimo 10 caracteres
    message: ['', [Validators.required, Validators.minLength(10)]]
  });
  
  // Variable para controlar si el formulario ha sido enviado
  submitted = false;

  /*
    Método que se ejecuta al enviar el formulario de contacto
    Valida el formulario y muestra un mensaje de confirmación
  */
  onSubmit() {
    // Verifica si el formulario es válido
    if (this.contactForm.valid) {
      // Muestra un mensaje de confirmación con el email del usuario
      alert(`Enviado por ${this.contactForm.value.email}!`);
      
      // Resetea el formulario
      this.contactForm.reset();
      
      // Marca el formulario como enviado
      this.submitted = true;
      
      // Después de 3 segundos, vuelve a mostrar el formulario
      setTimeout(() => { this.submitted = false; }, 3000);
    }
  }
}
