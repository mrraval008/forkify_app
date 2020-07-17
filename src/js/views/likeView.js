import {elements, limitTitle} from './base'


export const addLikeItem = function(id,imgUrl,title,publisher){
    let _title = limitTitle(title);
    let markup = createLikeItem(id,imgUrl,_title,publisher);
    elements.likedList.insertAdjacentHTML('beforeend',markup);
}

const createLikeItem = function(id,imgUrl,title,publisher){

    let markup = `<li class="listBox" id="like-${id}">
                    <a class="flex" href="#recipeId=${id}">
                        <img src=${imgUrl} alt="Test">
                        <div class="listText">
                            <h4 class="recipeTitle">${title}</h4>
                            <p class="recipeSubTitle">${publisher}</p>
                        </div>
                    </a>
                </li>`
    return markup;
}

export const removeLikeItem = function(id){
    let item = document.querySelector("#like-"+id);
    elements.likedList.removeChild(item);
}

export const toggleLikeButton = function(elem,isLiked){
    if(isLiked){
        elem.classList.add("likeColor");
    }else{
        elem.classList.remove("likeColor");
    }
}

export const updateLikedCount = function(type){
    let likedCount = parseInt(elements.likedCount.textContent);
    if(type == "inc"){
        likedCount += 1;
    }else{
        likedCount -= 1
    }
    elements.likedCount.textContent = likedCount;
}

