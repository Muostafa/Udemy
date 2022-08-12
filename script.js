// extract text from search bar
const searchForm = document.querySelector(".form");
const searchText = searchForm.querySelector("input");

// search functionality
searchForm.querySelector(".search-button").addEventListener("click", () => {
  //text that we will search with
  let tempText = searchText.value.toLowerCase();
  //loop through all titles and add .hide css class to hide unwanted courses
  for (let i = 0; i < courses.length; i++) {
    const course = courses[i];
    if(!coursesTitle[i][0].includes(tempText)){
      courses[i].classList.add("hide")
    }
    else{
      courses[i].classList.remove("hide")
    }
  }
});


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
  })
  .catch((err) => {
    console.log(err);
  });


// courses picture div

let courses = [];
// coursesTitle[i] has the title & category(Python, Excel, ...) of courses[i] (help in search)
let coursesTitle = [];
const coursesPics = document.querySelector(".courses-pictures");

//create course from json object and add it to the html
function renderCourses(course) {
  let courseElement = document.createElement("div");
  courseElement.classList.add("course-content");

  //add img
  let img = document.createElement("img");
  img.classList.add("border");
  img.alt = "";
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
    '</h3><img style="align-self: center; padding: 0 4px"src="/images/stars.png"alt="course reviews"height="12px"width="64px"/><h3 class="reviews-number">(' +
    course.people +
    ")</h3>";
  courseElement.appendChild(rating);

  //add price
  let price = document.createElement("h3");
  price.style.fontSize = "15px";
  price.style.fontWeight = "bolder";
  price.style.margin = "3px 0";
  price.style.padding = "0";
  price.textContent = "E£" + course.price;
  courseElement.appendChild(price);

  coursesPics.appendChild(courseElement);
  courses.push(courseElement);
  coursesTitle.push([course.title.toLowerCase(), course.category]);
}
