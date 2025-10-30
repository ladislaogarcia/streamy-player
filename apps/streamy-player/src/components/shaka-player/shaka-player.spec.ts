// 1. Mock de las instancias para poder espiar sus métodos
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShakaPlayer } from './shaka-player';

// --- 1. Mocks ---
// Se crean mocks para las instancias que devuelven los constructores de Shaka.
// Esto nos permite espiar métodos como `load` y `destroy`.
const mockPlayerInstance = {
  load: jest.fn().mockResolvedValue(undefined),
  destroy: jest.fn(),
};

const mockUiInstance = {
  destroy: jest.fn(),
};

// Se crea el mock principal del módulo 'shaka-player'.
const shakaMock = {
  polyfill: {
    installAll: jest.fn(),
  },
  // `Player` es un constructor mockeado que devuelve nuestra instancia mockeada.
  Player: jest.fn().mockImplementation(() => mockPlayerInstance),
  ui: {
    // `Overlay` es otro constructor mockeado.
    Overlay: jest.fn().mockImplementation(() => mockUiInstance),
  },
};

// `isBrowserSupported` es un método estático, así que lo añadimos al constructor mockeado.
(shakaMock.Player as any).isBrowserSupported = jest.fn();

// --- 2. Mockeo del Módulo ---
// `jest.mock` intercepta la importación y la reemplaza con nuestro mock.
// DEBE ir antes de los `import` de Angular y del componente.
jest.mock('shaka-player/dist/shaka-player.ui', () => shakaMock);

describe('ShakaPlayer Component', () => {
  let component: ShakaPlayer;
  let fixture: ComponentFixture<ShakaPlayer>;

  beforeEach(async () => {
    // Limpia todos los mocks antes de cada test para asegurar el aislamiento.
    jest.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [ShakaPlayer],
    }).compileComponents();

    fixture = TestBed.createComponent(ShakaPlayer);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('when browser is supported', () => {
    beforeEach(() => {
      // Configuramos el mock para este escenario
      (shakaMock.Player as any).isBrowserSupported.mockReturnValue(true);
      // `ngAfterViewInit` se dispara con la primera detección de cambios.
      fixture.detectChanges();
    });

    it('should install polyfills and initialize the player', () => {
      expect(shakaMock.polyfill.installAll).toHaveBeenCalledTimes(1);
      expect(shakaMock.Player.isBrowserSupported).toHaveBeenCalledTimes(1);
      expect(shakaMock.Player).toHaveBeenCalledTimes(1);
      expect(shakaMock.ui.Overlay).toHaveBeenCalledTimes(1);
    });

    it('should load the video source', () => {
      expect(mockPlayerInstance.load).toHaveBeenCalledWith('/dash/tears_of_steel/cleartext/stream.mpd');
      expect(mockPlayerInstance.load).toHaveBeenCalledTimes(1);
    });
  });

  describe('when browser is not supported', () => {
    it('should not initialize the player', () => {
      (shakaMock.Player as any).isBrowserSupported.mockReturnValue(false);
      fixture.detectChanges(); // Dispara ngAfterViewInit

      expect(shakaMock.polyfill.installAll).toHaveBeenCalledTimes(1);
      expect(shakaMock.Player.isBrowserSupported).toHaveBeenCalledTimes(1);

      // Verificamos que no se intentó inicializar el reproductor
      expect(shakaMock.Player).not.toHaveBeenCalled();
      expect(shakaMock.ui.Overlay).not.toHaveBeenCalled();
      expect(mockPlayerInstance.load).not.toHaveBeenCalled();
    });
  });
});
