//create a variable to hold a new Date Object 
let today = new Date();
//cereate a variable to hold the current year
let year = today.getFullYear();
//create a variable to hold an element whose id attribute has a value of year
let el = document.getElementById("year");
//write the current year to DOM element's text node
el.textContent = year;
