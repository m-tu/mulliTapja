/**
 * Created by martenhennoch on 28/07/14.
 */

var CONFIG = {
	initialHp : 300,
	playerHeight: 10,
	playerWidth: 61,
	enemySpawnSpeed: 1000,
	enemySpeed: 1.5,
	playerMoveSpeed: 5,
	enemyRadius: 20,
	enemyHP: 2,
	limit: 10
};

var snd = {
	play: function() {
		new Audio("/sound/pew.ogg").play();
	}
};

var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	w=canvas.width,
	h=canvas.height;

var game = null;

var LEVELS = {
	"1" : {
		speedMultiplier: 1
	},
	"2": {
		speedMultiplier: 1.2
	},
	"3": {
		speedMultiplier: 1.3
	},
	"4": {
		speedMultiplier: 1.4
	},
	"5": {
		speedMultiplier: 1.5
	},
	"6": {
		speedMultiplier: 1.6
	},
	"7": {
		speedMultiplier: 1.7
	},
	"8": {
		speedMultiplier: 1.8
	},
	"9": {
		speedMultiplier: 1.9
	},
	"10": {
		speedMultiplier: 2
	}
};

var Game = function(){
	this.enemies = [];
	this.players = [];
	this.projectiles = [];
	this.drops = [];
	this.score = 0;
	this.level = 1;
	this.enemySpawnSpeed = CONFIG.enemySpawnSpeed;
	this.enemySpawner = null;
	this.maxLevel = 10;
	this.enemiesPerLevel = 20;
	this.isDropActive = false;
	this.currentDrop = null;
	this.dom = {
		level: document.getElementById('level'),
		lives: document.getElementById('canMiss')
	};
};

Game.prototype.addPlayer = function(player){
	this.players.push(player);
};

Game.prototype.drawPlayers = function () {
	this.players.forEach(function(player){
		player.draw();
	});
};

Game.prototype.getLevel = function(){
	return LEVELS[this.level];
};

Game.prototype.end = function(won){
	if(won){
		console.log("win");
		$("#levelInfo span").first().text("YOU WIN!");
	} else {
		//you lost
		if(this.enemySpawner != null){
			clearInterval(this.enemySpawner);
			this.enemySpawner = null;

			//TODO disable controls later on mby
			$("#levelInfo span").first().text("GAME OVER!");
			$("#levelInfo button").first().text("RESTART!");
		}

	}
};

Game.prototype.isLevelClear = function(){
	var clear = true;
	this.enemies.forEach(function(enemy){
		if(!enemy.destroyed){
			clear = false;
		}
	});
	return clear;
};

Game.prototype.stopSpawningEnemies = function(){
	clearInterval(this.enemySpawner);
	this.enemySpawner = null;
};

Game.prototype.updateLevel = function(){
	this.level++;
	this.dom.level.textContent = this.level;
};

Game.prototype.resetAfterLevel = function(){
	this.projectiles = [];
	this.enemies = [];
};

function getRandomArbitrary(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}