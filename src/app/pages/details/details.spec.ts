/*
  Archivo de pruebas unitarias del componente de la página de detalles (Details)
  Este archivo contiene las pruebas para el componente Details
  Se utiliza el framework de testing de Angular (Jasmine + TestBed)
*/

// Importa TestBed y ComponentFixture para configurar y ejecutar pruebas unitarias
// TestBed: proporciona un entorno de testing para componentes Angular
// ComponentFixture: representa una instancia del componente en el entorno de testing
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Importa el componente Details que se va a probar
import { Details } from './details';

/*
  Suite de pruebas para el componente Details
  describe() define un grupo de pruebas relacionadas
  Parámetros:
  1. Nombre de la suite: 'Details'
  2. Función que contiene las pruebas
*/
describe('Details', () => {
  // Variables para almacenar la instancia del componente y el fixture
  let component: Details;
  let fixture: ComponentFixture<Details>;

  // Función que se ejecuta antes de cada prueba
  // Se usa para configurar el entorno de testing
  beforeEach(async () => {
    // Configura el módulo de testing con el componente Details
    // TestBed.configureTestingModule() crea un módulo de testing
    await TestBed.configureTestingModule({
      imports: [Details] // Importa el componente Details
    })
    .compileComponents(); // Compila los componentes

    // Crea una instancia del componente usando TestBed
    fixture = TestBed.createComponent(Details);
    // Obtiene la instancia del componente
    component = fixture.componentInstance;
    // Espera a que el componente esté estable
    await fixture.whenStable();
  });

  /*
    Prueba: Debe crear el componente Details
    Verifica que el componente se instancia correctamente
  */
  it('should create', () => {
    // Verifica que la instancia del componente no sea nula (truthy)
    expect(component).toBeTruthy();
  });
});
