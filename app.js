const loadFood = async () => {
    const text = document.getElementById('input');
    const foodName = text.value.toLowerCase();
    if (foodName == '') {
        const errorMessage = document.createElement('h3');
        errorMessage.classList.add('text-center');
        errorMessage.classList.add('text-light');
        errorMessage.classList.add('mt-3');
        errorMessage.innerHTML = `No Search Input, Please input a food name!!`;
        const mealsDiv = document.getElementById("error");
        mealsDiv.appendChild(errorMessage);
    }
    else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
        const res = await fetch(url);
        const data = await res.json();
        displayFoods(data);
        text.value = '';
        document.getElementById('error').innerHTML = '';
    }
}

const displayFoods = (data) => {
    const foods = data.meals;
    console.log(foods);
    const parentDiv = document.getElementById('cards');
    parentDiv.innerHTML = '';
    foods.forEach(food => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div onclick="loadDetail(${food.idMeal})" class="card" style="cursor:pointer";>
                <img height="50%" src="${food.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${food.strMeal}</h5>
                <p class="card-text">${food.strInstructions.slice(0, 101)}...</p>
                </div>
            </div>
            `
        parentDiv.appendChild(div);
    })
}

const loadDetail = async (id) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const res = await fetch(url);
    const data = await res.json();
    detail(data);
}

const detail = (data) => {
    const detailShow = document.getElementById('detail');
    const detailCard = document.createElement('div');
    detailShow.innerHTML = '';
    detailCard.innerHTML = `
    <div class="card" style="width: 65%; margin: auto">
    <img src="${data.meals[0].strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${data.meals[0].strMeal}</h5>
      <p class="card-text">${data.meals[0].strInstructions.slice(0, 101)}</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
    `
    detailShow.appendChild(detailCard);
}