---
title: Optimer din hjemmeside
path: /blog/optimer-din-hjemmeside
author: Brian Emilius
twitter: brianemilius
featured_image: ../images/audit.png
description: Hvis du nogensinde har brugt Google Chromes Audit værktøj, har du sikkert bemærket at nærmest uanset hvad du gør, så vil Audit fortælle dig at din CSS blokerer indlæsningen af din side (render-blocking).
date: 2018-04-17 10:26:57
tags: ["CSS","JavaScript","optimering","best-practice"]
categories: ["Guides"]
---
**Hvis du nogensinde har brugt Google Chromes Audit værktøj, har du sikkert bemærket at nærmest uanset hvad du gør, så vil Audit fortælle dig at din CSS blokerer indlæsningen af din side (render-blocking).**

Audit fortæller dig desuden, hvis du får kigget lidt ned i rapportens detaljer, at Google anbefaler at indlæse den kritiske del af dit stylesheet direkte i `<head>`-sektionen og indlæsningen af resten af dine stylesheets skal udsættes.

<!-- more -->

![Google Chrome Audit eksempel på perfomance raport](../images/audit.png)

Hvad er så kritisk styling, og hvad er render-blocking?

Når du med din browser loader en hjemmeside, bliver browseren sat på arbejde. Fra serveren modtager browseren en bunke HTML, CSS, og i de fleste tilfælde noget JavaScript. Browseren skal fortolke al denne kode og omdanne det til noget, der ser godt ud og er forståeligt for en almindelig besøgende. Dette kaldes rendering.

Alle stylesheets og JavaScripts, der bliver linket i `<head>`-sektionen skal downloades og behandles af browseren, inden browseren kan gå igang med at fortolke HTML-en. Det vil sige at følgende kode blokerer browseren i at udføre sit job hurtigt, særligt på enheder med en lidt langsommere forbindelse:

```HTML
<html>
	<head>
		<title>Langsom hjemmeside</title>

		<link rel="stylesheet" href="/css/mainstyling.css">
		<link rel="stylesheet" href="/css/fonts.css">
		<link rel="stylesheet" href="/css/fancybox.css">

		<script src="/js/jquery.min.js"></script>
		<script src="/js/app.js"></script>
		<script src="/js/fancybox.js"></script>
		<script src="/js/googleadwords.min.js"></script>
	</head>
	<body>
	<!-- indhold -->
	</body>
</html>
```

I ovenstående eksempel skal 7 filer downloades og fortolkes inden browseren overhovedet kan gå igang med rendering. Det er hvad vi kalder *render-blocking*.

En kritisk styling hænger sammen med hvordan vi gerne vil have at vores hjemmeside overordnet ser ud. Det er for eksempel sidens layout, de vigtigste farver og skriftstørrelserne.

## Løsningen

Løsningen er to-delt. Vi skal identificere hvad der er kritisk styling og lægge det direkte i `<head>`-sektionen i et `<style>`-tag, og vi skal indlæse resten af vores stylesheets og JavaScripts efter vores DOM er indlæst.

### Kritisk styling

Hvad der er kritisk for lige præcis din hjemmeside, afhænger af den enkelte side. Du bliver nødt til at vurdere hvor meget, eller hvor lidt styling du gerne vil have med ved browserens første rendering. Spørg dig selv: "Hvor lidt skal der til, for at siden tilnærmelsesvis ser ud som jeg gerne vil have?". Vælg det CSS ud som kræves og læg det i et `<style>`-tag:

```HTML
<html>
	<head>
		<title>Hurtigere hjemmeside</title>
		<style>
    :root {
      --colorPrimaryForeground: hsl(0, 0%, 7%);
      --colorPrimaryBackground: hsl(0, 0%, 98%);
      --fontStack: Arial, Verdana, sans-serif;
      --fontSize: 1em;
    }
    html, body {
      margin: 0;
      padding: 0;
    }
    body {
      background-color: var(--colorPrimaryBackground);
      color: var(--colorPrimaryForeground);
      font: normal 400 var(--fontSize)/100% var(--fontStack);
    }
    .container {
      display: grid;
      grid-template-columns: repeat(12, minmax(50px, 1fr));
      grid-template-rows: 100px auto 50px;
    }
    </style>
	</head>
	<body>
	<!-- indhold -->
	</body>
</html>
```

