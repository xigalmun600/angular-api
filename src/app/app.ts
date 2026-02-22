/*
  Archivo del componente principal de la aplicación Angular
  Este componente es la raíz de la aplicación (root component)
  Se renderiza en el elemento <app-root> del archivo index.html
*/

// Importa las funciones y decoradores de Angular
// Component: decorador que define un componente Angular
// signal: función para crear señales reactivas (nuevo sistema de reactividad de Angular)
import { Component, signal } from '@angular/core';

// Importa el componente para mostrar las rutas
// RouterOutlet: componente que renderiza la ruta activa según la navegación
import { RouterOutlet } from '@angular/router';

// Importa el componente de navegación
// Navbar: componente personalizado que muestra el menú de navegación
import { Navbar } from './components/navbar/navbar';

/*
  Decorador @Component que define las propiedades del componente
  Parámetros:
  - selector: etiqueta HTML que representa este componente (<app-root>)
  - imports: componentes que se pueden usar en la plantilla de este componente
  - templateUrl: ruta al archivo HTML que contiene la plantilla
  - styleUrl: ruta al archivo CSS que contiene los estilos
*/
@Component({
  // Selector CSS para el componente
  // Este selector se usa en el HTML para renderizar el componente
  selector: 'app-root',
  
  // Componentes que se pueden usar en la plantilla
  // RouterOutlet: para mostrar las rutas de la aplicación
  // Navbar: para mostrar el menú de navegación
  imports: [RouterOutlet, Navbar],
  
  // Archivo de plantilla HTML
  // Contiene la estructura HTML del componente
  templateUrl: './app.html',
  
  // Archivo de estilos CSS
  // Contiene los estilos específicos para este componente
  styleUrl: './app.css'
})
/*
  Clase del componente principal
  Esta clase contiene la lógica y los datos del componente
*/
export class App {
  // Título de la aplicación como señal reactiva
  // Las señales son parte del nuevo sistema de reactividad de Angular
  // Permiten una gestión eficiente del estado y la actualización de la UI
  protected readonly title = signal('angular-api');
  
  // El título se inicializa con el valor 'angular-api'
  // Se puede acceder a él en la plantilla usando {{ title() }}
  // Se puede actualizar usando title.set('nuevo valor')
}
