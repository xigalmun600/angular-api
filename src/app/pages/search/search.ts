/*
  Archivo del componente de la página de búsqueda (Search)
  Este componente muestra un formulario de búsqueda y los resultados
  Permite buscar canciones por términos y ver sus letras
*/

// Importa las funciones y decoradores de Angular
// Component: decorador que define un componente Angular
// inject: función para inyectar dependencias
import { Component, inject } from '@angular/core';

// Importa el formulario reactivo de Angular
// FormBuilder: servicio para crear formularios reactivos
// ReactiveFormsModule: módulo para formularios reactivos
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

// Importa el servicio de API y el tipo Song
// Api: servicio para realizar peticiones a la API de LRCLIB
// Song: interfaz que define la estructura de una canción
import { Api, Song } from '../../services/api';

// Importa la directiva RouterLink de Angular
// Permite crear enlaces de navegación en la plantilla
import { RouterLink } from '@angular/router';

// Importa el servicio de favoritos
// Favorites: servicio para gestionar la lista de favoritos
import { Favorites } from '../../services/favorites';

/*
  Decorador @Component que define las propiedades del componente Search
  Parámetros:
  - selector: etiqueta HTML que representa este componente (<app-search>)
  - imports: componentes y directivas que se pueden usar en la plantilla
  - templateUrl: ruta al archivo HTML que contiene la plantilla
  - styleUrl: ruta al archivo CSS que contiene los estilos
*/
@Component({
  // Selector CSS para el componente
  // Este selector se usa en el HTML para renderizar el componente
  selector: 'app-search',
  
  // Componentes y directivas que se pueden usar en la plantilla
  // ReactiveFormsModule: para formularios reactivos
  // RouterLink: para crear enlaces de navegación
  imports: [ReactiveFormsModule, RouterLink],
  
  // Archivo de plantilla HTML
  // Contiene la estructura HTML del componente de búsqueda
  templateUrl: './search.html',
  
  // Archivo de estilos CSS
  // Contiene los estilos específicos para el componente de búsqueda
  styleUrl: './search.css',
})
/*
  Clase del componente Search
  Esta clase contiene la lógica y los datos del componente
*/
export class Search {
  // Inyección de dependencias usando el método inject de Angular
  // FormBuilder: para crear formularios reactivos
  private fb = inject(FormBuilder);
  
  // Api: servicio para realizar peticiones a la API de LRCLIB
  private api = inject(Api);
  
  // Favorites: servicio para gestionar la lista de favoritos
  favoritesService = inject(Favorites);

  // Formulario de búsqueda reactivo
  // Contiene un campo 'q' para el término de búsqueda
  searchForm = this.fb.group({ q: [''] });
  
  // Array de canciones obtenidas de la búsqueda
  // Cada canción tiene una propiedad opcional showLyrics para mostrar/ocultar letras
  songs: (Song & { showLyrics?: boolean })[] = [];
  
  // Variables de estado del componente
  searched = false; // Indica si se ha realizado una búsqueda
  loading = false;  // Indica si se está cargando la búsqueda
  error = '';       // Mensaje de error si ocurre

  /*
    Método que se ejecuta al enviar el formulario de búsqueda
    Realiza la petición a la API y actualiza el estado del componente
  */
  onSubmit() {
    // Marca que se ha realizado una búsqueda y limpia errores previos
    this.searched = true; this.error = '';
    
    // Obtiene el término de búsqueda del formulario
    const q = this.searchForm.value.q;
    
    // Valida que el término no esté vacío
    if (!q) { this.error = 'Introduce un termino.'; return; }
    
    // Inicia la carga y limpia resultados anteriores
    this.loading = true; this.songs = [];
    
    // Realiza la petición a la API
    this.api.search(q).subscribe({
      // Maneja la respuesta exitosa
      next: s => {
        this.songs = s; // Almacena las canciones obtenidas
        this.loading = false; // Finaliza la carga
      },
      // Maneja los errores de la petición
      error: e => {
        console.error(e); // Registra el error en consola
        this.error = 'Error al buscar.'; // Muestra mensaje de error
        this.loading = false; // Finaliza la carga
      }
    });
  }

  /*
    Método para mostrar/ocultar las letras de una canción
    Parámetros:
    - s: la canción a la que se le mostrarán/ocultarán las letras
    - e: evento de clic para detener la propagación
  */
  toggleLyrics(s: any, e: Event) {
    e.stopPropagation(); // Detiene la propagación del evento
    s.showLyrics = !s.showLyrics; // Alterna el estado de visibilidad
  }

  /*
    Método para añadir/eliminar una canción de favoritos
    Parámetros:
    - s: la canción a añadir/eliminar de favoritos
    - e: evento de clic para detener la propagación
  */
  toggleFavorite(s: Song, e: Event) {
    e.stopPropagation(); // Detiene la propagación del evento
    this.favoritesService.toggle(s); // Alterna el estado de favorito
  }

  /*
    Método para verificar si una canción está en favoritos
    Parámetros:
    - id: el ID de la canción a verificar
    Retorna: true si está en favoritos, false en caso contrario
  */
  isFavorite(id: number) {
    return this.favoritesService.isFavorite(id);
  }
}
