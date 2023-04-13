import * as model from './model.js'
import {MODAL_CLOSE_SEC }from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';


// import icons from'../img/icons.svg'; //parcel 1
 //parcel 2
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import resultView from './views/resultView.js';
import {async} from 'regenerator-runtime';

//parcel version 2 to import a non programming file as image requires a url and the path

// const recipeContainer = document.querySelector('.recipe');
// if(module.hot){
//   module.hot.accept();
// }

const  controlRecipes = async function(){
  try{
    //  resultsView.renderSpinner();
     

    const id = window.location.hash.slice(1);
   

    if(!id) return;
    recipeView.renderSpinner();

    //0) Update result view to marek selected searchy result
    resultsView.update(model.getSearchResultsPage());
    
    //3) updating bookmarks
    bookmarksView.update(model.state.bookmarks);
    
    //1 loading recipe
    await model.loadRecipe(id)
  //  model.loadRecipe(id).then(data => data);
  // resultsView.renderSpinner();
  
  //2 Rendering the recipe
  recipeView.render(model.state.recipe);
      
  }
  catch(err){
    recipeView.renderError();
    console.error(err);
  }


};

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
    
    resultsView.render(model.getSearchResultsPage());

    //4 render initial pagination buttons
    paginationView.render(model.state.search);
  }catch(err){ 
    console.log(err);
  }
}
controlSearchResults();

const controlPagination = function(goToPage){
  //3 render NEW results
    
    resultsView.render(model.getSearchResultsPage(goToPage));

    //4 render NEW pagination buttons
    paginationView.render(model.state.search)
}

const controlServings = function(newServings){
  //update the recipe servings (in the state)
  model.updateServings(newServings);

  //update the recipeview 
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function(){
  //1 add/remove bookmark

  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  
  //2) update recipe view
  recipeView.update(model.state.recipe);

  //3) REnder bookmark
  bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmarks)
}

const controlAddRecipe = async function(newRecipe){
  try{
    //show the loading spinner
    addRecipeView.renderSpinner();

    //upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //Render recipe
    recipeView.render(model.state.recipe);

    //SUCCESS MESSAGE
    addRecipeView.renderMessage();

    //Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    //change ID in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // Window.history.back();allows you to back in the page history
    //close form window
    setTimeout(function(){
      addRecipeView.toggleWindow()
    }, MODAL_CLOSE_SEC * 1000);
  }catch(err){
    console.error('🎇',err)
    addRecipeView.renderError(err.message)
  }

};

const newFeature = function(){
  console.log('welcome to the application');
}

const init = function(){
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe)
// <<<<<<< HEAD
  console.log('welcome you have been hacked')
// =======
  newFeature();
// >>>>>>> new-feature
};

init();
const clearBookmarks = function(){
  localStorage.clear('bookmarks')
}

// clearBookmarks();