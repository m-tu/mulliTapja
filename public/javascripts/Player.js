/**
 * Created by martenhennoch on 28/07/14.
 */

var Player = function(x, y){
	this.x = x;
	this.y = y;
	this.lives = CONFIG.limit;
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
}