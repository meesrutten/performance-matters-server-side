function hoverPerspectiveAnimation() {

	const button = document.querySelectorAll('[data-type="timeline-info"] .creatorWork'),
		label = document.querySelectorAll('[data-type="timeline-info"] .creatorWork h2');

	let mouseOutTween;// set on mouse-out

	TweenMax.set([button, label], { transformPerspective: 700 });
	button.forEach((el) => {
		el.addEventListener('click', function (e) {
			let rect = el.getBoundingClientRect(),
				x = e.clientX - rect.left,
				y = e.clientY - rect.top,
				hit = { x: x, y: y, radius: 1, alpha: 1 };

			TweenMax.to(hit, 0.5, { radius: 200, alpha: 0, ease: Power1.easeOut });

		});

		el.addEventListener('mousemove', function (e) {
			let rect = el.getBoundingClientRect(),
				x = e.clientX - rect.left,
				y = e.clientY - rect.top,
				rx = -(y / rect.height) + 0.5,
				ry = (x / rect.width) - 0.5,
				rMax = 30;

			TweenMax.to(el, 0.1, { rotationX: rx * rMax, rotationY: ry * rMax });
		});

		el.addEventListener('mouseout', function (e) {
			if (mouseOutTween) mouseOutTween.kill();
			mouseOutTween = TweenMax.to(el, 0.25, { delay: 0.25, rotationX: 0, rotationY: 0 });
		});

	});
}

module.exports = hoverPerspectiveAnimation;