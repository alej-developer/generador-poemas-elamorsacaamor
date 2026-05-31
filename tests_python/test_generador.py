import re
import pytest
from playwright.sync_api import Page, expect

# Usamos la URL pública que acabamos de desplegar para garantizar que siempre esté disponible
# (También se podría usar "http://localhost:5173" o "5174" para pruebas locales)
BASE_URL = "https://alej-developer.github.io/generador-poemas-elamorsacaamor/"

def test_1_page_loads_correctly(page: Page):
    """Test 1: Verifica que la página cargue y el título principal sea correcto."""
    page.goto(BASE_URL)
    # Verificamos que el H1 del header contenga el título del generador
    header_title = page.locator("h1")
    expect(header_title).to_have_text("El Amor Saca Amor")

def test_2_default_text_is_present(page: Page):
    """Test 2: Verifica que haya un poema por defecto cargado en el área de texto."""
    page.goto(BASE_URL)
    textarea = page.locator("textarea")
    # El poema inicial comienza con "El joven se puso a pensar"
    expect(textarea).to_contain_text("El joven se puso a pensar")

def test_3_author_signature_updates(page: Page):
    """Test 3: Simula la escritura de una nueva firma y verifica que aparezca en el lienzo."""
    page.goto(BASE_URL)
    # Buscamos el input del autor por su placeholder
    author_input = page.get_by_placeholder("La Firma (Ej: #ArabiaDM)")
    
    # Borramos y escribimos un nuevo autor
    author_input.fill("")
    author_input.fill("#ElPoetaAutomatizado")
    
    # Buscamos en el DOM si se ha renderizado el texto en el lienzo
    canvas_author = page.locator("text=#ElPoetaAutomatizado")
    expect(canvas_author).to_be_visible()

def test_4_format_selection_changes_canvas_size(page: Page):
    """Test 4: Verifica que al seleccionar 'TikTok 9:16' el lienzo cambie a formato vertical."""
    page.goto(BASE_URL)
    # Localizamos el lienzo principal por sus clases constantes
    template = page.locator("div.shadow-2xl.transition-all").first
    
    # Hacemos clic en el botón de TikTok
    tiktok_button = page.locator("button:has-text('TikTok 9:16')")
    tiktok_button.click()
    
    # El formato vertical aplica la clase max-w-[350px] de Tailwind
    expect(template).to_have_class(re.compile(r"max-w-\[350px\]"))

def test_5_theme_selection_changes_background(page: Page):
    """Test 5: Verifica que al seleccionar 'El Surrealista', el fondo cambie de color."""
    page.goto(BASE_URL)
    template = page.locator("div.shadow-2xl.transition-all").first
    
    # Clic en el botón del tema surrealista
    surreal_button = page.locator("button:has-text('El Surrealista')")
    surreal_button.click()
    
    # El tema surrealista utiliza el color de fondo #ffe0b2
    expect(template).to_have_class(re.compile(r"bg-\[#ffe0b2\]"))

def test_6_safe_zones_toggle_shows_overlays(page: Page):
    """Test 6: Verifica que al activar 'Zonas Seguras' en TikTok, aparezcan las guías rojas."""
    page.goto(BASE_URL)
    # Primero necesitamos estar en modo TikTok para ver el interruptor
    page.locator("button:has-text('TikTok 9:16')").click()
    
    # Hacemos clic en el checkbox (forzamos el clic porque el input está oculto debajo de un div estilizado)
    safe_zone_toggle = page.locator("input[type='checkbox']")
    safe_zone_toggle.check(force=True)
    
    # Verificamos que aparezca el texto de la guía superior de TikTok
    safe_zone_text = page.locator("text=Siguiendo / Para Ti")
    expect(safe_zone_text).to_be_visible()

def test_7_export_button_shows_loading_state(page: Page):
    """Test 7: Verifica que al hacer clic en 'Descargar', el botón cambie a estado de exportación."""
    page.goto(BASE_URL)
    export_button = page.locator("button:has-text('Descargar')")
    
    # Hacemos clic en exportar
    export_button.click()
    
    # El botón debe cambiar su texto a "Exportando..." temporalmente
    loading_state = page.locator("text=Exportando...")
    expect(loading_state).to_be_visible()
