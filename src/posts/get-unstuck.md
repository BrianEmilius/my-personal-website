---
title: Get Unstuck!
date: 2019-09-02 13:00
tags: ["webdev", "beginners"]
image: ../images/get-unstuck.jpg
---
Some code in my application is being naughty and won't do as I tell it. And I just cannot fathom what could possibly be wrong! I've had this issue for days now. No matter how I look at it, I just can't see a way out. I'm a stubborn fellow, so I dig in deep and keep gnawing at this problem until I alone emerge victoriously.

We've all tried this. We've all had an issue that we struggled to solve. We all probably both hate and love these situations - I know I do! Problem-solving is at the very core of what it means to be a software developer.

So how do we do it? How do we time and again emerge triumphantly? I don't know how you do it, but I know what I do. This article is about that.

## Cannot read property 'xyz' of undefined
First of all, I've put in some time learning the different kinds of error types my language has. For example, it pays off for me to know the difference between "cannot read x of undefined" and "unhandled exception".

I've taught myself to analyse the error messages I get in the console, search through my code where the error message suggests and look for something related to the error type.

An example!
```
async function getUserByUsername(req, res, next) {
  try {
    const [result] = await conn.query("SELECT id, name FROM users WHERE username = :username", {
      username: req.fields.username
    });
    res.json(JSON.parse(result));
    return;
  }
  catch (error) {
    next(error);
  }
}
```

The above code snippet is a middleware for something like Express or Restify. If I got the error

`Cannot read 'username' of undefined on /path/to/file:4:28`

I know what file to look in and what line to look at. But I also know that 'username' cannot be read because of the thingy 'username' is stuck on (fields) is undefined. Now I can begin to detective my way out of the problem - by asking: "Why is 'fields' undefined? What did I forget to do?"

Learning what the different kinds of error types mean has probably been the most important thing for me when it comes to debugging my code.

## Console.log(all the things)
I've got a bunch of nested conditionals in my code and I am not getting the response I expected.

`console.log("here")` to the rescue!

I use this little debugging trick so much you might say it's my go-to solution. Move the `console.log()` around in your code. Notice where it pops up and where it doesn't.

It might seem dumb, but you'd be surprised how often this simple little trick helps (how's that for a click-batey title?).

"But doesn't the IDE debugger already give you this functionality?" you might ask.

Well, yes. It does. Often, spinning up the debugger just to know where my logic fails in a JavaScript is a bit much, though.

That being said:

## Befriend Your Debugging Tool
All the big IDEs and VS Code have debugging tools. How you use them differs a bit from IDE to IDE. But get to know yours. Learn about break-points, the call stack, jump in and jump over, and so on.

I often run an application in debugging mode when I develop. This lets me add break-points on the fly.

## Take A Break!
For real! Do something else. Go for a walk, clear your mind. Work on a different problem in a different language. Help someone else with their coding problem. Whatever you do, do something that will distract you and take your mind off of your problem.

Some of you might think this is some hippie new-age advice. But it helps. I promise! There's even [science to back this claim](https://www.sciencedaily.com/releases/2011/02/110208131529.htm).

## Quack!
Rubber duck debugging is something I practice almost religiously. It's a method where you verbalise your issue. Preferably you do this to a rubber duck. The theory behind this practice is that when you have to describe a problem, the solution often presents itself within the description. I do this a lot with my students. So much, in fact, that some of my students refer to it as "being rubber ducked by Brian".

## Learn To Search
Let's be honest. Googling the solution to a problem is something we all do. Or maybe we DuckDuckGo it. Maybe we only search on specific platforms such as StackOverflow. Whatever the case is for you, learn to formulate the core of your problem. Use keywords. Computers understand unhinged sentences such as "undefined error req.fields express" (bonus: This very search phrase on DuckDuckGo has a body-parser issue listed as the number 1 result, which, incidentally, is what is wrong in my example).

## Learn To Formulate The Problem
Asking a question on StackOverflow or similar communities can be a really great exercise. Why?

You train yourself in being clear
You might help others with similar problems along the way
You might realise the solution as you describe your issue (rubber duck debugging gone digital).

## Ask
Seriously. There's no shame in asking for help. Know what you know. But more importantly; know when there is something you don't know. Use it as an opportunity to learn something new. Ask your friend, teacher, co-worker, the Almighty Google Overlord.

Practice pair-programming. My experience is that programming in pairs gives cause for great discussions about the 'why' in your code.

## Don't Worry
Programming is hard. Programming is frustrating. Discipline your mind to understand that failure is a chance to learn. We don't learn anything from being good at the same thing over and over again. Dare to "move fast and break things" - just, like, not in a "let's create an app that has the potential to overthrow governments"-way.

We all struggle. Daily even. It's okay, don't worry about it. It won't get any easier, but it will get a lot more fun as you learn and become a better developer.

Now it's time for you to share your little tips and tricks for getting unstuck on a programming problem. Do you do any of the things I do?

<a href="https://www.freepik.com/free-photos-vectors/water">Cover image created by asier_relampagoestudio - www.freepik.com</a>