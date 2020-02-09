
//Search for Recipes
$("#recipes").on("click", function(event) {

  //Prevent the page from reloading when user clicks on Search for Recipes
  event.preventDefault();

   $("#recipe-view").empty();
   var food = $("#recipe-input").val().trim();

    var queryURL = "https://api.spoonacular.com/recipes/search?query=" + food + "&number=10&apiKey=870e3a3ad9bf44e3b6c302af33f72f11";
    console.log(queryURL)
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);

        //Loop through the recipes to add them to the page
        for (var i = 0; i < response.results.length; i++) {
          console.log("i: " + i);

          var recipesDiv = $('<div class="col-lg-5"></div>');

          var p = $("<p>");
          p.text(response.results[i].title);
          var p = $("<p>").text("Title: " + response.results[i].title);

          var img = $("<img>");
          img.attr("src", response.baseUri + response.results[i].image);
          img.attr("data-name", response.results[i].id)
          img.attr("class", "recipeinfo");
          
          recipesDiv.prepend(p);
          recipesDiv.prepend(img);

          //Add the recipe to the page
          $("#recipe-view").append(recipesDiv);
        }
      })
    });

  function getIngredients () {

    //Clear the ingredients already shown on the screen
    $("#ingredients-view").empty();

    //Get the recipe Id for the clicked image that we can get the ingredients
    var recipeId = $(this).attr("data-name");
    console.log("Fetching ingredients for: " + recipeId)

    //Build the API query to get ingredients for the clicked recipe
    var queryURL = "https://api.spoonacular.com/recipes/" + recipeId + "/information?apiKey=870e3a3ad9bf44e3b6c302af33f72f11";
    console.log(queryURL)
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      //Loop through the ingredients and add them to the page
      for (var x = 0; x < response.extendedIngredients.length; x++) {
        
      var ingredientsDiv = $('<div class="col-lg-5"></div>');
      //console.log("x: " + x);

      var p = $("<p>");
      p.text(response.extendedIngredients[x].original);
      var p = $("<p>").text(response.extendedIngredients[x].original);

      // var img = $("<img>");
      // img.attr("src", response.baseUri + response.results[i].image);
      // img.attr("data-name", response.results[i].id)
      // img.attr("class", "recipeinfo");
      
      ingredientsDiv.prepend(p);
      // recipesDiv.prepend(img);
      
      //Add ingredients to the page
      $("#ingredients-view").prepend(ingredientsDiv);
      
      };
    });
  };

  //On Click Events
  $(document).on("click", ".recipeinfo", getIngredients);

