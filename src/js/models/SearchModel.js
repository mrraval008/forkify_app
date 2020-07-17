import axios from 'axios'

export default class Search{
        constructor(query){
            this.query = query;
        }

        async getSearchResults(){
            
            try{
                const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
                this.recipies = res.data.recipes;
            }catch(error){
                console.log(error)
            }   
           
        }
}