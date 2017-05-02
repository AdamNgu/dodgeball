(function() {
  window.Dodgeballs = window.Dodgeballs || {};

  var Player = window.Dodgeballs.Player = function(position, game) {
    var options = {
      color: Player.COLOR,
      radius: Player.RADIUS,
      pos: position,
      vel: [0, 0],
      game: game
    };
    window.Dodgeballs.MovingObject.call(this, options);
  };

  Player.COLOR = "rgba(30,120,240,1)";
  Player.RADIUS = 12;

  window.Dodgeballs.Util.prototype.inherits(Player, window.Dodgeballs.MovingObject);


  Player.prototype.relocate = function() {
    this.pos = window.Dodgeballs.Game.prototype.randomPosition();
    this.vel = [0, 0];
  };

  Player.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

})();
