---
title: Dynamisk font-størrelse
path: /blog/dynamisk-font-storrelse
author: Brian Emilius
twitter: brianemilius
featured_image:../images/dynamisk-font-storrelse.png
description:
date: 2018-04-10 10:49:03
tags: ["CSS","matematik"]
categories: ["Design"]
---
Du kan, på en meget let måde, sørge for at dine font-størrelse tilpasser sig størrelsen på den skærm din tekst vises på.

```CSS
body {
	font-size: 1vw;
}
```

<!-- more -->

På denne flydende måde bliver din skriftstørrelse altid 1% af din viewports bredde. Det betyder, at hvis du har en meget lille skærm, så er størrelsen på din tekst også meget lille. Omvendt, så bliver din skrifstørrelse stor på store skærme.

Men hvis du følger denne metode, er der ingen grænser for hvor stor eller lille din tekst kan blive - og det er enormt uhensigtsmæssigt.

I stedet for, kunne det være rart at lade din skriftstørrelse tilpasse sig skærmens størrelse, men med en nedre og øvre grænse.

Til det, skal du bruge nogle parametre:

* mindste skriftstørrelse angivet i pixel `Mi`
* største skriftstørrelse angivet i pixel `Ma`
* mindste skriftstørrelse angivet i em `em`
* mindste skærmbredde angivet i pixel `Vi`
* største skærmbredde angivet i pixel `Va`

Disse parametre kan du sætte ind i følgende formel:

`em + (Ma - Mi) * (100vw - Vi) / (Va - Vi)`

Lad os sige at vi gerne vil have en minimum skriftstørrelse på 14px og en maks på 21px. Den mindste skærmstørrelse vi understøtter er 412px og den største er 1920px. En skriftstørrelse på 14px svarer til 0.875em (vær opmærksom på, at det afhænger meget af, hvilken skrifttype du bruger).

`0.875em + (21 - 14) * (100vw - 412px) / (1920 - 412)`

I CSS vil vi kunne implementere denne formel med `calc`:

```CSS
body {
	font-size: calc(0.875em + (21 - 14) * (100vw - 412px) / (1920 - 412));
}
```

Jeg har brugt denne metode her på brianemilius.com. Prøv at trække i vinduet og se hvad der sker med skriftstørrelsen.