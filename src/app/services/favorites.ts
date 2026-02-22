/*
  Archivo del servicio de favoritos (Favorites)
  Este servicio gestiona la lista de canciones favoritas del usuario
  Permite añadir, eliminar y verificar si una canción está en favoritos
  Los datos se almacenan en localStorage para persistencia
*/

// Importa las funciones y decoradores de Angular
// Injectable: decorador que marca una clase como inyectable
// signal: función para crear señales reactivas (nuevo sistema de reactividad de Angular)
import { Injectable, signal } from '@angular/core';

// Importa el tipo Song desde el servicio de API
// Song: interfaz que define la estructura de una canción
import { Song } from './api';

/*
  Decorador @Injectable que marca la clase como inyectable
  Parámetros:
  - providedIn: 'root': el servicio está disponible en toda la aplicación
*/
@Injectable({
  providedIn: 'root',
})
/*
  Clase del servicio Favorites
  Esta clase contiene los métodos para gestionar la lista de favoritos
*/
export class Favorites {
  // Clave para almacenar los favoritos en localStorage
  private key = 'angular-api-favorites';
  
  // Señal reactiva que contiene la lista de favoritos
  // Se inicializa con los datos de localStorage o un array vacío si no hay datos
  private sig = signal<Song[]>(JSON.parse(localStorage.getItem(this.key) || '[]'));
  
  // Getter para acceder a la lista de favoritos como solo lectura
  get favorites() { return this.sig.asReadonly(); }

  /*
    Método para verificar si una canción está en favoritos
    Parámetros:
    - id: el ID de la canción a verificar
    Retorna: true si está en favoritos, false en caso contrario
  */
  isFavorite(id: number) {
    return this.sig().some(s => s.id === id);
  }

  /*
    Método para añadir/eliminar una canción de favoritos
    Parámetros:
    - s: la canción a añadir/eliminar
  */
  toggle(s: Song) {
    // Si la canción ya está en favoritos, la elimina
    // Si no está, la añade
    const list = this.isFavorite(s.id) ? this.sig().filter(x => x.id !== s.id) : [...this.sig(), s];
    
    // Actualiza la señal con la nueva lista
    this.sig.set(list);
    
    // Guarda la lista en localStorage para persistencia
    localStorage.setItem(this.key, JSON.stringify(list));
  }

  /*
    Método para eliminar una canción de favoritos
    Parámetros:
    - id: el ID de la canción a eliminar
  */
  remove(id: number) {
    // Filtra la lista para eliminar la canción con el ID especificado
    const list = this.sig().filter(x => x.id !== id);
    
    // Actualiza la señal con la nueva lista
    this.sig.set(list);
    
    // Guarda la lista en localStorage para persistencia
    localStorage.setItem(this.key, JSON.stringify(list));
  }
}
