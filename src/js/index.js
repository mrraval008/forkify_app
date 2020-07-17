import Search from './models/SearchModel'
import Recipe from './models/RecipeModel'
import ShoppingList from './models/ListModel'
import LikeItem from './models/LikeModel'
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as shoppingListView from './views/shoppingListView';
import * as likeView from './views/likeView';


import {elements,renderLoader,removeLoader,getQueryVariable, domString} from './views/base'
const state  = {}
window.state = state
//global state of the app
//  -- search Object
//  --current recipe obj
// --shopping list obj
// --liked recipies

function addEventListeners(){
    elements.searchButton.addEventListener('click',function(e){
        e.preventDefault();
        controlSearch()
    })
    document.addEventListener('keydown',function(event){
            if(event.keyCode == 13){
                controlSearch();
            }
    })

    elements.pagination.addEventListener('click',function(event){
       let pageNum = event.target.getAttribute('data-pagenum');
       if(pageNum){
            searchView.clearRecipies();
            searchView.renderResultsOnUI(state.search.recipies,parseInt(pageNum),10)
       }
    })

    window.addEventListener('hashchange',function(e){
        controlRecipe();
    })
    window.addEventListener('load',function(e){
        state.likeList = new LikeItem();
        let likes = state.likeList.getLikeFromLocalStorage();
        controlSearch();
        if(likes){
            //Update like count
            likes.forEach(like=> {
                likeView.updateLikedCount("inc");
                likeView.addLikeItem(like.id,like.imgUrl,like.title,like.publisher);
            })
            state.likeList.likedItems = likes;
        }
        controlRecipe();
    })

    elements.recipeContainer.addEventListener("click",function(event){
            //here mathces is not required as dec_servings is only single element,I just used
            // .dec_servings *  this means any child of .dec_servings class elements 
            if(event.target.matches(".dec_servings,.dec_servings *")){
                if(state.recipe.servings > 1){   //Dont decrease till zero
                    //update ingredietns for recipe models
                    state.recipe.updateServingsIngredients("dec");
                    //Update on UI
                    recipeView.updateServingsIngredientsOnUI(state.recipe);
                }
             
            }else if(event.target.matches(".inc_servings,.inc_servings *")){
                //update ingredietns for recipe models
                state.recipe.updateServingsIngredients("inc");
                
                //Update on UI
                recipeView.updateServingsIngredientsOnUI(state.recipe);
            }else if(event.target.matches(".shopping__cart__button,.shopping__cart__button *")){
                controlShoopingList();
            }else if(event.target.matches(".like__item,.like__item *")){
                ControlLike(event);
            }
    });

}

// Recipe Controller
async function controlRecipe(){
    let recipeId = getQueryVariable('recipeId');
    console.log(recipeId);
    if(recipeId){
        
        //get instance
        state.recipe = new Recipe(recipeId)

        //clear UI and show loader
        recipeView.clearRecipeContainer();
        renderLoader(elements.recipeContainer);

         //get data
         await state.recipe.getRecipe();

         state.recipe.calcTime();
         state.recipe.calcServings();
         state.recipe.parseIngredients();

         //remove Loader
         removeLoader(elements.recipeContainer);
         
         //render UI
         recipeView.renderRecipeOnUI(state.recipe);

        if(state.likeList && state.likeList.isLiked(state.recipe.recipeId) > -1){
            likeView.toggleLikeButton(document.querySelector(domString.likeIcon),true);  
        }

    }
}

// Search Controller
async function controlSearch(){
    //1. Get input value
    let inputValue = searchView.getInputValue();

    //2. new Search obj and update state
    if(inputValue){
        state.search = new Search(inputValue); 
    }else{
        state.search = new Search('cake'); 
    }
        //3.Prepare UI for Results (loader)
        searchView.clearInput();
        searchView.clearRecipies();
        renderLoader(elements.listContainer)


        //4. get Data
        await state.search.getSearchResults();

        //5.remove loader
        removeLoader(elements.listContainer);

        //6. Render UI
        searchView.renderResultsOnUI(state.search.recipies)


   
}

async function controlShoopingList(){
    //get instance
    state.shoppingList = new ShoppingList();

    //Add item to  shoppingList Model
    let allIngredients = state.recipe.ingredients;

    // clear the list view
    shoppingListView.clearListView();

    allIngredients.forEach(ing => {
        
        let item  = state.shoppingList.addItemToList(ing.count,ing.unit,ing.ingredient);
        
        //Render item on shopping list UI
        shoppingListView.renderShoppingListOnUI(item);
    });

    elements.shoppingListItemsContainer.addEventListener("click",function(event){
        
        const itemId = event.target.closest('.listItem').id;
        if(event.target.matches(".delete__list")){
                
            //update ingredietns for shopping  List
            state.shoppingList.deleteItem(itemId);
                
            //Update on UI
            shoppingListView.deleteShoppingListItem(itemId);

        }else if(event.target.matches(".list__ing__count")){
            
            // Read data from UI
            let ingValue = parseFloat(event.target.value,10);

            //update item count
            state.shoppingList.updateIngCount(itemId,ingValue);
                
        }
    })
}

function ControlLike(event){
    if(!state.likeList){
        state.likeList = new LikeItem();
    }
    // event.target.classList.toggle("likeColor");
    
    let item = state.recipe;
    let ID = item.recipeId;
    if(state.likeList.isLiked(ID) > -1){
        //remove LIKE ITEM TO MODEL
        state.likeList.removeLikeItem(ID);
        
        //remove color to like icon
        likeView.toggleLikeButton(event.target,false);

        //Update like count
        likeView.updateLikedCount("dec")      

        //remove LIKE ITEM TO UI
        likeView.removeLikeItem(ID);
    }else{  
        //ADD LIKE ITEM TO MODEL
        state.likeList.addLikeItem(item.recipeId,item.imageURL,item.title,item.publisher);
    
        //add color to like icon
        likeView.toggleLikeButton(event.target,true);

        //Update like count
        likeView.updateLikedCount("inc")         

        
        //ADD LIKE ITEM TO UI
        likeView.addLikeItem(item.recipeId,item.imageURL,item.title,item.publisher);
    }
   


}



addEventListeners();
