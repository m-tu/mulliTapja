/**
 * Created by martenhennoch on 22/06/14.
 */
var canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d"),
		w=canvas.width,
		h=canvas.height;

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var keyMap = {};

var limit = CONFIG.limit;

function drawBorders() {
	ctx.beginPath();
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
 		bullet.y -= 3;
		if(bullet.y > 0) {
			if(!bullet.destroyed){
				bullet.draw();
			} else {
				game.projectiles.splice(game.projectiles.indexOf(bullet), 1);
			}
		} else {
			game.projectiles.splice(game.projectiles.indexOf(bullet), 1);
		}
	});

	game.enemies.forEach(function(enemy){
		enemy.y += enemy.speed;
		if(enemy.y >= h - CONFIG.enemyRadius){
			game.enemies.splice(game.enemies.indexOf(enemy), 1);
			limit--;
			document.getElementById('canMiss').textContent = limit;
			if(limit == 0){
				//gaeeeemu overuuu
				clearInterval(game.spawner);
				console.log("GAME OVER!");
			}
		} else {
			if(!enemy.destroyed) {
				enemy.draw();
			} else {
				game.enemies.splice(game.enemies.indexOf(enemy), 1);
			}
		}
	});

	game.players.forEach(drawPlayer);
	requestAnimationFrame(update);
}

function drawPlayer(player){
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.rect(player.x,player.y, CONFIG.playerWidth, CONFIG.playerHeight);
	ctx.fill();
	ctx.closePath();
}

function startSpawningEnemies(){
	var count = 0;
	var spawner = setInterval(function(){
		if(count < CONFIG.maxEnemies){
			var r = CONFIG.enemyRadius;
			var initialEnemyPositionX = getRandomArbitrary(r, w - r);
			var enemy = new Enemy(initialEnemyPositionX, 0, CONFIG.colors[getRandomArbitrary(0, CONFIG.colors.length - 1)], CONFIG.enemySpeed);
			game.enemies.push(enemy);
			count++;
		}
	}, CONFIG.enemySpawnSpeed);
	this.spawner = spawner;
};

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

(function init(){
	var player1 = new Player(w/2, h - CONFIG.playerHeight);

	game = new Game();
	game.addPlayer(player1);

	startSpawningEnemies();

	requestAnimationFrame(update);
})();

