

window.onload = function () {
  scrollPage();
  parallax();
};

function scrollPage() {
  var scrollPage = document.querySelector('#scrollPage');
  var imgItem = scrollPage.querySelectorAll('.list_li');
  var btnItem = scrollPage.querySelectorAll('.btn_span');

  var btnPrev = null;
  var zIndexArr = [];
  var curBtn = 0;
  var b_stop = true;
  var num = 0;

  for (var i = imgItem.length; i >= 1; i --) {
    zIndexArr.push(i);
  }
  for (var j = 0; j < zIndexArr.length; j++) {
    imgItem[j].style.zIndex = zIndexArr[j];
  }

  for (var i = 0; i < btnItem.length; i++) {
    btnItem[i].index = i;

    btnItem[i].onclick = function () {
      if (b_stop) {
        b_stop = false;

        tab(this);
        moving(this.index);

        curBtn = this.index;
        num = this.index;
      }
    };
  }

  mouseWheel(scrollPage, function () {
    if (b_stop) {
      b_stop = false;
    
      if (num === 0) {
        num = imgItem.length - 1;

        for (var i = 0; i < imgItem.length - 1; i++) {
          startMove(imgItem[i], 0, -100, function () {
            b_stop = true;
          });
        }
      } else {
        num --;

        startMove(imgItem[num], -100, 0, function () {
          b_stop = true;
        });
      }

      curBtn = num;
      tab(btnItem[num]);
    }
  }, function () {
    if (b_stop) {
      b_stop = false;
    
      if (num === imgItem.length - 1) {
        num = 0;

        for (var i = 0; i < imgItem.length - 1; i++) {
          startMove(imgItem[i], -100, 0, function () {
            b_stop = true;
          });
        }
      } else {
        num ++;

        startMove(imgItem[num - 1], 0, -100, function () {
          b_stop = true;
        });
      }

      curBtn = num;
      tab(btnItem[num]);
    }
  });

  function moving(index) {
    if (index > curBtn) {
      var prevSibling = getSibiling(index, 'prev');

      for (var j = 0; j < prevSibling.length; j++) {
        if (j < index - curBtn) {
          startMove(prevSibling[j], 0, -100, function () {
            b_stop = true;
          });
        }
      }
    } else if (index < curBtn) {
      var nextSibling = getSibiling(index, 'next');

      for (var j = 0; j < nextSibling.length; j++) {
        if (j < curBtn - index) {
          startMove(nextSibling[j], -100, 0, function () {
            b_stop = true;
          });
        }
      }
    }
  };

  function getSibiling(index, dir) {
    var nodeArr = [];
    var node = imgItem[index];

    if (dir === 'prev') {
      while (node.previousElementSibling) {
        node = node.previousElementSibling;

        nodeArr.push(node);
      }
    } else {
      nodeArr.push(imgItem[index]);

      while (node.nextElementSibling) {
        node = node.nextElementSibling;

        nodeArr.push(node);
      }
    }

    return nodeArr;
  };

  function tab(obj) {
    if (!btnPrev) {
      for (var j = 0; j < btnItem.length; j ++) {
        btnItem[j].className = '';
      }
    } else {
      btnPrev.className = '';
    }

    obj.className = 'cur';
    btnPrev = obj;
  };

  function mouseWheel(obj, upFn, downFn) {
    obj.onmousewheel = fn;

    if (obj.addEventListener) {
      obj.addEventListener("DOMMouseScroll", fn, false);
    }

    function fn(ev) {
      var oEvent = ev || window.event;

      if (oEvent.wheelDelta) {
        oEvent.wheelDelta > 0 ? upFn() : downFn();
      } else {
        oEvent.detail < 0 ? upFn() : downFn();
      }

      if (oEvent.preventDefault) {
        oEvent.preventDefault();
      } else {
        oEvent.returnValue = false;
      }
    };
  };
};

function parallax() {
  var oUl = document.querySelector('#overMove');
  var aLi = oUl.querySelectorAll('div');

  var halfW = oUl.offsetWidth / 2;
  var halfH = oUl.offsetHeight / 2;

  oUl.onmousemove = function (ev) {
    var ev = ev || window.event;
    var disX = ev.clientX;
    var disY = ev.clientY;

    for (var i = 0; i < aLi.length; i++) {
      var scale = aLi[i].getAttribute('data-scale');
      var iX = ((halfW - disX) * scale) / 8;
      var iY = ((halfH - disY) * scale) / 8;

      /*var maxX = halfW - disX;
      var maxY = halfH - disY;
      var initalScaleX = maxX / halfW;
      var initalScaleY = maxY / halfH;
      var speedX = iX - initalScaleX;
      var speedY = iY - initalScaleY;

      initalScaleX += speedX;
      initalScaleY += speedY;*/

      aLi[i].style.left = iX + 'px';
      aLi[i].style.top = iY + 'px';
    }
  };
};



