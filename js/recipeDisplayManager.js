function onLoad() {
    //removing content from ingredients section
    const ingredientSectionToggle = document.querySelector(".toggle-ingredients"); 
    //removing content from ingredients section
    const instructionSectionToggle = document.querySelector(".toggle-instructions"); 
    //increase button
    const increaseButton = document.querySelector("button#increase"); 
    //decrease button
    const decreaseButton = document.querySelector("button#decrease"); 
    //servings element
    const elCurrentServingsAmount = document.querySelector(".servings-amount");
    //Patterns to be used
    const EMPTY_SPACE_PATTERN = /[ ]/;
    const DECIMAL_PATTERN = /[.]/;
    //Rational Numbers
    const DECIMAL_ONE_FOURTH = 1/4;
    const DECIMAL_ONE_THIRD = 1/3;
    const DECIMAL_ONE_HALF = 1/2;
    const DECIMAL_TWO_THIRDS = 2/3;
    const DECIMAL_THREE_FOURTH = 3/4;
    const FRACTION_ONE_FOURTH = "1/4";
    const FRACTION_ONE_THIRD = "1/3";
    const FRACTION_ONE_HALF = "1/2";
    const FRACTION_TWO_THIRDS = "2/3";
    const FRACTION_THREE_FOURTH = "3/4";
    const ONE = 1;
    const ZERO = 0;
    //current servings amount
    let currentServingsAmount;
    //ingredients array
    let ingredientsArray = [];
    


    //Fuction Expression
    const jsonObject = function getLocalStorage(value) {
        console.log("Got JSON Object");
        return JSON.parse(localStorage.getItem(value));
    }

    function getRecipeTitle(value) {
        let recipeTitle = localStorage.getItem(value);
        console.log("Got Recipe Title");
        return recipeTitle;
    }

    function buildTitleSection(value) {
        let elTitleSection = document.querySelector(".title-section");
             //Title Section
            elTitleSection.querySelector(".recipe-heading").textContent = value.title;
            elCurrentServingsAmount.textContent = value.serving;
            getCurrentServingsAmount(elCurrentServingsAmount.textContent);
            elTitleSection.querySelector(".cookingTime").textContent += value.cooking.text + " " + value.cooking.unit;
            elTitleSection.querySelector(".prepTime").textContent += value.prep.text + " " + value.prep.unit;
    }

    function buildIngredientSection(value) {
         //Ingredient Section
    let elIngredientSection = document.querySelector(".ingredient-section");
    let elIngredientContainer = elIngredientSection.querySelector(".ingredients");
    for(let index = 0; index < getIngredientsArray(value.ingredients).length; index++) {
        let li = document.createElement("li");
        li.className = "bullet indent li-position";
        li.innerHTML = ingredientsArray[index].text + " " + "<span>"+ingredientsArray[index].quantity+"</span>" + " " + ingredientsArray[index].unit;
        elIngredientContainer.appendChild(li);
        }
    }

    function buildInstructionSection(value) {
         //Instruction Section
        let elInstructionSection = document.querySelector(".instruction-section");
        let elInstructionsContainer = elInstructionSection.querySelector(".instructions");
        let instructionsArray = value.instructions;
        for(let index = 0; index < instructionsArray.length; index++) {
        let li = document.createElement("li");
        li.className = "numeral indent li-position";
        li.textContent = instructionsArray[index];
        elInstructionsContainer.appendChild(li);
        }
    }

    function getCurrentServingsAmount(value) {
        currentServingsAmount = parseInt(value);
    }

    function getConversionFactor(intendedValue, currentValue) {
        return parseFloat(intendedValue / currentValue);
    }

    function getIngredientsArray(value) {
        ingredientsArray = value;
        return ingredientsArray;
    }

    function convertIngredientServing(conversionValue, servingValue) {
        servingValue = returnDecimal(servingValue);
        console.log("Decimal Serving Value");
        console.log(servingValue);
        let convertedIngredientAmount = conversionValue*servingValue;
        console.log("Converted Amount before Rounding");
        console.log(convertedIngredientAmount);
        let stringConvertedAmount = convertedIngredientAmount.toString();
        let decimalPosition = stringConvertedAmount.search(DECIMAL_PATTERN);
        let stringRoundedToThreeConvertedAmount = stringConvertedAmount.slice(0,decimalPosition + 4);
        convertedIngredientAmount = parseFloat(stringRoundedToThreeConvertedAmount);
        return convertedIngredientAmount; 
    }

    function returnDecimal(value) {
        let stringValue = value.toString();
        let emptySpacePosition = stringValue.search(EMPTY_SPACE_PATTERN);
        if(emptySpacePosition === -1) {
            
            if(value === FRACTION_ONE_FOURTH) {
                return DECIMAL_ONE_FOURTH;
            }
            else if(value === FRACTION_ONE_THIRD) {
                return DECIMAL_ONE_THIRD;
            }
            else if(value === FRACTION_ONE_HALF) {
                return DECIMAL_ONE_HALF;
            }
            else if(value === FRACTION_TWO_THIRDS) {
                return DECIMAL_TWO_THIRDS;
            }
            else if(value === FRACTION_THREE_FOURTH) {
                return DECIMAL_THREE_FOURTH;
            }
            else if(parseInt(value) >= 1) {
                return parseInt(value);
            }
        }
        else if(emptySpacePosition >= 1) {

            for(let index = ZERO; index < stringValue.length; index++) {
                if(index === emptySpacePosition) {
                   
                    let stringFractionPortion = stringValue.slice(index +1);
                    console.log("String Fraction Portion");
                    console.log(stringFractionPortion);
                    let stringWholePortion = stringValue.slice(0,index);
                    console.log("String Whole Portion");
                    console.log(stringWholePortion);
                    let numberWholePortion = parseInt(stringWholePortion);
                    if(stringFractionPortion === FRACTION_ONE_FOURTH) {
                        return numberWholePortion + DECIMAL_ONE_FOURTH;
                    }
                    else if(stringFractionPortion === FRACTION_ONE_THIRD) {
                        return numberWholePortion + DECIMAL_ONE_THIRD;
                    }
                    else if(stringFractionPortion === FRACTION_ONE_HALF) {
                         return numberWholePortion + DECIMAL_ONE_HALF;
                    }
                    else if(stringFractionPortion === FRACTION_TWO_THIRDS) {
                        return numberWholePortion + DECIMAL_TWO_THIRDS;
                    }
                    else if(stringFractionPortion === FRACTION_THREE_FOURTH) {
                        return numberWholePortion + DECIMAL_THREE_FOURTH;
                    }
                     
                }
            }
        } 
    }

    function splitDecimal(value) {
        let stringDecimalPosition;
        let stringDecimalPortion;
        let stringWholePortion;
        let stringArray = [];

        decimalPosition = value.search(DECIMAL_PATTERN);
        if(decimalPosition === -1) {
                return [value, "0"];
        }
        for(let index = 0; index < value.length; index++) {
            if(index === decimalPosition) {
                stringDecimalPortion = value.slice(index);
                stringWholePortion = value.slice(0,index);
                return [stringWholePortion, stringDecimalPortion];
            }
            
        }

    }

    function determineDecimal(value) {
        let stringConvertedIngredientAmount = "";
        let floatDecimalPortion;
        let intWholePortion;
        let mixedNumber;
        stringConvertedIngredientAmount = value.toString();
        console.log("String Converted Ingredient Amount");
        console.log(stringConvertedIngredientAmount);
        intWholePortion = parseInt(splitDecimal(stringConvertedIngredientAmount)[0]);
        floatDecimalPortion = parseFloat(splitDecimal(stringConvertedIngredientAmount)[1]);
        console.log("Int Whole Portion");
        console.log(intWholePortion);
        console.log("Float Decimal Portion");
        console.log(floatDecimalPortion);
        /*
        if decimal portion is 0 no need to pass value to 
        decimalSplitDetermineFraction function we will just return the value
        */
        if(floatDecimalPortion === 0) {
            return intWholePortion;
        }
        mixedNumber = decimalSplitDetermineFraction(intWholePortion,floatDecimalPortion);
        return mixedNumber;
    }

    function determineFraction(value) {
        
        let mixedNumber;
        if (value === ZERO) {
            return ZERO;
        }
        else if((value > ZERO) && (value <= DECIMAL_ONE_FOURTH)) {
            return FRACTION_ONE_FOURTH;
        }
         else if((value > DECIMAL_ONE_FOURTH) && (value <= DECIMAL_ONE_THIRD)) {
            return FRACTION_ONE_THIRD;
         }
        else if((value > DECIMAL_ONE_THIRD) && (value <= DECIMAL_ONE_HALF)) {
            return FRACTION_ONE_HALF;
         }
         else if((value > DECIMAL_ONE_HALF) && (value <= DECIMAL_TWO_THIRDS)) {
            return FRACTION_TWO_THIRDS;
         }
        else if((value > DECIMAL_TWO_THIRDS) && (value <= DECIMAL_THREE_FOURTH)) {
            return FRACTION_THREE_FOURTH;
         }
        else if ((value > DECIMAL_THREE_FOURTH) && (value <= ONE)) {
            return Math.ceil(value);
        }
        else if(value > ONE) {
            mixedNumber = determineDecimal(value);
            console.log("The mixed Number");
            console.log(mixedNumber);
            return mixedNumber;
        }

    }

    function decimalSplitDetermineFraction(wholeValue, decimalValue) {
       
        if((decimalValue > ZERO) && (decimalValue <= DECIMAL_ONE_FOURTH)) {
            return wholeValue + " " + FRACTION_ONE_FOURTH;
        }
         else if((decimalValue > DECIMAL_ONE_FOURTH) && (decimalValue <= DECIMAL_ONE_THIRD)) {
            return wholeValue + " " + FRACTION_ONE_THIRD;
         }
        else if((decimalValue > DECIMAL_ONE_THIRD) && (decimalValue <= DECIMAL_ONE_HALF)) {
            return wholeValue + " " + FRACTION_ONE_HALF;
         }
         else if((decimalValue >DECIMAL_ONE_HALF) && (decimalValue <= DECIMAL_TWO_THIRDS)) {
            return wholeValue + " " + FRACTION_TWO_THIRDS;
         }
        else if((decimalValue > DECIMAL_ONE_HALF) && (decimalValue <= DECIMAL_THREE_FOURTH)) {
            return wholeValue + " " +FRACTION_THREE_FOURTH;
         }
        else if ((decimalValue > DECIMAL_THREE_FOURTH) && (decimalValue <= ONE)) {
            return Math.ceil(wholeValue + decimalValue).toString();
        }

    }

    function getRationalNumber(value) {
        let rationalNumber;
        console.log("Value passed into getRationalNumber");
        console.log(value);
        rationalNumber = determineFraction(value);
        return rationalNumber;
    }

    function setRecipeIngredients(value) {
        //Ingredients
        let elIngredientSection = document.querySelector(".ingredient-section");
        let elIngredientContainer = elIngredientSection.querySelector(".ingredients");
         for(let index = 0; index < value.length; index++) {
            let liArray = elIngredientContainer.querySelectorAll("li");
            liArray[index].innerHTML = ingredientsArray[index].text + " " + "<span>"+ingredientsArray[index].quantity+"</span>"  + " " + ingredientsArray[index].unit;
        } 
    }

    let recipeObject = jsonObject(getRecipeTitle('RecipeTitle'));

    buildTitleSection(recipeObject);
    buildIngredientSection(recipeObject);
    buildInstructionSection(recipeObject);

   
     //removing content from ingredients section
    ingredientSectionToggle.addEventListener('click', function(){
        let ingredientSection = document.querySelector(".ingredient-section");
        let ingredients = ingredientSection.querySelector("ul");
        let show = document.getElementById("ingredient-show");
        let hide = document.getElementById("ingredient-hide");
        hide.classList.toggle("display-none");
        show.classList.toggle("display-none");
        show.classList.toggle("display-inline-block");
        ingredients.classList.toggle("display-none");
       
        
       
    },false);

    //removing content from instructions section
    instructionSectionToggle.addEventListener('click', function(){
        let instructionSection = document.querySelector(".instruction-section");
        let instructions = instructionSection.querySelector("ol");
        let show = document.getElementById("instruction-show");
        let hide = document.getElementById("instruction-hide");
        hide.classList.toggle("display-none");
        show.classList.toggle("display-none");
        show.classList.toggle("display-inline-block");
        instructions.classList.toggle("display-none");
    },false);
    
    //increasing servings count
    increaseButton.addEventListener('click', function(){
        let rationalNumber;
        let increasedServingsAmount = currentServingsAmount;
        increasedServingsAmount++;
        console.log("Current Servings Amount");
        console.log(currentServingsAmount);
        console.log("Increased Servings Amount");
        console.log(increasedServingsAmount);
        for(let index=0; index < ingredientsArray.length; index++) {
            let conversionFactor = getConversionFactor(increasedServingsAmount,currentServingsAmount);
            let ingredientServing = ingredientsArray[index].quantity;
            console.log("Conversion Factor");
            console.log(conversionFactor);
            let convertedIngredientServing = convertIngredientServing(conversionFactor, ingredientServing);
            console.log("Ingredeient Original Serving");
            console.log(ingredientServing);
            console.log("Converted Ingredient Servings");
            console.log(convertedIngredientServing);
            console.log("Ingedients Array");
            console.log(ingredientsArray);
            rationalNumber = getRationalNumber(convertedIngredientServing);
            console.log("Rational Number");
            console.log(rationalNumber);
            ingredientsArray[index].quantity = rationalNumber;
        }
        currentServingsAmount = increasedServingsAmount++;
        elCurrentServingsAmount.textContent = currentServingsAmount;
        console.log(ingredientsArray); 
        setRecipeIngredients(ingredientsArray);
    },false);
    //decreasing servings count
    decreaseButton.addEventListener('click', function(){
        let decreaseServingsAmount = currentServingsAmount;
        decreaseServingsAmount--;
        if(decreaseServingsAmount !=0) {
            console.log("Decreased Servings Amount");
        console.log(decreaseServingsAmount);
        console.log("Current Servings Amount");
        console.log(currentServingsAmount);
        for(let index=0; index < ingredientsArray.length; index++) {
            let conversionFactor = getConversionFactor(decreaseServingsAmount,currentServingsAmount);
            let ingredientServing = ingredientsArray[index].quantity;
            console.log("Conversion Factor");
            console.log(conversionFactor);
            let convertedIngredientServing = convertIngredientServing(conversionFactor, ingredientServing);
            console.log("Ingredeient Original Serving");
            console.log(ingredientServing);
            console.log("Converted Ingredient Servings");
            console.log(convertedIngredientServing);
            console.log("Ingredients Array");
            console.log(ingredientsArray);
            rationalNumber = getRationalNumber(convertedIngredientServing);
            console.log("Rational Number");
            console.log(rationalNumber);
            ingredientsArray[index].quantity = rationalNumber;
        }
        currentServingsAmount = decreaseServingsAmount--;
        elCurrentServingsAmount.textContent = currentServingsAmount;
        console.log(ingredientsArray); 
        setRecipeIngredients(ingredientsArray);
        }
        else if(decreaseServingsAmount === 0) {
            alert("Can't bring servings down to 0");
        }   
    },false);
}
window.addEventListener('load', function () {
    onLoad();
}, false)