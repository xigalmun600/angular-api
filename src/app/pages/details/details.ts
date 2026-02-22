/*
  Archivo del componente de la página de detalles (Details)
  Este componente muestra información detallada de una canción
  Incluye datos como artista, álbum, duración y letras
*/

// Importa las funciones y decoradores de Angular
// Component: decorador que define un componente Angular
// inject: función para inyectar dependencias
// OnInit: interfaz para el ciclo de vida del componente
import { Component, inject, OnInit } from '@angular/core';

// Importa el enrutamiento de Angular
// ActivatedRoute: servicio para acceder a los parámetros de la ruta
// RouterLink: directiva para crear enlaces de navegación
import { ActivatedRoute, RouterLink } from '@angular/router';

// Importa el servicio de API y el tipo Song
// Api: servicio para realizar peticiones a la API de LRCLIB
// Song: interfaz que define la estructura de una canción
import { Api, Song } from '../../services/api';

// Importa el módulo común de Angular
// Proporciona directivas como ngIf, ngFor, etc.
import { CommonModule } from '@angular/common';

// Importa el servicio de favoritos
// Favorites: servicio para gestionar la lista de favoritos
import { Favorites } from '../../services/favorites';

/*
  Decorador @Component que define las propiedades del componente Details
  Parámetros:
  - selector: etiqueta HTML que representa este componente (<app-details>)
  - imports: componentes y directivas que se pueden usar en la plantilla
  - templateUrl: ruta al archivo HTML que contiene la plantilla
  - styleUrl: ruta al archivo CSS que contiene los estilos
*/
@Component({
  // Selector CSS para el componente
  // Este selector se usa en el HTML para renderizar el componente
  selector: 'app-details',
  
  // Componentes y directivas que se pueden usar en la plantilla
  // CommonModule: para usar ngIf, ngFor, etc.
  // RouterLink: para crear enlaces de navegación
  imports: [CommonModule, RouterLink],
  
  // Archivo de plantilla HTML
  // Contiene la estructura HTML del componente de detalles
  templateUrl: './details.html',
  
  // Archivo de estilos CSS
  // Contiene los estilos específicos para el componente de detalles
  styleUrl: './details.css',
})
/*
  Clase del componente Details
  Esta clase contiene la lógica y los datos del componente
  Implementa OnInit para ejecutar código al inicializar el componente
*/
export class Details implements OnInit {
  // Inyección de dependencias usando el método inject de Angular
  // ActivatedRoute: para acceder a los parámetros de la ruta
  private route = inject(ActivatedRoute);
  
  // Api: servicio para realizar peticiones a la API de LRCLIB
  private api = inject(Api);
  
  // Favorites: servicio para gestionar la lista de favoritos
  favoritesService = inject(Favorites);

  // Datos de la canción
  // Song | null: puede ser una canción o null (mientras se carga)
  song: Song | null = null;
  
  // Variables de estado del componente
  loading = true; // Indica si se está cargando la canción
  error = '';     // Mensaje de error si ocurre

  /*
    Método del ciclo de vida de Angular
    Se ejecuta al inicializar el componente
  */
  ngOnInit() {
    // Obtiene el parámetro 'id' de la URL
    // snapshot: acceso estático a los parámetros de la ruta
    // paramMap: mapa de parámetros de la ruta
    const id = this.route.snapshot.paramMap.get('id');
    
    // Valida que el ID exista
    if (id) {
      // Convierte el ID a número y realiza la petición a la API
      this.api.getById(+id).subscribe({
        // Maneja la respuesta exitosa
        next: d => {
          this.song = d; // Almacena la canción obtenida
          this.loading = false; // Finaliza la carga
        },
        // Maneja los errores de la petición
        error: e => {
          this.error = 'Error.'; // Muestra mensaje de error
          this.loading = false; // Finaliza la carga
        }
      });
    } else {
      // Si no hay ID, muestra error
      this.error = 'ID invalido';
      this.loading = false;
    }
  }

  /*
    Método para añadir/eliminar la canción de favoritos
    Solo se ejecuta si hay una canción cargada
  */
  toggleFavorite() {
    if (this.song) this.favoritesService.toggle(this.song);
  }

  /*
    Método para verificar si la canción está en favoritos
    Retorna: true si está en favoritos, false en caso contrario
  */
  isFavorite() {
    return this.song ? this.favoritesService.isFavorite(this.song.id) : false;
  }
}
