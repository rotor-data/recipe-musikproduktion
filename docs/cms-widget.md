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
| `onRemoveInsertedMedia` | låg | Samma bild går inte att välja två gånger i rad |
| `getAsset` | medel | Sökvägen används direkt; fungerar för publicerade bilder |
| `field`, `forID`, `classNameWrapper` | låg | Tappas utan att något går sönder |
| `value`, `onChange` | låg | Reserven tar över |

Går något annat fel visas reserven: samma innehåll som enkla textfält, med
en förklaring. Inget innehåll kan gå förlorat — formatet som sparas är en
vanlig lista och ändras aldrig av widgeten.

## shouldComponentUpdate är inte valfri

Decaps `Widget`-wrapper renderar bara om en widget när `value`,
`classNameWrapper` eller `hasActiveStyle` ändras — om inte widgeten själv har
en `shouldComponentUpdate`, som då ersätter regeln helt. `mediaPaths` finns
inte i den listan, så utan en egen regel får rutnätet aldrig veta vilken bild
användaren valde, och "Lägg till bild" ser död ut.

Därför ligger `shouldComponentUpdate` på `GalleryGridWidget` — den klass
Decap håller referensen till. Den måste fortsätta returnera `true` när
`mediaPaths.get(forID)` ändras. Flyttas den till rutnätet, som är en
funktionskomponent, hämtas den aldrig.

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
4. Lägger "Lägg till bild" in en bild via mediabiblioteket, **utan** att du
   rör något annat fält efteråt? Dyker den upp först när du klickar på en
   stjärna har `shouldComponentUpdate` slutat fungera — se avsnittet nedan.
5. Går det att välja **samma** bild två gånger i rad?

Står det "Lägg till bild via sökväg" har mediabiblioteks-API:t ändrats.
