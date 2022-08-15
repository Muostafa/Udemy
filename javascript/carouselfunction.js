function resetSlider(filteredCourses) {
  //remove old courses from window
  let temp = document.querySelector(".carousel-inner");
  temp.innerHTML = "";

  //iterate through all filtered courses and make them carousel items 
  //make the first item active where it will be the first slide to appear on window load
  let i = 0;
  filteredCourses.forEach((x) => {
    const courseCarouselItem = document.createElement("div");
    courseCarouselItem.classList.add("carousel-item");
    if (i == 0 && filteredCourses.length > 0)
      courseCarouselItem.classList.add("active");
    x.classList.remove("hide");
    courseCarouselItem.appendChild(x);
    temp.appendChild(courseCarouselItem);
    i++;
  });
  //if there is less than 3 courses each course will appear on 1 slide
  if (filteredCourses.length > 2) multipleCoursesPerSlide();
}

function multipleCoursesPerSlide() {
  let items = document.querySelectorAll(".carousel .carousel-item");
  //for each slide we want to clone the next 4 courses next to it in the same slide 
  //note : the difference between 1 carousel item and its neighbor is only 1 card 
  items.forEach((el) => {
    //make sure to change the transform translate percent if you want to change number of cards in slide to make smoother transitions 
    const minPerSlide = 5;
    let next = el.nextElementSibling;
    for (var i = 1; i < minPerSlide; i++) {
      if (!next) {
        next = items[0];
      }
      let cloneChild = next.cloneNode(true);
      el.appendChild(cloneChild.children[0]);
      next = next.nextElementSibling;
    }
  });
}
