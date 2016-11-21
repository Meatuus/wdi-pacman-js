// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;
var dots = 240;

// Define your ghosts here
var inky = {
	menu_option: '1',
	name: 'Inky',
	color: 'Red',
	character: 'Shadow',
	edible: false
};

var blinky = {
	menu_option: '2',
	name: 'Blinky',
	color: 'Cyan',
	character: 'Speedy',
	edible: false
};

var pinky = {
	menu_option: '3',
	name: 'Pinky',
	color: 'Pink',
	character: 'Bashful',
	edible: false
};

var clyde = {
	menu_option: '4',
	name: 'Clyde',
	color: 'Orange',
	character: 'Pokey',
	edible: false
};

var ghosts = [inky, blinky, pinky, clyde]

function drawScreen() {
	clearScreen();
	setTimeout(function() {
		displayStats();
		displayDots();
		displayPowerPellets();
		displayMenu();
		displayPrompt();
	}, 10);
};

function clearScreen() {
	console.log('\x1Bc');
};

function displayStats() {
	console.log('Score: ' + score + '     Lives: ' + lives);
};

function displayDots() {
	console.log('\nDots Remaining: ' + dots);
};

function displayPowerPellets() {
	console.log('\nPower-Pellets: ' + powerPellets);
};

function displayMenu() {
	console.log('\nSelect Option:\n');  // each \n creates a new line
	console.log('(d) Eat Dot');
	if (dots > 10) {
		console.log('(t) Eat 10 Dots');
	};
	if (dots > 100) {
		console.log('(h) Eat 100 Dots');
	};
	if (dots > 0) {
		console.log('(a) Eat all remaining Dots');
	};
	console.log('(p) Eat Power-Pellet');
	console.log('(1) Eat Inky ' + '(' + edibleInedible(ghosts[0]) + ')');
	console.log('(2) Eat Blinky ' + '(' + edibleInedible(ghosts[1]) + ')');
	console.log('(3) Eat Pinky ' + '(' + edibleInedible(ghosts[2]) + ')');
	console.log('(4) Eat Clyde ' + '(' + edibleInedible(ghosts[3]) + ')');
	console.log('(q) Quit');
};

function displayPrompt() {
	// process.stdout.write is similar to console.log except it doesn't add a new line after the text
	process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
};

// Menu Options
function eatDot() {
	console.log('\nChomp!');
	score += 10;
	dots--;
};

function eatTenDots() {
	if (dots > 10) {
		console.log('\nChomp!');
		score += 100;
		dots -= 10;
	};
};

function eatHundredDots() {
	if (dots > 100) {
		console.log('\nChomp!');
		score += 1000;
		dots -= 100;
	};
};

function eatRemainingDots() {
	if (dots > 0) {
		console.log('\nChomp!');
		score += (dots * 10);
		dots -= dots;
	};
};

function eatGhost(ghost) {
	if (ghost.edible === false) {
	lives--;
	console.log('\n ' + ghost.name + ' kills Pac-Man!');
} else {
	score += 200;
	console.log('\n ' + ghost.name + ' has just been eaten!');
	ghost.edible = false;
};
};

function eatPowerPellet() {
	if (powerPellets > 0) {
		score += 50;
		powerPellets--;
		ghostsEdible();
	} else {
		console.log('\nThere are no more Power-Pellets.');
	};
};

function ghostsEdible() {
	for (var i = 0; i < ghosts.length; i++) {
		ghosts[i].edible = true;
	};
};

function edibleInedible(ghost) {
	if (ghost.edible === true) {
		return "edible";
	} else {
		return "inedible";
	};
};
// Process Player's Input
function processInput(key) {
	switch(key) {
		case '\u0003': // This makes it so CTRL-C will quit the program
		case 'q':
			process.exit();
			break;
		case 'd':
			eatDot();
			break;
		case 't':
			eatTenDots();
			break;
		case 'h':
			eatHundredDots();
			break;
		case 'a':
			eatRemainingDots();
			break;
		case 'p':
			eatPowerPellet();
			break;
		case '1':
			eatGhost(inky);
			livesCheck(lives);
			break;
		case '2':
			eatGhost(blinky);
			livesCheck(lives);
			break;
		case '3':
			eatGhost(pinky);
			livesCheck(lives);
			break;
		case '4':
			eatGhost(clyde);
			livesCheck(lives);
			break;
		default:
			console.log('\nInvalid Command!');
	};
};
function livesCheck(lives) {
	if (lives < 0) {
		process.exit();
	};
};
//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
	process.stdout.write(key);
	processInput(key);
	setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
	console.log('\n\nGame Over!\n');
});
