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

// landing page
function landingPage() {
  bodyContainer.innerHTML = "";
  bodyContainer.style.removeProperty("background-color");
  bodyContainer.style.backgroundColor = darkest;
  let landingPage = document.createElement("div");
  landingPage.className = "landingPage";
  bodyContainer.appendChild(landingPage);

  let title = document.createElement("h1");
  title.className = "title";
  title.textContent = "FitFusion";
  landingPage.appendChild(title);

  let toExercise = document.createElement("button");
  toExercise.className = "toExercise";
  toExercise.textContent = "Exercises";
  let arrowIcon = document.createElement("i");
  arrowIcon.classList.add("fa-solid", "fa-angle-right", "arrowIcon");
  toExercise.appendChild(arrowIcon);
  landingPage.appendChild(toExercise);

  toExercise.addEventListener("click", exerciseAPI);

  // Background video on loop
  // let backgroundVid = document.createElement("video");
  // backgroundVid.className = "backgroundVid";
  // backgroundVid.autoplay = true;
  // backgroundVid.muted = true;
  // backgroundVid.loop = true;
  // backgroundVid.src = "./waves.mp4";
  // backgroundVid.type = "video/mp4";
  // landingPage.appendChild(backgroundVid);
}
landingPage();

function exerciseAPI() {
  bodyContainer.innerHTML = "";
  bodyContainer.style.backgroundColor = lightest;

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

    // press enter to search
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        searchBtn.click();
      }
    });
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

    // press enter to search
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        searchBtn.click();
      }
    });
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

    // press enter to search
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        searchBtn.click();
      }
    });
  }

  async function getName() {
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

  // let numAddBtn = document.createElement("button");

  // gapi.load("client", searching);
  searching();

  async function searching() {
    getName();
    getMuscle();
    getType();
    getDifficulty();
    backToMenuBtn();
    searchButton();
    muscleGroupImg();

    searchBtn.addEventListener("click", function () {
      container.innerHTML = "";
      message.innerHTML = "";

      const muscle = document.getElementById("muscle-group").value;
      const type = document.getElementById("exercise-type").value;
      const diff = document.getElementById("difficulty").value;
      const name = document.getElementById("name").value;

      let num = 0;
      // numAddBtn.textContent = "Next Page";
      // topRightContainer.appendChild(numAddBtn);
      // numAddBtn.addEventListener("click", function () {
      //   num += 1;
      //   container.innerHTML = "";
      //   message.innerHTML = "";
      //   callAPI(muscle, type, diff, name, num);
      // });

      callAPI();

      async function callAPI() {
        try {
          const res = await fetch(
            `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}&type=${type}&difficulty=${diff}&name=${name}&offset=${num}`,
            {
              headers: {
                "X-Api-Key": "key",
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
              ul_clone = ul.cloneNode(true);
              const instructionsListItem =
                ul_clone.querySelector(".instructions");
              if (instructionsListItem) {
                instructionsListItem.remove();
              }
              if (!resultsLoaded) {
                loadClient(keyword);
                resultsLoaded = true;
                ul_clone.appendChild(li_clone);
                expandedBox.appendChild(spanCl);
                expandedBoxContainer.appendChild(ul_clone);
              }
              bodyContainer.appendChild(expandedBox);
            });

            closeIcon.addEventListener("click", function () {
              bodyContainer.removeChild(expandedBox);
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

            // Youtube loadClient
            function loadClient(keyword) {
              gapi.client.setApiKey("myKey"); // Put ur key
              return gapi.client
                .load(
                  "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
                )
                .then(
                  function () {
                    return gapi.client.youtube.search
                      .list({
                        part: ["snippet"],
                        maxResults: 1,
                        order: "relevance",
                        topicId: "/m/027x7n",
                        q: `how to do ${keyword}`,
                        safeSearch: "moderate",
                        type: ["video"],
                        videoEmbeddable: "true",
                      })
                      .then(
                        function (response) {
                          setTimeout(function () {
                            const data = response.result.items[0].id.videoId;
                            let url = `https://www.youtube.com/embed/${data}`;
                            let video = document.createElement("iframe");
                            video.style.width = "250px";
                            video.style.height = "auto";
                            video.setAttribute("controls", "");
                            video.setAttribute("src", url);
                            video.setAttribute("allowfullscreen", "");
                            video.setAttribute(
                              "allow",
                              "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            );
                            video.setAttribute("frameborder", "0");
                            video.className = "video";
                            ul_clone.appendChild(video);
                          });
                        },
                        function (err) {
                          console.error("Execute error", err);
                        }
                      );
                  },
                  function (err) {
                    console.error("Error loading GAPI client for API", err);
                  }
                );
            }

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
              li.textContent = `${keys[i].substring(0, 1).toUpperCase()}${keys[
                i
              ]
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
    });
  }

  function muscleGroupImg() {
    let imgCon = document.createElement("div");
    imgCon.className = "imgCon";
    let img = document.createElement("img");
    img.src = "./muscles.jpg";
    imgCon.appendChild(img);
    container.appendChild(imgCon);
  }
}

/* 
1. error in chrome extension
2. make keys bold in box and expandedBox
3. expanded box animation on opening and closing
*/
