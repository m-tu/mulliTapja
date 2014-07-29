/**
 * Created by martenhennoch on 28/07/14.
 */

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
	game.projectiles.push(proj);
};