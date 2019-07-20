---
title: Moderne javascript i dag
path: /blog/moderne-javascript-i-dag
date: 2018-08-10 09:12:15
author: Brian Emilius
twitter: brianemilius
featured_image: ../images/moderne-javascript-i-dag.png
tags: ["babel.js","node.js","es6 modules"]
categories: ["Guides"]
---
JavaScript er et sprog der flytter og udvikler sig helt vildt hurtigt. Bare indenfor de sidste få år er der kommet custom components og ES6 moduler med import og export.

Det kan som udvikler være svært at følge med, men endnu sværere at skrive sine applikationer på en sådan måde at de både er moderne, fremtidssikret og virker på nuværende platforme, som måske endnu ikke er klar til mange af de nye ting.

Dette leder mange udviklere til at skrive deres programmer uden den nye teknologi. Det mener jeg er en fejl.

<!-- more -->

Det findes masser af måder at komme igang med de ny moderne teknologier, og samtidig sikre at applikationerne kan køre på platforme, der endnu ikke helt understøtter teknologierne.

Et godt eksempel på dette er ES6 moduler og Node.js.

I dag med Node.js version 10.8.0 er det ikke muligt at benytte sig af følgende syntaks.

`module.js`
```js
export const foo = function () {
	return 'Hello, World!';
};
```

`app.js`
```js
import { foo } from './module';

console.log(foo());
```

Men med lidt hjælp fra et bibliotek, der hedder `Babel.js` kan vi transpilere vores moderne JavaScript, således at det er kompatibelt med alle ældre versioner.

## Babel.js
Babel.js er et bibliotek, som kan transpilere alle mulige forskellige sprog om til almindeligt kompatible versioner. For eksempel kan Babel.js transpilere SASS eller LESS om til CSS og håndtere vendor-prefixes, så det færdige dokument er kompatibelt helt tilbage til Internet Explorer 6.

Fordelen ved dette er, at vi kan skrive vores kode og gøre brug af cutting edge teknologier og features uden at tænke på, om det er kompatibelt med den platform vi vil køre vores applikationer på.

Med Node.js vil dette betyde at vi allerede i dag, selv om det endnu ikke er understøttet, kan bruge ES6 moduler.

## Opsætning
Dette skal selvfølgelig sættes op på en eller anden måde. Jeg bruger `npm` og viser her min opsætning, når jeg skal bruge Babel.js sammen med Node.js.

Først skal vi installere en række npm-pakker
- babel-cli
- babel-core
- babel-preset-es2015-node5
- babel-preset-stage-3
- babel-register

Du kan installere pakkerne i dit projekt med følgende kommando
```
$ npm install --save-dev babel-cli babel-core babel-preset-es2015-node5 babel-preset-stage-3 babel-register
```

Når pakkerne er installeret, skal vi lave nogle start-scripts. Jeg bruger to forskellige scripts. Ét til at test-køre min applikation, og ét til at pakke min færdige applikation til distribution.

I `package.json` ser det således ud:
```json
"scripts": {
	"dev": "babel-node app.js",
	"build": "babel . -d .dist --ignore=\"node_modules\""
}
```

Når jeg kører `$ npm run dev` bliver mine moduler transpileret on-the-fly. Det vil sige, at Node.js bruger en del resurser på at præsentere min applikation i den transpilerede udgave. Men har du en computer der bare er lidt god, så er dette ikke et problem.

`$ npm run build` bruger jeg, når jeg er færdig med min applikation. Denne kommando lave en nu mappe (`.dist`), som indeholder al min transpilerede kode. Det er denne mappes indhold, som jeg distribuerer.