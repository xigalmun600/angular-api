/*
  Archivo de pruebas unitarias del servicio de API (Api)
  Este archivo contiene las pruebas para el servicio Api
  Se utiliza el framework de testing de Angular (Jasmine + TestBed)
*/

// Importa TestBed para configurar y ejecutar pruebas unitarias
// TestBed: proporciona un entorno de testing para servicios Angular
import { TestBed } from '@angular/core/testing';

// Importa el servicio Api que se va a probar
import { Api } from './api';

/*
  Suite de pruebas para el servicio Api
  describe() define un grupo de pruebas relacionadas
  Parámetros:
  1. Nombre de la suite: 'Api'
  2. Función que contiene las pruebas
*/
describe('Api', () => {
  // Variable para almacenar la instancia del servicio
  let service: Api;

  // Función que se ejecuta antes de cada prueba
  // Se usa para configurar el entorno de testing
  beforeEach(() => {
    // Configura el módulo de testing
    // TestBed.configureTestingModule() crea un módulo de testing
    TestBed.configureTestingModule({});
    
    // Inyecta el servicio Api en el entorno de testing
    service = TestBed.inject(Api);
  });

  /*
    Prueba: Debe crear el servicio Api
    Verifica que el servicio se instancia correctamente
  */
  it('should be created', () => {
    // Verifica que la instancia del servicio no sea nula (truthy)
    expect(service).toBeTruthy();
  });
});
