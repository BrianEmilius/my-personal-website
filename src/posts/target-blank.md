---
title: target="_blank"
path: /blog/target-blank
author: Brian Emilius
twitter: brianemilius
date: 2018-05-01 22:01:16
tags: ["UX","a11y","best-practice","html"]
categories: ["Accessability"]
---
A lot can be said about links that open in a new window or tab. Whether it is a good idea to do so or "best-practice" is not the scope of this article. What I would really like to discuss is what we can do in those cases where opening a link in a new window or tab, for whatever reason, is necessary.

You probably know this kind of link:

```html
<a href="http://website.com/index.html" target="_blank" rel="noopener">Some website</a>
```

When you click this kind of link the path of the link will open in a new window or tab - depending on the settings of your browser. Today, most browsers are set to open links like this in a new tab by default.

I consider it a better user experience if I let the individual user choose the behaviour of a link. It can be annoying for a user if a link does not behave the way she expects. If the user expects the link she clicks to open in the same tab and something completely different happens, it leads to annoyance, frustration, and in the worst case; our user completely stops using our application or website.

This is why I believe it is a good idea to make our users aware of anything that makes our app work differently from any standard behaviour, including links that open in a new window or tab.

There are two considerations we can take:
* visual
* WAI-ARIA

## Visual Consideration
By far, the easiest way to make a user aware that a link opens in a new tab is to give some sort of visual hint.

I like icons and I use them for this exact purpose whenever I get the chance. I fairly known icon for our purpose is the [Font Awesome icon `external-link`](https://fontawesome.com/icons/external-link?style=solid).

![external-link ikon](../images/external-link.jpg)

To insert this icon after all links that have the attribute `target="_blank"`, we can use the following CSS:

```css
a[target="_blank"]::after {
    font-family: FontAwesome;
    content: ' \f08e';
}
```

This gives our user a reasonably recognizable visual hint that lets them know what they can expect when they click the link.

There is only one problem with this method: Blind and visually impaired people, as well as those who use screen readers for whatever other reason, do not "see" this icon. This brings us to the second consideration we can take.

## WAI-ARIA
The WAI-ARIA[^1] specification is meant to help us developers make applications and websites accessible to users with impairments. Among these are blind people, the visually impaired, and people with dyslexia. These groups of users often utilize screen readers to navigate and "see" a website.

The specification has an attribute that is relevant for our purpose: `aria-describedby`. By using this attribute on our links, an extra bit of text describing the link will be read by the screen reader.

First, we need to make a container for different kinds of descriptions. Notice that the container has the attribute `hidden` so it will not be displayed on the page or included in the general flow of a screen reader.

```html
<div hidden>
    <span id="link-description-external">Opens an external page</span>
    <span id="link-description-external-window">Opens an external page in a new window</span>
</div>
```

Now we can refer to these descriptions in our links with the `aria-describedby` attribute.

```html
<a href="http://website.com/index.html" target="_blank" rel="noopener" aria-describedby="link-description-external-window">Some website</a>
```

The screen reader will read the above link as "Link: Some website [short pause] Opens an external page in a new window".

What do you think of this method? I would love to get your input on the user experience regarding external links in the commentaries below.

[^1]: https://www.w3.org/WAI/intro/aria