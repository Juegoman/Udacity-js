$(document).ready(function() {
  var model = {
    init: function() {
      if (!localStorage.pepes) {
        localStorage.pepes = JSON.stringify(this.pepeList);
      }
      this.currentPepe = 0;
    },
    incrementCurrentPepe: function() {
      var pepes = JSON.parse(localStorage.pepes);
      pepes[this.currentPepe].clicks += 1;
      localStorage.pepes = JSON.stringify(pepes);
    },
    getPepeList: function() {
      return JSON.parse(localStorage.pepes);
    },
    getCurrentPepe: function() {
      return JSON.parse(localStorage.pepes)[this.currentPepe];
    },
    updateCurrentPepe: function(index) {
      this.currentPepe = index;
    },
    updatePepe: function(name, imgSrc) {
      var pepes = this.getPepeList();
      pepes[this.currentPepe].name = name;
      pepes[this.currentPepe].image = imgSrc;
      localStorage.pepes = JSON.stringify(pepes);
    },
    addPepe: function(newName, newImgSrc) {
      var pepes = this.getPepeList();
      var newPepe = {
        name: newName,
        image: newImgSrc,
        clicks: 0
      };
      pepes.push(newPepe);
      localStorage.pepes = JSON.stringify(pepes);
    },
    pepeList: [
      {
        name: "ASCII Pepe",
        image: "ascii-pepe.gif",
        clicks: 0
      },
      {
        name: "Original Pepe",
        image: "orig-pepe.jpg",
        clicks: 0
      },
      {
        name: "Extremely Rare Limited Edition Misprint Pepe",
        image: "misprintpepe.gif",
        clicks: 0
      },
      {
        name: "Dark Side of the Pepe",
        image: "illumpepe.jpg",
        clicks: 0
      },
      {
        name: "Pepe the Painter",
        image: "painterpepe.jpg",
        clicks: 0
      }
    ]
  };

  var view = {
    init: function() {
      this.$pepeList = $(".pepe-list");
      this.$pepeContainer = $(".pepe-container");
      this.initForm();
      this.populatePepeList();
    },
    initForm: function() {
      $("#open").on("click", function() {view.showAddForm();});
      $("#cancel").on("click", function() {view.hideAddForm();});
      $("#update").on("click", function() {view.updatePepeEvent();});
      $("#add").on("click", function() {view.addPepeEvent();});
    },
    populatePepeList: function() {
      $(".pepe-list a").off();
      this.$pepeList.html('');
      var pepeList = controller.getPepeList();
      for (var i = 0; i < pepeList.length; i++) {
        var insertHTML = '' +
        '<a href="#">' +
          pepeList[i].name +
          '<img alt="' + pepeList[i].name + '" src="' + pepeList[i].image + '">' +
        '</a>';
        this.$pepeList.append(insertHTML);
        $($(".pepe-list a")[i]).on("click", controller.pepeListClickEvent(i));
      }
    },
    renderPepe: function() {
      var pepe = controller.getCurrentPepe();
      this.$pepeContainer.html('');
      var insertHTML = '' +
      '<div class="pepe">' +
        '<h2 class="name">' + pepe.name + '</h2>' +
        '<h3>' +
          'This pepe has been memed <span class="count">' + pepe.clicks + '</span> times.' +
        '</h3>' +
        '<img alt="' + pepe.name + '" src="' + pepe.image + '">' +
      '</div>';
      this.$pepeContainer.append(insertHTML);
      this.updateForm();
    },
    updateCount: function() {
      $(".count").text(controller.getCurrentPepe().clicks + '');
    },
    updateForm: function() {
      pepe = controller.getCurrentPepe();
      $("#name").val(pepe.name);
      $("#imgsrc").val(pepe.image);
    },
    showAddForm: function() {
      this.updateForm();
      $("form").slideDown();
    },
    hideAddForm: function() {
      $("form").slideUp();
      $("#name").val('');
      $("#imgsrc").val('');
    },
    updatePepeEvent: function() {
      var newName = $("#name").val();
      var newImgSrc = $("#imgsrc").val();
      controller.updatePepe(newName, newImgSrc);
      this.hideAddForm();
      this.populatePepeList();
      this.renderPepe();
    },
    addPepeEvent: function() {
      var name = $("#name").val();
      var imgSrc = $("#imgsrc").val();
      controller.addPepe(name, imgSrc);
      this.hideAddForm();
      this.populatePepeList();
      this.renderPepe();
    }
  };

  var controller = {
    init: function() {
      model.init();
      view.init();
    },
    getPepeList: function() {
      return model.getPepeList();
    },
    getCurrentPepe: function() {
      return model.getCurrentPepe();
    },
    pepeListClickEvent: function(index) {
      return function() {
        $(".pepe-container img").off();
        controller.setCurrentPepe(index);
        view.renderPepe();
        $(".pepe-container img").on("click", controller.pepeClickEvent());
      };
    },
    pepeClickEvent: function() {
      return function() {
        model.incrementCurrentPepe();
        view.updateCount();
      };
    },
    setCurrentPepe: function(index) {
      model.updateCurrentPepe(index);
    },
    updatePepe: function(name, imgSrc) {
      model.updatePepe(name, imgSrc);
    },
    addPepe: function(name, imgSrc) {
      model.addPepe(name, imgSrc);
    }
  };

  controller.init();
});
