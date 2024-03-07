// async function beginner() {
//   const res = await fetch(
//     "https://api.api-ninjas.com/v1/exercises?difficulty=beginner",
//     {
//       headers: { "X-Api-Key": "0oGCbeeMDI0L/uSShUHQtA==MMLsf0Lc6nYFiSsn" },
//     }
//   );
//   const data = await res.json();
//   console.log(data);
// }
// beginner();

// async function intermediate() {
//   const res = await fetch(
//     "https://api.api-ninjas.com/v1/exercises?difficulty=intermediate",
//     {
//       headers: { "X-Api-Key": "0oGCbeeMDI0L/uSShUHQtA==MMLsf0Lc6nYFiSsn" },
//     }
//   );
//   const data = await res.json();
//   console.log(data);
// }
// intermediate();

// async function expert() {
//   const res = await fetch(
//     "https://api.api-ninjas.com/v1/exercises?difficulty=expert",
//     {
//       headers: { "X-Api-Key": "0oGCbeeMDI0L/uSShUHQtA==MMLsf0Lc6nYFiSsn" },
//     }
//   );
//   const data = await res.json();
//   console.log(data);
// }
// expert();

let type = [];

async function getType() {
  // if type array has what the user has typed or selected, change the type
  const res = await fetch(
    `https://api.api-ninjas.com/v1/exercises?type=${type}`,
    {
      headers: { "X-Api-Key": "0oGCbeeMDI0L/uSShUHQtA==MMLsf0Lc6nYFiSsn" },
    }
  );
  const data = await res.json();
  console.log(data);
  for (let i = 0; i < data.length; i++) {}
}
// getType();

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

async function getMuscle() {
  //
  let label = document.createElement("label");
  label.setAttribute("for", "muscle-group");
  label.textContent = "Select muscle group: ";
  document.body.appendChild(label);

  let input = document.createElement("input");
  input.setAttribute("list", "muscle-group-options");
  input.id = "muscle-group";
  input.name = "muscle-group";
  input.type = "text";
  document.body.appendChild(input);

  let search = document.createElement("button");
  search.textContent = "Search";
  document.body.appendChild(search);

  let datalist = document.createElement("datalist");
  datalist.id = "muscle-group-options";
  document.body.appendChild(datalist);

  for (let i = 0; i < muscleGroup.length; i++) {
    let option = document.createElement("option");
    option.id = [i];
    option.setAttribute("value", muscleGroup[i]);
    option.textContent = muscleGroup[i]; // .substring(0, 1).toUpperCase() +muscleGroup[i].substring(1);
    datalist.appendChild(option);
  }
  input.addEventListener("change", async (e) => {
    const res = await fetch(
      `https://api.api-ninjas.com/v1/exercises?muscle=${e.target.value}`,
      {
        headers: { "X-Api-Key": "0oGCbeeMDI0L/uSShUHQtA==MMLsf0Lc6nYFiSsn" },
      }
    );
    const data = await res.json();
    for (let j = 0; j < data.length; j++) {
      let div = document.createElement("div");
      div.textContent = `${data[j].difficulty} ${data[j].equipment} ${data[j].instructions} ${data[j].muscle} ${data[j].name} ${data[j].type}`;
      document.body.appendChild(div);
    }
    console.log(data);
  });

  // if (input.value === musclegroup || option.value) {
  // fetch that muscle group
  // }
}
getMuscle();
