import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Search } from './pages/search/search';
import { Details } from './pages/details/details';
import { Contact } from './pages/contact/contact';
import { Favorites } from './pages/favorites/favorites';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'search', component: Search },
  { path: 'details/:id', component: Details },
  { path: 'contact', component: Contact },
  { path: 'favorites', component: Favorites },
  { path: '**', redirectTo: '' }
];
