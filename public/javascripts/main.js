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
	} else if(keyMap[87]) {
		p.moveUp();
	} else if(keyMap[83]){
		p.moveDown();
	}

	game.projectiles.forEach(function(bullet){
		bullet.detectColision(game);
 		bullet.move();

		if(bullet.y > 0) {
			if(!bullet.destroyed){
				bullet.draw();
			} else {
				game.projectiles.splice(game.projectiles.indexOf(bullet), 1); //TODO Fix  can probably set to destroyed and just go over it and filter them out after each level
			}
		} else {
			game.projectiles.splice(game.projectiles.indexOf(bullet), 1);
		}
	});

	game.enemies.forEach(function(enemy){
		enemy.y += enemy.speed;
		if(enemy.isOutOfBounds() && !enemy.destroyed){
			enemy.destroyed = true;
			if(p.lives !== 0) {
				p.lives--;
				document.getElementById('canMiss').textContent = p.lives;
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

	//todo finish
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
						r = CONFIG.enemyRadius; //TODO get from lvl data

		var initialEnemyPositionX = getRandomArbitrary(r, w - r);

		var enemyType,
				random = Math.random();

		if(random <= 0.7){
			enemyType = TYPES.blue;
		} else if(random >= 0.7 && random <= 0.9) {
			enemyType = TYPES.red;
		} else if(random >= 0.9) {
			enemyType = TYPES.purple;
		}
		var enemy = new Enemy(initialEnemyPositionX, 0, enemyType, level);
		game.enemies.push(enemy);

		if(game.enemies.length % game.enemiesPerLevel === 0) {
			game.stopSpawningEnemies();
			if(game.level < game.maxLevel){
				game.level++;
				document.getElementById('level').textContent = game.level;

				var checkIfLevelCleared = setInterval(function(){
					if(game.isLevelClear()){
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
