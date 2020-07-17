export const elements = {
    searchInput: document.querySelector('.search__input'),
    searchButton : document.querySelector('.search__button'),
    recipeList:document.querySelector('.recipe__list'),
    listContainer:document.querySelector('.listContainer'),
    pagination:document.querySelector('.pagination'),
    recipeContainer:document.querySelector('.recipeContainer'),
    shoppingListItemsContainer:document.querySelector('.shoppingListItemsContainer'),
    likedList:document.querySelector(".likedList"),
    likedCount:document.querySelector(".likedCount")
}

export const domString = {
    numOfServe : ".num__serve",
    ingCount:'.ing__count',
    likeIcon:".like__item"
}

export const elementString = {
    loader: 'loader'
}

export const renderLoader = function(parent){

    let markup = `<div class=${elementString.loader}>
            <i class="fa fa-refresh fa-spin"></i>
        </div>`

    parent.insertAdjacentHTML('afterbegin',markup)
}

export const limitTitle = function(title,limit = 17){
    if(title.length <= limit){
        return title;
    }
    let titleStr = "";
    title.split(' ').forEach(ele=>{
        if((titleStr + ele).length < limit){
            titleStr += " " + ele;
        }
    }) 
    return titleStr + "...";
    
}

export const removeLoader = function(parent){
        let loader = document.querySelector(`.${elementString.loader}`);
        if(loader){
            parent.removeChild(loader)
        }
}

export const getQueryVariable = function(variable)
{
       var query = window.location.href.split("#")[1];
       if(query){
            var vars = query.split("&");
            for (var i=0;i<vars.length;i++) {
                    var pair = vars[i].split("=");
                    if(pair[0] == variable){return pair[1];}
            }
       }
       return(false);
}

export const setLocalStorageData = function(item,data){
    let _data = JSON.stringify(data);
    localStorage.setItem(item,_data)
}

export const getLocalStorageData = function(item){
    let data = localStorage.getItem(item);
    if(data){
        return JSON.parse(data);
    }
}