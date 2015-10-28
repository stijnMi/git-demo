import Vector from './classes/Vector';
import Player from './classes/Player';
import Enemy from './classes/Enemy';
import Keyboard from './classes/Keyboard';
import Bullet from './classes/Bullet';
import CollisionDetector from './classes/CollisionDetector';
import Explosion from './classes/Explosion';

import {loadImage} from './functions/load';



let canvas, ctx;
let catalog = {};

let player;
let enemies = [];
let playerBullets = [];
let keyboard;
let playerBulletEnemyCollisionDetector;

let enemyPlayerCollisionDetector;

let explosions = [];

const init = () => {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  /*
  loadImage('images/bullet.png', 'bullet', catalog)
    .then(() => loadImage('images/player.png', 'player', catalog))
    .then(() => loadImage('images/enemy.png', 'enemy', catalog))
    .then(() => loadImage('images/explosion.png', 'explosion', catalog))
    .then(draw);
  */

  Promise.all([
    loadImage('images/bullet.png', 'bullet', catalog),
    loadImage('images/player.png', 'player', catalog),
    loadImage('images/enemy.png', 'enemy', catalog),
    loadImage('images/explosion.png', 'explosion', catalog)
  ]).then(loaded);
};

const loaded = () => {
  player = new Player(canvas.width / 2, canvas.height - 50, catalog.player);
  keyboard = new Keyboard();

  playerBulletEnemyCollisionDetector = new CollisionDetector(); 
  playerBulletEnemyCollisionDetector.on('collision', playerBulletEnemyCollision);

  enemyPlayerCollisionDetector = new CollisionDetector(); 
  enemyPlayerCollisionDetector.on('collision', enemyPlayerCollision);
  
  draw();
};

const playerBulletEnemyCollision = (bullet, enemy) => {
  console.log('collision detected');
  //TODO: verwijder vullet uit playerBullets
  //TODO: verwijder enemy uit enemies

  playerBullets = playerBullets.filter(value => value !== bullet);
  //bullets niet gelijk aan collision mogen erin blijven
  enemies = enemies.filter(value => value !== enemy);



  // let explosion = new Explosion(enemy.location.x, enemy.location.y, catalog.explosion;
  // ////

  explosions.push(new Explosion(enemy.location.x, enemy.location.y, catalog.explosion));

  // explosion.velocity = enemy.velocity.mult(0.4);    // beetje snelheid meegeven profopl
  //maar dan apart nodig, dus eigelijk niet zoals hierboven in 1 lijn

}

const enemyPlayerCollision = (enemy, player) => {
  player.killed = true;
  enemies = enemies.filter(value => value !== enemy);
  explosions.push(new Explosion(player.location.x, player.location.y, catalog.explosion));
}

const draw = () => {
  ctx.fillStyle = 'blue';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if(keyboard.isDown(Keyboard.LEFT)) {
    player.applyForce(new Vector(-0.5, 0));
  }
  if(keyboard.isDown(Keyboard.RIGHT)) {
    player.applyForce(new Vector(0.5, 0));
  }
  if(keyboard.isDown(Keyboard.SPACE)) {
    playerBullets.push(new Bullet(player.location.x, player.location.y, catalog.bullet));
  }

  if(Math.random() < 0.05) {
    let enemy = new Enemy(canvas.width * Math.random(), 0, catalog.enemy);
    enemies.push(enemy);
  }

  player.update();
  enemies.forEach(enemy => {
    let dir = Vector.sub(player.location, enemy.location).normalize().mult(0.5);
    enemy.applyForce(dir);
    enemy.update()
  });
  playerBullets.forEach(bullet => {
    bullet.velocity.y = -5;
    bullet.update()
  });
  explosions.forEach(explosion => {
    let dir = Vector.sub(player.location, explosion.location).normalize().mult(0.5);
    explosion.applyForce(dir);
    explosion.update()
  });

  playerBulletEnemyCollisionDetector.detectCollisions(playerBullets, enemies);
  enemyPlayerCollisionDetector.detectCollisions(enemies, [player]);

  player.draw(ctx);
  enemies.forEach(enemy => enemy.draw(ctx));
  playerBullets.forEach(bullet => bullet.draw(ctx));
  explosions.forEach(explosion => explosion.draw(ctx));

  explosions = explosions.filter(explosion => !explosion.killed);

  playerBullets = playerBullets.filter(bullet => bullet.location.y > 0);
  enemies = enemies.filter(enemy => enemy.location.y < canvas.height);
  console.log(playerBullets.lenght);   //aantal bullets in array

  window.requestAnimationFrame(draw);
};




init();
