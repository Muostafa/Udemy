// contains all courses elements
let allCoursesElements = [];
// coursesTitleAndCategory[i] has the title & category of allCoursesElements[i]
let coursesTitleAndCategory = [];
function getTitle(courseIndex){
  return coursesTitleAndCategory[courseIndex][0];
}

function getCategory(courseIndex){
  return coursesTitleAndCategory[courseIndex][1];
}

// current selected category (python, excel,...) start with python on page load
let currentCategorySelected = "python";
//courses that should appear on window (change on changing categories and search)
let coursesFiltered = [];

//fetch courses json file
//type "npm install -g json-server" then "json-server --watch courses.json" in terminal to start server
//use "http://localhost:3000/courses" to test local server
fetch("https://api.npoint.io/5534f7c0bfb81f0dca56")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((course) => {
      //create and add courses elements to courses array
      renderCourse(course);
    });
  })
  .then(() => {
    //on page load show all python courses
      //resetSlider(x) is defined in carouselfunction.js
    resetCarousel(coursesFiltered);
  })
  .catch((err) => {
    console.log(err);
  });

let pills = document.getElementById("pills-tab");
//event handler for changing category
pills.addEventListener("click", () => {
  //remove old filters
  coursesFiltered = [];
  //reset search text
  searchText.value = "";

  //get all categories (Python, Excel, ...) buttons then save them to pillsArr
  let pillsArr = document.querySelectorAll(".nav-link");
  let elementSelected = "";

  //loop through all of them and get the selected one
  pillsArr.forEach((element) => {
    if (element.ariaSelected === "true") {
      elementSelected = element;
      currentCategorySelected = element.innerText.toLowerCase();
    }
  });
  //filter courses with the correct category
  for (let i = 0; i < allCoursesElements.length; i++) {
    if (getCategory(i) === currentCategorySelected)
      coursesFiltered.push(allCoursesElements[i]);
  }

  //remove article of python when changing tabs
  let explorePython = document.querySelector(".python-article");
  if (currentCategorySelected === "python")
    explorePython.classList.remove("hide");
  else explorePython.classList.add("hide");

  // change explore button
  let exploreButton = document.querySelector(".explore-button");
  exploreButton.innerText = "Explore " + elementSelected.innerText;

  resetCarousel(coursesFiltered);
});


// search functionality
// get searchText element
const searchForm = document.querySelector(".form");
const searchText = searchForm.querySelector("input");
// extract text from search bar
searchForm.querySelector(".search-button").addEventListener("click", () => {
  //remove old filters
  coursesFiltered = [];
  //text that we will search with
  let tempText = searchText.value.toLowerCase();
  //loop through all titles and filter them
  for (let i = 0; i < allCoursesElements.length; i++) {
    if (
      getTitle(i).includes(tempText) &&
      getCategory(i) === currentCategorySelected
    )
      coursesFiltered.push(allCoursesElements[i]);
  }
  resetCarousel(coursesFiltered);
});

//create course html element from json object and add it to the allCoursesElements array
function renderCourse(course) {
  let courseElement = document.createElement("div");
  courseElement.classList.add("course-content");

  //add img
  let img = createImageElement(course);
  courseElement.appendChild(img);

  //add title
  let title = createTitleElement(course);
  courseElement.appendChild(title);

  //add rating
  let rating = createRatingElement(course);
  courseElement.appendChild(rating);

  //add price
  let price = createPriceElement(course);
  courseElement.appendChild(price);

  //add bestseller
  if (course.bestseller) {
    let bestseller = createBestSellerElement();
    courseElement.appendChild(bestseller);
  }

  //start with python courses on page load
  if (course.category === "python") coursesFiltered.push(courseElement);

  //save all courses in allCoursesElements, no need to fetch again
  allCoursesElements.push(courseElement);

  //save the title and category of each course to help in search ex: ["Python for beginners", "python"]
  // coursesTitleAndCategory[i] has the title & category of allCoursesElements[i]
  coursesTitleAndCategory.push([
    course.title.toLowerCase(),
    course.category.toLowerCase(),
  ]);
}

function createImageElement(courseData) {
  let image = document.createElement("img");
  image.classList.add("border");
  image.alt = "Python course";
  image.width = "240";
  image.height = "135";
  image.src = courseData.image;
  return image;
}

function createTitleElement(courseData) {
  let title = document.createElement("article");
  title.classList.add("course-title");
  title.innerHTML =
    "<h3>" +
    courseData.title +
    '</h3><h6 class="instructors">' +
    courseData.author +
    "</h6>";
  return title;
}

function createRatingElement(courseData) {
  let rating = document.createElement("div");
  rating.classList.add("course-rating");
  rating.innerHTML =
    '<h3 class="rating-number">' +
    courseData.rating +
    '</h3><img class="stars" src="images/stars.png"alt="course reviews"height="12px"width="64px"/><h3 class="reviews-number">(' +
    courseData.people +
    ")</h3>";
  return rating;
}

function createPriceElement(courseData) {
  let price = document.createElement("h3");
  price.textContent = "E£" + courseData.price;
  return price;
}

function createBestSellerElement() {
  let bestseller = document.createElement("aside");
  bestseller.innerHTML = '<aside class="bestseller">Bestseller</aside>';
  return bestseller;
}