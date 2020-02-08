// applcation javascript

/* Firebase configuration */



/* Spoonacular API Call */
/*initial recipe call, setup to return 10 recipes*/
var food = "cheese";
var queryURL = "https://api.spoonacular.com/recipes/search?query=" + food + "&number=10&apiKey=870e3a3ad9bf44e3b6c302af33f72f11";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);

});

/*call for ingredients by recipe ID*/

var recipeId = "116679";
   
var queryURL = "https://api.spoonacular.com/recipes/" + ID + "/information?includeNutrition=false&apiKey=870e3a3ad9bf44e3b6c302af33f72f11";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);

});



/* Kroger Locations API Call */



/* Kroger Pricing Call */