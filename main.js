// body container for all elements
let bodyContainer = document.createElement("div");
bodyContainer.className = "bodyContainer";
document.body.appendChild(bodyContainer);

// get css variables
let root = document.documentElement;
let style = getComputedStyle(root);
let darkest = style.getPropertyValue("--darkest");
let secondDarkest = style.getPropertyValue("--secondDarkest");
let middle = style.getPropertyValue("--middle");
let secondLightest = style.getPropertyValue("--secondLightest");
let lightest = style.getPropertyValue("--lightest");

landingPage();

// landing page
function landingPage() {
  bodyContainer.innerHTML = "";
  bodyContainer.style.removeProperty("background-color");
  bodyContainer.style.backgroundColor = "#abd0d9";
  let landingPage = document.createElement("div");
  landingPage.className = "landingPage";
  bodyContainer.style.overflowX = "hidden";
  bodyContainer.appendChild(landingPage);

  // Title
  let title = document.createElement("h1");
  title.className = "title";
  title.textContent = "FitFusion";
  landingPage.appendChild(title);

  // Button Container
  let btnContainer = document.createElement("div");
  btnContainer.className = "btnContainer";
  landingPage.appendChild(btnContainer);

  // Button To Exercise Page
  let toExercise = document.createElement("button");
  toExercise.className = "toExercise";
  toExercise.textContent = "Exercises";
  let arrowIcon1 = document.createElement("i");
  arrowIcon1.classList.add("fa-solid", "fa-angle-right", "arrowIcon");
  toExercise.appendChild(arrowIcon1);
  btnContainer.appendChild(toExercise);

  toExercise.addEventListener("mouseover", function () {
    arrowIcon1.style.color = lightest;
  });

  toExercise.addEventListener("mouseout", function () {
    arrowIcon1.style.color = secondLightest;
  });

  toExercise.addEventListener("click", function (e) {
    let i = 1;
    while (i >= 0) {
      title.style.opacity = i;
      toExercise.style.opacity = i;
      toNutrition.style.opacity = i;
      i -= 0.01;
    }
    toExercise.style.animation = "toRight 0.3s linear";
    toNutrition.style.animation = "toRight 0.3s linear";
    setTimeout(function () {
      bodyContainer.style.backgroundColor = lightest;
    }, 100);
    setTimeout(function () {
      exerciseAPI();
    }, 300);
  });

  // Button To Nutrition Page
  let toNutrition = document.createElement("button");
  toNutrition.className = "toNutrition";
  toNutrition.textContent = "Nutrition";
  let arrowIcon2 = document.createElement("i");
  arrowIcon2.classList.add("fa-solid", "fa-angle-right", "arrowIcon2");
  toNutrition.appendChild(arrowIcon2);
  btnContainer.appendChild(toNutrition);

  toNutrition.addEventListener("mouseover", function () {
    arrowIcon2.style.color = "#ebf5df";
  });

  toNutrition.addEventListener("mouseout", function () {
    arrowIcon2.style.color = "orange";
  });

  toNutrition.addEventListener("click", function (e) {
    let i = 1;
    while (i >= 0) {
      title.style.opacity = i;
      toExercise.style.opacity = i;
      toNutrition.style.opacity = i;
      i -= 0.01;
    }
    toExercise.style.animation = "toRight 0.3s linear";
    toNutrition.style.animation = "toRight 0.3s linear";
    setTimeout(function () {
      bodyContainer.style.backgroundColor = lightest;
    }, 100);
    setTimeout(function () {
      nutritionHTML();
    }, 300);
  });
}

