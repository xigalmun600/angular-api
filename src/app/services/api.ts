import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root',
})
export class Api {
  private http = inject(HttpClient);
  private apiUrl = 'https://lrclib.net/api';

  search(q?: string, track_name?: string, artist_name?: string, album_name?: string): Observable<Song[]> {
    let params = new HttpParams();
    if (q) params = params.set('q', q);
    if (track_name) params = params.set('track_name', track_name);
    if (artist_name) params = params.set('artist_name', artist_name);
    if (album_name) params = params.set('album_name', album_name);

    return this.http.get<Song[]>(`${this.apiUrl}/search`, { params });
  }

  getById(id: number): Observable<Song> {
    return this.http.get<Song>(`${this.apiUrl}/get/${id}`);
  }
}
