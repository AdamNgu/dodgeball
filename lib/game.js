(function () {
  window.Asteroids = window.Asteroids || {};

  var Game = window.Asteroids.Game = function() {
    this.bullets = [];
    this.asteroids = [];
    this.addAsteroids();
    this.addShip();
    this.score = 0;
    this.highScore = 0;
  };


  Game.DIM_X = 1280;
  Game.DIM_Y = 720;
  Game.NUM_ASTEROIDS = 8;

  Game.prototype.addAsteroids = function() {
    for(var i = 0; i < Game.NUM_ASTEROIDS; i++){
      var asteroid = new window.Asteroids.Asteroid(
        Game.prototype.randomPosition(), this
      );
      this.add(asteroid);
    }
  };

  Game.prototype.addShip = function () {
    var ship = new window.Asteroids.Ship(
      Game.prototype.randomPosition(), this
    );

    this.add(ship);
  };

  Game.prototype.add = function (obj) {
    if(obj instanceof window.Asteroids.Bullet) {
      this.bullets.push(obj);
    } else if (obj instanceof window.Asteroids.Asteroid) {
      this.asteroids.push(obj);
    } else if (obj instanceof window.Asteroids.Ship) {
      this.ship = obj;
    }
  };



  Game.prototype.allObjects = function () {
    var objArr = [];
    objArr = this.asteroids.slice();
    objArr = objArr.concat(this.bullets);
    objArr.push(this.ship);
    return objArr;
  };

  Game.prototype.randomPosition = function() {
    var x_pos = Math.round(Math.random() * Game.DIM_X);
    var y_pos = Math.round(Math.random() * Game.DIM_Y);

    return [x_pos, y_pos];
  };

  Game.prototype.draw = function(ctx) {
    // ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
    ctx.fillStyle = "white";
    ctx.font = 20  + "pt Arial";
    var currentScoreText = "Score: " + this.score;
    ctx.fillText(currentScoreText, 20, 50);
    var highScoreText = "High Score: " + this.highScore;
    ctx.fillText(highScoreText, 20, 80);
  };

  Game.prototype.moveObjects = function(ctx) {
    this.allObjects().forEach(function (object) {
      object.move();
    });
  };

  Game.prototype.wrap = function (pos) {
    var xIn = pos[0];
    var yIn = pos[1];

    //

    var xOut = xIn -
               ((xIn > Game.DIM_X) * Game.DIM_X) +
               ((xIn < 0) * Game.DIM_X);

    var yOut = yIn -
               ((yIn > Game.DIM_Y) * Game.DIM_Y) +
               ((yIn < 0) * Game.DIM_Y);

    return [xOut, yOut];
  };

  Game.prototype.checkCollisions = function() {
    var objects = this.allObjects();
    objects.forEach(function (object1) {
      objects.forEach(function (object2) {
        if (object1 !== object2 &&
          object1.isCollidedWith(object2)) {
          object1.collideWith(object2);
        }
      });
    });
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (otherObj) {
    if(otherObj instanceof window.Asteroids.Asteroid) {
      this.asteroids = this.asteroids.filter(function (this_asteroid) {
        return this_asteroid !== otherObj;
      });
    } else if (otherObj instanceof window.Asteroids.Bullet) {
      this.bullets = this.bullets.filter(function (this_bullet) {
        return this_bullet !== otherObj;
      });
    }
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] > Game.DIM_X || pos[0] < 0) ||
      (pos[1] > Game.DIM_Y || pos[1] < 0);
  };

})();