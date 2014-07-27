/**
 * Created by martenhennoch on 22/06/14.
 */
var canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d"),
		w=canvas.width,
		h=canvas.height;

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var CONFIG = {
	initialHp : 300,
	playerHeight: 10,
	playerWidth: 60,
	enemySpawnSpeed: 1000,
	enemySpeed: 1.5,
	playerMoveSpeed: 5,
	enemyRadius: 20,
	enemyHP: 2,
	limit: 10,
	colors : ["red", "blue", "green", "purple", "pink", "yellow"]
};

var players = [],
		projectiles = [],
		enemies = [],
		keyMap = {};

var limit = CONFIG.limit;
/*** PLAYER ****/

var Player = function(x, y){
	this.x = x;
	this.y = y;
	this.hp = CONFIG.initialHp;
	this.score = 0;
};

Player.prototype.moveLeft = function(){
	if(this.x - CONFIG.playerMoveSpeed > 0)
		this.x -= CONFIG.playerMoveSpeed;
};

Player.prototype.moveRight = function(){
	if(this.x + CONFIG.playerMoveSpeed < w - CONFIG.playerWidth)
		this.x += CONFIG.playerMoveSpeed;
};

Player.prototype.moveUp = function(){
	if(this.y - CONFIG.playerMoveSpeed > 0)
		this.y -= CONFIG.playerMoveSpeed;
};

Player.prototype.moveDown = function(){
	if(this.y + CONFIG.playerMoveSpeed < h - CONFIG.playerHeight)
		this.y += CONFIG.playerMoveSpeed;
};

Player.prototype.shoot = function(){
	snd.play();
	var proj = new Projectile(this.x + CONFIG.playerWidth/2, this.y);
	projectiles.push(proj);
};

/*** PROJECTILE ****/

var Projectile = function(x, y){
	this.x = x;
	this.y = y;
	this.destroyed = false;
};

Projectile.prototype.draw = function(){
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.rect(this.x, this.y, 2, 4);
	ctx.fill();
	ctx.closePath();
};

Projectile.prototype.destroy = function(){
	this.destroyed = true;
};

Projectile.prototype.detectColision = function(){
	var that = this;
	if(!this.destroyed) {
		enemies.forEach(function(enemy){
			if(Math.pow(that.x - enemy.x, 2) + Math.pow(that.y - enemy.y, 2) <=  Math.pow(enemy.r, 2)){  // or <
				enemy.destroy();
				that.destroy();
				return true;
			}
		});
	}
};

/*** ENEMY ****/

var Enemy = function(x, y, color, speed){
	this.x = x;
	this.y = y;
	this.r = CONFIG.enemyRadius;
	this.hp = CONFIG.enemyHP;
	this.speed = speed;
	this.destroyed = false;
	this.color = color;
};

Enemy.prototype.draw = function(){
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI, true);
	ctx.fill();
	ctx.closePath();
};

Enemy.prototype.destroy = function(){
	this.destroyed = true;;
	players[0].score++;
	if(players[0].score % 10 === 0){
		CONFIG.enemySpeed += 0.6;
	}
	document.getElementById('killed').textContent = players[0].score;
};

function getRandomArbitrary(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var maxEnemy = 100;

function startGeneratingEnemies(){
	var count = 0;
	var spawner = setInterval(function(){
		if(count < maxEnemy){
			var r = CONFIG.enemyRadius;
			var initialEnemyPositionX = getRandomArbitrary(r, w - r);
			var enemy = new Enemy(initialEnemyPositionX, 0, CONFIG.colors[getRandomArbitrary(0, CONFIG.colors.length - 1)], CONFIG.enemySpeed);
			enemies.push(enemy);
			count++;
		}
	}, CONFIG.enemySpawnSpeed);

	return spawner;
}

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
	ctx.clearRect(0, 0, w, h);
	drawBorders();

	var p = players[0];

	if(keyMap[65]) {
		p.moveLeft();
	} else if(keyMap[68]) {
		p.moveRight();
	} else if(keyMap[87]) {
		p.moveUp();
	} else if(keyMap[83]){
		p.moveDown();
	}

//	if(keyMap[32]){
//		p.shoot();
//	}

	projectiles.forEach(function(bullet){
		bullet.detectColision();
 		bullet.y -= 3;
		if(bullet.y > 0) {
			if(!bullet.destroyed){
				bullet.draw();
			} else {
				projectiles.splice(projectiles.indexOf(bullet), 1);
			}
		} else {
			projectiles.splice(projectiles.indexOf(bullet), 1);
		}
	});
	enemies.forEach(function(enemy){
		enemy.y += enemy.speed;
		if(enemy.y >= h - CONFIG.enemyRadius){
			enemies.splice(enemies.indexOf(enemy), 1);
			limit--;
			document.getElementById('canMiss').textContent = limit;
			if(limit == 0){
				//gaeeeemu overuuu
				clearInterval(spawner);
				console.log("GAME OVER!");
			}
		} else {
			if(!enemy.destroyed) {
				enemy.draw();
			} else {
				enemies.splice(enemies.indexOf(enemy), 1);
			}
		}
	});
//	console.log("enemies; ", enemies.length);
	players.forEach(drawPlayer);
	requestAnimationFrame(update);
}

function drawPlayer(player){
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.rect(player.x,player.y, CONFIG.playerWidth, CONFIG.playerHeight);
	ctx.fill();
	ctx.closePath();
}

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
		players[0].shoot();
	}
});

var spawner;
var snd = new Audio("/sound/pew.ogg");

(function init(){
	var player1 = new Player(w/2, h - CONFIG.playerHeight);
	players.push(player1);
	spawner = startGeneratingEnemies();

	requestAnimationFrame(update);
})();

