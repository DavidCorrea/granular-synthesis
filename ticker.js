const tickerBlob = new Blob([`
  const wholeNote = 1000;
  const halfNote = wholeNote / 2;
  const quarterNote = wholeNote / 4;
  const eightNote = wholeNote / 8;

  function tickEightNote(){
    setTimeout(tickEightNote, eightNote);
    self.postMessage('tick-8');
  }

  function tickQuarterNote(){
    setTimeout(tickQuarterNote, quarterNote);
    self.postMessage('tick-4');
  }

  function tickHalfNote(){
    setTimeout(tickHalfNote, halfNote);
    self.postMessage('tick-2');
  }

  function tickWholeNote(){
    setTimeout(tickWholeNote, wholeNote);
    self.postMessage('tick-1');
  }

  tickEightNote();
  tickQuarterNote();
  tickHalfNote();
  tickWholeNote();`
], { type: "text/javascript" });

const tickerBlobUrl = URL.createObjectURL(tickerBlob);
const tickerWorker = new Worker(tickerBlobUrl);

tickerWorker.onmessage = (message) => { /* message.data */ };