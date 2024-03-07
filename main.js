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

// async function muscle() {
//   let muscle = [];
//   const res = await fetch(
//     `https://api.api-ninjas.com/v1/exercises?muscle=abdominals`,
//     {
//       headers: { "X-Api-Key": "0oGCbeeMDI0L/uSShUHQtA==MMLsf0Lc6nYFiSsn" },
//     }
//   );
//   const data = await res.json();
//   // console.log(data);
// }
// muscle();

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

function getMuscle() {
  let label = document.createElement("label");
  label.setAttribute("for", "muscle-group");
  label.textContent = "Select muscle group: ";
  document.body.appendChild(label);

  let input = document.createElement("input");
  input.setAttribute("list", "muscle-group-options");
  input.id = "muscle-group";
  input.name = "muscle-group";
  document.body.appendChild(input);

  let datalist = document.createElement("datalist");
  datalist.id = "muscle-group-options";
  document.body.appendChild(datalist);

  for (let i = 0; i < muscleGroup.length; i++) {
    let option = document.createElement("option");
    option.setAttribute("value", muscleGroup[i]);
    option.textContent = muscleGroup[i]; // .substring(0, 1).toUpperCase() +muscleGroup[i].substring(1);
    datalist.appendChild(option);
  }
}
getMuscle();

async function food() {
  const res = await fetch(
    "https://fitness-calculator.p.rapidapi.com/foodids/tablenames",
    {
      headers: {
        "X-RapidAPI-Key": "81b7b379e6msh2104c760c387f06p1b2c07jsnb2b4274400e6",
        "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com",
      },
    }
  );
  const data = await res.json();
  console.log(data.table_names[0]);
}
// food();
