## Meme Magic

It's a terrible name, I know. Doesn't summarize this app at all. Here it is:
Meme Magic is a heavy handed backend boiler plate with some very light front end stuff set up. What little is set up on the front end is beautiful (PropTypes, Immutable.js for Redux Store, ES6, AFrame and its cleaner Reactified Counterpart), and the backend is fully set except your choice of login system at the moment.

## Motivation

I built this to be a performant, easy to deploy, ES6 God, and most importantly - sketchy boiler plate for my students at Fullstack Academy to get a good glimpse of boiler plate work and the foundation for a good app.

## Installation

This codebase has two criteria:

A:

  I am sadly a WSL user (Yes, Windows, Subsystem, (for) Linux), so I can't run post-install pg-init scripts. So step 1 is make a new psql database named `meme-magic`. Thats it.

B:

  Make a `secrets.js` file in the root directory. It should contain:

  `export default {
    SessionKey: 'WhateverYouWant'
  };`

That's it. Enjoy.

## Tests

Tests are my current step in this project - 12/14/16

## Authentication

Auth is ready to go, but Im unsure if I want to offer uniform auth...

## License

Apache 2.0
