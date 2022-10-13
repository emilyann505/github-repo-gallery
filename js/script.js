//div where your profile info appears
const overview = document.querySelector(".overview");
//github username
const username = "emilyann505";
//list of repos appear
const repoList = document.querySelector(".repo-list");
//all repo info appears
const allRepoInfo = document.querySelector(".repos")
//individual repo data
const repoData = document.querySelector(".repo-data");

const getGitHub = async function () {
    const request = await fetch(`https://api.github.com/users/${username}`);
    const data = await request.json();
    // console.log(data);
    fetchedUserInfo(data);
};

getGitHub();

//fecthing data from API and displaying it in the created div, then append the div to add it
const fetchedUserInfo = async function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div> `;
  overview.append(div);
  fetchRepos();
};

//to fetch the repos
const fetchRepos = async function () {
    const repoReq = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await repoReq.json();
    displayRepo(repoData);
};

const displayRepo = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

//click event for repo list
repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        specificRepo(repoName);
    }
});

const specificRepo = async function (repoName){
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);

    //array of languages
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await  fetchLanguages.json();
    
    //list of languages
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }
    displayRepoInfo(repoInfo, languages);
};

//function to display specific repo info
const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    allRepoInfo.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;

    repoData.append(div);
};
