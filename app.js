const loadFood = async () => {
    const text = document.getElementById('input');
    const foodName = text.value.toLowerCase();
    if (foodName == '') {
        alert("No Input! Please Input a food Name.");
    }
    else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.meals == null) {
            alert("Not Found");
        }
        else {
            displayFoods(data);
        }
        text.value = '';
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
            <div onclick="loadDetail(${food.idMeal})" data-bs-toggle="modal" data-bs-target="#exampleModal" class="card" style="cursor:pointer";>
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
    const modalHeader = document.getElementById('modalHeader');
    const modalBody = document.getElementById('modalBody');
    modalHeader.innerHTML = `
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        `
    modalBody.innerHTML = `
        <img width="300px" src="${data.meals[0].strMealThumb}" />
        <h2>${data.meals[0].strMeal}</h2>
        <p>${data.meals[0].strInstructions}</p>
    `
}