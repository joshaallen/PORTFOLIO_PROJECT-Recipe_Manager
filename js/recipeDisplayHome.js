function onLoad() {
    const main = document.querySelector(".main-container");
    //Patterns to be used
    const BEGINNING_RECIPE_PATTERN = /^{"title":/;
            
    function loadStorage() {
        for(let index = 0; index < localStorage.length; index++){
            let recipeString = localStorage.getItem(localStorage.key(index));
            if(recipeString.search(BEGINNING_RECIPE_PATTERN) != -1) {
                let recipeObject = JSON.parse(recipeString);
                let temp = document.getElementsByTagName("template")[0];
                let item = temp.content.querySelector(".recipe-container");
                item.querySelector(".recipe-title").textContent = recipeObject.title;
                item.querySelector(".recipe-author .small").textContent = recipeObject.author;
                let a = document.importNode(item, true);
                main.appendChild(a);
            }
        } 
    } 

    loadStorage();

    main.addEventListener('click', function(e) {
        if(e.target.isEqualNode(document.querySelector("div a > img"))) {
            console.log(e.target);
            const para = e.target.parentElement.nextElementSibling;
            let recipeTitle = para.textContent;
            localStorage.setItem('RecipeTitle',recipeTitle);
        } 
    },false); 
}
window.addEventListener('load', function () {
    onLoad();
}, false)