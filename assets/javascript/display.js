
//Validate search data 
$("#recipes").on("click", function(event) {

  //Reset the page contents when search for new recipes
  $(".row").empty();

  console.log("validating search input")

  //Prevent the page from reloading when user clicks on Search for Recipes
  event.preventDefault();

  var valCheck = $("#recipe-input").val().trim();
  console.log("valCheck: " + valCheck);
  
  //Validate search criteria entered by the user
  if (valCheck == "") {
    text = "Search value cannot be blank";
    $("#valRecipeInput").text(text);
  }else {
    getRecipes();

    //Reset the form and get recipe data if validation is successful
    $("#recipe-form")[0].reset();
    $("#valRecipeInput").html("");
  }
  
  });

//Get recipes by the search data
function getRecipes() {

  console.log ("getting recipes for search input")

  //Prevent page refresh
  event.preventDefault();

  //Remove any prior recipes searched for when starting a new search
  $("#recipe-view").empty();

  var food = $("#recipe-input").val().trim();
  console.log("food: " + food);
  
  var queryURL = "https://api.spoonacular.com/recipes/search?query=" + food + "&number=3&apiKey=870e3a3ad9bf44e3b6c302af33f72f11";
  console.log(queryURL)
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

      if (response.results.length == 0) {
        text = "No results found";
        $("#valRecipeInput").text(text);
      } else {
      //Loop through the recipes to add them to the page
        for (var i = 0; i < response.results.length; i++) {
          console.log("--->", response.results[i].title);

          //Dynamically build the materialize card for the page
          var recipesDivTEST = '<div class="col s12 m4"><div class="icon-block"><div class="card small"><div class="card-image">';
          recipesDivTEST += '<img id="card-img" class="recipeinfo" src="' + response.baseUri + response.results[i].image + '" data-name="' + response.results[i].id + '"</img>';          
          recipesDivTEST += '</div><div class="card-content">';
          recipesDivTEST += '<p>' + response.results[i].title + '</p>';
          recipesDivTEST += '</div></div></div>';
          $("#recipe-view").append(recipesDivTEST);

        }
      }
    })
};

function getNutritionInfo(ingredient){
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data?ingr=${ingredient}`,
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "edamam-edamam-nutrition-analysis.p.rapidapi.com",
      "x-rapidapi-key": "372211e2bcmshe1d9fdb67c02279p17f4a0jsn401f1acc8f64"
    }
  }
  
  $.ajax(settings).done(function (response) {
  //  var ingredientsDiv = $('<div class="col-lg-5"></div>');
    var p = $("<p>");
    p.text(response.calories);
    var p = $("<p>").text(response.calories);

    ingredientsDiv.prepend(p);

        
    //Add ingredients to the page
    $("#ingredients-view").prepend(ingredientsDiv);
    
  })
}

//Get indredients for the clicked recipe
function getIngredients () {

  console.log('getting ingredients for the clicked recipe')

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
    getNutritionInfo(response.extendedIngredients[x].original)

    var p = $("<p>");
    p.text(response.extendedIngredients[x].original);
    var p = $("<p>").text(response.extendedIngredients[x].original);

    ingredientsDiv.prepend(p);
    
    //Add ingredients to the page
    $("#ingredients-view").prepend(ingredientsDiv);
    
    };
  });
};





//On Click Events
$(document).on("click", ".recipeinfo", getIngredients);
