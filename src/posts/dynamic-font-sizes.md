---
title: Dynamic Font Sizes
path: /blog/dynamic-font-sizes
author: Brian Emilius
twitter: brianemilius
date: 2018-04-10 10:49:03
tags: ["CSS","algebra"]
---
There are easy ways to use CSS to make a font-size adapt to the size of the screen it is rendered on.

```CSS
body {
    font-size: 1vw;
}
```

With this fluid font-size, your font is always 1% of the width of your viewport. This means that if you have a small screen your text is small. And on a big screen, the text is big.

But, if you use this method there is virtually no limit to how small or how big your text can become. This is not appropriate.

But what if we could set a lower and upper limit to the size of our text? A dynamic font-size without the problem I mentioned above.

It all starts with some algebra. We need to determine the boundaries of our dynamic font-size.

Ask yourself the following questions:

* "How small should my screen be to stop the text from getting any smaller?"  
Let us call this variable `Vi`.
* "How large should my screen be to stop the text from getting any larger?"  
We'll name that variable `Va`.
* "What should the smallest possible size of my text be?"  
Let's call it `Mi`.
* "What should the largest possible size of my text be?"  
Call it `Ma`.

The above variables are all stated in pixels.

Finally, we need to know what the size of the screen is. We can't know this, so this is our unknown variable. In the tradition of good old Primary School, algebra classes let's name it variable `X`.

Insert the variables into this formula:

`size = Mi + (Ma - Mi) * (X - Vi) / (Va - Vi)`

## Example
Let us say we want the smallest font-size to be 14px and the largest 21px.

We want our text to stop shrinking when the screen width goes below 412px and we don't want it to grow once our screen width goes over 1920px.

`14px + (21 - 14) * (100vw - 412px) / (1920 - 412)`

In CSS you can implement the formula using `calc`:

```CSS
body {
    font-size: calc(14px + (21 - 14) * (100vw - 412px) / (1920 - 412));
}
```

I use this method here on my website. Pull the window and make it smaller or larger and see what happens to the font-size.