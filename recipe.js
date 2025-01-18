const searchbox = document.querySelector(`.searchbox`);
const searchbtn = document.querySelector(`.searchbtn`);
const recipecontainer = document.querySelector(`.recipe-container`);
 const recipedetailscontent = document.querySelector(`.recipe-details-content`);
 const recipeclosebtn = document.querySelector(`.recipe-close-btn`);

// function to get recipes
const fetchRecipes = async (query) => {

    try {
        
   
        
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipecontainer.innerHTML = "";
    response.meals.forEach(meal => {
        
       const recipeDiv = document.createElement('div');
       recipeDiv.classList.add('recipe');
       recipeDiv.innerHTML =`
       <img src="${meal.strMealThumb}">
       <h3>${meal.strMeal}</h3>
       <p><span>${meal.strArea}</span>Dish</p>
       <p>Belong to <span>${meal.strCategory}</span> category</p>
       `

       const button = document.createElement('button');
       button.textContent = "view recipe";
       recipeDiv.appendChild(button);

        // adding addEventListener TO RECIPE button
        button.addEventListener('click', () =>{
            openRecipePopup(meal);
        });

       recipecontainer.appendChild(recipeDiv);
    });

} catch (error) {
    recipecontainer.innerHTML = "<h2>error in Feching Recipes...</2>";
    
}
    
}

// functionto fetch ingredients and measuremebts
const fetchIngredient = (meal) => {
    let ingredientsList = "";
    for (let i = 0; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        } else {
            break;
        }
        
    }
    return ingredientsList;
}

const openRecipePopup = (meal) => {
    recipedetailscontent.innerHTML =`
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>ingredent</h3>
    <ul class="ingredientList">${fetchIngredient(meal)}</ul>
      <div class="recipeInstructions">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    `
  

    recipedetailscontent.parentElement.style.display = "block";
}

recipeclosebtn.addEventListener('click', () =>{
    recipedetailscontent.parentElement.style.display = "none";
});

searchbtn.addEventListener(`click`, (e) => {
    e.preventDefault();
    const searchinput = searchbox.value.trim();
    if (!searchinput) {
        recipecontainer.innerHTML = `<h2>Type the meal in the search box.</h2>`;
        return;
    }
    fetchRecipes(searchinput);
})