// 
// Replace 'no-js' with 'js' on the html tag
// ================
(function(e){e.className=e.className.replace(/\bno-js\b/,'js')})(document.documentElement)



//
// SVG Sprite Loader
// ================
var svgAjax = new XMLHttpRequest(), svgDiv;
	svgAjax.open("GET", "img/svg/defs/symbol-defs.svg", true);
	svgAjax.send();
	svgAjax.onload = function(e) {
		svgDiv = document.createElement("div");
		svgDiv.innerHTML = svgAjax.responseText;
		svgDiv.style.display = 'none';
		document.body.insertBefore(svgDiv, document.body.childNodes[0]);
	};



//
// Focus-within Support Script loader
// ================
!function() {
  var elem = document.createElement('br');
  
  try {
      elem.querySelector(":focus-within")
    } catch (e) {
      var scriptTag = document.createElement("script");
      // add type, src to picturefill and async tag
      scriptTag.type = "text/javascript", scriptTag.src = "pf.min.js",  scriptTag.setAttribute("async", "");
      // get the head tag
      var headTag = document.getElementsByTagName("head")[0];
      // append script to head tag
      headTag.appendChild(scriptTag)
    }
}();



//
// Picturefill Support Script Loader
// ================
!function() {
  // create img tag to test for responsive image support
  // test for srcset and sizes in image tag
    var img = document.createElement("img"),
        test = "srcset" in a && "sizes" in a;
  
  // if false load polyfill for responsive images
    if (!test) {
    // create script tag
        var scriptTag = document.createElement("script");
    // add type, src to picturefill and async tag
        scriptTag.type = "text/javascript", scriptTag.src = "pf.min.js", scriptTag.setAttribute("async", "");
        // get the head tag
    var headTag = document.getElementsByTagName("head")[0];
    // append script to head tag
        headTag.appendChild(scriptTag)
    }
}();


//
// Debounce
//
// Example usage: 
// functionName(){ ... };
// elem.addEventListener('resize', debounce(functionName, 100));
// ================
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};



//
// Throttle
//
// Example usage: 
// functionName(){ ... };
// elem.addEventListener('resize', throttle(functionName, 100));
// ================
function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last,
      deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date,
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}



// 
// Find all elements in a container that are focusable
//
// Accepts: DOM-Element as arguement
// Returns: Object containing "all", "first" and "last" focusable elements found inside the target element
// ================
var getFocusableElements = function(element) {
    var focusElemString = "a[href],button:not([disabled]),area[href],input:not([disabled]):not([type=hidden]),select:not([disabled]),textarea:not([disabled]),iframe,object,embed,*:not(.is-draggabe)[tabindex],*[contenteditable]";
    var tempElements = element.querySelectorAll(focusElemString);
    tempElements = Array.prototype.slice.call(tempElements);
    var focusableElements = [];

    for (var i = 0; i < tempElements.length; i++) {
      if(tempElements[i].offsetHeight !== 0) focusableElements.push(tempElements[i])
    };

    var object = {
      "all": focusableElements,
      "first": focusableElements[0],
      "last": focusableElements[focusableElements.length-1]
    }

    return object;
}



// 
// Trap tabKey inside of container.
// When focus is on first element and shift+tab is pressed focus is set to the last element.
// When focus is on last element and tab is pressed focus is set to the first element.
//
// Example usage of trapTabKey:
// element.addEventListener('keydown', function (e) {
//   trapTabKey(target);
// }, false);
//
// Accepts: DOM-Element as arguement
// ================
var trapTabKey = function(container) {
    var activeElm = document.activeElement;
    var focusObj = getFocusableElements(container);

    if (event.keyCode !== 9) return false
    	
    if (event.shiftKey && activeElm === focusObj.first) {
        focusObj.last.focus();
        event.preventDefault();
    } else if (!event.shiftKey && activeElm === focusObj.last) {
        focusObj.first.focus();
        event.preventDefault();
    }
}



/**
 * Get the closest matching element up the DOM tree.
 * @private
 * @param  {Element} elem     Starting element
 * @param  {String}  selector Selector to match against
 * @return {Boolean|Element}  Returns null if not match found
 */
var getClosest = function ( elem, selector ) {

    // Element.matches() polyfill
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function(s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
    }

    // Get closest match
    for ( ; elem && elem !== document; elem = elem.parentNode ) {
        if ( elem.matches( selector ) ) return elem;
    }

    return null;

};