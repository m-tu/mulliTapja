/**
 * Created by martenhennoch on 30/07/14.
 */

//faster movespeed
//slow down enemies
//extra lives
//2 weapons | complicated
//destroy all visible enemies
//

var Drop = function(x, y, color, hp, duration, logic, resetLogic){
	this.x = x;
	this.y = y;
	this.w = 40;
	this.h = 40;
	this.color = color;
	this.hp = hp;
	this.duration = duration;
	this.logic = logic;
	this.resetLogic = resetLogic;
	this.speed = 2;
	this.deActivationTimer = null;
	this.destroyed = false;
};

Drop.prototype.activate = function(){
//	if(this.hp <= 0) {
		this.logic();
		game.currentDrop = this;
//	}
};

Drop.prototype.deActivate = function(){
	game.currentDrop.resetLogic();
	game.isDropActive = false;
};

Drop.prototype.startDeActivationTimer = function(){
	this.deActivationTimer = setTimeout(this.deActivate, this.duration);
};

Drop.prototype.draw = function(){
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.rect(this.x, this.y, this.w, this.h);
	ctx.fill();
	ctx.closePath();
};

Drop.prototype.isDestroyed = function(){
	return this.destroyed;
};

Drop.prototype.isOutOfBounds = function(){
	return this.y >= h - this.h / 2;
};

Drop.prototype.destroy = function(){
	this.destroyed = true;
};

Drop.prototype.destroyAndActivate = function(){
	this.destroy();
	this.activate();
	this.startDeActivationTimer();
};






