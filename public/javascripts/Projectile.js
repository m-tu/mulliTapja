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
	ctx.rect(this.x, this.y, 3, 4);
	ctx.fill();
	ctx.closePath();
};

Projectile.prototype.destroy = function(){
	this.destroyed = true;
};

Projectile.prototype.move = function() {
	this.y -= 3;
};

Projectile.prototype.detectColision = function(game){
	var that = this;
	if(!this.destroyed) {
		game.enemies.forEach(function(enemy){
			if(!enemy.destroyed && that._doesProjectileIntersectEnemy(that, enemy)){
				enemy.destroy();
				that.destroy();
			}
		});
		game.drops.forEach(function(drop){
			if(!drop.destroyed && that._doesProjectileIntersectDrop(that, drop)){
				drop.destroyAndActivate();
				that.destroy();
			}
		});
	}
};

Projectile.prototype._doesProjectileIntersectEnemy = function(bullet, enemy){
	return Math.pow(bullet.x - enemy.x, 2) + Math.pow(bullet.y - enemy.y, 2) <=  Math.pow(enemy.r, 2);
};

Projectile.prototype._doesProjectileIntersectDrop = function(bullet, drop){
	return (this.x >= drop.x && this.x <= drop.x + drop.w) && (this.y >= drop.y && this.y <= drop.y + drop.h);
};
