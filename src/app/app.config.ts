/*
  Archivo de configuración de la aplicación Angular
  Este archivo define la configuración centralizada de la aplicación
  Incluye proveedores de servicios, rutas, y otras configuraciones
*/

// Importa tipos y funciones para configurar la aplicación Angular
// ApplicationConfig: tipo que define la estructura de configuración de una app Angular
// provideBrowserGlobalErrorListeners: función que proporciona listeners para errores globales del navegador
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

// Importa la función para proporcionar el enrutamiento de Angular
// provideRouter: función que inyecta el sistema de enrutamiento en la aplicación
// Las rutas se definen en el archivo app.routes.ts
import { provideRouter } from '@angular/router';

// Importa las rutas de la aplicación desde el archivo app.routes.ts
// Las rutas definen las diferentes páginas y componentes de la aplicación
import { routes } from './app.routes';

// Importa la función para proporcionar el cliente HTTP de Angular
// provideHttpClient: función que inyecta el servicio HTTP para realizar peticiones a APIs
import { provideHttpClient } from '@angular/common/http';

/*
  Configuración de la aplicación Angular
  Esta configuración se utiliza en el archivo main.ts para inicializar la aplicación
  Estructura: ApplicationConfig con un array de proveedores
*/
export const appConfig: ApplicationConfig = {
  // Define los proveedores de servicios para la aplicación
  // Los proveedores son servicios que Angular inyecta automáticamente donde se necesiten
  providers: [
    // Proporciona listeners para errores globales del navegador
    // Esto ayuda a capturar y manejar errores no controlados en la aplicación
    provideBrowserGlobalErrorListeners(),
    
    // Proporciona el enrutamiento con las rutas definidas
    // El enrutador permite navegar entre diferentes componentes/páginas
    // Las rutas se definen en el archivo app.routes.ts
    provideRouter(routes),
    
    // Proporciona el cliente HTTP para realizar peticiones a APIs REST
    // Este servicio se inyecta en los servicios que necesitan hacer peticiones HTTP
    provideHttpClient()
  ]
};
