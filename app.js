var app = new Vue({
	el: "#app",
	data: {
		bricks: 3,
		speed: 250,
		startbtn: {
			text: "Start",
			on: false,
			visible: true
		},
		counter: 0,
		towers: {},
		sequence: []
	},
	methods: {
		init: function() {
			app.towers = app.getData();
			app.counter = 0;
			app.startbtn.visible = true;
			app.startbtn.on = false;
			app.startbtn.text = "Start";
			app.hanoi();
		},
		addBrick: function() {
			app.bricks < 10 ? app.bricks++ : 10;
			app.init();
		},
		removeBrick: function() {
			app.bricks > 2 ? app.bricks-- : 2;
			app.init();
		},
		onStart: function() {
			app.startbtn.on = !app.startbtn.on;
			app.startbtn.text = app.startbtn.on ? "Pause" : "Resume";

			var loop = setInterval(function() {
				if (!app.startbtn.on) {
					clearInterval(loop);
					return false;
				}

				if (app.counter >= app.sequence.length) {
					app.startbtn.visible = false;
					clearInterval(loop);
					return false;
				}

				var step = JSON.parse(app.sequence[app.counter]);

				for (var key in step) {
					app.towers[key] = step[key];
				}

				app.counter++;
			}, app.speed);
		},
		getData: function() {
			return {
				a: Array.apply(null, { length: app.bricks }).map(Function.call, Number),
				b: [],
				c: []
			};
		},
		hanoi: function() {
			var data = app.getData();
			app.sequence = [];

			var move = function(n, a, c, b) {
				if (n == 0) return;
				move(n - 1, a, b, c);
				c.push(a.pop());
				app.sequence.push(JSON.stringify(data));
				move(n - 1, b, c, a);
			};

			move(data.a.length, data.a, data.c, data.b);
		}
	}

});

app.init();