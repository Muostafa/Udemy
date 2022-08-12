// extract text from search bar
const searchForm = document.querySelector(".form");
const searchText = searchForm.querySelector("input");
function getText() {
  return searchText.value;
}

//fetch courses json file
fetch("./courses.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((element) => {
      createCourseElement(element);
    });
  })
  .then(() => {
  })
  .catch((err) => {
    console.log(err);
  });

// courses picture div
let courses = [];
const coursesPics = document.querySelector(".courses-pictures");
function createCourseElement(course) {
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
}
