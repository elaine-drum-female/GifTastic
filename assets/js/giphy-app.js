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

    
});



