---
title: "How To Get a Comment Section On Your Static Site"
path: "/blog/how-to-get-a-comment-section-on-your-static-site"
date: 2019-07-23 11:00:00
author: "Brian Emilius"
twitter: "brianemilius"
---
In this article, I will show you how to implement a comment section on a static website with no backend. But first, let me explain what a static site is, and what a backend is.

## Static Site
A static site is a website that has no dynamic content. Usually, they are written entirely with HTML, CSS, and JavaScript. Sites like these do not fetch content from an external source. Each page is unique and will work isolated from the other pages on the website.

Advantages of static sites include
* ease of development
* easy to host
* works fast on slow connections

Disadvantages might be
* low scalability
* hard to implement design changes

A recent trend in web development has been to use something called Static Site Generators.

Static Site Generators lets the developer work with templates and web components that in the end are generated into static HTML pages.

Some of the popular Static Site Generators are
* [Hexo](https://hexo.io/)
* [Jekyll](https://jekyllrb.com/)
* [Gatsby](https://www.gatsbyjs.org/)

## Backend
A backend in web development is for generating data and receiving and storing data. This includes data manipulation.

An example of this is a website that presents weather forecasts.

The backend receives a lot of data from weather satellites, weather balloons, weather stations, etc. This data needs to be translated, interpreted and stored in a database.

When a visitor requests a forecast through the website, the backend will select the appropriate data, format it so it can be presented, and sends it to the visitor.

Advantages of having a backend could be
* dynamic content creation results in more visits
* support for interaction between users
* separation of content and design

Some disadvantages of having a backend might include
* depending on the scope of a project, hosting can become quite expensive
* backends are at a high risk of malicious attacks from hackers, so you need to know about server security

## Comments With No Backend
Now that we know the terminology, let us have a look at one solution to the following problem:

> I want to have a comment section on my static website, but I have no backend, so I don't know where to store the comments.

There are many ways to solve this problem. Most of them use social media platforms as the engine under the hood. Privacy is a constant concern of mine, so I want to solve my problem without using technology that tracks my users.

To the rescue comes [GitHub](https://github.com) and [Gitalk](https://github.com/gitalk/gitalk/).

GitHub is the go-to platform for collaboration with code. Every project on GitHub exists in something called a repository. Repositories can have connected issues, and you can comment on issues. This is the technology we are going to leverage.

To do this, we are going to use a nice little open-source package called Gitalk.

Gitalk will let you add a fully functional comment section to any static page, as long as you have a GitHub account. This does, however, limit the use of your website comment section to people who are interested in programming and already have a GitHub account. This is why I suggest you use this method if your website topic is about programming, web development or similar.

### Step 1
First, you need to go to GitHub and create an OAuth App.

1. Go to your GitHub settings page and click "Developer Settings in the left-hand menu, then click "OAuth Apps" also in the menu.
2. Click the little "New OAuth App" button at the top.
3. Fill out the form with your application name, the URL of your website, and an authorization callback URL. The callback URL, in this case, is the same as your website URL.
4. Once you have registered your OAuth App, you will receive a Client ID, and a Client Secret. Save these.

### Step 2
Create a public repository. This is where your comments will be saved.

1. On GitHub, click the plus-sign the top-right corner and select "New repository"
2. Fill in the form. Make sure to select public, not private. The only thing you need to fill in is the repository name. It could be something like "my-website-comments".
3. Click the green "Create repository" button.

This is all the setup you need to do on GitHub.

### Step 3
Now you need to copy and paste some code into your website pages.

On the pages where you want a comment section, place this in your head section.

```html
<link rel="stylesheet" href="https://unpkg.com/gitalk/dist/gitalk.css">
<script src="https://unpkg.com/gitalk/dist/gitalk.min.js"></script>
```

This will load the stylesheet and the Gitalk script into your page.

Next, you need to decide where on your page you want the comments. Place this code where you need it.

```html
<div id="gitalk-container"></div>
```

And finally, insert this script at the bottom of your page, just before the `</body>` tag.

```html
<script>
const gitalk = new Gitalk({
  clientID: 'GitHub Application Client ID',
  clientSecret: 'GitHub Application Client Secret',
  repo: 'GitHub repo',
  owner: 'GitHub repo owner',
  admin: ['GitHub repo owner and collaborators, only these people can initialize github issues'],
  id: location.pathname,
  distractionFreeMode: false  // Facebook-like distraction free mode
})

gitalk.render('gitalk-container')
</script>
```

Insert your Client ID and Client Secret from step 1 into the script, change `owner`, and `admin` to your GitHub username, and `repo` to the name of your repository that you selected in step 2.

### Step 4
Open each page with a comment section in your browser and click the Init button. This will create an issue for the comment section on GitHub and let your visitors use the new functionality.

I use this method on my website, however, I created my website with Gatsby. This means I had to use a slightly different approach. If you are interested, you can take a look at [my website repository on GitHub](https://github.com/BrianEmilius/my-personal-website) to see how I did it.

Let me know your thoughts on this method in the comments below!