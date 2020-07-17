import {elements,limitTitle} from './base'
export const getInputValue = function(){
    let input = elements.searchInput;
    return input.value
 }



const renderRecipe = function(rec){
    let recipeTitle = limitTitle(rec.title);
    let markup = `<li class="listBox">
                        <a class="flex" href=#recipeId=${rec.recipe_id}>
                            <img src=${rec.image_url} alt="Test">
                            <div class="listText">
                                <h4 class="recipeTitle">${recipeTitle}</h4>
                                <p class="recipeSubTitle">${rec.publisher}</p>
                            </div>
                        </a>
                    </li>`
    elements.recipeList.insertAdjacentHTML('beforeend',markup);
}
export const renderResultsOnUI = function(recipes,page=1,resPerPage=10){

    if(recipes && recipes.length > 0){
        let start = (page -1) * resPerPage;
        let end = page * resPerPage;
        recipes.slice(start,end).forEach(rec => {
            renderRecipe(rec);
        });
        removePageButons();
        renderPageButtons(page,recipes.length,resPerPage)
    }else{
        let notFoundMarkup = `<span class="notFound">No Results Found</span>`
        elements.recipeList.innerHTML = notFoundMarkup;
    }
}

const createButton = function(page,type){
    let pageNum = type == 'prev' ? page - 1 : page + 1;
    let markup = `<button  class="pageButton ${type}Page" data-pagenum=${pageNum}>Page ${pageNum}</button>`
    return markup;
}

const removePageButons = function(){
    elements.pagination.innerHTML = "";
}

const renderPageButtons = function(page,totalResults,resPerPage){
        let pages = Math.ceil(totalResults / resPerPage);
        let markup = "";
        if(page == 1 && pages > 1){
            markup = createButton(page,'next')
        }else if(page < pages){
            markup = createButton(page,'next');
            markup += createButton(page,'prev');
        }else if(page == pages && pages > 1){
            markup = createButton(page,'prev');
        }
        elements.pagination.insertAdjacentHTML('beforeend',markup);
}

export const clearInput = function(){
    elements.searchInput.value = "";
}

export const clearRecipies = function(){
    elements.recipeList.innerHTML = '';
}