import os
import re
from pathlib import Path

from playwright.sync_api import Page, expect

BASE_URL = os.environ.get(
    "BASE_URL",
    "http://127.0.0.1:4173/generador-poemas-elamorsacaamor/",
)


def test_1_page_loads_correctly(page: Page):
    """La página muestra el nombre del generador."""
    page.goto(BASE_URL)
    expect(page.locator("h1")).to_have_text("El Amor Saca Amor")
    expect(page).to_have_title("El Amor Saca Amor")


def test_2_default_text_is_present(page: Page):
    """El área de texto abre con un poema de ejemplo."""
    page.goto(BASE_URL)
    expect(page.locator("textarea")).to_contain_text("El joven se puso a pensar")


def test_3_author_signature_updates(page: Page):
    """La firma escrita en el panel aparece en el lienzo."""
    page.goto(BASE_URL)
    author_input = page.get_by_placeholder("La Firma (Ej: #ArabiaDM)")
    author_input.fill("#ElPoetaAutomatizado")
    expect(page.get_by_text("#ElPoetaAutomatizado")).to_be_visible()


def test_4_format_selection_changes_canvas_size(page: Page):
    """El formato de TikTok aplica el lienzo vertical."""
    page.goto(BASE_URL)
    template = page.locator("[data-canvas='preview']")
    page.get_by_role("button", name="TikTok 9:16").click()
    expect(template).to_have_class(re.compile(r"max-w-\[350px\]"))


def test_5_theme_selection_changes_background(page: Page):
    """El tema surrealista cambia el color de fondo del lienzo."""
    page.goto(BASE_URL)
    template = page.locator("[data-canvas='preview']")
    page.get_by_role("button", name="El Surrealista").click()
    expect(template).to_have_class(re.compile(r"bg-\[#ffe0b2\]"))


def test_6_safe_zones_toggle_shows_overlays(page: Page):
    """Las zonas seguras de TikTok marcan la interfaz de la aplicación."""
    page.goto(BASE_URL)
    page.get_by_role("button", name="TikTok 9:16").click()
    page.get_by_role("checkbox", name="Zonas seguras").check(force=True)
    expect(page.get_by_text("Siguiendo / Para Ti")).to_be_visible()


def test_7_export_button_shows_loading_state(page: Page):
    """Al exportar, el botón informa de que la imagen se está preparando."""
    page.goto(BASE_URL)
    page.get_by_role("button", name="Exportar Obra").click()
    expect(page.get_by_text("Distorsionando...")).to_be_visible()


def test_8_overflow_warning(page: Page):
    """Un poema demasiado largo avisa de que no cabe en el formato."""
    page.goto(BASE_URL)
    page.locator("textarea").fill("\n".join(["verso largo de prueba"] * 40))
    expect(page.get_by_role("status")).to_contain_text("no cabe en este formato")


def png_size(path):
    data = Path(path).read_bytes()
    return int.from_bytes(data[16:20], "big"), int.from_bytes(data[20:24], "big")


def test_10_mobile_switches_between_edit_and_preview(page: Page):
    """En el móvil se alterna entre el panel y la obra."""
    page.set_viewport_size({"width": 390, "height": 844})
    page.goto(BASE_URL)
    expect(page.get_by_role("button", name="Ver obra")).to_be_visible()
    expect(page.locator("textarea")).to_be_visible()
    page.get_by_role("button", name="Ver obra").click()
    expect(page.locator("[data-canvas='preview']")).to_be_visible()
    expect(page.locator("textarea")).to_be_hidden()


def test_9_export_uses_social_canvas(page: Page):
    """La imagen exportada sale a 1080 px, el tamaño de las redes."""
    page.goto(BASE_URL)
    with page.expect_download() as download_info:
        page.get_by_role("button", name="Exportar Obra").click()
    post = download_info.value
    assert png_size(post.path()) == (1080, 1350)

    page.get_by_role("button", name="TikTok 9:16").click()
    with page.expect_download() as story_info:
        page.get_by_role("button", name="Exportar Obra").click()
    assert png_size(story_info.value.path()) == (1080, 1920)
