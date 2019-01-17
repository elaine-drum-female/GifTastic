$(document).ready(function () {

});
// variables
var topicBtnArray = ["dog" ,"cat", "rabbit", "horse", "hamster", "skunk", "goldfish","bird",
"ferret", "turtle","sugar glider","chinchilla","hedgehog","hermit crab","gerbil","pygamy goat","chicken",
"teacup pig","salamander","frog","computers","music"];

function createButton(topic){
    var uniqueButton = $("<button>")
        .attr('data-topic', topic);
        uniqueButton.text(topic);
    $('#topicContainer').append(uniqueButton);
} 

for(var i = 0; i < topicBtnArray.length;i++) {
    createButton(topicBtnArray[i]);
}

$("button").on("click", function(){
    var topic = $(this).attr("data-topic");
    var queryURL= "https://api.giphy.com/v1/gifs/search?q=" +
         topic + "&api_key=wqWPwnwvmTeWthIWN0Hl90tZizhktHfj&limit=10";
    
    $.ajax({
        url:queryURL,
        method:"GET"
    }).then(function (response){
        console.log(response);
        var results = response.data;
        console.log(results);
        $('#topicResults').empty();
        for(var i = 0; i < results.length;i++) {
            var holdDiv = $('<div>'); 
            var p = $('<p>').text("Rating: + " + results[0].rating);
            var topicImage = $('<img>');
            topicImage.attr('src', results[i].images.fixed_height_still.url)
                .attr('data-still', results[i].images.fixed_height_still.url)
                .attr('data-animate', results[i].images.fixed_height.url)
                .attr('data-state', 'still');
            holdDiv.append(p, topicImage);
            $('#topicResults').append(holdDiv);
        }
    });
});

$('#topicSubmit').on('click', function () {
    event.preventDefault();
    $("#topic-input").after("");
    var userInput = $('#topic-input').val().trim();
    if(!userInput || topicBtnArray.indexOf(userInput) >= 0) {
        $('#topic-input').val("");
        $('#topic-input').after("error");
        return false; // ignore the click if space or no text
    } createButton(userInput);
    $('#topic-input').val("");
    topicBtnArray.push(userInput); 
});


