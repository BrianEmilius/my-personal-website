---
title: Bedre dokumentation
path: /blog/bedre-dokumentation
author: Brian Emilius
twitter: brianemilius
tags: ["JavaScript","dokumentation"]
date: 2017-12-27 11:32:06
---
Vi har alle set de her overkommenterede stykker kode, hvor nærmest hver eneste linie ender i en kommentar, der forklarer hvad den linie gør.

Efter min mening er dette helt overflødigt. Kommentarer i kode bør altid have et klart formål - og hvis du har brug for at forklare hvad din kode gør, så har du ikke lavet god kode.

Jeg mener i stedet at kommentarer bør tjene som en slags dokumentation.

Lad os kigge på en helt typisk [JSDoc](http://usejsdoc.org) kommentar.

<!-- more -->

```javascript
/**
 * power
 * Lifting to the power of two
 * @param {number} x - The number to be lifted to the power of 2
 * @returns {number} Sum of x * x
**/
const power = x => x * x
```

Ovenstående funktion er ret selvforklarende, hvis altså du kan kode. Men prøv at forestille dig en større kodeblok. Det ville tage dig lang tid at læse koden igennem for at finde ud af hvad koden gør. I stedet for kan du nøjes med at læse kommentaren i toppen af funktionen, som fortæller dig lige præcis hvad du har brug for at vide.

* *navnet* på funktionen
* *formålet* med funktionen
* hvilke *parametre* funktionen tager imod
* og hvilken *returværdi* du kan forvente

Og for at gøre det hele mget nemmere er kommentaren placeret lige i toppen af funktionen.

En meget specifik standardiseret måde at beskrive en klasse, metode, eller funktion på er en kæmpe hjælp for ethvert udviklerteam til at kommunikere tydeligt når de arbejder sammen.

Hvad er din holdning? Fortæl mig hvordan du kan lide at kommentere og dokumentere din kode i kommentarfeltet herunder.
