/*
  Archivo de rutas de la aplicación Angular
  Este archivo define las rutas de navegación de la aplicación
  Cada ruta mapea una URL a un componente específico
*/

// Importa el tipo Routes para definir las rutas
// Routes es un tipo de Angular Router que define la configuración de rutas
import { Routes } from '@angular/router';

// Importa los componentes de las páginas
// Cada componente representa una página diferente de la aplicación
import { Home } from './pages/home/home';
import { Search } from './pages/search/search';
import { Details } from './pages/details/details';
import { Contact } from './pages/contact/contact';
import { Favorites } from './pages/favorites/favorites';

/*
  Define las rutas de la aplicación
  Cada objeto de ruta tiene las siguientes propiedades:
  - path: la URL que activa la ruta
  - component: el componente que se renderiza cuando la URL coincide
  - redirectTo: (opcional) redirige a otra ruta
  - pathMatch: (opcional) cómo se coincide la ruta
*/
export const routes: Routes = [
  // Ruta principal que muestra la página de inicio
  // URL: "/" (raíz del sitio)
  // Componente: Home
  { path: '', component: Home },
  
  // Ruta para la página de búsqueda
  // URL: "/search"
  // Componente: Search
  { path: 'search', component: Search },
  
  // Ruta para los detalles de una canción (con parámetro id)
  // URL: "/details/123" (ejemplo con id=123)
  // Componente: Details
  // El parámetro :id se puede acceder en el componente usando ActivatedRoute
  { path: 'details/:id', component: Details },
  
  // Ruta para la página de contacto
  // URL: "/contact"
  // Componente: Contact
  { path: 'contact', component: Contact },
  
  // Ruta para la página de favoritos
  // URL: "/favorites"
  // Componente: Favorites
  { path: 'favorites', component: Favorites },
  
  // Ruta comodín (wildcard route)
  // Coincide con cualquier URL no definida anteriormente
  // Redirige a la página principal (ruta vacía)
  // Esto maneja errores 404 y rutas no válidas
  { path: '**', redirectTo: '' }
];
