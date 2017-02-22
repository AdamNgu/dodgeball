(function () {
  window.Asteroids = window.Asteroids || {};

  var Asteroid = window.Asteroids.Asteroid = function(position, game) {
    var options = {
      color: Asteroid.COLOR,
      radius: Asteroid.RADIUS,
      pos: position,
      vel: window.Asteroids.Util.prototype.randomVec(5),
      game: game
    };
    window.Asteroids.MovingObject.call(this, options);
  };
  window.Asteroids.Util.prototype.inherits(Asteroid, window.Asteroids.MovingObject);

  Asteroid.COLOR = "red";
  Asteroid.RADIUS = 9;

  Asteroid.prototype.collideWith = function (otherObj) {
    if(otherObj instanceof window.Asteroids.Ship) {

      if (this.game.highScore < this.game.score) {
        this.game.highScore = this.game.score;
      }

      this.game.score = 0;
      otherObj.relocate();
      this.game.asteroids = [];
      this.game.addAsteroids();

    }
  };

})();
