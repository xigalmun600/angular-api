/*
  Archivo del componente de navegación (Navbar)
  Este componente muestra el menú de navegación de la aplicación
  Contiene enlaces a las diferentes páginas y un formulario de búsqueda rápida
*/

// Importa el decorador Component de Angular
// Se usa para definir un componente Angular
import { Component } from '@angular/core';

// Importa directivas de enrutamiento de Angular
// RouterLink: permite crear enlaces de navegación
// RouterLinkActive: aplica clases CSS cuando la ruta está activa
import { RouterLink, RouterLinkActive } from '@angular/router';

/*
  Decorador @Component que define las propiedades del componente Navbar
  Parámetros:
  - selector: etiqueta HTML que representa este componente (<app-navbar>)
  - imports: componentes y directivas que se pueden usar en la plantilla
  - templateUrl: ruta al archivo HTML que contiene la plantilla
  - styleUrl: ruta al archivo CSS que contiene los estilos
*/
@Component({
  // Selector CSS para el componente
  // Este selector se usa en el HTML para renderizar el componente
  selector: 'app-navbar',
  
  // Componentes y directivas que se pueden usar en la plantilla
  // RouterLink: para crear enlaces de navegación
  // RouterLinkActive: para aplicar clases CSS cuando la ruta está activa
  imports: [RouterLink, RouterLinkActive],
  
  // Archivo de plantilla HTML
  // Contiene la estructura HTML del componente de navegación
  templateUrl: './navbar.html',
  
  // Archivo de estilos CSS
  // Contiene los estilos específicos para el componente de navegación
  styleUrl: './navbar.css',
})
/*
  Clase del componente Navbar
  Esta clase contiene la lógica y los datos del componente
  Actualmente está vacía porque el componente solo usa directivas de enrutamiento
*/
export class Navbar {
  // La clase está vacía porque el componente solo usa directivas de enrutamiento
  // No necesita lógica de componente adicional
}
