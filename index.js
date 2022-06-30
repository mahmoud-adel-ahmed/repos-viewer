let input = document.querySelector(".input");
let btn = document.querySelector(".btn");
let ShowData = document.querySelector(".show-data");
let errorDiv = document.querySelector(".error");

btn.addEventListener("click", getRepos);

async function getRepos() {
  ShowData.innerHTML = "";
  try {
    let res = await fetch(`https://api.github.com/users/${input.value}/repos`);
    let data = await res.json();
    if (input.value) {
      for (const repo of data) {
        let content = document.createElement("div");
        content.innerHTML = `
            <p class="title">${repo.name}</p>
            <div class="anchors">
                <a href=https://github.com/${input.value}/${repo.name}  class="btn" target="_blank">visit</a>
                <a href="#" class="btn" target="_blank">stars ${repo.stargazers_count}</a> 
            </div>
        `;
        content.classList.add("content");
        ShowData.appendChild(content);
        input.value = "";
      }
    } else {
      errorDiv.innerHTML = "no repos to show";
    }
  } catch (error) {
    errorDiv.innerHTML = error.message;
  }
}