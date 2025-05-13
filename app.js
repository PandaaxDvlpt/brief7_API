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
        userCard.innerHTML = `
            <img src="${user.picture.large}" alt="User Picture">
            <h3>${user.name.first} ${user.name.last}</h3>
            <p>${user.email}</p>
            <p>${user.phone}</p>
            <p>${user.location.city}, ${user.location.country}</p>
        `;
        userContainer.appendChild(userCard);
    });

}


// displayData()