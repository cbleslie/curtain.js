'use strict';

var CURTAIN = (function () {
  //Setup the public object
  var curtain = {};
  //Public Vars
  curtain.hidden = '';
  curtain.visibilityChange = '';
  curtain.hiddenInterval = '';
  //Public Functions
  //Check browser for API variations.
  curtain.checkBrowser = function () {
    if (typeof document.hidden !== "undefined") {
      //Modern
      curtain.hidden = "hidden";
      curtain.visibilityChange = "visibilitychange";
    } else if (typeof document.mozHidden !== "undefined") {
      //Old Mozilla
      curtain.hidden = "mozHidden";
      curtain.visibilityChange = "mozvisibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      //Microsoft - PerfectShitForever(TM)
      curtain.hidden = "msHidden";
      curtain.visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      //Older WebCats
      curtain.hidden = "webkitHidden";
      curtain.visibilityChange = "webkitvisibilitychange";
    }
  };
  //Fires on hidden state, changes css transistions and Z-index.
  //This is initial state that the shit transistions from.
  curtain.hiddenState = function () {
    //Checking to see if the countdown is running
    if (curtain.hiddenInterval) {// clear that shit.
      clearInterval(curtain.hiddenInterval);
      curtain.hiddenInterval = '';
    }
    $('.curtain').css({
      'transition': 'all 0s',
      'transition-delay': '0s',
      "z-index": '1',
      "width": '100%',
      'transform':'translateX(0px)'
    });
  };
  //Fires on visible state, changes css transistions and Z-index.
  //This is the updated state that the shit transisitions to.
  curtain.returnState = function (delayTime, wipeDuration) {
    setTimeout(function(){//to avoid race condition? I guess...?
      $('.curtain').css({
        'transition': 'all ' + wipeDuration,
        'transition-delay': delayTime,
        "z-index": "0",
        'width':'0%',
        'transform':'translateX(-800px)'
      });
    }, 10);
  };
  //clone and delete original. We need to do this because you can't just "interrupt"
  //css transistions, you have to actually remove/clone the WHOLE element. Shitty.
  //Makes sense I guess. Kinna. Not really. Maybe. I have to put the sausage and cheese cart back.
  curtain.cloneElement = function () {
    var cur = $('.curtain'),
    newcur = cur.clone(true);
    cur.before(newcur);
    $("." + cur.attr("class") + ":last").remove();
  };
  //bind the & jquery click even to the exit.
  curtain.startExit = function () {
    $('.curtain-exit').click( function () {
      var settings = curtain.getSettings();
      curtain.cloneElement();
      curtain.hiddenState();
      curtain.wipe('0',settings[1]);
    });
  };
  // Countdown Timer, in seconds
  curtain.countdown = function (counttime) {
    //stript text from the numbers.
    var re = /[^\d\.]/;
    var count = counttime.replace(re,'');
    curtain.hiddenInterval = setInterval(function() {
      count--;
      if (count >= 0) {
        $('.curtain-count').html(count);
      }
      if (count === 0) {
        $('.curtain-count').html('');
      }
    }, 1000);
  }
  //Lets update the css via the event listener.
  curtain.wipe = function (delay, duration) {
    if (document[curtain.hidden]) {//Is the DOM hidden? Are you on another Tab?
      curtain.hiddenState();

    } else { // DOM is shown. We can see it!
      $('.curtain-count').html('');//clear the counter.
      curtain.returnState(delay,duration);
      curtain.countdown(delay);
    }
  };
  //Grabs the settings from the DOM using $'s attr. function.
  curtain.getSettings = function () {
    var delaySetting = $('.curtain').attr('curtain-delay');
    var durationSetting = $('.curtain').attr('curtain-duration');
    var settings = [delaySetting, durationSetting];
    return settings;
  };
  //return the object for use.
  curtain.init = function (){
    //Fire the first check
    curtain.checkBrowser();
    curtain.startExit();
    //Attach Listener
    document.addEventListener(curtain.visibilityChange, function () {//Damn you Javascript. THANKS, OBAMA./s
      //Get settings from the Dom.
      var settings = curtain.getSettings();
      curtain.wipe(settings[0],settings[1]);
    }, false);
  };
  //Push that shit out the door.
  return curtain;
}());
CURTAIN.init();
