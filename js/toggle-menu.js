

 /*
Toggles the display property value of block on and off using the click event.

*/
function toggleMenu(e) {
  //stop default event on for anchor element
  e.preventDefault();
  //store nav list DOM Object
  let navList = document.querySelector(".nav");
  //toggle class named display
  navList.classList.toggle("display");
}

//store wrapper for hamburger icon in memory
let toggle = document.querySelector(".icon-container");

//javascript event listener

toggle.addEventListener('click', function(e) {
  toggleMenu(e);
},false); 




