import {setLocalStorageData, getLocalStorageData} from '../views/base'


export default class LikeItem {

        constructor(){
            this.likedItems = [];
        }

        addLikeItem(itemId,ImgURL,title,publisher){
            let newItem = {
                id:itemId,
                imgUrl:ImgURL,
                title:title,
                publisher:publisher
            }
            this.likedItems.push(newItem);
            this._updateLikeLocalStorage(this.likedItems);
            return newItem;
        }

        removeLikeItem(id){
            let itemIndex = this.likedItems.findIndex(item => item.id === id);
            this.likedItems.splice(itemIndex,1);
            this._updateLikeLocalStorage(this.likedItems);
        }

        isLiked(id){
            return this.likedItems.findIndex(item => item.id === id);
        }

        getLikedCount(){
            return this.likedItems.length;
        }

        _updateLikeLocalStorage(items){
            setLocalStorageData("likes",items);
        }

        getLikeFromLocalStorage(){
            return getLocalStorageData("likes");
        }
      

        
}