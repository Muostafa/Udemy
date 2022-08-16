function resetCarousel(filteredCourses) {

  removeOldCoursesFromWindow();

  //with 3 or less courses we don't need the carousel
  if (filteredCourses.length <= 3) {
    resetCarouselWithLowCards(filteredCourses);
    return;
  }

  createCoursesCarouselItems(filteredCourses);

  showCarouselNextPrevButtons();

  //note: each carousel-item have only 1 course
  //if there is more than 3 courses clone courses so they are found in multiple carousel items
  multipleCoursesPerSlide();
}

function removeOldCoursesFromWindow() {
  let carousel = document.querySelector(".carousel-inner");
  carousel.innerHTML = "";

  const coursesPics = document.querySelector(".courses-pictures");
  coursesPics.innerHTML = "";
}

function createCoursesCarouselItems(filteredCourses) {
  //iterate through all filtered courses and make them carousel items
  //make the first item active where it will be the first slide to appear on window load
  let carousel = document.querySelector(".carousel-inner");
  let i = 0;
  filteredCourses.forEach((x) => {
    const courseCarouselItem = document.createElement("div");
    courseCarouselItem.classList.add("carousel-item");
    if (i == 0 && filteredCourses.length > 0)
      courseCarouselItem.classList.add("active");
    x.classList.remove("hide");
    courseCarouselItem.appendChild(x);
    carousel.appendChild(courseCarouselItem);
    i++;
  });
}

function multipleCoursesPerSlide() {
  let items = document.querySelectorAll(".carousel .carousel-item");
  //for each course we want to clone the next 4 courses next to it in the same slide
  //note : the difference between 1 carousel item and its neighbor is only 1 card
  items.forEach((element) => {
    //make sure to change the transform:translate percent if you want to change number of cards in slide to make smoother transitions
    const cardsPerSlide = 5;
    let next = element.nextElementSibling;
    for (let i = 1; i < cardsPerSlide; i++) {
      if (!next) {
        next = items[0];
      }
      let cloneChild = next.cloneNode(true);
      element.appendChild(cloneChild.children[0]);
      next = next.nextElementSibling;
    }
  });
}

function resetCarouselWithLowCards(filteredCourses) {
  //using design from phase 2
  const coursesPics = document.querySelector(".courses-pictures");
  //iterate through all filtered courses and add them to the only 1 carousel-item
  filteredCourses.forEach((x) => {
    x.classList.add("course-content");
    coursesPics.appendChild(x);
  });
  hideCarouselNextPrevButtons();
}

function hideCarouselNextPrevButtons() {
  //hide the next and prev buttons
  const nextButton = document.querySelector(".carousel-control-next");
  nextButton.classList.add("hide");

  const prevButton = document.querySelector(".carousel-control-prev");
  prevButton.classList.add("hide");
}

function showCarouselNextPrevButtons() {
  //show the next and prev buttons
  const nextButton = document.querySelector(".carousel-control-next");
  nextButton.classList.remove("hide");

  const prevButton = document.querySelector(".carousel-control-prev");
  prevButton.classList.remove("hide");
}
