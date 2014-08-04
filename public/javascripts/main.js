/**
 * Created by martenhennoch on 22/06/14.
 */

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var keyMap = {};

function drawBorders() {
	ctx.beginPath();
	ctx.lineWidth = 3;
	ctx.moveTo(0, 0);

	ctx.lineTo(w, 0);
	ctx.lineTo(w, h);
	ctx.lineTo(0, h);
	ctx.lineTo(0, 0);

	ctx.stroke();
	ctx.closePath();
}

function update() {
	ctx.clearRect(0, 0, w , h);
	drawBorders();
	var p = game.players[0];

	if(keyMap[65]) {
		p.moveLeft();
	} else if(keyMap[68]) {
		p.moveRight();
	}

	game.projectiles.forEach(function(bullet){
		bullet.detectColision(game);
 		bullet.move();

		if(bullet.y > 0) {
			if(!bullet.destroyed){
				bullet.draw();
			}
		} else {
			bullet.destroy();
		}
	});

	game.enemies.forEach(function(enemy){
		enemy.y += enemy.speed;
		if(enemy.isOutOfBounds() && !enemy.destroyed){
			enemy.destroyed = true;
			if(p.lives !== 0) {
				p.updateLives();
			}
			if(p.lives === 0) {
				game.end(false);
			}
		} else {
			if(!enemy.destroyed) {
				enemy.draw();
			}
		}
	});

	game.drops.forEach(function(drop){
		drop.y += drop.speed;
		if(!drop.destroyed && drop.isOutOfBounds()){
			drop.destroy();
		} else {
			if(!drop.destroyed){
				drop.draw();
			}
		}
	});

	game.drawPlayers();
	if(p.lives != 0) {
		requestAnimationFrame(update);
	}
}

function startSpawningEnemies(){
	var spawner = setInterval(function(){
		var level = game.getLevel(),
				enemyType,
				random = Math.random();

		if(random <= 0.7){
			enemyType = TYPES.blue;
		} else if(random >= 0.7 && random <= 0.9) {
			enemyType = TYPES.red;
		} else if(random >= 0.9) {
			enemyType = TYPES.purple;
		}

		var minx =  Math.round((CONFIG.playerWidth - 7) / 2) + 2;
		var initialEnemyPositionX = getRandomArbitrary(minx, w - minx);
		game.enemies.push(new Enemy(initialEnemyPositionX, 0, enemyType, level));

		if(game.enemies.length % game.enemiesPerLevel === 0) {
			game.stopSpawningEnemies();
			if(game.level < game.maxLevel){
				game.updateLevel();
				var checkIfLevelCleared = setInterval(function(){
					if(game.isLevelClear()){
						console.log("bullets at the end: ", game.projectiles.length);
						game.resetAfterLevel();
						clearInterval(checkIfLevelCleared);
						displayLevelSummary();
					}
				}, 100);
			} else {
				game.end(true);
			}
		}
	}, game.enemySpawnSpeed);
	game.enemySpawner = spawner;
};

function displayLevelSummary(){
	$("#continue").show();
	$("#levelInfo").show();
}

$("#startGame").click(function(){
	$("#levelInfo").fadeOut(400, function(){
		init();
	});
});

$("#continue").click(function(){
	$("#levelInfo").fadeOut(400, function(){
		startSpawningEnemies();
	});
});

window.addEventListener('keydown', function(event){
	if(!(event.keyCode == 32)) {
		keyMap[event.keyCode] = true;
	}
});

window.addEventListener('keyup', function(event){
	if(!(event.keyCode == 32)) {
		keyMap[event.keyCode] = false;
	}
	if(event.keyCode == 32){
		game.players[0].shoot();
	}
});

function init(){
	var player1 = new Player(w/2, h - CONFIG.playerHeight);
	game = new Game();
	game.addPlayer(player1);
	startSpawningEnemies();
	requestAnimationFrame(update);
};

drawBorders();
