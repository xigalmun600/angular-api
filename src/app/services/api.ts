/*
  Archivo del servicio de API (Api)
  Este servicio proporciona métodos para interactuar con la API de LRCLIB
  Permite buscar canciones y obtener detalles de una canción específica
*/

// Importa las dependencias necesarias de Angular y RxJS
// HttpClient: cliente HTTP para realizar peticiones a APIs
// HttpParams: parámetros para las peticiones HTTP
import { HttpClient, HttpParams } from '@angular/common/http';

// Importa las funciones y decoradores de Angular
// Injectable: decorador que marca una clase como inyectable
// inject: función para inyectar dependencias
import { Injectable, inject } from '@angular/core';

// Importa Observable de RxJS
// Observable: tipo de dato asíncrono que representa un flujo de datos
import { Observable } from 'rxjs';

/*
  Interfaz que define la estructura de una canción
  Propiedades:
  - id: identificador único de la canción
  - trackName: nombre de la canción
  - artistName: nombre del artista
  - albumName: nombre del álbum
  - duration: duración en segundos
  - instrumental: indica si la canción es instrumental
  - plainLyrics: letra de la canción en formato plano
  - syncedLyrics: letra de la canción sincronizada
*/
export interface Song {
  id: number;
  trackName: string;
  artistName: string;
  albumName: string;
  duration: number;
  instrumental: boolean;
  plainLyrics: string;
  syncedLyrics: string;
}

/*
  Decorador @Injectable que marca la clase como inyectable
  Parámetros:
  - providedIn: 'root': el servicio está disponible en toda la aplicación
*/
@Injectable({
  providedIn: 'root',
})
/*
  Clase del servicio Api
  Esta clase contiene los métodos para interactuar con la API de LRCLIB
*/
export class Api {
  // Inyección de dependencias usando el método inject de Angular
  // HttpClient: para realizar peticiones HTTP
  private http = inject(HttpClient);
  
  // URL base de la API de LRCLIB
  private apiUrl = 'https://lrclib.net/api';

  /*
    Método para buscar canciones por término
    Parámetros:
    - q: término de búsqueda
    Retorna: Observable con un array de canciones
  */
  search(q: string): Observable<Song[]> {
    // Realiza una petición GET a la API de búsqueda
    // Parámetros:
    // - q: término de búsqueda
    return this.http.get<Song[]>(`${this.apiUrl}/search`, { params: new HttpParams().set('q', q) });
  }

  /*
    Método para obtener una canción por su ID
    Parámetros:
    - id: identificador de la canción
    Retorna: Observable con la canción
  */
  getById(id: number): Observable<Song> {
    // Realiza una petición GET a la API para obtener una canción específica
    return this.http.get<Song>(`${this.apiUrl}/get/${id}`);
  }
}
