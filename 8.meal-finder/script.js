const search = document.getElementById("search");
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const mealsEl = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const single_mealEl = document.getElementById('single-meal');

function searchMeal(e) {

	e.preventDefault();

	single_mealEl.innerHTML = "";

	const term = search.value;

	if (term.trim()) {

		fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
			.then(res => res.json())
			.then(data => {
				console.log(data);
				resultHeading.innerHTML = `<h2>Search results for ${term}</h2>`;

				if (data.meals === null) {
					resultHeading.innerHTML = `<p>There are no search results. Please try again!</p>`
				} else {
					meals.innerHTML = data.meals.map(
						meal => `<div class="meal" >
					<img src="${meal.strMealThumb}" alt="${meal.strMeal}" >
						<div class="meal-info" data-mealid="${meal.idMeal}">
						<h3>${meal.strMeal}</h3>
					</div>
					</div>`).join("");

				}
			});
		search.value = "";

	} else {
		alert('Please enter a search term');

	};
}

function searchById(mealID) {
	fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
		.then(res => res.json())
		.then(data => {
			const meal = data.meals[0];
			addMealToDom(meal);
		})
}


function getRandomMeal() {
	fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
		.then(res => res.json())
		.then(data => {
			const meal = data.meals[0];
			addMealToDom(meal);
		})
}


function addMealToDom(meal) {
	const ingredients = [];
	for (let i = 1; i <= 20; i++) {
		if (meal[`strIngredient${i}`]) {
			ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
		} else {
			break;
		}
	}
	console.log(ingredients);
	single_mealEl.innerHTML = `
<div class="single-meal" id="single-meal">
	<h1>${meal.strMeal}</h1>
<img src="${meal.strMealThumb}" alt="${meal.strMeal}">
<div class="single-meal-info">
${meal.strCategory ? `<p>Category: ${meal.strCategory}`:""}
${meal.strArea ? `<p>Area: ${meal.strArea}</p>`:""}	
</div>
<div class="main">
<p>${meal.strInstructions}</p>
<h2>Ingredients</h2>
<ul>
${ingredients.map(ing=>	`<li>${ing}</li>`).join("")}
</ul>
</div>

</div>
`
}
;
submit.addEventListener('submit', searchMeal);

random.addEventListener('click', getRandomMeal);

mealsEl.addEventListener('click', e => {
	const mealInfo = e.path.find(item => {
		if (item.classList) {
			return item.classList.contains('meal-info');
		} else {
			return false;
		}
	})
	if (mealInfo) {
		const mealId = mealInfo.getAttribute('data-mealid');
		console.log(mealId);
		searchById(mealId);
var scrollDiv = document.getElementById("single-meal").offsetTop;
		console.log(scrollDiv);
window.scrollTo({ top: scrollDiv, behavior: 'smooth'});
	}
})
