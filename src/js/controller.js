import * as model from './model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultView.js';

// import icons from'../img/icons.svg'; //parcel 1
 //parcel 2
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import resultView from './views/resultView.js';
// import {async} from '.regenerator-runtime';

//parcel version 2 to import a non programming file as image requires a url and the path

// const recipeContainer = document.querySelector('.recipe');
// if(module.hot){
//   module.hot.accept();
// }

const  controlRecipes = async function(){
  try{
     resultsView.renderSpinner();
     

    const id = window.location.hash.slice(1);
   

    if(!id) return;
    recipeView.renderSpinner();

//1 loading recipe
    await model.loadRecipe(id)
  //  model.loadRecipe(id).then(data => data);
    

    //2 Rendering the recipe
    recipeView.render(model.state.recipe);
    
  }
  catch(err){
    recipeView.renderError();
  }
}

const controlSearchResults = async function(){
  try{
    //1. get search query
    const query = searchView.getQuery();
    if(!query) return;

    //2 load search results
    await model.loadSearchResults(query);

    //3 render results
    
    // resultsView.render(model.state.search.results)
    
    resultsView.render(model.getSearchResultsPage())
  }catch(err){
    console.log(err);
  }
}
controlSearchResults();


const init = function(){
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();