function exerciseAPI() {
  bodyContainer.innerHTML = "";
  bodyContainer.style.backgroundColor = lightest;
  bodyContainer.style.overflowX = "visible";

  // top-container
  let topContainer = document.createElement("div");
  topContainer.className = "topContainer";
  bodyContainer.appendChild(topContainer);

  // top-left-container in top-container
  let topLeftContainer = document.createElement("div");
  topLeftContainer.className = "topLeftContainer";
  topContainer.appendChild(topLeftContainer);

  // top-right-container in top-container
  let topRightContainer = document.createElement("div");
  topRightContainer.className = "topRightContainer";
  topContainer.appendChild(topRightContainer);

  // container for content generated from clicking search
  let container = document.createElement("div");
  container.className = "container";
  bodyContainer.appendChild(container);

  let searchBtn;

  // For error message
  let message = document.createElement("p");

  // Creates search button
  function searchButton() {
    searchBtn = document.createElement("button");
    searchBtn.classList = "search";
    let searchIcon = document.createElement("i");
    searchIcon.classList.add("fa-solid", "fa-magnifying-glass", "searchIcon");
    searchBtn.appendChild(searchIcon);
    topRightContainer.appendChild(searchBtn);

    searchBtn.addEventListener("mouseover", function () {
      searchIcon.classList.add("fa-beat");
    });
    searchBtn.addEventListener("mouseout", function () {
      searchIcon.classList.remove("fa-beat");
    });
  }

  // Button for going back to menu
  function backToMenuBtn() {
    backToMenuBtn = document.createElement("button");
    backToMenuBtn.classList = "backToMenuBtn";
    let menuIcon = document.createElement("i");
    menuIcon.classList.add("fa-solid", "fa-house", "menuIcon");
    backToMenuBtn.appendChild(menuIcon);
    topRightContainer.appendChild(backToMenuBtn);
    backToMenuBtn.addEventListener("click", landingPage);
  }

  let exerciseType = [
    "cardio",
    "olympic_weightlifting",
    "plyometrics",
    "powerlifting",
    "strength",
    "stretching",
    "strongman",
  ];

  let muscleGroup = [
    "abdominals",
    "abductors",
    "adductors",
    "biceps",
    "calves",
    "chest",
    "forearms",
    "glutes",
    "hamstrings",
    "lats",
    "lower_back",
    "middle_back",
    "neck",
    "quadriceps",
    "traps",
    "triceps",
  ];

  let difficulty = ["beginner", "intermediate", "expert"];

  function getType() {
    // input
    let input = document.createElement("input");
    input.setAttribute("list", "exercise-type-options");
    input.id = "exercise-type";
    input.name = "exercise-type";
    input.type = "search";
    input.placeholder = "Select type of exercise";
    topLeftContainer.appendChild(input);

    // datalist
    let datalist = document.createElement("datalist");
    datalist.id = "exercise-type-options";
    bodyContainer.appendChild(datalist);

    //options
    for (let i = 0; i < exerciseType.length; i++) {
      let option = document.createElement("option");
      option.id = [i];
      option.setAttribute("value", exerciseType[i]);
      option.textContent = exerciseType[i];
      datalist.appendChild(option);
    }

    // press enter to search
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        searchBtn.click();
      }
    });
  }

  function getMuscle() {
    // input
    let input = document.createElement("input");
    input.setAttribute("list", "muscle-group-options");
    input.id = "muscle-group";
    input.name = "muscle-group";
    input.type = "search";
    input.placeholder = "Select muscle group";
    topLeftContainer.appendChild(input);

    // datalist
    let datalist = document.createElement("datalist");
    datalist.id = "muscle-group-options";
    bodyContainer.appendChild(datalist);

    //options
    for (let i = 0; i < muscleGroup.length; i++) {
      let option = document.createElement("option");
      option.id = [i];
      option.setAttribute("value", muscleGroup[i]);
      option.textContent = muscleGroup[i]; // .substring(0, 1).toUpperCase() +muscleGroup[i].substring(1);
      datalist.appendChild(option);
    }

    // press enter to search
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        searchBtn.click();
      }
    });
  }

  function getDifficulty() {
    // input
    let input = document.createElement("input");
    input.setAttribute("list", "difficulty-options");
    input.id = "difficulty";
    input.name = "difficulty";
    input.type = "search";
    input.placeholder = "Select difficulty";
    topLeftContainer.appendChild(input);

    // datalist
    let datalist = document.createElement("datalist");
    datalist.id = "difficulty-options";
    bodyContainer.appendChild(datalist);

    //options
    for (let i = 0; i < difficulty.length; i++) {
      let option = document.createElement("option");
      option.id = [i];
      option.setAttribute("value", difficulty[i]);
      option.textContent = difficulty[i];
      datalist.appendChild(option);
    }

    // press enter to search
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        searchBtn.click();
      }
    });
  }

  function getName() {
    let input = document.createElement("input");
    input.id = "name";
    input.name = "name";
    input.type = "search";
    input.placeholder = "Name of exercise";
    topLeftContainer.appendChild(input);

    // press enter to search
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        searchBtn.click();
      }
    });
  }

  searching();

  function searching() {
    getName();
    getMuscle();
    getType();
    getDifficulty();
    backToMenuBtn();
    searchButton();

    muscleGroupImg(container);

    searchBtn.addEventListener("click", function () {
      container.innerHTML = "";
      message.innerHTML = "";

      const muscle = document.getElementById("muscle-group").value;
      const type = document.getElementById("exercise-type").value;
      const diff = document.getElementById("difficulty").value;
      const name = document.getElementById("name").value;

      callAPI(muscle, type, diff, name, message, container);
    });
  }
}

