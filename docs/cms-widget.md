# Bildrutnätet i CMS:et

`galleryImages` på People-sidan redigeras av en egen widget i stället för
Decaps vanliga listwidget, eftersom listan inte visar några miniatyrer och
galleriet har 44 bilder.

- `src/cms/widgets/GalleryGridWidget.js` — registreras som `gallerygrid`,
  fångar krascher och väljer reserven
- `src/cms/widgets/GalleryGridControl.js` — själva rutnätet
- `src/cms/widgets/FallbackListControl.js` — reserven

## Vad den hänger på

Den pratar med Decaps interna widget-API. Riskordning, värst först:

| Prop | Risk | Vad som händer om den försvinner |
|---|---|---|
| `onOpenMediaLibrary`, `mediaPaths` | hög | Knappen frågar efter en sökväg i stället |
| `getAsset` | medel | Sökvägen används direkt; fungerar för publicerade bilder |
| `field`, `forID`, `classNameWrapper` | låg | Tappas utan att något går sönder |
| `value`, `onChange` | låg | Reserven tar över |

Går något annat fel visas reserven: samma innehåll som enkla textfält, med
en förklaring. Inget innehåll kan gå förlorat — formatet som sparas är en
vanlig lista och ändras aldrig av widgeten.

## Vid uppgradering av Decap

`decap-cms-app` och `gatsby-plugin-decap-cms` är låsta till exakta versioner
just därför. Efter en uppgradering, kör CMS:et lokalt och kontrollera:

```bash
npx decap-server &
npm run develop
# öppna http://localhost:8000/admin/ -> People Gallery Page
```

1. Visas 44 rutor med miniatyrer, eller slog reserven till?
2. Flyttar stjärnan markeringen och uppdaterar räknaren?
3. Öppnar ett klick på en bild redigeringsrutan?
4. Lägger "Lägg till bild" in en bild via mediabiblioteket?

Står det "Lägg till bild via sökväg" har mediabiblioteks-API:t ändrats.
