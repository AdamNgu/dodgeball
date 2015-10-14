(function () {
  window.Asteroids = window.Asteroids || {};

  var GameView = window.Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    var img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };
    img.src = 'lib/blue_space.jpg';
    window.setInterval(function () {
      this.game.step();
      this.game.score ++;
      console.log(this.game.score);
      ctx.clearRect(0, 0, window.Asteroids.Game.DIM_X, window.Asteroids.Game.DIM_Y);
      ctx.drawImage(img, 0, 0);
      this.game.draw(this.ctx);
    },1000 / 60);
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.game.ship;
    key('w, up', function () {
      event.preventDefault()
      ship.power([0,-1]);
    });
    key('a, left', function () {
      event.preventDefault()
      ship.power([-1, 0]);
    });
    key('s, down', function () {
      event.preventDefault()
      ship.power([0,1]);
    });
    key('d, right', function () {
      event.preventDefault()
      ship.power([1, 0]);
    });
    key('space', function () {
      event.preventDefault()
      ship.fireBullet();
    });
  };

})();
