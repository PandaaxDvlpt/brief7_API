async function fetchData() {
    const response = await fetch("https://randomuser.me/api/?results=50");
    const data = await response.json();
    return data;
};

let currentData = null;

async function displayData(sortType = null) {
    if (!currentData) {
        currentData = await fetchData();
    }
    
    const userContainer = document.getElementById("user-container");
    userContainer.innerHTML = "";

    let sortedResults = [...currentData.results];

    switch(sortType) {
        case 'male':
            sortedResults = sortedResults.filter(user => user.gender === "male");
            break;
        case 'female':
            sortedResults = sortedResults.filter(user => user.gender === "female");
            break;
        case 'amount':
            sortedResults.sort((a, b) => {
                const amountA = parseInt(a.amount || Math.floor(Math.random() * 10000) + 1);
                const amountB = parseInt(b.amount || Math.floor(Math.random() * 10000) + 1);
                return amountB - amountA;
            });
            break;
        case 'alphabetical':
            sortedResults.sort((a, b) => a.name.first.localeCompare(b.name.first));
            break;
    }

    sortedResults.forEach(user => {
        const userCard = document.createElement("div");
        userCard.className = "user-card";
        const randomAmount = Math.floor(Math.random() * 10000) + 1;

        userCard.innerHTML = `
            <img id="picture" src="${user.picture.medium}" alt="Photo de profil">
            <h3 id="name">${user.name.first} ${user.name.last}</h3>
            <p id="email">${user.email}</p>
            <p id="phone">${user.phone}</p>
            <p id="city-country">${user.location.city}, ${user.location.country}</p>
            <h2 id="amount">${randomAmount}€</h2>
            <div id="gender" style="width: 20px; height: 20px; border-radius: 50%; background-color: ${user.gender === "male" ? "#007aff" : "#e91e63"}"></div>
        `;

        userContainer.appendChild(userCard);
    });
}

// Initial display
displayData();

// Sidebar toggle
const sidebar = document.querySelector(".sidebar");
const toggle = document.querySelector(".toggle");
toggle.addEventListener("click", () => {
    if (window.innerWidth <= 600) {
        sidebar.classList.toggle("open");
        sidebar.classList.remove("close");
    } else {
        sidebar.classList.toggle("close");
        sidebar.classList.remove("open");
    }
});

// Add click events for sorting
document.querySelectorAll('.sidebar li a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sortType = e.currentTarget.getAttribute('data-sort');
        if (sortType) {
            displayData(sortType);
        }
    });
});
