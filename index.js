import { searchMeals } from "./fetchMeals.js";

// Search Result section element and Search input element
let resultSection = document.getElementById("result");
let searchMealInput = document.getElementById("searchMeal");

// Setting timeOut and typing timeout variables to avoid fetching meals on every input event.
let timeOut = null;
let typeTimeOut = 500;
searchMealInput.addEventListener("input", function () {
  // Clearing timeout and setting new timeout on every user input.
  clearTimeout(timeOut);
  timeOut = setTimeout(async () => {
    // get all related meals
    let meals = await searchMeals(this.value);
    updateMealsResultInDOM(meals);
  }, typeTimeOut);
});

async function updateMealsResultInDOM(meals) {
  //Clearing previous search result
  resultSection.innerHTML = "";
  let mealNodes = [];

  // Creating meal node of all the meals
  for (let meal of meals) {
    let mealDiv = document.createElement("div");
    mealDiv.className = "meal-card mt-3";
    mealDiv.innerHTML = `
    <div class="row">
    <div class="col-md-2">
      <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="${
      meal.strMeal
    }">
    </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title"><a class="link" href="./meal.html?i=${
            meal.idMeal
          }">${meal.strMeal}</a></h5>
          <p class="card-text">Category: <small class="text-secondary">${
            meal.strCategory
          }</small><br>
          Cuisine: <small class="text-secondary">${meal.strArea}</small></p>
          <p class="card-text"><a data-meal-id="${
            meal.idMeal
          }" class="text-muted link add-remove-favourite"><i class="fa-${
      localStorage.getItem(meal.idMeal) ? "solid" : "regular"
    } fa-heart"></i> ${
      localStorage.getItem(meal.idMeal) // Updating Add or Remove Favourite if exists
        ? "Remove from Favourites"
        : "Add to Favourites"
    }</a></p>
        </div>
      </div>
    </div>
    `;

    // Adding click event listiner to add or remove favourite link
    mealDiv
      .getElementsByClassName("add-remove-favourite")[0]
      .addEventListener("click", addRemoveFavouriteHandler);

    mealNodes.push(mealDiv);
  }
  // Add all meal nodes to result section element
  resultSection.append(...mealNodes);
}

// Add or Remove Favourite event Handler
function addRemoveFavouriteHandler(event) {
  event.preventDefault();
  let mealID = this.dataset.mealId;
  if (localStorage.getItem(mealID)) {
    localStorage.removeItem(mealID);
    this.innerHTML = `<i class="fa-regular fa-heart"></i> Add to Favourites`;
  } else {
    localStorage.setItem(mealID, true);
    this.innerHTML = `<i class="fa-solid fa-heart"></i> Remove from Favourites`;
  }
}
