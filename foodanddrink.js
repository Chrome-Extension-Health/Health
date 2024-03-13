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
// let totalfatMinLimit = dailyIntake["placeholder"].calories * 0.2;
// let totalfatMaxLimit = dailyIntake["placeholder"].calories * 0.35;
// let saturatedfatLimit = dailyIntake["placeholder"].calories * 0.1;
// let proteinMinLimit = dailyIntake["placeholder"].calories * 0.1;
// let proteinMaxLimit = dailyIntake["placeholder"].calories * 0.15;
// let sodiumLimit = 2000;
// let potassiumMinLimit = 2700;
// let potassiumMaxLimit = 3100;
// let carbohydrateMinLimit = dailyIntake["placeholder"].calories * 0.55;
// let carbohydrateMaxLimit = dailyIntake["placeholder"].calories * 0.75;
// let fiberLimit = 25;
// let sugarLimit = dailyIntake["placeholder"].calories * 0.1;

document.addEventListener("DOMContentLoaded", function () {
  const resultContainer = document.getElementById("result-container");
  const submitButton = document.getElementById("submitButton");
  submitButton.addEventListener("click", async function () {
    resultContainer.innerHTML = ""; // clear
    hideError();
    const searchInput = document.getElementById("searchInput"); // get input
    const searching = searchInput.value.trim();
    searchInput.value = searching;
    const regex = new RegExp(/^[a-zA-Z0-9 ]*$/); // still in progress
    regex.test(searching)
      ? await fetchNutritionAPI(searching)
      : showError("Please input correctly.");
  });
});

async function fetchNutritionAPI(input) {
  const resultContainer = document.getElementById("result-container");
  const nutritionList = document.createElement("ul");
  const response = await fetch(nutritionAPI + input, {
    headers: { "X-Api-Key": "fSlNftfk2M+xcXCj+72fPg==LtbIt40Y0yAjeaJ4" },
  });
  const result = await response.json();
  if (result) {
    for (let i = 0; i < result.length; i++) {
      for (const [key, value] of Object.entries(result[i])) {
        if (key === "cholesterol_mg") {
          continue;
        }
        const li = document.createElement("li");
        li.textContent = `${key.replace(/_/g, " ")}: ${value}`;
        nutritionList.appendChild(li);
      }
      resultContainer.appendChild(nutritionList);
    }
  } else {
    return Promise.reject("result not found.");
  }
}

function showError(err) {
  const error = document.getElementById("error");
  error.textContent = err;
  error.style.display = "block";
}
function hideError() {
  const error = document.getElementById("error");
  error.textContent = "";
  error.style.display = "none";
}

//deprecated code
// fetchNutritionAPI("1lb brisket 100g fries");
// const name = result[i].name;
// const calories = result[i].calories;
// const servingSize = result[i].serving_size_g;
// const totalFat = result[i].fat_total_g;
// const saturatedFat = result[i].fat_saturated_g;
// const protein = result[i].protein_g;
// const sodium = result[i].sodium_mg;
// const potassium = result[i].potassium_mg;
// const carbohydrates = result[i].carbohydrates_total_g;
// const fiber = result[i].fiber_g;
// const sugar = result[i].sugar_g;

// async function fetchrecipeAPI(input) {
//   const response = await fetch(recipeAPI + input, {
//     headers: { "X-Api-Key": "fSlNftfk2M+xcXCj+72fPg==LtbIt40Y0yAjeaJ4" },
//   });
//   const result = await response.json();
//   console.log(result);
// }
// fetchrecipeAPI("fries");
