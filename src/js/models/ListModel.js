import uniqid from "uniqid"

export default class ListItem{
        constructor(){
            this.listItems = [];
        }

        addItemToList(count,unit,ingName){
            const item = {
                id:uniqid(),
                count,
                unit,
                ingName
            }
            this.listItems.push(item);
            return item;
        }

        deleteItem(id){
            let itemIndex = this.listItems.findIndex(elem=> elem.id === id);
            this.listItems.splice(itemIndex,1);
        }

        updateIngCount(id,count){
            let item = this.listItems.find(elem=> elem.id === id);
            item.count = count;
        }
}