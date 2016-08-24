$(document).ready(function() {
  //model object
  var model = {
    //initialization for the model
    init: function() {
      //if doesn't have data for this application, initialize the data.
      if (!localStorage.pepes) {
        localStorage.pepes = JSON.stringify(this.pepeList);
      }
      //set the current selection to a default value.
      this.currentPepe = 0;
    },
    //increment the clicks of the current selection.
    incrementCurrentPepe: function() {
      var pepes = JSON.parse(localStorage.pepes);
      pepes[this.currentPepe].clicks += 1;
      localStorage.pepes = JSON.stringify(pepes);
    },
    //return the entire data array.
    getPepeList: function() {
      return JSON.parse(localStorage.pepes);
    },
    //return the currently selected pepe.
    getCurrentPepe: function() {
      return JSON.parse(localStorage.pepes)[this.currentPepe];
    },
    //update the current selection.
    updateCurrentPepe: function(index) {
      this.currentPepe = index;
    },
    //update the data for the currently selected pepe and save the data.
    updatePepe: function(name, imgSrc) {
      var pepes = this.getPepeList();
      pepes[this.currentPepe].name = name;
      pepes[this.currentPepe].image = imgSrc;
      localStorage.pepes = JSON.stringify(pepes);
    },
    //add a new pepe to the data.
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
    //default data set
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
  //view object
  var view = {
    //initialization for the view.
    init: function() {
      //create some shortcut variables, initialize the form and populate the pepe list.
      this.$pepeList = $(".pepe-list");
      this.$pepeContainer = $(".pepe-container");
      this.initForm();
      this.populatePepeList();
    },
    //bind event handlers to all the form buttons.
    initForm: function() {
      $("#open").on("click", function() {view.showAddForm();});
      $("#cancel").on("click", function() {view.hideAddForm();});
      $("#update").on("click", function() {view.updatePepeEvent();});
      $("#add").on("click", function() {view.addPepeEvent();});
    },
    //populate the pepe list.
    populatePepeList: function() {
      //prevent mem leaks.
      $(".pepe-list a").off();
      //clear the list.
      this.$pepeList.html('');
      //get the data from the controller
      var pepeList = controller.getPepeList();
      //loop through the date, creating HTML and inserting it, then binding a click event to change the selection.
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
    //render the selected pepe
    renderPepe: function() {
      //get the selected data.
      var pepe = controller.getCurrentPepe();
      //clear the displayed pepe
      this.$pepeContainer.html('');
      //create HTML and insert it.
      var insertHTML = '' +
      '<div class="pepe">' +
        '<h2 class="name">' + pepe.name + '</h2>' +
        '<h3>' +
          'This pepe has been memed <span class="count">' + pepe.clicks + '</span> times.' +
        '</h3>' +
        '<img alt="' + pepe.name + '" src="' + pepe.image + '">' +
      '</div>';
      this.$pepeContainer.append(insertHTML);
      //update the form so it's accurate if open.
      this.updateForm();
    },
    //update the count if it's changed.
    updateCount: function() {
      $(".count").text(controller.getCurrentPepe().clicks + '');
    },
    //update the form's filled in values.
    updateForm: function() {
      pepe = controller.getCurrentPepe();
      $("#name").val(pepe.name);
      $("#imgsrc").val(pepe.image);
    },
    //open up the form and populate the inputs.
    showAddForm: function() {
      this.updateForm();
      $("form").slideDown();
    },
    //close the form and clear the inputs.
    hideAddForm: function() {
      $("form").slideUp();
      $("#name").val('');
      $("#imgsrc").val('');
    },
    //get the input values and pass them into the controller to get added to the model. Then reset the view.
    updatePepeEvent: function() {
      var newName = $("#name").val();
      var newImgSrc = $("#imgsrc").val();
      controller.updatePepe(newName, newImgSrc);
      this.hideAddForm();
      this.populatePepeList();
      this.renderPepe();
    },
    //get the input values and pass them into the controller to get added to the model. Then reset the view.
    addPepeEvent: function() {
      var name = $("#name").val();
      var imgSrc = $("#imgsrc").val();
      controller.addPepe(name, imgSrc);
      this.hideAddForm();
      this.populatePepeList();
      this.renderPepe();
    }
  };
  //controller object
  var controller = {
    //application initialization.
    init: function() {
      model.init();
      view.init();
    },
    //returns the main list from the model.
    getPepeList: function() {
      return model.getPepeList();
    },
    //returns the current selection from the model.
    getCurrentPepe: function() {
      return model.getCurrentPepe();
    },
    //Event listener closure for changing the selection.
    pepeListClickEvent: function(index) {
      return function() {
        //prevent memleaks
        $(".pepe-container img").off();
        //change the selection
        controller.setCurrentPepe(index);
        //render the selection
        view.renderPepe();
        //bind the click listener to the main image.
        $(".pepe-container img").on("click", controller.pepeClickEvent());
      };
    },
    //Event listener closure for incrementing the current selection.
    pepeClickEvent: function() {
      return function() {
        model.incrementCurrentPepe();
        view.updateCount();
      };
    },
    //change the selection.
    setCurrentPepe: function(index) {
      model.updateCurrentPepe(index);
    },
    //pass the updated data to the model.
    updatePepe: function(name, imgSrc) {
      model.updatePepe(name, imgSrc);
    },
    //pass the new data to the model.
    addPepe: function(name, imgSrc) {
      model.addPepe(name, imgSrc);
    }
  };
  //initializate the application.
  controller.init();
});
