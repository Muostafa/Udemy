// contains all courses elements
let courses = [];
// coursesTitle[i] has the title & category(Python, Excel, ...) of courses[i] (help in search)
let coursesTitle = [];
// current selected category (python, excel,...) start with python on page load
let categorySelected = "python";

//event handler for changing category
let pills = document.getElementById("pills-tab");
pills.addEventListener("click", () => {
  //reset search text
  searchText.value = "";

  //get all categories then save them to pillsArr
  let pillsArr = document.querySelectorAll(".nav-link");
  let elementSelected = "";
  //loop through all of them and get the selected one
  pillsArr.forEach((element) => {
    if (element.ariaSelected === "true") {
      elementSelected = element;
      categorySelected = element.innerText.toLowerCase();
    }
  });

  //hide courses with the wrong category
  for (let i = 0; i < courses.length; i++) {
    if (coursesTitle[i][1] === categorySelected)
      courses[i].classList.remove("hide");
    else {
      courses[i].classList.add("hide");
    }
  }

  //remove article of python when changing tabs
  let explorePython = document.querySelector(".python-article");
  if (categorySelected === "python") explorePython.classList.remove("hide");
  else explorePython.classList.add("hide");

  // change explore button
  let exploreButton = document.querySelector(".explore-button");
  exploreButton.innerText = "Explore " + elementSelected.innerText;
});

// get searchText element
const searchForm = document.querySelector(".form");
const searchText = searchForm.querySelector("input");

// search functionality
// extract text from search bar
searchForm.querySelector(".search-button").addEventListener("click", () => {
  //text that we will search with
  let tempText = searchText.value.toLowerCase();
  //loop through all titles and add .hide css class to hide unwanted courses
  for (let i = 0; i < courses.length; i++) {
    if (
      coursesTitle[i][0].includes(tempText) &&
      coursesTitle[i][1] === categorySelected
    )
      courses[i].classList.remove("hide");
    else {
      courses[i].classList.add("hide");
    }
  }
});
//hide the next and prev buttons
const nextButton = document.querySelector(".carousel-control-next");
nextButton.classList.add("hide");

const prevButton = document.querySelector(".carousel-control-prev");
prevButton.classList.add("hide");

//fetch courses json file
//type "npm install -g json-server" then "json-server --watch courses.json" in terminal to start server
fetch("http://localhost:3000/courses")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((course) => {
      //create and add courses elements to courses array
      renderCourses(course);
    });
  })
  .then(() => {
    console.log(courses);
  })
  .catch((err) => {
    console.log(err);
  });

//courses picture div
//coursesPics is the div in html that we will add all courses to it
const coursesPics = document.querySelector(".courses-pictures");

//create course from json object and add it to the html
function renderCourses(course) {
  let courseElement = document.createElement("div");
  courseElement.classList.add("course-content");
  if (course.category !== "python") courseElement.classList.add("hide");

  //add img
  let img = document.createElement("img");
  img.classList.add("border");
  img.alt = "Python course";
  img.width = "240";
  img.height = "135";
  img.src = course.image;
  courseElement.appendChild(img);

  //add title
  let title = document.createElement("article");
  title.classList.add("course-title");
  title.innerHTML =
    "<h3>" +
    course.title +
    '</h3><h6 class="instructors">' +
    course.author +
    "</h6>";
  courseElement.appendChild(title);

  //add rating
  let rating = document.createElement("div");
  rating.classList.add("course-rating");
  rating.innerHTML =
    '<h3 class="rating-number">' +
    course.rating +
    '</h3><img class="stars" src="/images/stars.png"alt="course reviews"height="12px"width="64px"/><h3 class="reviews-number">(' +
    course.people +
    ")</h3>";
  courseElement.appendChild(rating);

  //add price
  let price = document.createElement("h3");
  price.textContent = "E£" + course.price;
  courseElement.appendChild(price);

  //add bestseller
  if (course.bestseller) {
    let bestseller = document.createElement("aside");
    bestseller.innerHTML = '<aside class="bestseller">Bestseller</aside>';
    courseElement.appendChild(bestseller);
  }

  coursesPics.appendChild(courseElement);
  courses.push(courseElement);
  coursesTitle.push([
    course.title.toLowerCase(),
    course.category.toLowerCase(),
  ]);
}
