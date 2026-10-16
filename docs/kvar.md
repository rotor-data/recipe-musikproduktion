# Kvar att göra

## Sajtgranskning 2026-10-16

- **Sex motiv visas dubbelt i People-galleriet.** Samma bild i två varianter,
  olika filer och därför inte fångade av mallens dedup:
  IMG_0364, IMG_0939, IMG_1244 (färg + svartvit), IMG_1694, IMG_2407, IMG_7289.
  51 rutor renderas, 45 unika motiv.
- **Titlar och alt-texter stämmer inte med bilderna.** Exempel: IMG_7289.JPG är
  en ensam person men har alt "Two artists smiling"; IMG_2407.JPG är två
  leende personer men har alt "Ambient haze". Alt-texterna läses av
  skärmläsare och används av sökmotorer.
- **5 identiska favicon-par** i både `src/img/favicons/` och
  `static/img/favicons/` — samma sha256.
- **`work-content.md` har `visible: false`** — Work-sidan byggs inte. Avsiktligt?

## Netlify-flytten

- Domänen är tillbaka på Squarespace sedan rollbacken. Netlify-certet är giltigt
  till 2026-12-08. Återgång = tre DNS-poster, TTL 300.
- Squarespace-abonnemanget är inte uppsagt.
- `gatsby-plugin-purgecss-debug-config.js` ändrad av ett lokalt bygge, ocommittad.
