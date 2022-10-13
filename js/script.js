//div where your profile info appears
const overview = document.querySelector(".overview");
const username = "emilyann505";
const repoList = document.querySelector(".repo-list");

const getGitHub = async function () {
    const request = await fetch(`https://api.github.com/users/${username}`);
    const data = await request.json();
    console.log(data);
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

