var giffy = ["Joe Dirt", "Wedding Crashers", "Remember the Titans", "Old School", "Masterminds", "Meet the Millers", "Caddyshack",
    "Legends of Bagger Vance", "Good Will Hunting", "Fast Times at Ridgemont High"
];

var gifs = $('#gif_input').val();
var key = "5868968ce2344a4badf81372395500c1";
var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifs + "&api_key=" + key;


function buttons() {

    $("#btns").empty();

    for (var i = 0; i < giffy.length; i++) {

        var a = $('<button class="btn btn-success btn-xs">');

        a.addClass("movie");

        a.attr("data-name", giffy[i]);

        a.text(giffy[i]);

        $('#btns').append(a);

    }
}

buttons();

$('#search').on("click", function(event) {
    event.preventDefault();
    var movies = $('#gif_input').val().trim();
    giffy.push(movies);
    buttons();
})

$('.movie').on("click", function() {

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            console.log(queryURL);
            console.log(response);
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var movieDiv = $('<div>');
                var p = $('<p>').text("Rating: " + results[i].rating);
                var movieImage = $('<img>');
                movieImage.attr("src", results[i].images.fixed_height.url);
                movieDiv.append(p);
                movieDiv.append(movieImage);
                $("#gifs").append(movieDiv);

            }
        })
})