# El Amor Saca Amor

Generador poético para componer un texto, elegir formato y estética, y exportarlo como imagen lista para Instagram, TikTok o una historia.

La aplicación publicada está en [alej-developer.github.io/generador-poemas-elamorsacaamor](https://alej-developer.github.io/generador-poemas-elamorsacaamor/).

## Qué permite

- Escribir el poema y la firma, con contador de líneas y aviso si el texto no cabe.
- Elegir post 4:5, TikTok 9:16 o historia 9:16, con zonas seguras en los formatos verticales.
- Aplicar ocho estéticas y ajustar fuente, tamaño, color del texto, color de fondo y degradado.
- Exportar un PNG de 1080×1350 o 1080×1920, sin las guías de zona segura.
- Incluir o retirar la marca del generador en la imagen.

## Identidad

El logotipo es una pluma que atraviesa un corazón, en tinta y oro. Los archivos están en `public/`:

| Archivo | Uso |
| --- | --- |
| `logo.svg` | Cabecera y marca de la obra |
| `favicon.svg` | Pestaña del navegador |
| `apple-touch-icon.png` | Icono al guardar la página en el teléfono |
| `og-image.png` | Imagen al compartir el enlace |

## Desarrollo

Hace falta Node.js 24.

```bash
npm ci
npm run dev
```

La vista local queda en `http://localhost:5173/generador-poemas-elamorsacaamor/`.

```bash
npm run lint
npm run build
npm run preview
```

## Pruebas

Las pruebas de extremo a extremo usan la build local, no el sitio ya publicado.

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

En otra terminal:

```bash
pip install -r tests_python/requirements.txt
playwright install chromium
```

```powershell
$env:BASE_URL = "http://127.0.0.1:4173/generador-poemas-elamorsacaamor/"
pytest tests_python -q
```

## Publicación

Cada push a `main` ejecuta el análisis, la build y las pruebas. Si terminan bien, GitHub Actions publica `dist` en GitHub Pages.

## Licencia

MIT. Véase [LICENSE](LICENSE).
