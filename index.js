'use strict';

let steps       = [];
let currentStep = null;

function nextStep () {
	if (!(currentStep = steps.shift())) {
		return;
	}
	currentStep.start();
}

function write(str) {
	process.stdout.write("\x1b[7m" + str + "\x1b[0m\n");
}

// ==================

steps.push({
	start() {
		write('2+3=?');
	},
	got(ans) {
		if (ans == '5') {
			write('Correct!');
			nextStep();
		} else {
			write('Try again');
		}
	}
});

steps.push({
	start() {
		write('Cong!');
		nextStep();
	}
});

// ==================

process.stdin.on('data', raw => {
	let text = (new Buffer(raw)).toString().trim().replace(/[\r\n]/g, '');
	currentStep && currentStep.got(text);
});

steps.push({
	start() {
		process.exit();
	}
});

nextStep();
