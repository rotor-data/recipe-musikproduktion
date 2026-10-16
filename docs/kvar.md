# Kvar att göra

## Sajtgranskning 2026-10-16

- **15 galleribilder saknar namn.** `title` och `alt` är tomma på dem i
  `src/pages/people/index.md`: IMG_0401, IMG_0663, IMG_0664, IMG_0685,
  IMG_0931, IMG_1471, IMG_1472, IMG_2571-2, IMG_3033, IMG_7231, IMG_E0680,
  IMG_E0685, IMG_E0963 och de två UNADJUSTEDNONRAW. De fanns
  inte på Squarespace-sajten, så namnen måste komma från Recipe.
  Tom `alt` betyder att skärmläsare hoppar över bilden.
- **13 personer från gamla sajten saknar bild i repot** — Chris Medina och
  Getty Domein, Jacob Skarin, Avakhan, Kriss Jonsson, Lasse och Henke,
  Tompa och Matilda, Samuel Gustafsson, Rafael Edholm & Co, Steffe
  Sundström, Jocke och Steffe, Rickard Linda och Jany, Fender Rhodes MK1,
  Pianissimo. Bilderna följde aldrig med i flytten.
- **5 identiska favicon-par** i både `src/img/favicons/` och
  `static/img/favicons/` — samma sha256.
- **`work-content.md` har `visible: false`** — Work-sidan byggs inte. Avsiktligt?

## Netlify-flytten

- Domänen är tillbaka på Squarespace sedan rollbacken. Netlify-certet är giltigt
  till 2026-12-08. Återgång = tre DNS-poster, TTL 300.
- Squarespace-abonnemanget är inte uppsagt.
- `gatsby-plugin-purgecss-debug-config.js` ändrad av ett lokalt bygge, ocommittad.
