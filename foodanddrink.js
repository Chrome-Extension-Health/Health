// document.addEventListener("DOMContentLoaded", function () {});
const nutritionAPI = "https://api.api-ninjas.com/v1/nutrition?query=";
const recipeAPI = "https://api.api-ninjas.com/v1/recipe?query=";
async function fetchNutritionAPI(input) {
  const response = await fetch(nutritionAPI + input, {
    headers: { "X-Api-Key": "fSlNftfk2M+xcXCj+72fPg==LtbIt40Y0yAjeaJ4" },
  });
  const result = await response.json();
  console.log(result);
}
fetchNutritionAPI("1lb brisket and fries");

async function fetchrecipeAPI(input) {
  const response = await fetch(recipeAPI + input, {
    headers: { "X-Api-Key": "fSlNftfk2M+xcXCj+72fPg==LtbIt40Y0yAjeaJ4" },
  });
  const result = await response.json();
  console.log(result);
}
fetchrecipeAPI("fries");
