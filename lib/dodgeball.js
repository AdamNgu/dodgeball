(function () {
  window.Dodgeballs = window.Dodgeballs || {};

  var Dodgeball = window.Dodgeballs.Dodgeball = function(position, game) {
    var options = {
      color: Dodgeball.COLOR,
      radius: Dodgeball.RADIUS,
      pos: position,
      vel: window.Dodgeballs.Util.prototype.randomVec(5),
      game: game
    };
    window.Dodgeballs.MovingObject.call(this, options);
  };
  window.Dodgeballs.Util.prototype.inherits(Dodgeball, window.Dodgeballs.MovingObject);

  Dodgeball.COLOR = "red";
  Dodgeball.RADIUS = 9;

  Dodgeball.prototype.collideWith = function (otherObj) {
    if(otherObj instanceof window.Dodgeballs.Player) {

      if (this.game.highScore < this.game.score) {
        this.game.highScore = this.game.score;
      }

      this.game.score = 0;
      otherObj.relocate();
      this.game.dodgeballs = [];
      this.game.addDodgeballs();

    }
  };

})();
