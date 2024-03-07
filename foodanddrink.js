// document.addEventListener("DOMContentLoaded", function () {});
const nutritionAPI = "https://api.api-ninjas.com/v1/nutrition?query=";
const recipeAPI = "https://api.api-ninjas.com/v1/recipe?query=";
const dailyIntake = {
  YM: {
    age: "18-29.9",
    gender: "male",
    info: [{ calories: "1950" }],
  },
  AM: {
    age: "30-59.9",
    gender: "male",
    info: [{ calories: "2350" }],
  },
  EM: {
    age: ">=60",
    gender: "male",
    info: [{ calories: "2400" }],
  },
  YF: {
    age: "18-29.9",
    gender: "female",
    info: [{ calories: "1700" }],
  },
  AF: {
    age: "30-59.9",
    gender: "female",
    info: [{ calories: "1850" }],
  },
  EF: {
    age: ">=60",
    gender: "female",
    info: [{ calories: "1900" }],
  },
};

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
