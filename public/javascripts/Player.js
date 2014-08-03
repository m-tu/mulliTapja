/**
 * Created by martenhennoch on 28/07/14.
 */

var Player = function(x, y){
	this.x = x;
	this.y = y;
	this.lives = CONFIG.limit;
	this.score = 0;
	this.speed = CONFIG.playerMoveSpeed;
	this.dropActive = false;
};

Player.prototype.moveLeft = function(){
	if(this.x - this.speed > 0)
		this.x -= this.speed;
};

Player.prototype.moveRight = function(){
	if(this.x + this.speed < w - CONFIG.playerWidth)
		this.x += this.speed;
};

//Player.prototype.moveUp = function(){
//	if(this.y - this.speed > 0)
//		this.y -= this.speed;
//};
//
//Player.prototype.moveDown = function(){
//	if(this.y + this.speed < h - CONFIG.playerHeight)
//		this.y += this.speed;
//};

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
	console.log("game", !game.isDropActive);
	if(!game.isDropActive){
//		var total = game.level * game.enemiesPerLevel;
		var rand = Math.random();
		//TODO total - game.enemies.length + game.enemiesPerLevel / 4 < game.enemies.length
		if(rand > 0.1) { //TODO random spawn loc, make sure something spawns
			game.drops.push(new Drop(w/2, 0, "black", 5, 10000,
				function(){
					console.log("speed updated");
					game.players[0].speed += 5;
				},
				function(){
					console.log("speed reset");
					game.players[0].speed -= 5;
				}
			));
			game.isDropActive = true;
			console.log("drop spawned");
		}
	}
};