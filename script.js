

// Global variables to keep track of current page and number of items to display per page
let currentPage = 0;
const itemsPerPage = 7;

const xhr = new XMLHttpRequest();
const url = `https://api.github.com/users`;

loadUsers();

function loadUsers() {
    console.log("Loading users...");
    
    
    xhr.open('GET', url, true);
    xhr.onload = function() {
        if (this.status == 200){
            const users = JSON.parse(xhr.responseText);
            var output = '';
            for (var i = currentPage * itemsPerPage; i < itemsPerPage  + (
                    currentPage * itemsPerPage); i++) {
                try {
                    output += `
                        <p>${i + 1} </p>
                        <img src="${users[i].avatar_url}" width="70" height="70">
                        <ul>
                            <li>
                                ID: ${users[i].id}
                            </li>
                            <li>
                                Username: ${users[i].login}
                            </li>
                        </ul> `
                } catch {
                    break;
                }

                
            }
            document.getElementById('users').innerHTML = output;

            const totalPages = Math.ceil(users.length / itemsPerPage);
            displayPageNumbers(totalPages);
        }
    };

    xhr.send(); // Send the API request
}

function displayPageNumbers(totalPages) {
    // Remove existing page numbers
    const pageNumbersContainer = document.getElementById("pageNumbers");
    pageNumbersContainer.innerHTML = '';

    // Create page number elements and add event listeners
    for (let i = 1; i <= totalPages; i++) {
        const pageNumber = document.createElement("button");
        pageNumber.textContent = i;
        pageNumber.classList.add("pageNumber");

        // Highlight the current page number
        if (i === currentPage) {
            pageNumber.classList.add("active");
        }

        // Add event listener to load the corresponding page when clicked
        pageNumber.addEventListener('click', function() {
            currentPage = Number(pageNumber.textContent) - 1;
            loadUsers()
            console.log(currentPage);
        });

        pageNumbersContainer.appendChild(pageNumber);
    }
}
