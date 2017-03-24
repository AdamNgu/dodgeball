(function () {
  window.Dodgeballs = window.Dodgeballs || {};

  var GameView = window.Dodgeballs.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function () {
    var halfBrowserWidth = 720 / 2;
    var halfBrowserHeight = 405 / 2;
    var halfGameWidth = window.Dodgeballs.Game.DIM_X;
    var halfGameHeight = window.Dodgeballs.Game.DIM_Y;
    var whereToDrawWidth = halfBrowserWidth - halfGameWidth;
    var whereToDrawHeight = halfBrowserHeight - halfGameHeight;
    this.bindKeyHandlers();
    var img = new Image();
    img.src = 'lib/court.jpg';
    window.setInterval(function () {
      this.game.addDodgeballs();
    }.bind(this), 1000 * 250 / 60 );

    window.setInterval(function () {
      this.game.step();
      this.game.score ++;
      ctx.clearRect(0, 0, window.Dodgeballs.Game.DIM_X, window.Dodgeballs.Game.DIM_Y);
      ctx.drawImage(img, 0, 0, 720, 405);
      this.game.draw(this.ctx);
    }.bind(this), 1000 / 60);
  };

  GameView.prototype.bindKeyHandlers = function () {
    var player = this.game.player;
    key('w, up', function () {
      event.preventDefault();
      player.power([0,-1]);
    });
    key('a, left', function () {
      event.preventDefault();
      player.power([-1, 0]);
    });
    key('s, down', function () {
      event.preventDefault();
      player.power([0,1]);
    });
    key('d, right', function () {
      event.preventDefault();
      player.power([1, 0]);
    });
  };

})();
