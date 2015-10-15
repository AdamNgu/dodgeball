(function () {
  window.Asteroids = window.Asteroids || {};

  var GameView = window.Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;

    this.angstArray = [
      "If I get sunglasses maybe I can be a cool kid too",
      "I can’t wait to buy that new Green Day album",
      "I’m just misunderstood",
      "♩ When I was a young boy ♩",
      "Hot Topic gets me",
      "Jocks don't understand",
      "One day Rachel will notice me",
      "Jonathan-sempai is the coolest",
      "I only wear black",
      "Everyone is such a baka",
      "Firefly is the best show ever",
      "I can't wait for Serenity to come out",
      "Browncoat for life",
      "Fedoras = class",
      "Tyler is just jealous",
      "Geeks are the future",
      "Better not forget the raid tonight",
      "The Alliance is so lame",
      "I wish I was more like my rogue",
      "So close to level 60!",
      "Ugh parents",
      "An Evanescence tattoo would be SO BADASS"
    ];

    this.angstText = this.angstArray[Math.floor(Math.random() * this.angstArray.length)];
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    var img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };
    img.src = 'lib/court.jpg';
    window.setInterval(function () {
      this.angstText = this.angstArray[Math.floor(Math.random() * this.angstArray.length)];
      this.game.addAsteroids();
    }.bind(this), 1000 * 250 / 60 );

    window.setInterval(function () {
      this.game.step();
      this.game.score ++;
      ctx.clearRect(0, 0, window.Asteroids.Game.DIM_X, window.Asteroids.Game.DIM_Y);
      ctx.drawImage(img, 0, 0);
      this.game.draw(this.ctx);
      ctx.fillStyle = "black";
      ctx.font = 12  + "pt Arial";
      ctx.fillText(this.angstText, this.game.shipCoordinates()[0] + 10, this.game.shipCoordinates()[1] - 15);
    }.bind(this), 1000 / 60);
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
    // key('space', function () {
    //   event.preventDefault()
    //   ship.fireBullet();
    // });
  };

})();
