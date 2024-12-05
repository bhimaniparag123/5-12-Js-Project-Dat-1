const addName = document.getElementById('addName');
const addEmail = document.getElementById('addEmail');
const addEPass = document.getElementById('addEPass');
const button = document.getElementById('btn');

const editName = document.getElementById('editName');
const editEmail = document.getElementById('editEmail');
const editPass = document.getElementById('editPass');
const updateBtn = document.getElementById('updateBtn');

const tbody = document.querySelector("#tbody");
const addModel = document.querySelector("#addModel");
const editModel = document.querySelector("#editModel");

let updateIndex = null;

button.addEventListener('click', () => {
    let data = JSON.parse(localStorage.getItem('user')) || [];
    data.push({
        name: addName.value,
        email: addEmail.value,
        password: addEPass.value
    });
    localStorage.setItem('user', JSON.stringify(data));
    loadData();
    addName.value = "";
    addEmail.value = "";
    addEPass.value = "";
});

const loadData = () => {
    const users = JSON.parse(localStorage.getItem('user')) || [];
    let result = "";
    users.forEach((user, index) => {
        result += `
            <tr>
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.password}</td>
                <td>
                    <button onclick="editData(${index})">Edit</button>
                    <button onclick="deleteData(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
    tbody.innerHTML = result;
};

const deleteData = (index) => {
    const data = JSON.parse(localStorage.getItem('user'));
    data.splice(index, 1);
    localStorage.setItem('user', JSON.stringify(data));
    loadData();
};

const editData = (index) => {
    const data = JSON.parse(localStorage.getItem('user'));
    let user = data[index];

    addModel.style.display = "none";
    editModel.style.display = "block";

    editName.value = user.name;
    editEmail.value = user.email;
    editPass.value = user.password;

    updateIndex = index;
};

updateBtn.addEventListener("click", () => {
    const data = JSON.parse(localStorage.getItem('user'));
    data[updateIndex] = {
        name: editName.value,
        email: editEmail.value,
        password: editPass.value
    };
    localStorage.setItem('user', JSON.stringify(data));
    loadData();
    editModel.style.display = "none";
    addModel.style.display = "block";
});

loadData();