// calls exercise API, has youtube api inside
async function callAPI(muscle, type, diff, name, message, container) {
  try {
    const res = await fetch(
      `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}&type=${type}&difficulty=${diff}&name=${name}`,
      {
        headers: {
          "X-Api-Key": "0oGCbeeMDI0L/uSShUHQtA==MMLsf0Lc6nYFiSsn",
        }, // put ur key
      }
    );
    const searchData = await res.json();

    let keys = Object.keys(searchData[0]);

    for (let j = 0; j < searchData.length; j++) {
      // accordian button
      let acc = document.createElement("button");
      acc.className = "accordion";
      acc.textContent = searchData[j].name;

      // box is panel
      let box = document.createElement("div");
      box.className = "box";

      // unordered list for list items
      let ul = document.createElement("ul");

      //expand icon
      let expandIcon = document.createElement("i");
      let spanEx = document.createElement("span");
      expandIcon.className = "expandIcon";
      spanEx.className = "spanEx";
      spanEx.appendChild(expandIcon);
      expandIcon.classList.add("fa-sharp", "fa-solid", "fa-expand");

      // close icon
      let closeIcon = document.createElement("i");
      let spanCl = document.createElement("span");
      closeIcon.className = "closeIcon";
      closeIcon.classList.add("fa-solid", "fa-circle-xmark");
      spanCl.className = "spanCl";
      spanCl.appendChild(closeIcon);

      // expanded box
      let expandedBox = document.createElement("div");
      expandedBox.className = "expandedBox";
      let expandedBoxContainer = document.createElement("div");
      expandedBoxContainer.className = "expandedBoxContainer";
      expandedBox.appendChild(expandedBoxContainer);

      // expandIcon when clicked
      let ul_clone;
      let keyword = searchData[j].name;
      let resultsLoaded = false;
      expandIcon.addEventListener("click", function () {
        expandedBox.style.animation = "fadeIn 0.5s ease-in";
        ul_clone = ul.cloneNode(true);
        const instructionsListItem = ul_clone.querySelector(".instructions");
        if (instructionsListItem) {
          instructionsListItem.remove();
        }
        if (!resultsLoaded) {
          getVid(keyword, ul_clone); // comment to not run API
          resultsLoaded = true;
          ul_clone.appendChild(li_clone);
          expandedBox.appendChild(spanCl);
          expandedBoxContainer.appendChild(ul_clone);
        }

        bodyContainer.appendChild(expandedBox);
      });

      closeIcon.addEventListener("click", function () {
        expandedBox.style.animation = "fadeOut 0.4s ease-out";
        setTimeout(function () {
          bodyContainer.removeChild(expandedBox);
        }, 390);
      });

      // accordion when clicked
      acc.addEventListener("click", function () {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });

      // creates list items and appends to ul
      let li_clone;
      [
        "name",
        "type",
        "muscle",
        "equipment",
        "difficulty",
        "instructions",
      ].forEach((el, i) => {
        let li = document.createElement("li");
        li.className = "listItems";
        li.classList.add(el);
        li.textContent = `${keys[i].substring(0, 1).toUpperCase()}${keys[i]
          .substring(1)
          .toLowerCase()}: ${searchData[j][el]
          .substring(0, 1)
          .toUpperCase()}${searchData[j][el].substring(1).toLowerCase()}`;
        ul.appendChild(li);
        li_clone = li.cloneNode(true);
      });
      container.appendChild(acc);
      container.appendChild(box);
      box.appendChild(spanEx);
      box.appendChild(ul);
    }
  } catch (error) {
    message.textContent =
      "No exercises in this parameter. Try other combinations.";
    message.style.textAlign = "center";
    container.appendChild(message);
    console.log(error);
  }
}

