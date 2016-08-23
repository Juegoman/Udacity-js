var pepeID, $count, ind, insertHTML, insertPepe;
//list of pepes
var pepeList = [
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
];

$(document).ready(function() {
  //populate the right list of pepes
  for (var i = 0; i < pepeList.length; i++) {
    pepeID = 'pepelink' + i;
    insertHTML = '' +
    '<a href="#" id="' + pepeID + '">' +
      pepeList[i].name +
      '<img alt="' + pepeList[i].name + '" src="' + pepeList[i].image + '">' +
    '</a>';
    $(".pepe-list").append(insertHTML);
  }

  //click handler for bringing up a pepe on the left side of the screen.
  $(".pepe-list a").click(function(e) {
    //unbind events to prevent memleaks and clear the right side.
    $(".pepe-container img").off();
    $(".pepe-container").html('');
    //get the index of the pepe selected.
    ind = parseInt($(this).attr("id").replace("pepelink", ''));
    //build the HTML to insert.
    insertPepe = '' +
    '<div class="pepe">' +
      '<h2 class="name">' + pepeList[ind].name + '</h2>' +
      '<h3>' +
        'This pepe has been memed <span class="count">' + pepeList[ind].clicks + '</span> times.' +
      '</h3>' +
      '<img alt="' + pepeList[ind].name + '" src="' + pepeList[ind].image + '">' +
    '</div>';
    //append the HTML and attach the click listener.
    $(".pepe-container").append(insertPepe);
    $(".pepe-container img").on("click", pepeClickEvent(ind));
  });
});

//closure for click event.
var pepeClickEvent = function(index) {
  return function() {
    //get the counter, increment the count and update the counter.
    $count = $(this).parent().find(".count");
    pepeList[index].clicks += 1;
    $count.text(pepeList[index].clicks + '');
  };
};
