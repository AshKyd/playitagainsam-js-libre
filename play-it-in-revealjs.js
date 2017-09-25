const PlayItAgainSam = require('./');

let playing;

function samContinue(){
  playing && playing.continue();
}

function slideChanged(event){
	const slide = Reveal.getCurrentSlide();
  const samElementName = slide.dataset.samelement;
  const samElement = document.querySelector(samElementName);
  const samFile = slide.dataset.samfile;
  if(!samFile){
    if(playing) playing.destroy();
    return;
  }

	fetch(samFile)
		.then(body => body.json())
		.then(data => {
      Reveal.configure({ keyboard: false });
      window.addEventListener('keypress', samContinue);
			playing = new PlayItAgainSam({
        data,
        target: samElement,
        typingSpeed: 0.05,
        complete: () => {
          Reveal.configure({ keyboard: true });
          window.removeEventListener('keypress', samContinue);
        },
      });
		});
}

Reveal.addEventListener('ready', slideChanged);

Reveal.addEventListener('slidechanged', slideChanged);
