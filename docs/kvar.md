# Kvar att göra

## Sajtgranskning 2026-10-16

- **6 galleribilder saknar namn.** `title` och `alt` är tomma på dem i
  `src/pages/people/index.md`: IMG_0685, IMG_0931, IMG_3033, IMG_E0680,
  IMG_E0685 och IMG_E0963. Jocke namngav resten 2026-10-18. Tom `alt`
  betyder att skärmläsare hoppar över bilden.
- **Tre par i galleriet är samma foto två gånger.** Apples redigerade kopior,
  där filnamnet får ett `E`: IMG_0963 / IMG_E0963 (verifierat identiska),
  IMG_0664 / IMG_E0664 (verifierat samma foto) och IMG_0685 / IMG_E0685
  (troligen samma tillfälle). I varje par har bara den ena ett namn, så det
  ser ut som att namnet sitter på fel bild. Filerna är inte byte-identiska,
  därför missade dubblettröjningen dem. Ska den onamngivna kopian bort?
- **IMG_E0679 heter "Owe Thörnqvist" men visar en äldre man med dragspel.**
  Bengan Jansson-bilden bredvid stämmer. Jocke får avgöra.
- **De flesta saknade personerna är på plats.** Jocke laddade upp Chris
  Medina & Getty, Jacob Skarin, Samuel, Rafael o Co, Steffe Sundström,
  Rickard Linda och Jany, Kalle, Ronnie och Nina Johan & Erika 2026-10-18.
  Kvar från gamla sajten: Avakhan, Kriss Jonsson, Lasse och Henke, Tompa
  och Matilda, Jocke och Steffe, Fender Rhodes MK1, Pianissimo.

## Filnamn att städa 2026-10-19

- **`img_0725.jpg` är en oanvänd dubblett** av `frida-2.jpg`, samma bild
  uppladdad två gånger. Ligger kvar i `static/img` utan att användas.

## Netlify-flytten

- Domänen är tillbaka på Squarespace sedan rollbacken. Netlify-certet är giltigt
  till 2026-12-08. Återgång = tre DNS-poster, TTL 300.
- Squarespace-abonnemanget är inte uppsagt.
- `gatsby-plugin-purgecss-debug-config.js` ändrad av ett lokalt bygge, ocommittad.
