$(document).ready(function () {
    // variables
    var topicBtnArray = ["computers", "music", "guitar", "drums", "the masked singer", "taylor swift"];

    // create gif button

    function createGifButton() {
        $('#topicContainer').empty();
        for(var i = 0; i < topicBtnArray.length;i++) {
            var uniqueButton = $("<button>");
            uniqueButton.addClass('newTopics');
            uniqueButton.attr('data-topic', topicBtnArray[i]);
            uniqueButton.text(topicBtnArray[i]);
            $('#topicContainer').append(uniqueButton);
        }
    }

    // create new button from the topicSubmit button

    function addnewButton () {
        $('#topicSubmit').on('click', function () {
            event.preventDefault();
            var userInput = $('#topic-input').val().trim();
            if(!userInput || topicBtnArray.indexOf(userInput) >= 0) {
                return false;
            }
            topicBtnArray.push(userInput); 
            createGifButton(userInput);
            return false;
        });
    }

    // display the gifs

    function displayGifs() {
        var userInput = $(this).attr('data-topic');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        userInput + "&api_key=wqWPwnwvmTeWthIWN0Hl90tZizhktHfj&limit=10";

        $.ajax({
            url:queryURL,
            method:"GET"
        }). then(function (response) {
            $('#topicResults').empty();
            var results = response.data;
            if (results == "") {
                alert ("No giphy's available!");
            }
            for (var i = 0; i < results.length; i++) {
                var holdgifDiv = $('<div>');
                var gifRating = $('p').text("Rating: " + results[i].rating);
                var gifImage = $('<img>');
                gifImage.attr('src', results[i].images.fixed_height_still.url)
                .attr('data-still', results[i].images.fixed_height_still.url)
                .attr('data-animate', results[i].images.fixed_height.url)
                .attr('data-state', 'still');
                gifImage.addClass('image');
                holdgifDiv.append(gifRating, gifImage);
                $('#topicResults').append(holdgifDiv);
            }
        });
    }

    // function list

    createGifButton();
    displayGifs();
    addnewButton();

    // event listeners

    $(document).on('click',  '.newTopics', displayGifs);
    $(document).on('click', '.image', function() {
        var state = $(this).attr('data-state');
        if(state == "still") {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');

        }
    });



});



