import { getMealByID } from "./fetchMeals.js";

// Favourite list div element
let favouriteList = document.getElementById("favourite-list");

// Load favourite meal list once dom is loaded
document.addEventListener("DOMContentLoaded", async () => {
  // get favourite meal ids from local storage
  let favouriteMealIds = Object.keys(localStorage);
  for (const mealId of favouriteMealIds) {
    const meal = await getMealByID(mealId);
    createAndAppendFavouriteMealNode(meal);
  }
});

function createAndAppendFavouriteMealNode(meal) {
  let favouriteNode = document.createElement("div");
  favouriteNode.className = "meal-card favourite-card mt-3";
  favouriteNode.innerHTML = `
    <div class="row">
      <div class="col-md-2">
        <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="${meal.strMeal}">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title"><a class="link" href="/meal.html?i=${meal.idMeal}">${meal.strMeal}</a></h5>
          <p class="card-text">Category: <small class="text-secondary">${meal.strCategory}</small><br>
          Cuisine: <small class="text-secondary">${meal.strArea}</small></p>
          <p class="card-text"><a data-meal-id="${meal.idMeal}" class="text-muted link remove-favourite"><i class="fa-solid fa-heart"></i> Remove from Favourites</a></p>
        </div>
      </div>
    </div>
    `;
  // Adding favourite meal node to favourite list div element
  favouriteList.appendChild(favouriteNode);
  // Adding click event lisitner to remove from favourites link
  favouriteNode
    .getElementsByClassName("remove-favourite")[0]
    .addEventListener("click", removeFromFavouritesList);
}

function removeFromFavouritesList(event) {
  let mealID = this.dataset.mealId;
  event.preventDefault();
  localStorage.removeItem(mealID);
  // Getting the parent element, i.e favourite card div
  let favouriteCard = this.closest(".favourite-card");
  if (favouriteCard) {
    favouriteCard.remove();
  }
}
