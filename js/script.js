/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _classesVector = __webpack_require__(1);

	var _classesVector2 = _interopRequireDefault(_classesVector);

	var _classesPlayer = __webpack_require__(2);

	var _classesPlayer2 = _interopRequireDefault(_classesPlayer);

	var _classesEnemy = __webpack_require__(3);

	var _classesEnemy2 = _interopRequireDefault(_classesEnemy);

	var _classesKeyboard = __webpack_require__(4);

	var _classesKeyboard2 = _interopRequireDefault(_classesKeyboard);

	var _classesBullet = __webpack_require__(7);

	var _classesBullet2 = _interopRequireDefault(_classesBullet);

	var _classesCollisionDetector = __webpack_require__(8);

	var _classesCollisionDetector2 = _interopRequireDefault(_classesCollisionDetector);

	var _classesExplosion = __webpack_require__(10);

	var _classesExplosion2 = _interopRequireDefault(_classesExplosion);

	var _functionsLoad = __webpack_require__(5);

	var canvas = undefined,
	    ctx = undefined;
	var catalog = {};

	var player = undefined;
	var enemies = [];
	var playerBullets = [];
	var keyboard = undefined;
	var playerBulletEnemyCollisionDetector = undefined;

	var enemyPlayerCollisionDetector = undefined;

	var explosions = [];

	var init = function init() {
	  canvas = document.getElementById('canvas');
	  ctx = canvas.getContext('2d');

	  /*
	  loadImage('images/bullet.png', 'bullet', catalog)
	    .then(() => loadImage('images/player.png', 'player', catalog))
	    .then(() => loadImage('images/enemy.png', 'enemy', catalog))
	    .then(() => loadImage('images/explosion.png', 'explosion', catalog))
	    .then(draw);
	  */

	  Promise.all([(0, _functionsLoad.loadImage)('images/bullet.png', 'bullet', catalog), (0, _functionsLoad.loadImage)('images/player.png', 'player', catalog), (0, _functionsLoad.loadImage)('images/enemy.png', 'enemy', catalog), (0, _functionsLoad.loadImage)('images/explosion.png', 'explosion', catalog)]).then(loaded);
	};

	var loaded = function loaded() {
	  player = new _classesPlayer2['default'](canvas.width / 2, canvas.height - 50, catalog.player);
	  keyboard = new _classesKeyboard2['default']();

	  playerBulletEnemyCollisionDetector = new _classesCollisionDetector2['default']();
	  playerBulletEnemyCollisionDetector.on('collision', playerBulletEnemyCollision);

	  enemyPlayerCollisionDetector = new _classesCollisionDetector2['default']();
	  enemyPlayerCollisionDetector.on('collision', enemyPlayerCollision);

	  draw();
	};

	var playerBulletEnemyCollision = function playerBulletEnemyCollision(bullet, enemy) {
	  console.log('collision detected');
	  //TODO: verwijder vullet uit playerBullets
	  //TODO: verwijder enemy uit enemies

	  playerBullets = playerBullets.filter(function (value) {
	    return value !== bullet;
	  });
	  //bullets niet gelijk aan collision mogen erin blijven
	  enemies = enemies.filter(function (value) {
	    return value !== enemy;
	  });

	  // let explosion = new Explosion(enemy.location.x, enemy.location.y, catalog.explosion;
	  // ////

	  explosions.push(new _classesExplosion2['default'](enemy.location.x, enemy.location.y, catalog.explosion));

	  // explosion.velocity = enemy.velocity.mult(0.4);    // beetje snelheid meegeven profopl
	  //maar dan apart nodig, dus eigelijk niet zoals hierboven in 1 lijn
	};

	var enemyPlayerCollision = function enemyPlayerCollision(enemy, player) {
	  player.killed = true;
	  enemies = enemies.filter(function (value) {
	    return value !== enemy;
	  });
	  explosions.push(new _classesExplosion2['default'](player.location.x, player.location.y, catalog.explosion));
	};

	var draw = function draw() {
	  ctx.fillStyle = 'blue';
	  ctx.fillRect(0, 0, canvas.width, canvas.height);

	  if (keyboard.isDown(_classesKeyboard2['default'].LEFT)) {
	    player.applyForce(new _classesVector2['default'](-0.5, 0));
	  }
	  if (keyboard.isDown(_classesKeyboard2['default'].RIGHT)) {
	    player.applyForce(new _classesVector2['default'](0.5, 0));
	  }
	  if (keyboard.isDown(_classesKeyboard2['default'].SPACE)) {
	    playerBullets.push(new _classesBullet2['default'](player.location.x, player.location.y, catalog.bullet));
	  }

	  if (Math.random() < 0.05) {
	    var enemy = new _classesEnemy2['default'](canvas.width * Math.random(), 0, catalog.enemy);
	    enemies.push(enemy);
	  }

	  player.update();
	  enemies.forEach(function (enemy) {
	    var dir = _classesVector2['default'].sub(player.location, enemy.location).normalize().mult(0.5);
	    enemy.applyForce(dir);
	    enemy.update();
	  });
	  playerBullets.forEach(function (bullet) {
	    bullet.velocity.y = -5;
	    bullet.update();
	  });
	  explosions.forEach(function (explosion) {
	    var dir = _classesVector2['default'].sub(player.location, explosion.location).normalize().mult(0.5);
	    explosion.applyForce(dir);
	    explosion.update();
	  });

	  playerBulletEnemyCollisionDetector.detectCollisions(playerBullets, enemies);
	  enemyPlayerCollisionDetector.detectCollisions(enemies, [player]);

	  player.draw(ctx);
	  enemies.forEach(function (enemy) {
	    return enemy.draw(ctx);
	  });
	  playerBullets.forEach(function (bullet) {
	    return bullet.draw(ctx);
	  });
	  explosions.forEach(function (explosion) {
	    return explosion.draw(ctx);
	  });

	  explosions = explosions.filter(function (explosion) {
	    return !explosion.killed;
	  });

	  playerBullets = playerBullets.filter(function (bullet) {
	    return bullet.location.y > 0;
	  });
	  enemies = enemies.filter(function (enemy) {
	    return enemy.location.y < canvas.height;
	  });
	  console.log(playerBullets.lenght); //aantal bullets in array

	  window.requestAnimationFrame(draw);
	};

	init();

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Vector = (function () {
	  function Vector(x, y) {
	    _classCallCheck(this, Vector);

	    this.x = x;
	    this.y = y;
	  }

	  _createClass(Vector, [{
	    key: "add",
	    value: function add(v) {
	      this.x += v.x;
	      this.y += v.y;
	      return this;
	    }
	  }, {
	    key: "sub",
	    value: function sub(v) {
	      this.x -= v.x;
	      this.y -= v.y;
	      return this;
	    }
	  }, {
	    key: "mult",
	    value: function mult(n) {
	      this.x *= n;
	      this.y *= n;
	      return this;
	    }
	  }, {
	    key: "div",
	    value: function div(n) {
	      this.x /= n;
	      this.y /= n;
	      return this;
	    }
	  }, {
	    key: "mag",
	    value: function mag() {
	      return Math.sqrt(this.x * this.x + this.y * this.y);
	    }
	  }, {
	    key: "normalize",
	    value: function normalize() {
	      var m = this.mag();
	      if (m !== 0) {
	        this.div(m);
	      }
	      return this;
	    }
	  }, {
	    key: "limit",
	    value: function limit(max) {
	      if (this.mag() > max) {
	        this.normalize();
	        this.mult(max);
	      }
	      return this;
	    }
	  }, {
	    key: "clone",
	    value: function clone() {
	      return new Vector(this.x, this.y);
	    }
	  }], [{
	    key: "add",
	    value: function add(v1, v2) {
	      return v1.clone().add(v2);
	    }
	  }, {
	    key: "sub",
	    value: function sub(v1, v2) {
	      return v1.clone().sub(v2);
	    }
	  }, {
	    key: "mult",
	    value: function mult(v, n) {
	      return v.clone().mult(n);
	    }
	  }, {
	    key: "div",
	    value: function div(v, n) {
	      return v.clone().div(n);
	    }
	  }]);

	  return Vector;
	})();

	exports["default"] = Vector;
	module.exports = exports["default"];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _GameObject2 = __webpack_require__(6);

	var _GameObject3 = _interopRequireDefault(_GameObject2);

	var Player = (function (_GameObject) {
	  _inherits(Player, _GameObject);

	  function Player(x, y, image) {
	    _classCallCheck(this, Player);

	    _get(Object.getPrototypeOf(Player.prototype), 'constructor', this).call(this, x, y, image);
	    this.frameRate = 20;
	    this.numFrames = 3;
	    this.killed = false;
	  }

	  return Player;
	})(_GameObject3['default']);

	exports['default'] = Player;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _GameObject2 = __webpack_require__(6);

	var _GameObject3 = _interopRequireDefault(_GameObject2);

	var Enemy = (function (_GameObject) {
	  _inherits(Enemy, _GameObject);

	  function Enemy(x, y, image) {
	    _classCallCheck(this, Enemy);

	    _get(Object.getPrototypeOf(Enemy.prototype), 'constructor', this).call(this, x, y, image);
	    this.frameRate = 20;
	    this.numFrames = 3;
	  }

	  _createClass(Enemy, [{
	    key: 'draw',
	    value: function draw(ctx) {
	      //todo: richtingsvector
	      var angle = Math.atan2(this.velocity.y, this.velocity.x) - Math.PI / 2;

	      ctx.save();
	      ctx.translate(this.location.x, this.location.y);
	      ctx.rotate(angle);

	      ctx.drawImage(this.image, this.localFrameNr * this.size, 0, this.size, this.size, -this.size / 2, -this.size / 2, this.size, this.size);
	      ctx.restore();
	    }
	  }]);

	  return Enemy;
	})(_GameObject3['default']);

	exports['default'] = Enemy;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Keyboard = (function () {
	  function Keyboard() {
	    var _this = this;

	    _classCallCheck(this, Keyboard);

	    this.keys = {};
	    window.addEventListener('keydown', function (event) {
	      return _this.keydownHandler(event);
	    });
	    window.addEventListener('keyup', function (event) {
	      return _this.keyupHandler(event);
	    });
	    //bind key codes
	    Keyboard.LEFT = 37;
	    Keyboard.RIGHT = 39;
	    Keyboard.SPACE = 32;
	  }

	  _createClass(Keyboard, [{
	    key: 'keydownHandler',
	    value: function keydownHandler(event) {
	      // console.log(event.keyCode);
	      this.keys[event.keyCode] = true;
	    }
	  }, {
	    key: 'keyupHandler',
	    value: function keyupHandler(event) {
	      delete this.keys[event.keyCode];
	    }
	  }, {
	    key: 'isDown',
	    value: function isDown(keyCode) {
	      return this.keys[keyCode];
	    }
	  }]);

	  return Keyboard;
	})();

	exports['default'] = Keyboard;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var loadImage = function loadImage(url, id, catalog) {
	  return new Promise(function (resolve, reject) {
	    catalog[id] = new Image();
	    catalog[id].addEventListener('load', function (event) {
	      resolve(catalog[id]);
	    });
	    catalog[id].addEventListener('error', function (event) {
	      reject(event);
	    });
	    catalog[id].setAttribute('src', url);
	    if (catalog[id].complete) {
	      resolve(catalog[id]);
	    }
	  });
	};

	exports.loadImage = loadImage;
	var getJSON = function getJSON(url) {
	  return get(url).then(JSON.parse);
	};

	exports.getJSON = getJSON;
	var get = function get(url) {
	  return new Promise(function (resolve, reject) {
	    var req = new XMLHttpRequest();
	    req.open('GET', url, true);
	    req.addEventListener('load', function (event) {
	      if (req.status === 200) {
	        resolve(req.response);
	      } else {
	        reject(new Error(req.status));
	      }
	    });
	    req.addEventListener('error', function (event) {
	      reject(event);
	    });
	    req.addEventListener('abort', function (event) {
	      reject(event);
	    });
	    req.send();
	  });
	};
	exports.get = get;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _Vector = __webpack_require__(1);

	var _Vector2 = _interopRequireDefault(_Vector);

	var GameObject = (function () {
	  function GameObject(x, y, image) {
	    _classCallCheck(this, GameObject);

	    this.location = new _Vector2['default'](x, y);
	    this.acceleration = new _Vector2['default'](0, 0);
	    this.velocity = new _Vector2['default'](0, 0);
	    this.image = image;
	    this.size = this.image.height;
	    this.frameRate = 60;
	    this.frameNr = 0;
	    this.localFrameNr = 0;
	    this.numFrames = 1;
	  }

	  _createClass(GameObject, [{
	    key: 'calculateDistance',
	    value: function calculateDistance(otherObject) {
	      var distance = _Vector2['default'].sub(otherObject.location, this.location).mag();
	      //houdt nog geen rekening met grootte element , dus de helft ervan nog aftrekken?? midden
	      distance -= this.size / 2;
	      distance -= otherObject.size / 2;
	      return distance;
	    }
	  }, {
	    key: 'collidesWith',
	    value: function collidesWith(otherObject) {
	      // let distance = this.calculateDistance(otherObject);
	      // if (distance <= 0) {
	      //   return true;
	      // } else {
	      //   return false;
	      // }

	      return this.calculateDistance(otherObject) <= 0;
	    }
	  }, {
	    key: 'applyForce',
	    value: function applyForce(force) {
	      this.acceleration.add(force);
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      this.frameNr++;
	      this.localFrameNr = Math.floor(this.frameNr / (60 / this.frameRate));
	      this.localFrameNr = this.localFrameNr % this.numFrames;

	      this.velocity.add(this.acceleration);
	      this.location.add(this.velocity);

	      this.acceleration.mult(0);
	      this.velocity.mult(0.95);
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.save();
	      ctx.translate(this.location.x, this.location.y);
	      ctx.drawImage(this.image, this.localFrameNr * this.size, 0, this.size, this.size, -this.size / 2, -this.size / 2, this.size, this.size);
	      ctx.restore();
	    }
	  }]);

	  return GameObject;
	})();

	exports['default'] = GameObject;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _GameObject2 = __webpack_require__(6);

	var _GameObject3 = _interopRequireDefault(_GameObject2);

	var Bullet = (function (_GameObject) {
		_inherits(Bullet, _GameObject);

		function Bullet() {
			_classCallCheck(this, Bullet);

			_get(Object.getPrototypeOf(Bullet.prototype), 'constructor', this).apply(this, arguments);
		}

		return Bullet;
	})(_GameObject3['default']);

	exports['default'] = Bullet;
	module.exports = exports['default'];

	// constructor(x, y, image){
	// 	super(x,y,image);
	// }

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _vendorsEventemitter2Js = __webpack_require__(9);

	var _vendorsEventemitter2Js2 = _interopRequireDefault(_vendorsEventemitter2Js);

	var CollisionDetector = (function (_EventEmitter2) {
		_inherits(CollisionDetector, _EventEmitter2);

		function CollisionDetector() {
			_classCallCheck(this, CollisionDetector);

			_get(Object.getPrototypeOf(CollisionDetector.prototype), 'constructor', this).call(this, {});
		}

		_createClass(CollisionDetector, [{
			key: 'detectCollisions',
			value: function detectCollisions(elements1, elements2) {
				var _this = this;

				elements1.forEach(function (element1) {
					elements2.forEach(function (element2) {
						//detecteer collision tussen element1 en element 2
						if (element1.collidesWith(element2)) {
							_this.emit('collision', element1, element2);
						};
					});
				});
			}
		}]);

		return CollisionDetector;
	})(_vendorsEventemitter2Js2['default']);

	exports['default'] = CollisionDetector;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * EventEmitter2
	 * https://github.com/hij1nx/EventEmitter2
	 *
	 * Copyright (c) 2013 hij1nx
	 * Licensed under the MIT license.
	 */
	'use strict';

	;!(function (undefined) {

	  var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
	    return Object.prototype.toString.call(obj) === "[object Array]";
	  };
	  var defaultMaxListeners = 10;

	  function init() {
	    this._events = {};
	    if (this._conf) {
	      configure.call(this, this._conf);
	    }
	  }

	  function configure(conf) {
	    if (conf) {

	      this._conf = conf;

	      conf.delimiter && (this.delimiter = conf.delimiter);
	      conf.maxListeners && (this._events.maxListeners = conf.maxListeners);
	      conf.wildcard && (this.wildcard = conf.wildcard);
	      conf.newListener && (this.newListener = conf.newListener);

	      if (this.wildcard) {
	        this.listenerTree = {};
	      }
	    }
	  }

	  function EventEmitter(conf) {
	    this._events = {};
	    this.newListener = false;
	    configure.call(this, conf);
	  }

	  //
	  // Attention, function return type now is array, always !
	  // It has zero elements if no any matches found and one or more
	  // elements (leafs) if there are matches
	  //
	  function searchListenerTree(handlers, type, tree, i) {
	    if (!tree) {
	      return [];
	    }
	    var listeners = [],
	        leaf,
	        len,
	        branch,
	        xTree,
	        xxTree,
	        isolatedBranch,
	        endReached,
	        typeLength = type.length,
	        currentType = type[i],
	        nextType = type[i + 1];
	    if (i === typeLength && tree._listeners) {
	      //
	      // If at the end of the event(s) list and the tree has listeners
	      // invoke those listeners.
	      //
	      if (typeof tree._listeners === 'function') {
	        handlers && handlers.push(tree._listeners);
	        return [tree];
	      } else {
	        for (leaf = 0, len = tree._listeners.length; leaf < len; leaf++) {
	          handlers && handlers.push(tree._listeners[leaf]);
	        }
	        return [tree];
	      }
	    }

	    if (currentType === '*' || currentType === '**' || tree[currentType]) {
	      //
	      // If the event emitted is '*' at this part
	      // or there is a concrete match at this patch
	      //
	      if (currentType === '*') {
	        for (branch in tree) {
	          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
	            listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i + 1));
	          }
	        }
	        return listeners;
	      } else if (currentType === '**') {
	        endReached = i + 1 === typeLength || i + 2 === typeLength && nextType === '*';
	        if (endReached && tree._listeners) {
	          // The next element has a _listeners, add it to the handlers.
	          listeners = listeners.concat(searchListenerTree(handlers, type, tree, typeLength));
	        }

	        for (branch in tree) {
	          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
	            if (branch === '*' || branch === '**') {
	              if (tree[branch]._listeners && !endReached) {
	                listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], typeLength));
	              }
	              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
	            } else if (branch === nextType) {
	              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i + 2));
	            } else {
	              // No match on this one, shift into the tree but not in the type array.
	              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
	            }
	          }
	        }
	        return listeners;
	      }

	      listeners = listeners.concat(searchListenerTree(handlers, type, tree[currentType], i + 1));
	    }

	    xTree = tree['*'];
	    if (xTree) {
	      //
	      // If the listener tree will allow any match for this part,
	      // then recursively explore all branches of the tree
	      //
	      searchListenerTree(handlers, type, xTree, i + 1);
	    }

	    xxTree = tree['**'];
	    if (xxTree) {
	      if (i < typeLength) {
	        if (xxTree._listeners) {
	          // If we have a listener on a '**', it will catch all, so add its handler.
	          searchListenerTree(handlers, type, xxTree, typeLength);
	        }

	        // Build arrays of matching next branches and others.
	        for (branch in xxTree) {
	          if (branch !== '_listeners' && xxTree.hasOwnProperty(branch)) {
	            if (branch === nextType) {
	              // We know the next element will match, so jump twice.
	              searchListenerTree(handlers, type, xxTree[branch], i + 2);
	            } else if (branch === currentType) {
	              // Current node matches, move into the tree.
	              searchListenerTree(handlers, type, xxTree[branch], i + 1);
	            } else {
	              isolatedBranch = {};
	              isolatedBranch[branch] = xxTree[branch];
	              searchListenerTree(handlers, type, { '**': isolatedBranch }, i + 1);
	            }
	          }
	        }
	      } else if (xxTree._listeners) {
	        // We have reached the end and still on a '**'
	        searchListenerTree(handlers, type, xxTree, typeLength);
	      } else if (xxTree['*'] && xxTree['*']._listeners) {
	        searchListenerTree(handlers, type, xxTree['*'], typeLength);
	      }
	    }

	    return listeners;
	  }

	  function growListenerTree(type, listener) {

	    type = typeof type === 'string' ? type.split(this.delimiter) : type.slice();

	    //
	    // Looks for two consecutive '**', if so, don't add the event at all.
	    //
	    for (var i = 0, len = type.length; i + 1 < len; i++) {
	      if (type[i] === '**' && type[i + 1] === '**') {
	        return;
	      }
	    }

	    var tree = this.listenerTree;
	    var name = type.shift();

	    while (name) {

	      if (!tree[name]) {
	        tree[name] = {};
	      }

	      tree = tree[name];

	      if (type.length === 0) {

	        if (!tree._listeners) {
	          tree._listeners = listener;
	        } else if (typeof tree._listeners === 'function') {
	          tree._listeners = [tree._listeners, listener];
	        } else if (isArray(tree._listeners)) {

	          tree._listeners.push(listener);

	          if (!tree._listeners.warned) {

	            var m = defaultMaxListeners;

	            if (typeof this._events.maxListeners !== 'undefined') {
	              m = this._events.maxListeners;
	            }

	            if (m > 0 && tree._listeners.length > m) {

	              tree._listeners.warned = true;
	              console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', tree._listeners.length);
	              if (console.trace) {
	                console.trace();
	              }
	            }
	          }
	        }
	        return true;
	      }
	      name = type.shift();
	    }
	    return true;
	  }

	  // By default EventEmitters will print a warning if more than
	  // 10 listeners are added to it. This is a useful default which
	  // helps finding memory leaks.
	  //
	  // Obviously not all Emitters should be limited to 10. This function allows
	  // that to be increased. Set to zero for unlimited.

	  EventEmitter.prototype.delimiter = '.';

	  EventEmitter.prototype.setMaxListeners = function (n) {
	    this._events || init.call(this);
	    this._events.maxListeners = n;
	    if (!this._conf) this._conf = {};
	    this._conf.maxListeners = n;
	  };

	  EventEmitter.prototype.event = '';

	  EventEmitter.prototype.once = function (event, fn) {
	    this.many(event, 1, fn);
	    return this;
	  };

	  EventEmitter.prototype.many = function (event, ttl, fn) {
	    var self = this;

	    if (typeof fn !== 'function') {
	      throw new Error('many only accepts instances of Function');
	    }

	    function listener() {
	      if (--ttl === 0) {
	        self.off(event, listener);
	      }
	      fn.apply(this, arguments);
	    }

	    listener._origin = fn;

	    this.on(event, listener);

	    return self;
	  };

	  EventEmitter.prototype.emit = function () {

	    this._events || init.call(this);

	    var type = arguments[0];

	    if (type === 'newListener' && !this.newListener) {
	      if (!this._events.newListener) {
	        return false;
	      }
	    }

	    // Loop through the *_all* functions and invoke them.
	    if (this._all) {
	      var l = arguments.length;
	      var args = new Array(l - 1);
	      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
	      for (i = 0, l = this._all.length; i < l; i++) {
	        this.event = type;
	        this._all[i].apply(this, args);
	      }
	    }

	    // If there is no 'error' event listener then throw.
	    if (type === 'error') {

	      if (!this._all && !this._events.error && !(this.wildcard && this.listenerTree.error)) {

	        if (arguments[1] instanceof Error) {
	          throw arguments[1]; // Unhandled 'error' event
	        } else {
	            throw new Error("Uncaught, unspecified 'error' event.");
	          }
	        return false;
	      }
	    }

	    var handler;

	    if (this.wildcard) {
	      handler = [];
	      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
	      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
	    } else {
	      handler = this._events[type];
	    }

	    if (typeof handler === 'function') {
	      this.event = type;
	      if (arguments.length === 1) {
	        handler.call(this);
	      } else if (arguments.length > 1) switch (arguments.length) {
	        case 2:
	          handler.call(this, arguments[1]);
	          break;
	        case 3:
	          handler.call(this, arguments[1], arguments[2]);
	          break;
	        // slower
	        default:
	          var l = arguments.length;
	          var args = new Array(l - 1);
	          for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
	          handler.apply(this, args);
	      }
	      return true;
	    } else if (handler) {
	      var l = arguments.length;
	      var args = new Array(l - 1);
	      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];

	      var listeners = handler.slice();
	      for (var i = 0, l = listeners.length; i < l; i++) {
	        this.event = type;
	        listeners[i].apply(this, args);
	      }
	      return listeners.length > 0 || !!this._all;
	    } else {
	      return !!this._all;
	    }
	  };

	  EventEmitter.prototype.on = function (type, listener) {

	    if (typeof type === 'function') {
	      this.onAny(type);
	      return this;
	    }

	    if (typeof listener !== 'function') {
	      throw new Error('on only accepts instances of Function');
	    }
	    this._events || init.call(this);

	    // To avoid recursion in the case that type == "newListeners"! Before
	    // adding it to the listeners, first emit "newListeners".
	    this.emit('newListener', type, listener);

	    if (this.wildcard) {
	      growListenerTree.call(this, type, listener);
	      return this;
	    }

	    if (!this._events[type]) {
	      // Optimize the case of one listener. Don't need the extra array object.
	      this._events[type] = listener;
	    } else if (typeof this._events[type] === 'function') {
	      // Adding the second element, need to change to array.
	      this._events[type] = [this._events[type], listener];
	    } else if (isArray(this._events[type])) {
	      // If we've already got an array, just append.
	      this._events[type].push(listener);

	      // Check for listener leak
	      if (!this._events[type].warned) {

	        var m = defaultMaxListeners;

	        if (typeof this._events.maxListeners !== 'undefined') {
	          m = this._events.maxListeners;
	        }

	        if (m > 0 && this._events[type].length > m) {

	          this._events[type].warned = true;
	          console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
	          if (console.trace) {
	            console.trace();
	          }
	        }
	      }
	    }
	    return this;
	  };

	  EventEmitter.prototype.onAny = function (fn) {

	    if (typeof fn !== 'function') {
	      throw new Error('onAny only accepts instances of Function');
	    }

	    if (!this._all) {
	      this._all = [];
	    }

	    // Add the function to the event listener collection.
	    this._all.push(fn);
	    return this;
	  };

	  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	  EventEmitter.prototype.off = function (type, listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('removeListener only takes instances of Function');
	    }

	    var handlers,
	        leafs = [];

	    if (this.wildcard) {
	      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
	      leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
	    } else {
	      // does not use listeners(), so no side effect of creating _events[type]
	      if (!this._events[type]) return this;
	      handlers = this._events[type];
	      leafs.push({ _listeners: handlers });
	    }

	    for (var iLeaf = 0; iLeaf < leafs.length; iLeaf++) {
	      var leaf = leafs[iLeaf];
	      handlers = leaf._listeners;
	      if (isArray(handlers)) {

	        var position = -1;

	        for (var i = 0, length = handlers.length; i < length; i++) {
	          if (handlers[i] === listener || handlers[i].listener && handlers[i].listener === listener || handlers[i]._origin && handlers[i]._origin === listener) {
	            position = i;
	            break;
	          }
	        }

	        if (position < 0) {
	          continue;
	        }

	        if (this.wildcard) {
	          leaf._listeners.splice(position, 1);
	        } else {
	          this._events[type].splice(position, 1);
	        }

	        if (handlers.length === 0) {
	          if (this.wildcard) {
	            delete leaf._listeners;
	          } else {
	            delete this._events[type];
	          }
	        }
	        return this;
	      } else if (handlers === listener || handlers.listener && handlers.listener === listener || handlers._origin && handlers._origin === listener) {
	        if (this.wildcard) {
	          delete leaf._listeners;
	        } else {
	          delete this._events[type];
	        }
	      }
	    }

	    function recursivelyGarbageCollect(root) {
	      if (root === undefined) {
	        return;
	      }
	      var keys = Object.keys(root);
	      for (var i in keys) {
	        var key = keys[i];
	        var obj = root[key];
	        if (obj instanceof Function || typeof obj !== "object") continue;
	        if (Object.keys(obj).length > 0) {
	          recursivelyGarbageCollect(root[key]);
	        }
	        if (Object.keys(obj).length === 0) {
	          delete root[key];
	        }
	      }
	    }
	    recursivelyGarbageCollect(this.listenerTree);

	    return this;
	  };

	  EventEmitter.prototype.offAny = function (fn) {
	    var i = 0,
	        l = 0,
	        fns;
	    if (fn && this._all && this._all.length > 0) {
	      fns = this._all;
	      for (i = 0, l = fns.length; i < l; i++) {
	        if (fn === fns[i]) {
	          fns.splice(i, 1);
	          return this;
	        }
	      }
	    } else {
	      this._all = [];
	    }
	    return this;
	  };

	  EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

	  EventEmitter.prototype.removeAllListeners = function (type) {
	    if (arguments.length === 0) {
	      !this._events || init.call(this);
	      return this;
	    }

	    if (this.wildcard) {
	      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
	      var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);

	      for (var iLeaf = 0; iLeaf < leafs.length; iLeaf++) {
	        var leaf = leafs[iLeaf];
	        leaf._listeners = null;
	      }
	    } else {
	      if (!this._events || !this._events[type]) return this;
	      this._events[type] = null;
	    }
	    return this;
	  };

	  EventEmitter.prototype.listeners = function (type) {
	    if (this.wildcard) {
	      var handlers = [];
	      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
	      searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
	      return handlers;
	    }

	    this._events || init.call(this);

	    if (!this._events[type]) this._events[type] = [];
	    if (!isArray(this._events[type])) {
	      this._events[type] = [this._events[type]];
	    }
	    return this._events[type];
	  };

	  EventEmitter.prototype.listenersAny = function () {

	    if (this._all) {
	      return this._all;
	    } else {
	      return [];
	    }
	  };

	  if (true) {
	    // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return EventEmitter;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    // CommonJS
	    exports.EventEmitter2 = EventEmitter;
	  } else {
	    // Browser global.
	    window.EventEmitter2 = EventEmitter;
	  }
	})();

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _GameObject2 = __webpack_require__(6);

	var _GameObject3 = _interopRequireDefault(_GameObject2);

	var Explosion = (function (_GameObject) {
		_inherits(Explosion, _GameObject);

		function Explosion(x, y, image) {
			_classCallCheck(this, Explosion);

			_get(Object.getPrototypeOf(Explosion.prototype), 'constructor', this).call(this, x, y, image);
			this.frameRate = 10; //lager voor explosie
			this.numFrames = 6;
		}

		_createClass(Explosion, [{
			key: 'update',
			value: function update() {
				_get(Object.getPrototypeOf(Explosion.prototype), 'update', this).call(this);
				this.localFrameNr = Math.floor(this.frameNr / (60 / this.frameRate));
				if (this.localFrameNr >= this.numFrames) {
					this.killed = true;
				}
			}
		}]);

		return Explosion;
	})(_GameObject3['default']);

	exports['default'] = Explosion;
	module.exports = exports['default'];

/***/ }
/******/ ]);