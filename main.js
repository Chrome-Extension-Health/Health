// body container for all elements
let bodyContainer = document.createElement("div");
bodyContainer.className = "bodyContainer";
document.body.appendChild(bodyContainer);

// top-container
let topContainer = document.createElement("div");
topContainer.className = "topContainer";
bodyContainer.appendChild(topContainer);

// top-left-container
let topLeftContainer = document.createElement("div");
topLeftContainer.className = "topLeftContainer";
topContainer.appendChild(topLeftContainer);

// top-right-container
let topRightContainer = document.createElement("div");
topRightContainer.className = "topRightContainer";
topContainer.appendChild(topRightContainer);

// container for content generated from clicking search
let container = document.createElement("div");
container.className = "container";

let searchBtn;

function createSearchButton() {
  searchBtn = document.createElement("button");
  searchBtn.classList = "search";
  searchBtn.textContent = "Search";
  topRightContainer.appendChild(searchBtn);
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

async function getType() {
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
}

async function getMuscle() {
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
}

async function getDifficulty() {
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
}

async function getName() {
  let input = document.createElement("input");
  input.id = "name";
  input.name = "name";
  input.type = "search";
  input.placeholder = "Name of exercise";
  topLeftContainer.appendChild(input);
}

async function searching() {
  getName();
  getMuscle();
  getType();
  getDifficulty();
  createSearchButton();

  searchBtn.addEventListener("click", async function () {
    container.innerHTML = "";
    const muscle = document.getElementById("muscle-group").value;
    const type = document.getElementById("exercise-type").value;
    const diff = document.getElementById("difficulty").value;
    const name = document.getElementById("name").value;
    try {
      const res = await fetch(
        `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}&type=${type}&difficulty=${diff}&name=${name}`,
        {
          headers: { "X-Api-Key": "0oGCbeeMDI0L/uSShUHQtA==MMLsf0Lc6nYFiSsn" },
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

        acc.addEventListener("click", function () {
          this.classList.toggle("active");
          panel = this.nextElementSibling;
          if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
          }
        });

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
            .toLowerCase()}: ${searchData[j][el]}`;
          ul.appendChild(li);
        });

        container.appendChild(acc);
        container.appendChild(box);
        box.appendChild(ul);
      }
      bodyContainer.appendChild(container);
    } catch (error) {
      console.error(error);
    }
  });
}
searching();
