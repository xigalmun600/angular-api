import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Api, Song } from '../../services/api';
import { CommonModule } from '@angular/common';
import { Favorites } from '../../services/favorites';

@Component({
  selector: 'app-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(Api);
  favoritesService = inject(Favorites);
  
  song: Song | null = null;
  loading = true;
  error = '';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.api.getById(+id).subscribe({
        next: (data) => {
          this.song = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error al cargar los detalles.';
          this.loading = false;
          console.error(err);
        }
      });
    } else {
      this.error = 'ID invalido';
      this.loading = false;
    }
  }

  toggleFavorite() {
    if (this.song) {
      this.favoritesService.toggle(this.song);
    }
  }

  isFavorite() {
    return this.song ? this.favoritesService.isFavorite(this.song.id) : false;
  }
}
