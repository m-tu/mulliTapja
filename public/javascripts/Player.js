/**
 * Created by martenhennoch on 28/07/14.
 */

var Player = function(x, y, name){
	this.x = x;
	this.y = y;
	this.lives = CONFIG.limit;
	this.score = 0;
	this.speed = CONFIG.playerMoveSpeed;
	this.dropActive = false;
	this.name = name;
};

Player.prototype.moveLeft = function(){
	if(this.x - this.speed > 0)
		this.x -= this.speed;
};

Player.prototype.moveRight = function(){
	if(this.x + this.speed < w - CONFIG.playerWidth)
		this.x += this.speed;
};

Player.prototype.shoot = function(){
//	snd.play();
	var proj = new Projectile(this.x + Math.round((CONFIG.playerWidth - 7) / 2) + 2, this.y);
	game.projectiles.push(proj);
};

Player.prototype.draw = function (){
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.rect(this.x, this.y, CONFIG.playerWidth, CONFIG.playerHeight);
	ctx.rect(this.x + Math.round((CONFIG.playerWidth - 7) / 2), this.y - 4, 7, 4);
	ctx.fill();
	ctx.closePath();
};

Player.prototype.shouldSpawnDrop = function(){
	if(!game.isDropActive){
		var rand = Math.random();
		//TODO total - game.enemies.length + game.enemiesPerLevel / 4 < game.enemies.length
		if(rand > 0.1) { //TODO random spawn loc, make sure something spawns
			game.drops.push(new Drop(w/2, 0, "black", 5, 10000,
				function(){
					game.players[0].speed += 1;
				},
				function(){
					game.players[0].speed -= 1;
				}
			));
			game.isDropActive = true;
		}
	}
};

Player.prototype.updateLives = function(){
	this.lives--;
	game.dom.lives.textContent = this.lives;
};