## Udsæt indlæsning af ikke-kritisk styling

Når selve siden er blevet renderet og vores DOM er indlæst, kan vi hente resten af vores stylesheets og scripts. JavaScripts er rigtig lette at indlæse på denne måde. Du skal blot tilføje attributten `defer` til dit script-tag:

```html
<script src="/js/jquery.min.js" defer></script>
<script src="/js/app.js" defer></script>
<script src="/js/fancybox.js" defer></script>
<script src="/js/googleadwords.min.js" defer></script>
```

Det er i øvrigt rigtig god praksis at lægge dine JavaScripts til sidste i dit HTML-dokument; dvs. lige før `</body>`.

Stylesheets er en lidt mere kompliceret sag. Vi skal lave et lille JavaScript, der injecter nogle `<link>`-tags efter DOM er indlæst.

```JavaScript
const cssLoader = function (src) {
	const stylesheet = document.createElement('link');
	stylesheet.href = src;
	stylesheet.rel = 'stylesheet';
	stylesheet.type = 'text/css';
	document.getElementsByTagName('head')[0].appendChild(stylesheet);
};
```

Denne funktion kan vi bruge i et lille script inde i en event-listener:

```JavaScript
document.addEventListener('DOMContentLoaded', () => {
	cssLoader('/css/mainstyling.css');
	cssLoader('/css/fonts.css');
	cssLoader('/css/fancybox.css');
});
```

På denne måde kommer vores samlede HTML-dokument til at se således ud:

```HTML
<html>
	<head>
		<title>Hurtigere hjemmeside</title>
		<style>
    :root {
      --colorPrimaryForeground: hsl(0, 0%, 7%);
      --colorPrimaryBackground: hsl(0, 0%, 98%);
      --fontStack: Arial, Verdana, sans-serif;
      --fontSize: 1em;
    }
    html, body {
      margin: 0;
      padding: 0;
    }
    body {
      background-color: var(--colorPrimaryBackground);
      color: var(--colorPrimaryForeground);
      font: normal 400 var(--fontSize)/100% var(--fontStack);
    }
    .container {
      display: grid;
      grid-template-columns: repeat(12, minmax(50px, 1fr));
      grid-template-rows: 100px auto 50px;
    }
    </style>
	</head>
	<body>
	<!-- indhold -->
	<script src="/js/jquery.min.js" defer></script>
  <script src="/js/app.js" defer></script>
  <script src="/js/fancybox.js" defer></script>
  <script src="/js/googleadwords.min.js" defer></script>
	<script>
  const cssLoader = function (src) {
    const stylesheet = document.createElement('link');
    stylesheet.href = src;
    stylesheet.rel = 'stylesheet';
    stylesheet.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(stylesheet);
  };
  document.addEventListener('DOMContentLoaded', () => {
    cssLoader('/css/mainstyling.css');
    cssLoader('/css/fonts.css');
    cssLoader('/css/fancybox.css');
  });
  </script>
	</body>
</html>
```

Den eneste lille ting vi mangler at gøre nu, er at fortælle browseren hvad den skal gøre, hvis JavaScript er slået fra:

```html
<noscript>
<link rel="stylesheet" href="/css/mainstyling.css">
<link rel="stylesheet" href="/css/fonts.css">
<link rel="stylesheet" href="/css/fancybox.css">
</noscript>
```

Prøv at benytte denne metode på dit næste projekt og læg mærke til, om det gør noget ved Audits performance rapport.

Jeg kunne rigtig godt tænke mig at høre fra dig om dine oplevelser med denne metode i kommentarfeltet herunder.