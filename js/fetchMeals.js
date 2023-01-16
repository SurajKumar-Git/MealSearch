const apiUrl = "https://www.themealdb.com/api/json/v1/1/";

export async function searchMeals(userInput) {
  // Search with meal name
  const response = await fetch(
    apiUrl + "search.php?" + new URLSearchParams({ s: userInput })
  );
  const data = await response.json();
  return data.meals ? data.meals : [];
}

export async function getMealByID(mealID) {
  const response = await fetch(
    apiUrl + "lookup.php?" + new URLSearchParams({ i: mealID })
  );
  const data = await response.json();
  return data.meals ? data.meals[0] : null;
}
