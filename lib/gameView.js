(function () {
  window.Asteroids = window.Asteroids || {};

  var GameView = window.Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function () {
    // ctx.width = window.innerWidth;
    // ctx.height = window.innerHeight;

    this.bindKeyHandlers();
    var img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);
    };
    img.src = 'lib/court.jpg';
    window.setInterval(function () {
      this.game.addAsteroids();
    }.bind(this), 1000 * 250 / 60 );

    window.setInterval(function () {
      this.game.step();
      this.game.score ++;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);
      this.game.draw(this.ctx);
    }.bind(this), 1000 / 60);
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.game.ship;
    key('w, up', function () {
      event.preventDefault();
      ship.power([0,-1]);
    });
    key('a, left', function () {
      event.preventDefault();
      ship.power([-1, 0]);
    });
    key('s, down', function () {
      event.preventDefault();
      ship.power([0,1]);
    });
    key('d, right', function () {
      event.preventDefault();
      ship.power([1, 0]);
    });
    // key('space', function () {
    //   event.preventDefault()
    //   ship.fireBullet();
    // });
  };

})();
