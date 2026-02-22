/*
  Archivo de pruebas unitarias del componente principal de la aplicación
  Este archivo contiene las pruebas para el componente App
  Se utiliza el framework de testing de Angular (Jasmine + TestBed)
*/

// Importa TestBed para configurar y ejecutar pruebas unitarias
// TestBed es una clase de Angular que proporciona un entorno de testing
import { TestBed } from '@angular/core/testing';

// Importa el componente App que se va a probar
import { App } from './app';

/*
  Suite de pruebas para el componente App
  describe() define un grupo de pruebas relacionadas
  Parámetros:
  1. Nombre de la suite: 'App'
  2. Función que contiene las pruebas
*/
describe('App', () => {
  // Función que se ejecuta antes de cada prueba
  // Se usa para configurar el entorno de testing
  beforeEach(async () => {
    // Configura el módulo de testing con el componente App
    // TestBed.configureTestingModule() crea un módulo de testing
    await TestBed.configureTestingModule({
      imports: [App], // Importa el componente App
    }).compileComponents(); // Compila los componentes
  });

  /*
    Prueba: Debe crear el componente App
    Verifica que el componente se instancia correctamente
  */
  it('should create the app', () => {
    // Crea una instancia del componente usando TestBed
    const fixture = TestBed.createComponent(App);
    // Obtiene la instancia del componente
    const app = fixture.componentInstance;
    // Verifica que la instancia no sea nula (truthy)
    expect(app).toBeTruthy();
  });

  /*
    Prueba: Debe renderizar el título
    Verifica que el componente renderiza el título correctamente
  */
  it('should render title', async () => {
    // Crea una instancia del componente
    const fixture = TestBed.createComponent(App);
    // Espera a que el componente esté estable
    await fixture.whenStable();
    // Obtiene el elemento nativo del DOM
    const compiled = fixture.nativeElement as HTMLElement;
    // Verifica que el título se renderiza correctamente
    // Nota: Esta prueba podría fallar si el HTML no contiene un h1
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, angular-api');
  });
});
