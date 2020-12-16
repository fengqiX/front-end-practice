const main = document.getElementById('main');
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMilBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calWealthBtn = document.getElementById("calculate-wealth");

//全局变量
let data = []


getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api/');
    //局部变量
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 10000)
    };
console.log(newUser)
    addData(newUser);


}

function doubleMoney() {
    data = data.map(user => {
        console.log(user)
        return {
            ...user,
            money: user.money * 2
        };
    })
    updateDOM();
}

function sortByRichest() {
    data.sort((a, b) => b.money - a.money);
    updateDOM();
}

function showMillionaires() {
    data = data.filter(user => user.money > 1000000);
    updateDOM();
}



function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc + user.money), 0);
    const wealthEl = document.createElement("div");

    wealthEl.innerHTML = `<h3>Total Wealth$:
            <strong>{formatMoney(wealth)}</strong></h3>`
    main.appendChild(wealthEl)
}


function addData(obj) {
    data.push(obj);
    updateDOM();
}

function updateDOM(providedData = data) {

    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';


    providedData.forEach(item => {
        const element = document.createElement("div");
        element.classList.add("person");
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
        main.appendChild(element)
    })

}

function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}


addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMilBtn.addEventListener('click', showMillionaires);
calWealthBtn.addEventListener('click', calculateWealth);
