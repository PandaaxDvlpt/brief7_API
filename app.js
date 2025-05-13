async function fetchData() {
    const response = await fetch("https://randomuser.me/api/?results=50");
    const data = await response.json();
    return data;
};

async function displayData() {
    const data = await fetchData();
    
    const userContainer = document.getElementById("user-container");
    userContainer.innerHTML = "";

    data.results.forEach(user => {
        const userCard = document.createElement("user-card");
        const randomAmount = Math.floor(Math.random() * 10000) + 1;
        userCard.innerHTML = `
            <div class="user-card">
                <h2>${randomAmount}€</h2>
                <img src="${user.picture.medium}" alt="User Picture">
                <h3>${user.name.first} ${user.name.last}</h3>
                <p>${user.email}</p>
                <p>${user.phone}</p>
                <p>${user.location.city}, ${user.location.country}</p>
                <p>${user.gender}</p>
            </div>
        `;
        userContainer.appendChild(userCard);
    });
    
}

 displayData()

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
