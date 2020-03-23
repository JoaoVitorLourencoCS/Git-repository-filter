const input_user = document.getElementById("input-user");
const result = document.getElementById("rep-result");
const ul = document.getElementById("put-repos");
const divReps = document.getElementById("rep-result");
const reps = document.getElementById("reps");

let repos = [];

function getInfo() {
    divReps.innerHTML = "Loading...";
    setTimeout(function () {

        if (repos.length === 0) {
            reps.innerHTML = "Repositories not found."
            divReps.innerHTML = "";
        } else {
            reps.innerHTML = `Repositories from "${input_user.value}"   :`;
            reps.style.margin = "0";

            repos.forEach(element => {
                const textRepos = document.createTextNode(element);
                const liRepos = document.createElement("li");
                liRepos.style.margin = "10px";
                liRepos.style.margin = "0px";

                const aElement = document.createElement("a");
                aElement.setAttribute("href", element)
                aElement.style.textDecoration = "none";
                aElement.style.color = "#1ab2ff";

                aElement.appendChild(textRepos);
                liRepos.appendChild(aElement);
                ul.appendChild(liRepos);

                divReps.innerHTML = "";
            });
        }
    }, 1500);
    getApiRepos();
    verifyBtn();
}

function getApiRepos() {
    let user = input_user.value;

    axios.get(`https://api.github.com/users/${user}/repos`)
        .then(function (response) {
            for (let i = 0; i < response.data.length; i++) {
                const urlLink = response.data[i].html_url;
                repos.push(urlLink);

            }

        })
        .catch(function (error) {
            console.warn(error);
            if (user == "") {
                alert("User not found, please try again. ");
                window.location.reload();
            }
        });
    return repos;
}

function verifyBtn() {
    if (getInfo) {
        let child = ul.lastElementChild;
        while (child) {
            ul.removeChild(child);
            child = ul.lastElementChild;
            repos = [];
            reps.innerHTML = "";
        }
    }
}
