# Bookworm

## Mappaszerkezet
A `BookWorm` mappában található az alkalmazás szerveroldali része. Az szoftver kliensoldali komponensét pedig a `Client` mappa tartalmazza.

## A szerveralkalmazás indítása

### Előkészületek

* Ellenőrizzük, hogy van-e Visual Studio 22 és MS SQL vagy MS SQL Express szoftver a számítógépen
* Amennyiben van nézzük meg, hogy telepítve van-e az `ASP.NET and web development`, a `.NET desktop development`, valamint a `Data storage and processing` komponens a Visual Studio-hoz
* Az alkalmazás a `BookWormDB` néven fogja keresni illetve létrehozni az adatbázist. Bizonyosodjukn meg arról, hogy ilyen még nem létezi.

A `BookWorm` mappában található `BookWorm.sln` fájl megnyitása után a Visual Studioból válasszuk ki Tools -> NuGet Package Manager -> Package Manager Console menüpontot. A megnyílt ablakban válasszuk ki, hogy a `BookWorm.DataAccess` projekt legyen a Default Projekt.

Majd futtassuk a következő parancsokat:

* Add-Migration <teszt név>
* Update-Database

Ha ez sikeresen lefutott, a Start gobbal elindíthatjuk az alkalmazást.

## A kliens indítása

### Előkészületek

* Ellenőrizzük, hogy van-e Node.js a számítógépen
* Ha nincs, akkor telepítsük a <https://nodejs.org/en/> oldalról
* Nyissunk egy paramcssort a `Client/bookworm-client` mappán belül majd futtassuk az `npm i` parancsot.

Ha ez lefutott, akkor az alkalmazás ugyanebből a parancssorból az `npm start` paranccsal indítható. Ha sikeresen elindult, akkor a böngészőben a <http://localhost:3000/> oldalra navigálva találjuk meg az alkalmazást.
