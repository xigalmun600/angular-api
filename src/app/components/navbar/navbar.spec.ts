/*
  Archivo de pruebas unitarias del componente de navegación (Navbar)
  Este archivo contiene las pruebas para el componente Navbar
  Se utiliza el framework de testing de Angular (Jasmine + TestBed)
*/

// Importa TestBed y ComponentFixture para configurar y ejecutar pruebas unitarias
// TestBed: proporciona un entorno de testing para componentes Angular
// ComponentFixture: representa una instancia del componente en el entorno de testing
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Importa el componente Navbar que se va a probar
import { Navbar } from './navbar';

/*
  Suite de pruebas para el componente Navbar
  describe() define un grupo de pruebas relacionadas
  Parámetros:
  1. Nombre de la suite: 'Navbar'
  2. Función que contiene las pruebas
*/
describe('Navbar', () => {
  // Variables para almacenar la instancia del componente y el fixture
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  // Función que se ejecuta antes de cada prueba
  // Se usa para configurar el entorno de testing
  beforeEach(async () => {
    // Configura el módulo de testing con el componente Navbar
    // TestBed.configureTestingModule() crea un módulo de testing
    await TestBed.configureTestingModule({
      imports: [Navbar] // Importa el componente Navbar
    })
    .compileComponents(); // Compila los componentes

    // Crea una instancia del componente usando TestBed
    fixture = TestBed.createComponent(Navbar);
    // Obtiene la instancia del componente
    component = fixture.componentInstance;
    // Espera a que el componente esté estable
    await fixture.whenStable();
  });

  /*
    Prueba: Debe crear el componente Navbar
    Verifica que el componente se instancia correctamente
  */
  it('should create', () => {
    // Verifica que la instancia del componente no sea nula (truthy)
    expect(component).toBeTruthy();
  });
});
