/**
 * Created by martenhennoch on 28/07/14.
 */

var TYPES = {
	blue : {
		radius: 20,
		speed : 1.6,
		color : "blue",
		score : 100
	},
	red : {
		radius: 15,
		speed: 2,
		color: "red",
		score : 150
	},
	purple : {
		radius: 10,
		speed: 2.6,
		color: "purple",
		score : 200
	}
};

var Enemy = function(x, y, type, level){
	this.x = x;
	this.y = y;
	this.r = type.radius;
//	this.hp = CONFIG.enemyHP;
	this.score = type.score;
	this.speed = type.speed * level.speedMultiplier;
	this.destroyed = false;
	this.color = type.color;
};

Enemy.prototype.draw = function(){
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI, true);
	ctx.fill();
	ctx.closePath();
};

Enemy.prototype.destroy = function(){
	this.destroyed = true;
	game.players[0].score += this.score;

	game.players[0].shouldSpawnDrop();

	document.getElementById('killed').textContent = game.players[0].score;
};

Enemy.prototype.isOutOfBounds = function(){
	return this.y >= h - this.r;
};
