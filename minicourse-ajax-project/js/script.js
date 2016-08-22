
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var street = $('#street').val();
    var city = $('#city').val();
    var streetcity = street + ', ' + city;

    $greeting.text('So, you want to live at ' + streetcity + '?');

    //build the streetview url and append the image to the page.
    var streetviewurl = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location='+ streetcity;
    $body.append('<img class="bgimg" src="' + streetviewurl +'">');

    // NYT AJAX
    var nytAPIKey = 'bf25999e86874b99b5dde4563b9e86d9';
    var nytURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + city + '&key=' + nytAPIKey;

    $.getJSON(nytURL, function(data) {
        var headline, art_url, snip, articleHTML;
        $nytHeaderElem.text('New York Times Articles About ' + city);
        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            //get the headline, url for the article and a snippet for the article
            headline = articles[i].headline.main;
            art_url = articles[i].web_url;
            snip = articles[i].snippet;
            //set up the HTML to insert and append it.
            articleHTML = '<li class="article"><a href="' + art_url + '">' + headline + '</a><p>' + snip + '</p></li>';
            $nytElem.append(articleHTML);
        }
    }).fail(function(e) {
        $nytHeaderElem.text('New York Times Articles Failed to Load.');
    });

    //Wikipedia AJAX
    var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + city + '&limit=5&namespace=0&format=json';

    var wikiReqTimeout = setTimeout(function() {
        $wikiElem.text("failed to get wikipedia resources.");
    }, 8000);

    $.ajax(wikiURL, {
        dataType: "jsonp",
        success: function(data) {
            //get the title and url arrays from the returned JSON.
            var titles = data[1], urls = data[3];
            for (var i = 0; i < titles.length; i++) {
                //set up the HTML to insert and append it.
                wikiListItemHTML = '<li><a href="' + urls[i] + '">' + titles[i] + '</a></li>';
                $wikiElem.append(wikiListItemHTML);
            }

            clearTimeout(wikiReqTimeout);
        },
        error: function(e) {
            console.error(e);
        }
    });

    return false;
}

$('#form-container').submit(loadData);
