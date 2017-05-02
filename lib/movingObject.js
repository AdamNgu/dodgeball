(function() {
  window.Dodgeballs = window.Dodgeballs || {};
  var MovingObject = window.Dodgeballs.MovingObject = function(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
  };
  MovingObject.prototype.draw = function(canvasContext) {
    canvasContext.fillStyle = this.color;
    canvasContext.beginPath();

    canvasContext.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    canvasContext.fill();
  };
  MovingObject.prototype.isWrappable = true;

  MovingObject.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];

    if (this.game.isOutOfBounds(this.pos)) {
      if (this.pos[0] > 0 && this.pos[0] < 720) {
        this.vel[1] *= -1;
      } else {
        this.vel[0] *= -1;
      }
    }

  };

  MovingObject.prototype.isCollidedWith = function(otherObj) {
    var distanceBetween = window.Dodgeballs.Util.prototype.distance(this.pos, otherObj.pos);
    return distanceBetween < (this.radius + otherObj.radius);
  };

})();
