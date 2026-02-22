/*
  Archivo del componente de la página de favoritos (Favorites)
  Este componente muestra la lista de canciones favoritas del usuario
  Permite ver y eliminar canciones de la lista de favoritos
*/

// Importa las funciones y decoradores de Angular
// Component: decorador que define un componente Angular
// inject: función para inyectar dependencias
import { Component, inject } from '@angular/core';

// Importa el módulo común de Angular
// Proporciona directivas como ngIf, ngFor, etc.
import { CommonModule } from '@angular/common';

// Importa el servicio de favoritos
// Favorites: servicio para gestionar la lista de favoritos
// Se renombra a FavoritesService para evitar conflicto con el nombre del componente
import { Favorites as FavoritesService } from '../../services/favorites';

// Importa la directiva RouterLink de Angular
// Permite crear enlaces de navegación en la plantilla
import { RouterLink } from '@angular/router';

/*
  Decorador @Component que define las propiedades del componente Favorites
  Parámetros:
  - selector: etiqueta HTML que representa este componente (<app-favorites>)
  - imports: componentes y directivas que se pueden usar en la plantilla
  - templateUrl: ruta al archivo HTML que contiene la plantilla
  - styleUrl: ruta al archivo CSS que contiene los estilos
*/
@Component({
  // Selector CSS para el componente
  // Este selector se usa en el HTML para renderizar el componente
  selector: 'app-favorites',
  
  // Componentes y directivas que se pueden usar en la plantilla
  // CommonModule: para usar ngIf, ngFor, etc.
  // RouterLink: para crear enlaces de navegación
  imports: [CommonModule, RouterLink],
  
  // Archivo de plantilla HTML
  // Contiene la estructura HTML del componente de favoritos
  templateUrl: './favorites.html',
  
  // Archivo de estilos CSS
  // Contiene los estilos específicos para el componente de favoritos
  styleUrl: './favorites.css',
})
/*
  Clase del componente Favorites
  Esta clase contiene la lógica y los datos del componente
*/
export class Favorites {
  // Inyección de dependencias usando el método inject de Angular
  // FavoritesService: servicio para gestionar la lista de favoritos
  favoritesService = inject(FavoritesService);
  
  // Referencia a la lista de favoritos del servicio
  // Se usa para mostrar las canciones favoritas en la plantilla
  favorites = this.favoritesService.favorites;

  /*
    Método para eliminar una canción de la lista de favoritos
    Parámetros:
    - id: el ID de la canción a eliminar
    - event: evento de clic para detener la propagación
  */
  remove(id: number, event: Event) {
    // Detiene la propagación del evento para evitar navegación
    event.stopPropagation();
    // Previene el comportamiento por defecto del evento
    event.preventDefault();
    // Elimina la canción de la lista de favoritos
    this.favoritesService.remove(id);
  }
}