// Img of muscle grp
function muscleGroupImg(container) {
  //container for buttons
  let imgBtnCon = document.createElement("div");
  imgBtnCon.className = "imgBtnCon";
  bodyContainer.insertBefore(imgBtnCon, container);

  // show img
  let showIcon = document.createElement("i");
  showIcon.classList.add("fa-solid", "fa-eye", "showIcon");
  imgBtnCon.appendChild(showIcon);

  // hide img
  let hideIcon = document.createElement("i");
  hideIcon.classList.add("fa-solid", "fa-eye-slash", "hideIcon");
  hideIcon.style.display = "none";
  imgBtnCon.appendChild(hideIcon);

  // img
  let muscleImg = document.createElement("img");
  muscleImg.className = "muscleImg";
  muscleImg.src = "./muscles.jpg";
  bodyContainer.insertBefore(muscleImg, container);

  // show and hide img on click
  showIcon.addEventListener("click", function () {
    muscleImg.style.display = "none";

    showIcon.style.display = "none";
    hideIcon.style.display = "block";

    hideIcon.addEventListener("click", function () {
      muscleImg.style.display = "block";

      showIcon.style.display = "block";
      hideIcon.style.display = "none";
    });
  });
}

// Youtube API
async function getVid(keyword, ul_clone) {
  const url =
    "https://youtube-search.p.rapidapi.com/search?key=AIzaSyDqNLOQHnWw49D-TNJGqVghSG7nBk1CNI0&";

  const response = await fetch(
    url +
      new URLSearchParams({
        part: ["snippet"],
        maxResults: 1,
        order: "relevance",
        topicId: "/m/027x7n",
        regionCode: "US",
        q: `how to do ${keyword}`,
        safeSearch: "moderate",
        type: ["video"],
        videoEmbeddable: "true",
      }),
    {
      headers: {
        "X-RapidAPI-Key": "81b7b379e6msh2104c760c387f06p1b2c07jsnb2b4274400e6",
        "X-RapidAPI-Host": "youtube-search.p.rapidapi.com",
      },
    }
  );
  const result = await response.json();
  let data = result.items[0].id.videoId;

  let embedURL = `https://www.youtube.com/embed/${data}`;
  let video = document.createElement("iframe");
  video.style.width = "250px";
  video.style.height = "auto";
  video.setAttribute("controls", "");
  video.setAttribute("src", embedURL);
  video.setAttribute("allowfullscreen", "");
  video.setAttribute(
    "allow",
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  );
  video.setAttribute("frameborder", "0");
  video.className = "video";
  ul_clone.appendChild(video);
}

