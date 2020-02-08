
$("#recipes").on("click", function(event) {
    event.preventDefault();
/*function displayRecipes() {*/
    $("#recipe-view").empty();
   var food = $("#recipe-input").val().trim();

   
    var queryURL = "https://api.spoonacular.com/recipes/search?query=" + food + "&number=10&apiKey=870e3a3ad9bf44e3b6c302af33f72f11";
    console.log(queryURL)
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);

        for (var i = 0; i < response.length; i++) {
            var recipesDiv = $('<div class="col-lg-5"></div>');

            var p = $("<p>");
            p.text(response[i].title);
            var p = $("<p>").text("Title: " + response[i].title);

            var img = $("<img>");
            img.attr("src", response[i].image);
            

            recipesDiv.prepend(p);
            recipesDiv.prepend(img);

            $("#recipe-view").append(recipesDiv);
    }})})
;


  /* $(document).on("click", "#recipes", displayRecipes); */

