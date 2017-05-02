(function () {
  window.Dodgeballs = window.Dodgeballs || {};

  var Game = window.Dodgeballs.Game = function() {
    this.dodgeballs = [];
    this.addDodgeballs();
    this.addPlayer();
    this.score = 0;
    this.highScore = 0;
  };


  Game.DIM_X = 720;
  Game.DIM_Y = 405;
  Game.NUM_DODGEBALLS = 2;

  Game.prototype.addDodgeballs = function() {
    for(var i = 0; i < Game.NUM_DODGEBALLS; i++){
      var dodgeball = new window.Dodgeballs.Dodgeball(
        [1,Game.DIM_Y / 2], this
      );
      this.add(dodgeball);
    }
  };

  Game.prototype.addPlayer = function () {
    var player = new window.Dodgeballs.Player(
      Game.prototype.randomPosition(), this
    );

    this.add(player);
  };

  Game.prototype.add = function (obj) {
    if (obj instanceof window.Dodgeballs.Dodgeball) {
      this.dodgeballs.push(obj);
    } else if (obj instanceof window.Dodgeballs.Player) {
      this.player = obj;
    }
  };



  Game.prototype.allObjects = function () {
    var objArr = [];
    objArr = this.dodgeballs.slice();
    objArr.push(this.player);
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
    ctx.font = 16  + "pt Arial";
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
    if(otherObj instanceof window.Dodgeballs.Dodgeball) {
      this.dodgeballs = this.dodgeballs.filter(function (this_dodgeball) {
        return this_dodgeball !== otherObj;
      });
    }
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] > Game.DIM_X || pos[0] < 0) ||
      (pos[1] > Game.DIM_Y || pos[1] < 0);
  };

  Game.prototype.playerCoordinates = function () {
    return this.player.pos;
  }

})();
