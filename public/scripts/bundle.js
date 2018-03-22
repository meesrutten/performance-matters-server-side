(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";

var _initialAnimation = require("./initialAnimation");

var _hoverPerspectiveAnimation = require("./hoverPerspectiveAnimation");

var _hoverPerspectiveAnimation2 = _interopRequireDefault(_hoverPerspectiveAnimation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!localStorage.getItem("visited")) {
	(0, _initialAnimation.initialAnimation)();
	localStorage.setItem("visited", true);
}

if (document.querySelectorAll('#black_stripe')[0]) {
	(0, _initialAnimation.detailPageAnimation)();
}

(0, _hoverPerspectiveAnimation2.default)();

},{"./hoverPerspectiveAnimation":3,"./initialAnimation":4}],2:[function(require,module,exports){
'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./app":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
function hoverPerspectiveAnimation() {

	var TWO_PI = Math.PI * 2;

	var button = document.querySelectorAll('[data-type="timeline-info"] .creatorWork'),
	    label = document.querySelectorAll('[data-type="timeline-info"] .creatorWork h2');

	var mouseOutTween = void 0; // set on mouse-out

	TweenMax.set([button, label], { transformPerspective: 700 });
	button.forEach(function (el) {
		el.addEventListener('click', function (e) {
			var rect = el.getBoundingClientRect(),
			    x = e.clientX - rect.left,
			    y = e.clientY - rect.top,
			    hit = { x: x, y: y, radius: 1, alpha: 1 };

			TweenMax.to(hit, 0.5, { radius: 200, alpha: 0, ease: Power1.easeOut });
		});

		el.addEventListener('mousemove', function (e) {
			var rect = el.getBoundingClientRect(),
			    x = e.clientX - rect.left,
			    y = e.clientY - rect.top,
			    rx = -(y / rect.height) + 0.5,
			    ry = x / rect.width - 0.5,
			    rMax = 30;

			TweenMax.to(el, 0.1, { rotationX: rx * rMax, rotationY: ry * rMax });
		});

		el.addEventListener('mouseout', function (e) {
			if (mouseOutTween) mouseOutTween.kill();
			mouseOutTween = TweenMax.to(el, 0.25, { delay: 0.25, rotationX: 0, rotationY: 0 });
		});
	});
}

exports.default = hoverPerspectiveAnimation;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
function initialAnimation() {

	var timeline = new TimelineLite();

	var mySplitText = new SplitText("#title", { type: "words,chars" });
	var chars = mySplitText.chars; //an array of all the divs that wrap each character

	timeline.set(chars, { autoAlpha: 0 });
	timeline.set(['.vertical-timeline', '[data-type="timeline-info"] .creatorWork'], { autoAlpha: 0 });

	timeline.staggerTo(chars, 0.8, { autoAlpha: 1 }, .1);

	timeline.to('.vertical-timeline', 1, { autoAlpha: 1 }, 3);
	TweenMax.staggerTo('.creatorWork', 2, { opacity: 1, delay: 1 }, 0.25);

	timeline.play();
}

function detailPageAnimation() {
	var timeline = new TimelineLite();

	var mySplitText = new SplitText("#title", { type: "words,chars" });
	var chars = mySplitText.chars; //an array of all the divs that wrap each character

	timeline.set(chars, { autoAlpha: 0 });
	timeline.set('#black_stripe', { transformOrigin: 'left', width: '1100', height: '300', skewX: '-10deg', x: 0, transform: 'none' });
	timeline.set('[data-type="timeline"]', { autoAlpha: 0 });

	timeline.staggerTo(chars, 0.8, { autoAlpha: 1 }, .1);

	timeline.to("#black_stripe", 1, { x: '100%' }, 2);

	timeline.to('[data-type="timeline"]', 1, { autoAlpha: 1 }, 3);

	timeline.play();
}

exports.initialAnimation = initialAnimation;
exports.detailPageAnimation = detailPageAnimation;
// const io = new IntersectionObserver(
// 	entries => {
// 		console.log(entries);
// 	},
// 	{
// 		/* Using default options. Details below */
// 	}
// );


// // Start observing an element
// io.observe(document.querySelector('[data-type="timeline"]'));

// 	// Stop observing an element
// 	// io.unobserve(element);

// 	// Disable entire IntersectionObserver
// 	// io.disconnect();

},{}]},{},[2]);
