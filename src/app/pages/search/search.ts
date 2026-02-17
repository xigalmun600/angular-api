import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Api, Song } from '../../services/api';
import { RouterLink } from '@angular/router';
import { Favorites } from '../../services/favorites';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  private fb = inject(FormBuilder);
  private api = inject(Api);
  favoritesService = inject(Favorites);

  searchForm = this.fb.group({
    q: ['']
  });

  songs: (Song & { showLyrics?: boolean })[] = [];
  searched = false;
  loading = false;
  error = '';

  onSubmit() {
    this.searched = true;
    this.error = '';
    const { q } = this.searchForm.value;

    if (!q) {
      this.error = 'Por favor, introduce un termino de busqueda.';
      return;
    }

    this.loading = true;
    this.songs = [];

    this.api.search(q).subscribe({
      next: (songs) => {
        this.songs = songs;
        this.loading = false;
      },
      error: (err) => {
        console.error('Search error:', err);
        this.error = 'Ocurrio un error al buscar. Por favor, intentalo de nuevo.';
        this.loading = false;
      }
    });
  }

  toggleLyrics(song: Song & { showLyrics?: boolean }, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    song.showLyrics = !song.showLyrics;
  }

  toggleFavorite(song: Song, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.favoritesService.toggle(song);
  }

  isFavorite(id: number) {
    return this.favoritesService.isFavorite(id);
  }
}
