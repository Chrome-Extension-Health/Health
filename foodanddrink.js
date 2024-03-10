// document.addEventListener("DOMContentLoaded", function () {});
const nutritionAPI = "https://api.api-ninjas.com/v1/nutrition?query=";
const recipeAPI = "https://api.api-ninjas.com/v1/recipe?query=";
const dailyIntake = {
  YM: {
    age: "18-29.9",
    gender: "male",
    calories: 1950,
  },
  AM: {
    age: "30-59.9",
    gender: "male",
    calories: 2350,
  },
  EM: {
    age: ">=60",
    gender: "male",
    calories: 2400,
  },
  YF: {
    age: "18-29.9",
    gender: "female",
    calories: 1700,
  },
  AF: {
    age: "30-59.9",
    gender: "female",
    calories: 1850,
  },
  EF: {
    age: ">=60",
    gender: "female",
    calories: 1900,
  },
};
let totalfatMin = dailyIntake["placeholder"].calories * 0.2;
let totalfatMax = dailyIntake["placeholder"].calories * 0.35;
let saturatedfat = dailyIntake["placeholder"].calories * 0.1;
let proteinMin = dailyIntake["placeholder"].calories * 0.1;
let proteinMax = dailyIntake["placeholder"].calories * 0.15;
let sodium = 2000;
let potassiumMin = 2700;
let potassiumMax = 3100;
let carbohydrateMin = dailyIntake["placeholder"].calories * 0.55;
let carbohydrateMax = dailyIntake["placeholder"].calories * 0.75;
let fiber = 25;
let sugar = dailyIntake["placeholder"].calories * 0.1;



// async function fetchNutritionAPI(input) {
//   const response = await fetch(nutritionAPI + input, {
//     headers: { "X-Api-Key": "fSlNftfk2M+xcXCj+72fPg==LtbIt40Y0yAjeaJ4" },
//   });
//   const result = await response.json();
//   console.log(result);
// }
// fetchNutritionAPI("1lb brisket and fries");

// async function fetchrecipeAPI(input) {
//   const response = await fetch(recipeAPI + input, {
//     headers: { "X-Api-Key": "fSlNftfk2M+xcXCj+72fPg==LtbIt40Y0yAjeaJ4" },
//   });
//   const result = await response.json();
//   console.log(result);
// }
// fetchrecipeAPI("fries");
