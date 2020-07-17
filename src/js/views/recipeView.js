import { elements,domString} from "./base";

export const clearRecipeContainer = function(){
    let elem = elements.recipeContainer;
    elem.innerHTML = "";
}

const cretaeIngredient = function(ing){
    let markup = `<li>
                    <i class="fa fa-check-circle-o" aria-hidden="true"></i>
                    <span class="ing__count">${ing.count}</span>
                    <div class="ing__ingredient">
                        <span class="ing__unit">${ing.unit}</span>
                        ${ing.ingredient}
                    </div>
                </li>`

    return markup;
}

export const renderRecipeOnUI = function(recipe){
    let markup = `
                    <div class="recipeImg">
                        <img src="${recipe.imageURL}">
                    </div>
                    <div class="recipeTitle crossTitle">${recipe.title}</div>
                    <div class="serveContainer">
                            <div>
                                <i class="fa fa-clock-o serve__clock" aria-hidden="true"></i>
                                <span>${recipe.time}  Minutes</span>
                            </div>
                            <div>
                                <i class="fa fa-user serve__user" aria-hidden="true"></i>
                                <span class="num__serve">${recipe.servings}</span>Serving
                                <i class="fa fa-minus-circle dec_servings" aria-hidden="true"></i>
                                <i class="fa fa-plus-circle inc_servings" aria-hidden="true"></i>
                            </div>
                            <div>
                                    <i class="fa fa-heart fa-2x like__item" aria-hidden="true"></i>
                            </div>
                    </div>
                    <div class="ingContainer">
                        <ul class="ing__ul">
                                ${recipe.ingredients.map(elem=>cretaeIngredient(elem)).join("")}
                        </ul>
                    </div>
                    <div class="add__recipe__button">
                        <button class="shopping__cart__button"><i class="fa fa-shopping-cart" aria-hidden="true"></i>
                            Add to shopping list</button>
                    </div>

                `

                elements.recipeContainer.innerHTML = markup;

}

export const updateServingsIngredientsOnUI = function(recipe){
        // update servings
        document.querySelector(domString.numOfServe).textContent = recipe.servings;

        // update ingredients count
        let allIngredientsCountElem = Array.from(document.querySelectorAll(domString.ingCount));
        allIngredientsCountElem.forEach((ing,index)=>{
            ing.textContent = recipe.ingredients[index].count;
        })

}