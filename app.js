var giffy = ["Joe Dirt", "Wedding Crashers", "Remember the Titans", "Old School", "Masterminds", "Meet the Millers", "Caddyshack",
    "Legends of Bagger Vance", "Good Will Hunting", "Fast Times at Ridgemont High"
];

var key = "5868968ce2344a4badf81372395500c1";


for (var x = 0; x < giffy.length; x++) {
    console.log(giffy[x]);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giffy[x] + "&api_key=" + key + "&limit=10";
}

function buttons() {
    $("#btns").empty();

    for (var i = 0; i < giffy.length; i++) {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giffy[i] + "&api_key=" + key + "&limit=10";
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


$(document).ready(function() {

    $(document).on("click", '.movie', function() {

        $('#gifs').empty();

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).attr('data-name') + "&api_key=" + key + "&limit=10";

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .done(function(response) {
                console.log(queryURL);
                console.log(response);

                var results = response.data;
                for (var l = 0; l < results.length; l++) {
                    var movieDiv = $('<div>');
                    var p = $('<p>').text("Rating: " + results[l].rating);
                    var movieImage = $('<img>');
                    movieImage.attr("src", results[l].images.fixed_height_still.url);
                    movieImage.attr("data-still", results[l].images.fixed_height_still.url);
                    movieImage.attr("data-animate", results[l].images.fixed_height.url);
                    movieImage.attr("data-state", "still");
                    movieImage.addClass("movie-image");
                    movieDiv.append(p);
                    movieDiv.append(movieImage);
                    $("#gifs").append(movieDiv);
                }

            })
    });

    $(this).on("click", ".movie-image", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    })
});