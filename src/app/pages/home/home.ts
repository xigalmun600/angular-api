/*
  Archivo del componente de la página de inicio (Home)
  Este componente muestra la página principal de la aplicación
  Contiene un mensaje de bienvenida y un carrusel de información
*/

// Importa el decorador Component de Angular
// Se usa para definir un componente Angular
import { Component } from '@angular/core';

// Importa la directiva RouterLink de Angular
// Permite crear enlaces de navegación en la plantilla
import { RouterLink } from '@angular/router';

/*
  Decorador @Component que define las propiedades del componente Home
  Parámetros:
  - selector: etiqueta HTML que representa este componente (<app-home>)
  - imports: componentes y directivas que se pueden usar en la plantilla
  - templateUrl: ruta al archivo HTML que contiene la plantilla
  - styleUrl: ruta al archivo CSS que contiene los estilos
*/
@Component({
  // Selector CSS para el componente
  // Este selector se usa en el HTML para renderizar el componente
  selector: 'app-home',
  
  // Componentes y directivas que se pueden usar en la plantilla
  // RouterLink: para crear enlaces de navegación
  imports: [RouterLink],
  
  // Archivo de plantilla HTML
  // Contiene la estructura HTML del componente de inicio
  templateUrl: './home.html',
  
  // Archivo de estilos CSS
  // Contiene los estilos específicos para el componente de inicio
  styleUrl: './home.css',
})
/*
  Clase del componente Home
  Esta clase contiene la lógica y los datos del componente
  Actualmente está vacía porque el componente solo usa directivas de enrutamiento
*/
export class Home {
  // La clase está vacía porque el componente solo usa directivas de enrutamiento
  // No necesita lógica de componente adicional
}
