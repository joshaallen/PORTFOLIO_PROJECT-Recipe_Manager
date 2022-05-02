function onLoad() {
    let elSaveButton = document.getElementById("save");
    let elRecipeTitle = document.getElementById("title");
    let elRecipeAuthor = document.getElementById("author");
    let elCookingTime = document.getElementById("cooking_time");
    let elRecipeCookTimeUnits = document.getElementById("cooking_time_units");
    let elPrepTime = document.getElementById("prep_time");
    let elRecipePrepTimeUnits = document.getElementById("prep_time_units");
    let elRecipeServing = document.getElementById("serving");
    let elRecipeIngredient = document.getElementById("ingredient");
    let elRecipeIngredientQuantity = document.getElementById("ingredient_quantity");
    let elRecipeIngredientUnit = document.getElementById("ingredient_unit");
    let elRecipeInstruction = document.getElementById("instruction");
    let elRecipeDifficulty = document.getElementById("recipe_difficulty");

    let elAddIngredient = document.getElementById("addIngredient");
    let elAddInstruction = document.getElementById("addInstruction");
    let temp = document.getElementsByTagName("template")[0];

    let tempTwo = document.getElementsByTagName("template")[1];

    let instructionValueArray = [];
    let ingredientValueArray = [];
    //Add instruction event handler
    elAddInstruction.addEventListener('click', function() {
        let elInstructionContainer = document.getElementById("instruction_container");
        let item = tempTwo.content.querySelector("div");
        let a = document.importNode(item, true);
        elInstructionContainer.appendChild(a);
    },false);

    //Add ingredient event handler
    elAddIngredient.addEventListener('click', function() {
        let elIngredientContainer = document.getElementById("ingredient_container");
        let item = temp.content.querySelector("div");
        let a = document.importNode(item, true);
        elIngredientContainer.appendChild(a);
    },false);
 

    elSaveButton.addEventListener('click', function() {
        //Save cooking to an object constructor
        function Cooking (text, unit) {
            this.text = text;
            this.unit = unit;
        }

        let cooking = new Cooking(elCookingTime.value, elRecipeCookTimeUnits.value);

        //Save prep to an object constructor
        function Prep (text, unit) {
            this.text = text;
            this.unit = unit;
        }

        let prep = new Prep(elPrepTime.value, elRecipePrepTimeUnits.value);

        //Save Difficulty to an object constructor
        function Difficulty (difficulty) {
            this.difficulty = difficulty; 
        }

        let difficulty = new Difficulty(elRecipeDifficulty.value);


        //Save instruction values to array
        let elInstructionValue = document.getElementById("instruction").value;
        let elInstructionList = document.querySelectorAll("input[id='instruction']");
        for( let index = 0; index < elInstructionList.length; index++) {
            instructionValueArray.push(elInstructionList[index].value); 
        } 
        console.log(instructionValueArray); 
        //Save ingredient to an object
        let elIngredientList = document.querySelectorAll("#ingredient_container > div");
    
        function Ingredient (text, quantity, unit) {
            this.text = text;
            this.quantity = quantity;
            this.unit = unit;
        }

        for(let index = 0; index < elIngredientList.length; index ++) {
            let ingredient = new Ingredient(elIngredientList[index].children[1].value, elIngredientList[index].children[3].value, elIngredientList[index].children[5].value);
            ingredientValueArray.push(ingredient);
        }
        console.log(ingredientValueArray);
   
        /*obstructor constructor notation*/
        function Recipe (title, author, cooking, prep, serving, difficulty, ingredients, instructions) {
            this.title = title;
            this.author = author;
            this.cooking = cooking;
            this.prep = prep;
            this.serving = serving;
            this.difficulty = difficulty;
            this.ingredients = ingredients;
            this.instructions = instructions;
        }
        let newRecipe = new Recipe (elRecipeTitle.value, elRecipeAuthor.value, cooking, prep, elRecipeServing.value, difficulty, ingredientValueArray, instructionValueArray); 
    
        /*JSON string*/
        console.log(newRecipe);
        let jsonRecipe = JSON.stringify(newRecipe);
        localStorage.setItem(elRecipeTitle.value,jsonRecipe);
        elRecipeTitle.value = "";
        elRecipeAuthor.value = "";
        elInstructionValue = ""; 

        ingredientValueArray = [];

        instructionValueArray = [];

    }, false);
}

window.addEventListener('load', function () {
    onLoad();
}, false)