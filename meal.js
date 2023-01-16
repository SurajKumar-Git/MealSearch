import { getMealByID } from "./fetchMeals.js";

document.addEventListener("DOMContentLoaded", async () => {
  const url = new URL(location.href);
  const mealID = url.searchParams.get("i");
  if (mealID) {
    let meal = await getMealByID(mealID);
    constructDOMForMeal(meal);
  }
});

function constructDOMForMeal(meal) {
  let mainElement = document.getElementById("main");
  let innerHTML = `
  <h2 class="h2">${meal.strMeal}</h2>
  <div class="tags d-flex">
  `;

  // If meal has tags, then add tags to tags div
  let mealTags = meal.strTags ? meal.strTags.split(",") : [];
  for (const tag of mealTags) {
    innerHTML += `<span class="badge rounded-pill text-bg-secondary">${tag}</span>`;
  }

  innerHTML += `</div>
  <div class="meal-thumbnail mt-3">
    <a href="${meal.strYoutube}" target="_blank" class="link"><img src="${
    meal.strMealThumb
  }" class="img-fluid" alt="${meal.strMeal}">
      <div class="middle fs-2">
        Click to watch the YouTube video
      </div>
    </a>
    
  </div>

  <p class="fs-5 favourite mt-3">
    <a data-meal-id="${
      meal.idMeal
    }" class="text-muted link add-remove-favourite"><i class="fa-${
    localStorage.getItem(meal.idMeal) ? "solid" : "regular"
  } fa-heart"></i> ${
    localStorage.getItem(meal.idMeal) // Updating Add or Remove Favourite if exists
      ? "Remove from Favourites"
      : "Add to Favourites"
  }
    </a>
  </p>

  <div class="mt-3">
    <p class="fs-5">Category: <small class="text-secondary">${
      meal.strCategory
    }</small><br>Cuisine: <small class="text-secondary">${meal.strArea}</small>
    </p>
  </div>

  <div class="ingredients-section mt-5 w-50">
    <h3 class="h3">Ingredients List</h3>
    <table class="table table-borderless table-sm">
      <thead>
        <tr>
          <th>Ingredients</th>
          <th>Measurement</th>
        </tr>
      </thead>
      <tbody>
  `;

  // Add Ingredients and their measure to Ingredients table
  for (let i = 1; i <= 20; i++) {
    let ingredientKey = "strIngredient" + i;
    let measureKey = "strMeasure" + i;
    if (meal[ingredientKey]) {
      innerHTML += `<tr>
        <td>${meal[ingredientKey]}</td>
        <td>${meal[measureKey]}</td>
      </tr>`;
    } else {
      // Break when ingredient key is empty
      break;
    }
  }

  innerHTML += `
      </tbody>
    </table>
  </div>

  <div class="cooking-instructions-section mt-5">
    <h3 class="h3">Cooking Instructions</h3>
    <p class="fs-6">${meal.strInstructions}</p>
  </div>
  `;

  mainElement.innerHTML = innerHTML;

  // Adding click event listiner to add or remove favourite link
  mainElement
    .getElementsByClassName("add-remove-favourite")[0]
    .addEventListener("click", addRemoveFavouriteHandler);
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
