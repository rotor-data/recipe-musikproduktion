# Kvar att göra

## Sajtgranskning 2026-10-16

- **15 oanvända bilder i `static/img/`** (IMG_0364, IMG_0663, IMG_0963, IMG_1094,
  IMG_1244, IMG_2407, IMG_2571-2, IMG_3189, IMG_7231, IMG_7289, IMG_E0685,
  Soffan-mackan(1) m.fl.), ca 25 MB. Ligger i repot och deployas utan att synas.
- **5 identiska favicon-par** i både `src/img/favicons/` och
  `static/img/favicons/` — samma sha256.
- **`work-content.md` har `visible: false`** — Work-sidan byggs inte. Avsiktligt?
- Perceptuell dubblettkoll (omskalade varianter av samma motiv) ej gjord; kräver
  Pillow + imagehash i en egen temporär venv.

## Netlify-flytten

- Domänen är tillbaka på Squarespace sedan rollbacken. Netlify-certet är giltigt
  till 2026-12-08. Återgång = tre DNS-poster, TTL 300.
- Squarespace-abonnemanget är inte uppsagt.
- `gatsby-plugin-purgecss-debug-config.js` ändrad av ett lokalt bygge, ocommittad.
