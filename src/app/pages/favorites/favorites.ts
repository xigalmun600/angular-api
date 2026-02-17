import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Favorites as FavoritesService } from '../../services/favorites';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule, RouterLink],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites {
  favoritesService = inject(FavoritesService);
  favorites = this.favoritesService.favorites;

  remove(id: number, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.favoritesService.remove(id);
  }
}
