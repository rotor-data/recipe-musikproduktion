# Kvar att göra

## Galleriet (uppdaterad 2026-11-04)

- **"Owe Thörnquist" är felstavad i ett av tre kort.** `/img/IMG_E0680.jpg`
  har `Thörnquist`, de andra två `Thörnqvist`. Jocke eller vi rättar i CMS:et.
- **Tobias Isaksson saknar alt-text.** Enda bilden av 50 utan `alt`, så
  skärmläsare hoppar över den.
- **Bilden på Ante och Philip är inte uppladdad.** Uppladdningen bröts och
  filen kom fram tom; Jocke är ombedd att ladda upp den igen.
- **Personer kvar från gamla sajten:** Avakhan, Kriss Jonsson, Lasse och
  Henke, Tompa och Matilda, Jocke och Steffe, Fender Rhodes MK1, Pianissimo.
  Jocke har inte skickat bilderna.

## Filnamn att städa 2026-10-19

- **`img_0725.jpg` är en oanvänd dubblett** av `frida-2.jpg`, samma bild
  uppladdad två gånger. Ligger kvar i `static/img` utan att användas.

## Works-sidan

- **Spotify-spelaren laddas före cookie-samtycket.** Spelaren sätter
  Spotifys egna cookies så fort sidan visas, medan sajtens banner frågar om
  lov först efteråt. Behöver avgöras: ligga bakom samtycke, eller en
  klickbar ruta som laddar spelaren först när någon vill lyssna.
- **`YOUTUBE_PLAYLIST_ID` är inte satt i Netlify.** Spellistan
  `PLRS5cojQPHiE` ligger som standardvärde i `netlify/functions/youtube.js`.
  Sätt variabeln om listan byts ut, så slipper vi en kodändring.

## Netlify-flytten

- Domänen är tillbaka på Squarespace sedan rollbacken. Netlify-certet är giltigt
  till 2026-12-08. Återgång = tre DNS-poster, TTL 300.
- Squarespace-abonnemanget är inte uppsagt.
- `gatsby-plugin-purgecss-debug-config.js` ändrad av ett lokalt bygge, ocommittad.
