/*
  Archivo principal de inicialización de la aplicación Angular
  Este archivo es el punto de entrada de la aplicación TypeScript
  Responsable de inicializar y arrancar la aplicación Angular
*/

// Importa la función bootstrapApplication desde el platform-browser de Angular
// Esta función es la encargada de inicializar una aplicación Angular standalone
// Recibe como parámetros el componente raíz y la configuración de la aplicación
import { bootstrapApplication } from '@angular/platform-browser';

// Importa la configuración de la aplicación desde el archivo app.config.ts
// La configuración incluye proveedores de servicios, rutas, y otras configuraciones
// necesarias para el funcionamiento de la aplicación
import { appConfig } from './app/app.config';

// Importa el componente principal (raíz) de la aplicación
// Este componente se renderizará en el elemento <app-root> del HTML
import { App } from './app/app';

/*
  Inicialización de la aplicación Angular
  La función bootstrapApplication inicia el proceso de arranque de la aplicación
  Parámetros:
  1. App: El componente raíz de la aplicación
  2. appConfig: La configuración de la aplicación con proveedores y rutas
  
  Esta función devuelve una Promise que se resuelve cuando la aplicación está lista
*/
bootstrapApplication(App, appConfig)
  // Manejo de errores en la inicialización de la aplicación
  // Si ocurre un error durante el arranque, se captura y se registra en la consola
  // Esto ayuda a diagnosticar problemas de inicialización
  .catch((err) => console.error(err));
