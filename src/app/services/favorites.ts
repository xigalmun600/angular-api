import { Injectable, signal } from '@angular/core';
import { Song } from './api';

@Injectable({
  providedIn: 'root',
})
export class Favorites {
  private storageKey = 'angular-api-favorites';
  private favoritesSignal = signal<Song[]>(this.loadFavorites());

  get favorites() {
    return this.favoritesSignal.asReadonly();
  }

  private loadFavorites(): Song[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  isFavorite(id: number): boolean {
    return this.favoritesSignal().some(s => s.id === id);
  }

  add(song: Song) {
    if (this.isFavorite(song.id)) return;
    const current = this.favoritesSignal();
    const updated = [...current, song];
    this.favoritesSignal.set(updated);
    this.save(updated);
  }

  remove(id: number) {
    const current = this.favoritesSignal();
    const updated = current.filter(s => s.id !== id);
    this.favoritesSignal.set(updated);
    this.save(updated);
  }

  toggle(song: Song) {
    if (this.isFavorite(song.id)) {
      this.remove(song.id);
    } else {
      this.add(song);
    }
  }

  private save(songs: Song[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(songs));
  }
}
