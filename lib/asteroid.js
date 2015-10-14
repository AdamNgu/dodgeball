(function () {
  window.Asteroids = window.Asteroids || {};

  var Asteroid = window.Asteroids.Asteroid = function(position, game) {
    var options = {
      color: Asteroid.COLOR,
      radius: Asteroid.RADIUS,
      pos: position,
      vel: window.Asteroids.Util.prototype.randomVec(7),
      game: game
    };
    window.Asteroids.MovingObject.call(this, options);
  };
  window.Asteroids.Util.prototype.inherits(Asteroid, window.Asteroids.MovingObject);

  Asteroid.COLOR = "red";
  Asteroid.RADIUS = 30;

  Asteroid.prototype.collideWith = function (otherObj) {
    if(otherObj instanceof window.Asteroids.Ship) {

      if (this.game.highScore < this.game.score) {
        this.game.highScore = this.game.score;
      }

      this.game.score = 0;
      otherObj.relocate();
    } else if (otherObj instanceof window.Asteroids.Bullet) {
      this.game.remove(otherObj);
      this.game.remove(this);
      this.game.score += 10;
      console.log(this.game.score);
    }
  };

})();
