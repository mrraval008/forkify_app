import {elements} from './base'

export const renderShoppingListOnUI = function(item){
    let markup = _createUIItemMarkup(item);
    elements.shoppingListItemsContainer.insertAdjacentHTML("beforeend",markup);
}

const _createUIItemMarkup = function(item){
    return `<div class="listItem" id="${item.id}">
                    <div class="list__ing__countContainer">
                        <input class="list__ing__count" type="number" value="${item.count}">
                        <input type="text" class="list__ing__unit" value="${item.unit}" readonly>
                    </div>
                    <p class="list__ing__title">
                        ${item.ingName}
                    </p>
                    <span class="list__ing__del">
                        <i class="fa fa-trash-o delete__list" aria-hidden="true"></i>
                    </span>
                </div>`
}


export const deleteShoppingListItem = function(itemId){
    let elem = document.querySelector("#"+itemId);
    elements.shoppingListItemsContainer.removeChild(elem)
}   

export const clearListView = function(){
    elements.shoppingListItemsContainer.innerHTML = ""
}


