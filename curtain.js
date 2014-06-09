var hidden,
    visibilityChange;

var Curtain = function () {
};

Curtain.prototype.start = function () {
  //Figure out if you're running a peice of shit browser, or something respectable.
  if (typeof document.hidden !== "undefined") {
    //Modern
    hidden = "hidden";
    visibilityChange = "visibilitychange";
  } else if (typeof document.mozHidden !== "undefined") {
    //Old Mozilla
    console.log('Old Moz');
    hidden = "mozHidden";
    visibilityChange = "mozvisibilitychange";
  } else if (typeof document.msHidden !== "undefined") {
    //Microsoft - PerfectShitForever(TM)
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
  } else if (typeof document.webkitHidden !== "undefined") {
    //Older WebCat
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
  }
  //Okay, State is known.
  this.wipe = function () {
    if (document[hidden]) {//Is the DOM hidden? Are you on another Tab?
      $('.curtain').css({
        'transition': "all 0s",
        "z-index": "1",
        "width": '100%',
        'transform':'translateX(0px)'
      });
    } else { // DOM is shown. We can see it!

      setTimeout(function() {//give the browser some time to catch the jQuery blang dang dong.
        $('.curtain').css({
          'transition': "all 1s",
          'transition-delay': '0.2s'
        });
      }, 10);
      //Change the elements.
      setTimeout(function() {//How should we end it?
        $('.curtain').css({
          "z-index": "0",
          'width':'0%',
          'transform':'translateX(-800px)'
        });
      }, 100);
    }
  };
  //watch for change in visibilty
  document.addEventListener(visibilityChange, this.wipe, false);
};
var curtain = new Curtain('red');
curtain.start();
