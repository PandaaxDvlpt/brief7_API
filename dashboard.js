async function fetchData() {
    const response = await fetch("https://randomuser.me/api/?results=50");
    const data = await response.json();
    data.results.forEach(user => {
        let randomAmount = Math.floor(Math.random() * 10000) + 1;
        user.amount = randomAmount;
    });
    return data;
}

function updateDashboardStats(data) {
    const users = data.results;
    
    const totalUsers = users.length;
    const totalAmount = users.reduce((sum, user) => sum + user.amount, 0);
    const averageAmount = Math.round(totalAmount / totalUsers);
    const maxAmount = Math.max(...users.map(user => user.amount));
    const maleCount = users.filter(user => user.gender === 'male').length;
    const femaleCount = users.filter(user => user.gender === 'female').length;
    document.getElementById('total-users').textContent = totalUsers;
    document.getElementById('total-amount').textContent = `${totalAmount.toLocaleString()}€`;
    document.getElementById('average-amount').textContent = `${averageAmount.toLocaleString()}€`;
    document.getElementById('max-amount').textContent = `${maxAmount.toLocaleString()}€`;
    document.getElementById('male-count').textContent = maleCount;
    document.getElementById('female-count').textContent = femaleCount;
}

async function initDashboard() {
    const data = await fetchData();
    updateDashboardStats(data);
}

const sidebar = document.querySelector(".sidebar");
const toggle = document.querySelector(".toggle");

toggle.addEventListener("click", () => {
    if (window.innerWidth <= 600) {
        sidebar.classList.toggle("open");
        sidebar.classList.remove("close");
        localStorage.setItem("sidebarState", "close");
    } else {
        sidebar.classList.toggle("close");
        sidebar.classList.remove("open");
        localStorage.setItem("sidebarState", "open");
    }
});

document.addEventListener('DOMContentLoaded', initDashboard); 