/*
 * Tween.js
 * t: current time（当前时间）；
 * b: beginning value（初始值）；
 * c: change in value（变化量）；
 * d: duration（持续时间）。
 * you can visit 'http://easings.net/zh-cn' to get effect
*/
var Tween = {
    Linear: function(t, b, c, d) { return c*t/d + b; },
    Quad: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOut: function(t, b, c, d) {
            return -c *(t /= d)*(t-2) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t-2) - 1) + b;
        }
    },
    Cubic: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOut: function(t, b, c, d) {
            return c * ((t = t/d - 1) * t * t + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t*t + b;
            return c / 2*((t -= 2) * t * t + 2) + b;
        }
    },
    Quart: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t*t + b;
        },
        easeOut: function(t, b, c, d) {
            return -c * ((t = t/d - 1) * t * t*t - 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t*t - 2) + b;
        }
    },
    Quint: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOut: function(t, b, c, d) {
            return c * ((t = t/d - 1) * t * t * t * t + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2*((t -= 2) * t * t * t * t + 2) + b;
        }
    },
    Sine: {
        easeIn: function(t, b, c, d) {
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeOut: function(t, b, c, d) {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOut: function(t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t/d) - 1) + b;
        }
    },
    Expo: {
        easeIn: function(t, b, c, d) {
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOut: function(t, b, c, d) {
            return (t==d) ? b + c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    Circ: {
        easeIn: function(t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOut: function(t, b, c, d) {
            return c * Math.sqrt(1 - (t = t/d - 1) * t) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
    },
    Elastic: {
        easeIn: function(t, b, c, d, a, p) {
            var s;
            if (t==0) return b;
            if ((t /= d) == 1) return b + c;
            if (typeof p == "undefined") p = d * .3;
            if (!a || a < Math.abs(c)) {
                s = p / 4;
                a = c;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        easeOut: function(t, b, c, d, a, p) {
            var s;
            if (t==0) return b;
            if ((t /= d) == 1) return b + c;
            if (typeof p == "undefined") p = d * .3;
            if (!a || a < Math.abs(c)) {
                a = c; 
                s = p / 4;
            } else {
                s = p/(2*Math.PI) * Math.asin(c/a);
            }
            return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
        },
        easeInOut: function(t, b, c, d, a, p) {
            var s;
            if (t==0) return b;
            if ((t /= d / 2) == 2) return b+c;
            if (typeof p == "undefined") p = d * (.3 * 1.5);
            if (!a || a < Math.abs(c)) {
                a = c; 
                s = p / 4;
            } else {
                s = p / (2  *Math.PI) * Math.asin(c / a);
            }
            if (t < 1) return -.5 * (a * Math.pow(2, 10* (t -=1 )) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p ) * .5 + c + b;
        }
    },
    Back: {
        easeIn: function(t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOut: function(t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            return c * ((t = t/d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOut: function(t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158; 
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2*((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        }
    },
    Bounce: {
        easeIn: function(t, b, c, d) {
            return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
        },
        easeOut: function(t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        easeInOut: function(t, b, c, d) {
            if (t < d / 2) {
                return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
            } else {
                return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        }
    }
}
Math.tween = Tween;

//
function startMove(obj, from, to, fn) {
  var startTime = nowTime();
  var Tween = Math.tween || window.Tween;
  var method = 'Expo.easeInOut';
  var interval = 1000;
  var tweenKey = method.split('.');
  var fnGetValue = null;
  var getIE = ifIe();

  if (tweenKey.length === 1) {
    fnGetValue = Tween[tweenKey[0]];
  } else {
    fnGetValue = Tween[tweenKey[0]][tweenKey[1]];
  }

  var step = function () {
    var changeTime = nowTime();
    var time = interval - Math.max(0, startTime - changeTime + interval);
    var value = fnGetValue(time, from, to - from, interval);

    if (getIE) {
      obj.style.top = value + '%';
    } else {
      obj.style.transform = 'translate3d(0px, '+value+'%, 0px)';
    }

    if (time === interval) {
      cancelAnimationFrame(step);

      fn && fn.call(obj);
    } else {
      requestAnimationFrame(step);
    }
  };
  step();
};

function getStyle(obj, name) {
  return obj.currentStyle ? obj.currentStyle[name] : getComputedStyle(obj, false)[name];
};

function nowTime() {
  return new Date().getTime();
};

function ifIe() { // IE10 以下
  if(navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<10){
      return true;
    }
};

//
(function() {  
    var lastTime = 0;  
    var vendors = ['webkit', 'moz','o','ms'];  
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {  
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];  
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||     
            window[vendors[x] + 'CancelRequestAnimationFrame'];  
    }  
    if (!window.requestAnimationFrame) {  
        window.requestAnimationFrame = function(callback, element) {  
            var currTime = new Date().getTime();  
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));  
            var id = window.setTimeout(function() {  
                callback(currTime + timeToCall);  
            }, timeToCall);  
            lastTime = currTime + timeToCall;  
            return id;  
        };  
    }  
    if (!window.cancelAnimationFrame) {  
        window.cancelAnimationFrame = function(id) {  
            clearTimeout(id);  
        };  
    }  
}()); 

