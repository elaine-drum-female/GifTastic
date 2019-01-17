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
            if(!userinput || topicBtnArray.indexOf(userInput) >= 0) {
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
            
        }
    }


});



