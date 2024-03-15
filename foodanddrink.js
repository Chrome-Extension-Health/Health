const nutritionAPI = "https://api.api-ninjas.com/v1/nutrition?query=";
const recipeAPI = "https://api.api-ninjas.com/v1/recipe?query=";
const dailyIntake = [
  { group: "young male", age: "18-29", sex: "male", calories: 1950 },
  { group: "adult male", age: "30-59", sex: "male", calories: 2350 },
  { group: "elder male", age: ">=60", sex: "male", calories: 2400 },
  { group: "young female", age: "18-29", sex: "female", calories: 1700 },
  { group: "adult female", age: "30-59", sex: "female", calories: 1850 },
  { group: "elder female", age: ">=60", sex: "female", calories: 1900 },
];
let selectedCalories = 0
// let totalfatMinLimit = selectedCalories * 0.2;
// let totalfatMaxLimit = selectedCalories * 0.35;
// let saturatedfatLimit = selectedCalories * 0.1;
// let proteinMinLimit = selectedCalories * 0.1;
// let proteinMaxLimit = selectedCalories * 0.15;
// let sodiumLimit = 2000;
// let potassiumMinLimit = 2700;
// let potassiumMaxLimit = 3100;
// let carbohydrateMinLimit = selectedCalories * 0.55;
// let carbohydrateMaxLimit = selectedCalories * 0.75;
// let fiberLimit = 25;
// let sugarLimit = selectedCalories * 0.1;

document.addEventListener("DOMContentLoaded", function () {
  const resultContainer = document.getElementById("result-container");
  const submitButton = document.getElementById("submitButton");
  submitButton.addEventListener("click", async function () {
    resultContainer.innerHTML = ""; // clear
    hideError();
    const searchInput = document.getElementById("searchInput"); // get input
    const searching = searchInput.value.trim();
    searchInput.value = searching;
    const regex = new RegExp(/^[a-zA-Z0-9 ]*$/);
    regex.test(searching)
      ? await fetchNutritionAPI(searching)
      : showError("Please input correctly.");
  });
});

async function fetchNutritionAPI(input) {
  const resultContainer = document.getElementById("result-container");
  const nutritionList = document.createElement("ul");
  const ageSelect = document.getElementById("age-select").value;
  const sexSelect = document.getElementById("sex-select").value;
  for (let i = 0; i < dailyIntake.length; i++) {
    ageSelect === dailyIntake[i].age && sexSelect === dailyIntake[i].sex
      ? selectedCalories = dailyIntake[i].calories
      : showError("Please select the corresponding age or sex.");
  }
  if (selectedCalories !== 0) {

  }
  // const response = await fetch(nutritionAPI + input, {
  //   headers: { "X-Api-Key": "fSlNftfk2M+xcXCj+72fPg==LtbIt40Y0yAjeaJ4" },
  // });
  // const result = await response.json();
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

//code for later use
// .toLocaleString("en", { style: "percent", minimumFractionDigits: 1 });

// let bodyContainer = document.createElement("div"); // body container for all elements
// bodyContainer.className = "bodyContainer";
// document.body.appendChild(bodyContainer);
// let searchInput = document.createElement("input"); // input
// searchInput.setAttribute("type", "text");
// searchInput.setAttribute("id", "searchInput");
// searchInput.setAttribute("placeholder", "e.g. 1lb brisket 100g fries");
// bodyContainer.appendChild(searchInput);
// let submitButton = document.createElement("button"); // button
// submitButton.setAttribute("id", "submitButton");
// bodyContainer.appendChild(submitButton);
// let error = document.createElement("error");
// error.setAttribute("id", "error");
// bodyContainer.appendChild(error);
// let resultContainer = document.createElement('div')
// resultContainer.setAttribute('id', 'result-container')
// bodyContainer.appendChild(resultContainer)

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
