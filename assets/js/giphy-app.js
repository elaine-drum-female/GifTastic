$(document).ready(function () {
    
    var topicBtnArray = ["the masked singer", "computers", "music", "guitar", "drums", "taylor swift",  "cats" ,"dogs", "smartphones"];

   function createButton(topicsArray, topicClass,storeTopicResults) {
       $(storeTopicResults).empty();
       for(var i = 0; i < topicsArray.length;i++) {
           var a = $("<button>");
           a.addClass(topicClass);
           a.attr("data-type", topicsArray[i]);
           a.text(topicsArray[i]);
           $(storeTopicResults).append(a);
       }
   }

    function removeError() {
        $(document).on("keyup", ".messageError", function() {
            $(this).removeClass('messageError');
        });
    }

    // create new button from the topicSubmit button

    function addnewButton () {
        $('#topicSubmit').on('click', function () {
            debugger;
            $('#topicResults').empty();
            event.preventDefault();
            var userInput = $('#topic-input').val().trim();
            if(!userInput || topicBtnArray.indexOf(userInput) >= 0) {
                var errorMsg = $('<p>');
                errorMsg.addClass("messageError");
                //errorMsg.text("Error: please enter a topic!");
                $('#topic-form').append(errorMsg);
                $('#topic-input').after("<p class='messageError'>Error: please enter a topic!</p>");
            } else {
                
                $('#topic-input').next().empty('messageError');
                topicBtnArray.push(userInput);
                createGifButton(userInput);
            } 
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
                holdgifDiv.addClass('newSmall');
                holdgifDiv.addClass('cf');
                var gifRating = $('<p>').text("Rating: " + results[i].rating);
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



