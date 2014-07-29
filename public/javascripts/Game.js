/**
 * Created by martenhennoch on 28/07/14.
 */

var CONFIG = {
	initialHp : 300,
	playerHeight: 10,
	playerWidth: 60,
	enemySpawnSpeed: 1000,
	enemySpeed: 1.5,
	playerMoveSpeed: 5,
	enemyRadius: 20,
	enemyHP: 2,
	limit: 10,
	maxEnemies: 100,
	colors : ["red", "blue", "green", "purple", "pink", "yellow"]
};

var snd = new Audio("/sound/pew.ogg");

var game;

var Game = function(){
	this.enemies = [],
	this.players = [],
	this.projectiles = [],
	this.status = 1,
	this.score = 0,
	this.enemySpawner = null
};

Game.prototype.addPlayer = function(player){
	this.players.push(player);
};

function getRandomArbitrary(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}