// ========== Nutrition ==========

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
  bodyContainer.innerHTML = "";
  bodyContainer.style.overflowX = "auto";
  bodyContainer.style.backgroundColor = "#fce6cc";

  // container for input, searchBtn and options
  let topContainerNu = document.createElement("div");
  topContainerNu.className = "topContainerNu";
  bodyContainer.appendChild(topContainerNu);

  // input container in topContainerNu
  let inputContainer = document.createElement("div");
  inputContainer.className = "inputContainer";
  topContainerNu.appendChild(inputContainer);

  // options container for input element
  let optionsContainer = document.createElement("div");
  optionsContainer.className = "optionsContainer";
  inputContainer.appendChild(optionsContainer);

  // right container in inputContainer
  let rightInputContainer = document.createElement("div");
  rightInputContainer.className = "rightInputContainer";
  topContainerNu.appendChild(rightInputContainer);

  // input
  let searchInput = document.createElement("input");
  searchInput.setAttribute("type", "search");
  searchInput.setAttribute("id", "searchInput");
  searchInput.setAttribute("placeholder", "e.g. 1lb brisket 100g fries");
  searchInput.required = true; // to block empty inputs
  inputContainer.appendChild(searchInput);

  // Button for going back to menu
  backToMenuBtnNu = document.createElement("button");
  backToMenuBtnNu.classList = "backToMenuBtnNu";
  let menuIconNu = document.createElement("i");
  menuIconNu.classList.add("fa-solid", "fa-house", "menuIconNu");
  backToMenuBtnNu.appendChild(menuIconNu);
  rightInputContainer.appendChild(backToMenuBtnNu);
  backToMenuBtnNu.addEventListener("click", landingPage);

  // Search button
  let createSubmitButton = document.createElement("button");
  createSubmitButton.setAttribute("id", "submitButton");
  let searchIconNu = document.createElement("i");
  searchIconNu.classList.add("fa-solid", "fa-magnifying-glass", "searchIconNu");
  createSubmitButton.appendChild(searchIconNu);
  rightInputContainer.appendChild(createSubmitButton);

  createSubmitButton.addEventListener("mouseover", function () {
    searchIconNu.classList.add("fa-beat");
  });
  createSubmitButton.addEventListener("mouseout", function () {
    searchIconNu.classList.remove("fa-beat");
  });

  // age-select
  let age = document.createElement("select");
  age.setAttribute("name", "age");
  age.setAttribute("id", "age-select");
  optionsContainer.appendChild(age);

  let ageOption1 = document.createElement("option");
  ageOption1.setAttribute("value", " ");
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

  // sex-select
  let sex = document.createElement("select");
  sex.setAttribute("name", "sex");
  sex.setAttribute("id", "sex-select");
  optionsContainer.appendChild(sex);

  let sexOption1 = document.createElement("option");
  sexOption1.setAttribute("value", " ");
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

  // result container
  let resultContainer = document.createElement("div");
  resultContainer.setAttribute("id", "result-container");
  bodyContainer.appendChild(resultContainer);

  // error
  let error = document.createElement("error");
  error.setAttribute("id", "error");
  bodyContainer.appendChild(error);

  const submitButton = document.getElementById("submitButton");
  submitButton.addEventListener("click", async function () {
    const resultContainer = document.getElementById("result-container");
    resultContainer.innerHTML = ""; // clear
    hideError();
    const ageSelect = document.getElementById("age-select").value;
    const sexSelect = document.getElementById("sex-select").value;
    for (let i = 0; i < dailyIntake.length; i++) {
      // get calories group
      ageSelect == dailyIntake[i].age && sexSelect == dailyIntake[i].sex
        ? (selectedCalories = dailyIntake[i].calories)
        : null;
    }
    const searchInput = document.getElementById("searchInput"); // get input
    const searching = searchInput.value.trim();
    searchInput.value = searching;
    const regex = new RegExp(/^[a-zA-Z0-9 ]*$/);
    selectedCalories == 0 // check calories group
      ? showError("Please select the corresponding age or sex.")
      : regex.test(searching) // check input
      ? (await fetchNutritionAPI(searching), getRecipeVid(searching))
      : showError("Please input correctly.");
  });

  // press enter to search
  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      createSubmitButton.click();
    }
  });
}

async function fetchNutritionAPI(input) {
  const resultContainer = document.getElementById("result-container");
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

async function getRecipeVid(keyword) {
  const resultContainer = document.getElementById("result-container");
  const url =
    "https://youtube-search.p.rapidapi.com/search?key=AIzaSyDqNLOQHnWw49D-TNJGqVghSG7nBk1CNI0&";
  const response = await fetch(
    url +
      new URLSearchParams({
        part: ["snippet"],
        maxResults: 2,
        order: "relevance",
        topicId: "/m/027x7n",
        regionCode: "HK",
        q: `${keyword} recipe`,
        safeSearch: "moderate",
        type: ["video"],
        videoEmbeddable: "true",
      }),
    {
      headers: {
        "X-RapidAPI-Key": "81b7b379e6msh2104c760c387f06p1b2c07jsnb2b4274400e6",
        "X-RapidAPI-Host": "youtube-search.p.rapidapi.com",
      },
    }
  );
  const result = await response.json();
  let data = result.items[0].id.videoId;

  let embedURL = `https://www.youtube.com/embed/${data}`;
  let video = document.createElement("iframe");
  video.style.width = "250px";
  video.style.height = "auto";
  video.setAttribute("controls", "");
  video.setAttribute("src", embedURL);
  video.setAttribute("allowfullscreen", "");
  video.setAttribute(
    "allow",
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  );
  video.setAttribute("frameborder", "0");
  video.className = "video";
  resultContainer.appendChild(video);
}

function showError(err) {
  const error = document.getElementById("error");
  error.textContent = err;
  error.style.display = "block";
}
function hideError() {
  const error = document.getElementById("error");
  error.textContent = " ";
  error.style.display = "none";
}
