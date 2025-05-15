let currentData = null;
let sortStates = {
    male: { count: 0, ascending: true },
    female: { count: 0, ascending: true },
    amount: { count: 0, ascending: true },
    alphabetical: { count: 0, ascending: true }
};

const sidebar = document.querySelector(".sidebar");
const toggle = document.querySelector(".toggle");
const searchInput = document.querySelector('#search-input');

async function fetchData() {
    const response = await fetch("https://randomuser.me/api/?results=50");
    const data = await response.json();
    data.results.forEach(user => {
        let randomAmount = Math.floor(Math.random() * 10000) + 1;
        user.amount = randomAmount;
    });
    return data;
}

function handleSort(sortType, sortedResults) {
    sortStates[sortType].count++;
    
    if (sortStates[sortType].count === 2) {
        sortStates[sortType].ascending = !sortStates[sortType].ascending;
        sortStates[sortType].count = 0;
    }

    switch(sortType) {
        case 'male':
            return sortedResults.filter(user => user.gender === "male");
        case 'female':
            return sortedResults.filter(user => user.gender === "female");
        case 'amount':
            return sortedResults.sort((a, b) => {
                return sortStates[sortType].ascending ? 
                    b.amount - a.amount : 
                    a.amount - b.amount;
            });
        case 'alphabetical':
            return sortedResults.sort((a, b) => {
                return sortStates[sortType].ascending ? 
                    a.name.first.localeCompare(b.name.first) : 
                    b.name.first.localeCompare(a.name.first);
            });
        default:
            return sortedResults;
    }
}

function handleSearch(sortedResults) {
    const searchTerm = searchInput.value.toLowerCase();
    if (!searchTerm) return sortedResults;
    
    return sortedResults.filter(user => 
        user.name.first.toLowerCase().includes(searchTerm) ||
        user.name.last.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.location.city.toLowerCase().includes(searchTerm) ||
        user.location.country.toLowerCase().includes(searchTerm) ||
        user.amount.toString().includes(searchTerm)
    );
}

function createUserCard(user) {
    const userCard = document.createElement("div");
    userCard.className = "user-card";
    userCard.innerHTML = `
        <img id="picture" src="${user.picture.medium}" alt="Photo de profil">
        <h3 id="name">${user.name.first} ${user.name.last}</h3>
        <p id="email">📧 ${user.email}</p>
        <p id="phone">☎️ ${user.phone}</p>
        <p id="city-country">📍 ${user.location.city}, ${user.location.country}</p>
        <h2 id="amount">💶 ${user.amount}€</h2>
        <div id="gender" style="width: 20px; height: 20px; border-radius: 50%; background-color: ${user.gender === "male" ? "#007aff" : "#e91e63"}"></div>
    `;
    return userCard;
}

async function displayData(sortType = null) {
    if (!currentData) {
        currentData = await fetchData();
    }
    
    const userContainer = document.getElementById("user-container");
    userContainer.innerHTML = "";

    let sortedResults = [...currentData.results];
    sortedResults = handleSearch(sortedResults);
    
    if (sortType) {
        sortedResults = handleSort(sortType, sortedResults);
    }

    sortedResults.forEach(user => {
        userContainer.appendChild(createUserCard(user));
    });
}

function handleSidebarToggle() {
    if (window.innerWidth <= 600) {
        sidebar.classList.toggle("open");
        sidebar.classList.remove("close");
        localStorage.setItem("sidebarState", "close");
    } else {
        sidebar.classList.toggle("close");
        sidebar.classList.remove("open");
        localStorage.setItem("sidebarState", "open");
    }
}

toggle.addEventListener("click", handleSidebarToggle);

document.querySelectorAll('.sidebar li a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sortType = e.currentTarget.getAttribute('data-sort');
        if (sortType) {
            displayData(sortType);
        }
    });
});

displayData();

