/**
 * Created by martenhennoch on 28/07/14.
 */

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

Projectile.prototype.detectColision = function(game){
	var that = this;
	if(!this.destroyed) {
		game.enemies.forEach(function(enemy){
			if(Math.pow(that.x - enemy.x, 2) + Math.pow(that.y - enemy.y, 2) <=  Math.pow(enemy.r, 2)){
				enemy.destroy();
				that.destroy();
				return true;
			}
		});
	}
};
