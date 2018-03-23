import {initialAnimation, detailPageAnimation} from './initialAnimation';
const hoverPerspectiveAnimation = require('./hoverPerspectiveAnimation');

if (!localStorage.getItem('visited')) {
	initialAnimation();
	localStorage.setItem('visited', true);
}

if (document.querySelectorAll('#black_stripe')[0]) {
	detailPageAnimation();
}

hoverPerspectiveAnimation();

// Promise.all([
// 	module.import('./initialAnimation'),
// 	module.import('/hoverPerspectiveAnimation')
// ]).then(function (modules) {
// 	init()
// });

// function init() {
// 	if (!localStorage.getItem("visited")) {
// 		initialAnimation()
// 		localStorage.setItem("visited", true);
// 	}
// 	if (document.querySelectorAll('#black_stripe')[0]) {
// 		detailPageAnimation()
// 	}
// 	hoverPerspectiveAnimation();
// }