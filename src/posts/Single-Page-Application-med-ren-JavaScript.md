---
title: Single Page Application med ren JavaScript
path: /blog/single-page-application-med-ren-javascript
author: Brian Emilius
twitter: brianemilius
featured_image:
description:
date: 2018-04-16 16:34:43
tags: ["SPA","gulp","JavaScript","templates","router"]
categories: ["Guides"]
---
**React.js, Vue.js og Angular.js er alle tre meget populære biblioteker der bliver brugt til blandt andet at bygge Single Page Applications (SPAs). I dette indlæg vil jeg vise dig, hvordan du selv kan lave et lille bibliotek, der gør mange af de samme grundlæggende ting, som for eksempel Angular.js.**

Dette er første del af guiden om Ren JavaScript SPAs.

<!-- more -->

Vi skal bruge 2 filer: index.html og main.js

Derudover skal vi sørge for, at alle requests til vores applikation bliver henvist til index.html. Jeg bruger npm-pakken `browser-sync` sammen med gulp til dette, når jeg udvikler. Du kan også bruge URL-rewriting med Apache.

```JavaScript
const gulp = require('gulp');
const browserSync = require('browser-sync').create();

// Dette er min gulp-task, hvor jeg også sørger for at der er adgang til filer i /assets og /templates

gulp.task('browser-sync', () => {
	browserSync.init({
		'server': {
			'baseDir': 'dist'
		},
		'middleware': function (req, res, next) {
			if (req.url.indexOf('/assets') === -1 && req.url.indexOf('/templates') === -1)
				req.url = '/index.html';
			return next();
		}
	});
});
```

Min applikationsstruktur ser således ud:
```
App
|  gulpfile.js
|
└───dist
|   | index.html
|   |
|   └─assets
|   | |
|   | └─scripts
|   |     main.js
|   |
|   └─templates
|     | ... template filer
|     |
```

## index.html

index.html er en simpel skabelon, en skal uden indhold. Det eneste vi behøver til at starte med, er et `main`-tag. Vi skal også indlæse main.js.
```html
<!DOCTYPE html>
<html lang="da">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Ren JavaScript SPA</title>
</head>
<body>
	<main></main>
	<script src="/assets/scripts/main.js" defer></script>
</body>
</html>
```

## Router
En af hovedfunktionaliteterne i en SPA er `routeren`. En router skal indlæse skabeloner i vores DOM ud fra hvad der står i vores adressebar.

Det første vi gør, at at lave en constructor for routeren.

```JavaScript
const Router = function (name, routes) {
	this.name = name;
	this.routes = routes;
};
```

Til at begynde med skal vi instansiere `Router`:

```JavaScript
const app = new Router('myRouter', [
	{
		'path': '/',
		'name': 'Home',
		'template': 'home'
	}, {
		'path': '/about',
		'name': 'About',
		'template': 'about'
	}, {
		'path': '/contact',
		'name': 'Contact',
		'template': 'contact'
	}
]);
```

Lad os lave en metode, der styrer vores routes:

```JavaScript
Router.prototype.get = function (path) {
	// tjek om 'path' findes i vores definerede route
	const route = this.routes.filter(r => r.path === path)[0];
	console.log(route);
};
```

... og en metode, der loader indholdet:

```JavaScript
const render = async function (templateName, callback) {
	const view = document.getElementByTagName('main')[0];
	const template = await fetch(`/templates/${templateName}.html`);
	view.innerHTML = await template.text();
	callback();
};
```

render-funktionen er en asynkron funktion, der indeholder et callback. Dette er så vi kan sørge for at vores template bliver indlæst inden vi gør mere.

For at bruge `render()` skal vi udvide `get`-metoden:

```JavaScript
Router.prototype.get = function (path) {
	// tjek om 'path' findes i vores definerede route
	const route = this.routes.filter(r => r.path === path)[0];
	if (route) render(route.template, () => {
		// her kan vi udføre andre handlinger efter indlæsning af template
	});
};
```

Dette er første del af denne guide. Anden del kommer til at handle om, hvordan vi får sat routeren i gang med at arbejde og hvordan vi kan lave links, som virker med en SPA.