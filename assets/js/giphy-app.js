$(document).ready(function () {

    var topicBtnArray = ["the masked singer", "computers", "music", "guitar", "drums", "taylor swift", "cats", "dogs", "smartphones"];

    function createButton(topicsArray, topicClass, storeTopicResults) {
        $(storeTopicResults).empty();
        for (var i = 0; i < topicsArray.length; i++) {
            var a = $("<button>");
            a.addClass(topicClass);
            a.attr("data-type", topicsArray[i]);
            a.text(topicsArray[i]);
            $(storeTopicResults).append(a);
        }
    }

    $(document).on('click', '.topic-button', function () {
        $('#topics').empty();
        $('.topic-button').removeClass('active');
        $(this).addClass('active');

        var type = $(this).attr('data-type');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            type + "&api_key=wqWPwnwvmTeWthIWN0Hl90tZizhktHfj&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;

            for(var i = 0; i < results.length;i++) {
                var topicDiv = $("<div class='topic-item'>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);

                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;

                var topicImage = $('<img>');
                topicImage.attr("src", still);
                topicImage.attr("data-still", still);
                topicImage.attr("data-animate", animated);
                topicImage.attr("data-state", "still");
                topicImage.addClass("topic-image");
      
                topicDiv.append(p);
                topicDiv.append(topicImage);
      
                $("#topics").append(topicDiv);
            }
        });

    });

    $(document).on("click", ".topic-image", function() {

        var state = $(this).attr("data-state");
    
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }
        else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });


    


});