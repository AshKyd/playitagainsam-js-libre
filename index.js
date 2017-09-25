const Terminal = require('terminal.js');

function applyTypingSpeed(events, typingSpeed){
  const newEvents = [];
  events.forEach((event) => {
    if(event.act === 'ECHO'){
      event.data.split('').forEach((char, i) => {
        let pause = undefined;
        if(i === 0 && ['BEFORE', 'BOTH'].includes(event.pause)) pause = 'BEFORE';
        newEvents.push({
          pause,
          act: 'ECHO',
          data: char,
          duration: typingSpeed,
        });
      });
      if(['AFTER', 'BOTH'].includes(event.pause)){
        newEvents[newEvents.length - 1].pause = 'AFTER';
      }
    } else {
      newEvents.push(event);
    }
  });
  return newEvents;
}

function isNewlineRead(event){
  return event.act === 'READ' && event.data === '\r';
}

function PlayItAgainSam(options) {
  const { data, target, typingSpeed, pauseBeforeEcho, pauseAfterEcho, complete } = options;
  let events = data.events;
  if(typingSpeed){
    events = applyTypingSpeed(events, typingSpeed);
  }

  let lastTime;

  const setup = events.shift();
  const terminal = new Terminal({
    columns: setup.size[0],
    rows: setup.size[1],
  });
  terminal.dom(target);

  function applyEvent(event){
    if(event.act === 'WRITE' || event.act === 'ECHO'){
      terminal.write(event.data);
    }
  }

  let running = false;
  function startAnimation(){
    if(running) return;
    running = true;
    lastTime = Date.now();
    frame();
  }
  this.continue = startAnimation;

  function frame(){
    if(!events.length){
      complete && complete();
      running = false;
      return;
    }
    let currentTime = (Date.now() - lastTime)/1000;
    let actionTaken = false;
    let shouldContinue = true;
    while(events.length && (!events[0].duration || events[0].duration < currentTime)) {
      const event = events[0];
      console.log('event pause', event.pause)
      if(event.pause === 'BEFORE' || (pauseBeforeEcho && isNewlineRead(event))) {
        delete event.pause;
        shouldContinue = false;
        break;
      }
      currentTime -= event.duration;
      applyEvent(events.shift());
      actionTaken = true;
      if(event.pause === 'AFTER' || (pauseAfterEcho && isNewlineRead(event))) {
        shouldContinue = false;
        break;
      }
    }
    // setTimeout(frame, 25);
    if(actionTaken) lastTime = Date.now();
    if(shouldContinue) {
      requestAnimationFrame(frame);
    } else {
      running = false;
    }
  }

  startAnimation();
}

module.exports = PlayItAgainSam;
