var pepeList = [
  {
    name: "ASCII Pepe",
    image: "img/ascii-pepe.gif",
    accessories: [{ accessory: 'ASCII tendie' }, { accessory: 'bitcoins'}, { accessory: 'hax'}],
    clicks: 0
  },
  {
    name: "Original Pepe",
    image: "img/orig-pepe.jpg",
    accessories: [{ accessory: 'tendies' }, { accessory: 'GBPs'}, { accessory: 'fedora'}],
    clicks: 0
  },
  {
    name: "Extremely Rare Limited Edition Misprint Pepe",
    image: "img/misprintpepe.gif",
    accessories: [{ accessory: 'tnedies' }, { accessory: '10 million dollars'}, { accessory: 'meme'}],
    clicks: 0
  },
  {
    name: "Dark Side of the Pepe",
    image: "img/illumpepe.jpg",
    accessories: [{ accessory: 'enlightenment' }, { accessory: 'ennui'}, { accessory: 'euphoria'}],
    clicks: 0
  },
  {
    name: "Pepe the Painter",
    image: "img/painterpepe.jpg",
    accessories: [{ accessory: 'tendie painting' }, { accessory: 'paintbrush'}, { accessory: 'beret'}],
    clicks: 0
  }
];

var Pepe = function(data) {
  this.clicks = ko.observable(data.clicks);
  this.name = ko.observable(data.name);
  this.image = ko.observable(data.image);
  this.accessories = ko.observableArray(data.accessories);

  this.title = ko.computed(function() {
    var levels = ["New", "Obscure", "Rare", "Ultra Rare", "Coveted"];
    if (this.clicks() < 10) return levels[0];
    else if (this.clicks() < 50) return levels[1];
    else if (this.clicks() < 100) return levels[2];
    else if (this.clicks() < 500) return levels[3];
    else return levels[4];
  }, this);
};

var ViewModel = function() {
  var self = this;

  this.pepeList = ko.observableArray([]);

  pepeList.forEach(function(pepe) {
    self.pepeList.push(new Pepe(pepe));
  });

  this.currentPepe = ko.observable(this.pepeList()[0]);

  this.incrementCounter = function() {
    this.clicks(this.clicks() + 1);
  };

  this.changePepe = function(pepe) {
    self.currentPepe(pepe);
  };
};

ko.applyBindings(new ViewModel());
