/**
 * Created by martenhennoch on 28/07/14.
 */

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
	this.destroyed = true;
	game.players[0].score++;
	if(game.players[0].score % 10 === 0){
		CONFIG.enemySpeed += 0.6;
	}
	document.getElementById('killed').textContent = game.players[0].score;
};
