let searchBtn;

// container for content generated from clicking search
let container = document.createElement("div");
container.className = "container";

function createSearchButton() {
  searchBtn = document.createElement("button");
  searchBtn.classList = "search";
  searchBtn.textContent = "Search";
  document.body.appendChild(searchBtn);
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
  // label
  let label = document.createElement("label");
  label.setAttribute("for", "exerciseType");
  label.textContent = "Select type of exercise: ";
  // document.body.appendChild(label);

  // input
  let input = document.createElement("input");
  input.setAttribute("list", "exerciseType-options");
  input.id = "exerciseType";
  input.name = "exerciseType";
  input.type = "text";
  input.placeholder = "Select type of exercise";
  document.body.appendChild(input);

  // datalist
  let datalist = document.createElement("datalist");
  datalist.id = "exerciseType-options";
  document.body.appendChild(datalist);

  //options
  for (let i = 0; i < exerciseType.length; i++) {
    let option = document.createElement("option");
    option.id = [i];
    option.setAttribute("value", exerciseType[i]);
    option.textContent = exerciseType[i];
    datalist.appendChild(option);
  }

  // input.addEventListener("change", async (e) => {
  //   const res = await fetch(
  //     `https://api.api-ninjas.com/v1/exercises?type=${e.target.value}`,
  //     {
  //       headers: { "X-Api-Key": "0oGCbeeMDI0L/uSShUHQtA==MMLsf0Lc6nYFiSsn" },
  //     }
  //   );
  //   const typeData = await res.json();
  // });
}

async function getMuscle() {
  // label
  let label = document.createElement("label");
  label.setAttribute("for", "muscle-group");
  label.textContent = "Select muscle group: ";
  // document.body.appendChild(label);

  // input
  let input = document.createElement("input");
  input.setAttribute("list", "muscle-group-options");
  input.id = "muscle-group";
  input.name = "muscle-group";
  input.type = "text";
  input.placeholder = "Select muscle group";
  document.body.appendChild(input);

  // datalist
  let datalist = document.createElement("datalist");
  datalist.id = "muscle-group-options";
  document.body.appendChild(datalist);

  //options
  for (let i = 0; i < muscleGroup.length; i++) {
    let option = document.createElement("option");
    option.id = [i];
    option.setAttribute("value", muscleGroup[i]);
    option.textContent = muscleGroup[i]; // .substring(0, 1).toUpperCase() +muscleGroup[i].substring(1);
    datalist.appendChild(option);
  }

  // input.addEventListener("change", async (e) => {
  //   const res = await fetch(
  //     `https://api.api-ninjas.com/v1/exercises?muscle=${e.target.value}`,
  //     {
  //       headers: { "X-Api-Key": "0oGCbeeMDI0L/uSShUHQtA==MMLsf0Lc6nYFiSsn" },
  //     }
  //   );
  //   const muscleData = await res.json();
  // });
}

async function getDifficulty() {
  // label
  let label = document.createElement("label");
  label.setAttribute("for", "difficulty");
  label.textContent = "Select difficulty: ";
  // document.body.appendChild(label);

  // input
  let input = document.createElement("input");
  input.setAttribute("list", "difficulty-options");
  input.id = "difficulty";
  input.name = "difficulty";
  input.type = "text";
  input.placeholder = "Select difficulty";
  document.body.appendChild(input);

  // datalist
  let datalist = document.createElement("datalist");
  datalist.id = "difficulty-options";
  document.body.appendChild(datalist);

  //options
  for (let i = 0; i < difficulty.length; i++) {
    let option = document.createElement("option");
    option.id = [i];
    option.setAttribute("value", difficulty[i]);
    option.textContent = difficulty[i];
    datalist.appendChild(option);
  }
}

async function searching() {
  getMuscle();
  getType();
  getDifficulty();
  createSearchButton();
  searchBtn.addEventListener("click", async function () {
    container.innerHTML = "";
    const muscle = document.getElementById("muscle-group").value;
    const type = document.getElementById("exerciseType").value;
    const diff = document.getElementById("difficulty").value;
    try {
      const res = await fetch(
        `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}&type=${type}&difficulty=${diff}`,
        {
          headers: { "X-Api-Key": "0oGCbeeMDI0L/uSShUHQtA==MMLsf0Lc6nYFiSsn" },
        }
      );
      const searchData = await res.json();
      console.log(searchData);

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
          li.textContent = `${keys[i].substring(0, 1).toUpperCase()}${keys[i]
            .substring(1)
            .toLowerCase()}: ${searchData[j][el]}`;
          ul.appendChild(li);
        });
        container.appendChild(acc);
        container.appendChild(box);
        box.appendChild(ul);
      }
      document.body.appendChild(container);
    } catch (error) {
      console.error("Error:", error);
    }
  });
}

searching();
