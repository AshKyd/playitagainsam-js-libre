Play it again Sam (a non-GPL Javascript player) 𝅘𝅥𝅮
=================================================

From the [playitagainsam repo](https://github.com/rfk/playitagainsam):

> Playitagainsam is a tool and a corresponding file format for recording and replaying interactive terminal sessions. It takes inspiration from the unix commands "script" and "ttyrec" and the python tool "playerpiano".

This repo is a quick and dirty Javascript frontend to play back pias files
in the [terminal.js](https://github.com/Gottox/terminal.js/) virtual terminal.

This project is mostly scratching an itch of mine so use at your peril. I threw
this together as a more free alternative to the existing
[GPL'd js player](https://github.com/rfk/playitagainsam-js/). This project
is licensed under the [ISC license](LICENSE).

![](examples/reveal-sam.gif)

Usage
-----

The player can be initialised as follows:
```
var PlayItAgainSam = require('playitagainsam-js-libre');
var sam = new PlayItAgainSam({
  // PIAS data
  data: {},

  // Element to attach to
  target: document.querySelector('#my-div'),

  // Seconds per character
  typingSpeed: 0.05,

  // Pause before or after each line is typed into the console
  pauseBeforeEcho: false,
  pauseAfterEcho: false,
});
```

You can pause on each line by specifying pauseBeforeEcho or pauseAfterEcho
in the constructor. Alternatively you can edit the piaf file contents to include
a `pause: 'BEFORE|AFTER|BOTH'` line.

To resume playback:
```
sam.continue();
```

Reveal.js plugin
----------------
It's probably easiest to copy off the `examples/reveal.html` file for the
moment. Please feel free to contribute to the docs:

1. Include `dist/play-it-in-revealjs.js` in your Reveal presentation
2. Copy the styles from `examples/reveal.html` or make your own
3. Add a `data-samElement` and `data-samFile to your slide to point to the element and `.pias` file respectively.


Contributing
------------
Go for it!
