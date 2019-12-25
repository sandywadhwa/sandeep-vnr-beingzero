function Colour(r, g, b, a) {
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;

	this.toString = function () {
		return "rgba(" + this.r + "," + this.g + "," + this.b + ", " + this.a + ")";
	}
}

function Circle() {
	this.x;
	this.y;
	this.radius;
	this.xMovementStep;
	this.yMovementStep;
	this.colour;
	this._isFading = false;
	this._fullyFaded = false;

	this.move = function () {
		this.x += this.xMovementStep;
		this.y += this.yMovementStep;
	}

	this.draw = function (context) {
		// increase radius
		//this.radius *= 1.04;
		this.radius += 0.5;

		// Fading...
		if (this._isFading)
			this._performFade();

		context.fillStyle = this.colour.toString();
		context.beginPath();
		// x, y, radius, start angle, end angle, anticlockwise?
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		context.closePath();
		context.fill();
	}

	this.fadeOut = function () {
		this._isFading = true;
	}

	this.hasFaded = function () {
		return this._fullyFaded;
	}

	this._performFade = function () {
		if (this.colour.a > 0) {
			this.colour.a = Math.round((this.colour.a - 0.04) * 100) / 100;
		} else {
			this.colour.a = 0;
			this._fullyFaded = true;
		}
	}
}

$(function () {
	var generating = false;
	var audioPlaying = false;

	var canvas = $("#canvas");
	var context = canvas.get(0).getContext("2d");
	var canvasWidth, canvasHeight;
	var circles = [];

	// Canvas sizing
	function resizeCanvas() {
		//        canvas.attr({ height: $(window).height(), width: $(window).width() });
		//        canvasWidth = canvas.width();
		//        canvasHeight = canvas.height();
		canvasWidth = canvas.width();
		canvasHeight = canvas.height();
	}


	function randomColour() {
		var r = randomFromTo(20, 80);
		var g = randomFromTo(30, 120);
		var b = randomFromTo(40, 120);
		return new Colour(r, g, b, 0.5);
	}

	function generateCircle() {
		var circle = new Circle();

		circle.colour = randomColour();

		circle.xMovementStep = randomFromTo(-6, 6);
		circle.yMovementStep = randomFromTo(-6, 6);

		circle.radius = randomFromTo(1, 6);
		circle.x = Math.floor(canvasWidth / 2);
		circle.y = Math.floor(canvasHeight / 2);

		return circle;
	}

	function generateCircles(count) {
		for (var i = 0; i < count; i++) {
			circles.push(generateCircle());
		}
	}

	function clearCanvas() {
		context.clearRect(0, 0, canvasWidth, canvasHeight);
	}

	// Fade all circles away immediately
	function fadeAllCircles() {
		for (var i in circles) {
			var circle = circles[i];
			circle.fadeOut();
		}
	}

	function startAll() {
		generating = true;
		generateCircles(30);
	}

	function animateCircles() {
		if (circles.length == 0) return;  // Do nothing if there is nothing to do ;)

		clearCanvas();
		for (var i = 0; i < circles.length; i++) {
			var circle = circles[i];

			circle.move();
			circle.draw(context);

			// Pre-calculate some stuff so we don't do it more than once
			var xLeftEdge = yTopEdge = /* 0 + */circle.radius;
			var xRightEdge = canvasWidth - circle.radius;
			var yBottomEdge = canvasHeight - circle.radius;

			if (circle.x >= xRightEdge || circle.x <= xLeftEdge ||
				circle.y >= yBottomEdge || circle.y <= yTopEdge ||
				circle.hasFaded()) {
				// Kill old ones right at the edge (or those fully faded):
				// remove this circle and decrement i (so we don't skip anything)
				circles.splice(i, 1);
				i--;

				if (generating)
					circles.push(generateCircle());
			} else if (circle.x >= (xRightEdge - 60) || circle.x <= (xLeftEdge + 60) ||
					   circle.y >= (yBottomEdge - 60) || circle.y <= (yTopEdge + 60)) {
				// Start the fading of nearly-old ones getting near the edge
				circle.fadeOut();
			}
		}
	}

	$(window).resize(resizeCanvas);

	// Init
  
	resizeCanvas();
	startAll();
	setInterval(function () {
		animateCircles();
	}, 50);
});

// Generate a random number between the lowest and highest (inclusive)
function randomFromTo(from, to) {
	return Math.floor(Math.random() * (to - from + 1) + from);
}

