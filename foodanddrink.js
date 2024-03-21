const nutritionAPI = "https://api.api-ninjas.com/v1/nutrition?query=";
const dailyIntake = [
  { group: "young male", age: "18-29", sex: "male", calories: 1950 },
  { group: "adult male", age: "30-59", sex: "male", calories: 2350 },
  { group: "elder male", age: ">=60", sex: "male", calories: 2400 },
  { group: "young female", age: "18-29", sex: "female", calories: 1700 },
  { group: "adult female", age: "30-59", sex: "female", calories: 1850 },
  { group: "elder female", age: ">=60", sex: "female", calories: 1900 },
];
let selectedCalories = 0;
function nutritionHTML() {
  let bodyContainer = document.createElement("div"); // body container for all elements
  bodyContainer.className = "bodyContainer";
  document.body.appendChild(bodyContainer);
  bodyContainer.innerHTML = "";
  let searchInput = document.createElement("input"); // input
  searchInput.setAttribute("type", "text");
  searchInput.setAttribute("id", "searchInput");
  searchInput.setAttribute("placeholder", "e.g. 1lb brisket 100g fries");
  bodyContainer.appendChild(searchInput);
  let createSubmitButton = document.createElement("button"); // button
  createSubmitButton.setAttribute("id", "submitButton");
  createSubmitButton.textContent = "Search";
  bodyContainer.appendChild(createSubmitButton);
  let age = document.createElement("select"); // age-select
  age.setAttribute("name", "age");
  age.setAttribute("id", "age-select");
  bodyContainer.appendChild(age);
  let ageOption1 = document.createElement("option");
  ageOption1.setAttribute("value", "");
  ageOption1.textContent = "--Age--";
  age.appendChild(ageOption1);
  let ageOption2 = document.createElement("option");
  ageOption2.setAttribute("value", "18-29");
  ageOption2.textContent = "18-29";
  age.appendChild(ageOption2);
  let ageOption3 = document.createElement("option");
  ageOption3.setAttribute("value", "30-59");
  ageOption3.textContent = "30-59";
  age.appendChild(ageOption3);
  let ageOption4 = document.createElement("option");
  ageOption4.setAttribute("value", ">=60");
  ageOption4.textContent = ">=60";
  age.appendChild(ageOption4);
  let sex = document.createElement("select"); // sex-select
  sex.setAttribute("name", "sex");
  sex.setAttribute("id", "sex-select");
  bodyContainer.appendChild(sex);
  let sexOption1 = document.createElement("option");
  sexOption1.setAttribute("value", "");
  sexOption1.textContent = "--Sex--";
  sex.appendChild(sexOption1);
  let sexOption2 = document.createElement("option");
  sexOption2.setAttribute("value", "male");
  sexOption2.textContent = "Male";
  sex.appendChild(sexOption2);
  let sexOption3 = document.createElement("option");
  sexOption3.setAttribute("value", "female");
  sexOption3.textContent = "Female";
  sex.appendChild(sexOption3);
  let error = document.createElement("error"); // error
  error.setAttribute("id", "error");
  bodyContainer.appendChild(error);
  let resultContainer = document.createElement("div"); // result container
  resultContainer.setAttribute("id", "result-container");
  bodyContainer.appendChild(resultContainer);
}
nutritionHTML();
const submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", async function () {
  const resultContainer = document.getElementById("result-container");

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
async function fetchNutritionAPI(input) {
  const resultContainer = document.getElementById("result-container");
  const ageSelect = document.getElementById("age-select").value;
  const sexSelect = document.getElementById("sex-select").value;
  for (let i = 0; i < dailyIntake.length; i++) {
    ageSelect == dailyIntake[i].age && sexSelect == dailyIntake[i].sex // still need code to block empty inputs, used for loop so error msg shown everytime
      ? (selectedCalories = dailyIntake[i].calories)
      : showError("Please select the corresponding age or sex.");
  }
  let totalfatMinLimit = selectedCalories * 0.2;
  let totalfatMaxLimit = selectedCalories * 0.35;
  let saturatedfatMaxLimit = selectedCalories * 0.1;
  let proteinMinLimit = selectedCalories * 0.1;
  let proteinMaxLimit = selectedCalories * 0.15;
  let sodiumMaxLimit = 2000;
  let potassiumMinLimit = 2700;
  let potassiumMaxLimit = 3100;
  let carbohydrateMinLimit = selectedCalories * 0.55;
  let carbohydrateMaxLimit = selectedCalories * 0.75;
  let fiberMinLimit = 25;
  let sugarMaxLimit = selectedCalories * 0.1;
  const response = await fetch(nutritionAPI + input, {
    headers: { "X-Api-Key": "fSlNftfk2M+xcXCj+72fPg==LtbIt40Y0yAjeaJ4" },
  });
  const result = await response.json();
  if (result) {
    for (let i = 0; i < result.length; i++) {
      const nutritionList = document.createElement("ul");
      for (const [key, value] of Object.entries(result[i])) {
        const li = document.createElement("li");
        // write IF for every key
        if (key === "cholesterol_mg") {
          continue;
        }
        key === "name"
          ? (li.textContent = `Name: ${value}`)
          : key === "calories"
          ? (li.textContent = `Calories: ${value}kcal ${(
              value / selectedCalories
            ).toLocaleString("en", {
              style: "percent",
              minimumFractionDigits: 1,
            })}`)
          : key === "serving_size_g"
          ? (li.textContent = `Serving size: ${value}g`)
          : key === "fat_total_g"
          ? (li.textContent = `Total fat: ${value}g ${(
              value / totalfatMaxLimit
            ).toLocaleString("en", {
              style: "percent",
              minimumFractionDigits: 1,
            })}-${(value / totalfatMinLimit).toLocaleString("en", {
              style: "percent",
              minimumFractionDigits: 1,
            })}`)
          : key === "fat_saturated_g"
          ? (li.textContent = `Saturated fat: ${value}g ${(
              value / saturatedfatMaxLimit
            ).toLocaleString("en", {
              style: "percent",
              minimumFractionDigits: 1,
            })}`)
          : key === "protein_g"
          ? (li.textContent = `Protein: ${value}g ${(
              value / proteinMaxLimit
            ).toLocaleString("en", {
              style: "percent",
              minimumFractionDigits: 1,
            })}-${(value / proteinMinLimit).toLocaleString("en", {
              style: "percent",
              minimumFractionDigits: 1,
            })}`)
          : key === "sodium_mg"
          ? (li.textContent = `Sodium: ${value}mg ${(
              value / sodiumMaxLimit
            ).toLocaleString("en", {
              style: "percent",
              minimumFractionDigits: 1,
            })}`)
          : key === "potassium_mg"
          ? (li.textContent = `Potassium: ${value}mg ${(
              value / potassiumMaxLimit
            ).toLocaleString("en", {
              style: "percent",
              minimumFractionDigits: 1,
            })}-${(value / potassiumMinLimit).toLocaleString("en", {
              style: "percent",
              minimumFractionDigits: 1,
            })}`)
          : key === "carbohydrates_total_g"
          ? (li.textContent = `Total carbohydrates: ${value}g ${(
              value / carbohydrateMaxLimit
            ).toLocaleString("en", {
              style: "percent",
              minimumFractionDigits: 1,
            })}-${(value / carbohydrateMinLimit).toLocaleString("en", {
              style: "percent",
              minimumFractionDigits: 1,
            })}`)
          : key === "fiber_g"
          ? (li.textContent = `Fiber: ${value}g ${(
              value / fiberMinLimit
            ).toLocaleString("en", {
              style: "percent",
              minimumFractionDigits: 1,
            })}`)
          : key === "sugar_g"
          ? (li.textContent = `Sugar: ${value}g ${(
              value / sugarMaxLimit
            ).toLocaleString("en", {
              style: "percent",
              minimumFractionDigits: 1,
            })}`)
          : null;
        if (value == 0) {
          continue;
        }
        if (li.textContent !== "") {
          nutritionList.appendChild(li);
        }
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
// .toLocaleString("en", { style: "percent", minimumFractionDigits: 1 })

//deprecated code
// li.textContent = `${key.replace(/_/g, " ")}: ${value}`;
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

// const recipeAPI = "https://api.api-ninjas.com/v1/recipe?query=";
// async function fetchrecipeAPI(input) {
//   const response = await fetch(recipeAPI + input, {
//     headers: { "X-Api-Key": "fSlNftfk2M+xcXCj+72fPg==LtbIt40Y0yAjeaJ4" },
//   });
//   const result = await response.json();
//   console.log(result);
// }
// fetchrecipeAPI("fries");
