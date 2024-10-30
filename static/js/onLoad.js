"use strict"

const preloader = document.getElementById("preloader");

async function fetchRepos()
{
  const req = await fetch("https://api.github.com/search/repositories?q=@amistix",{
    headers:{
      Accept: "application/vnd.github.v3+json",
    }
  });
  const result = await req.json();
  return result.items;
}

async function loadPage()
{
  const repos = await fetchRepos();
  const repo_frame = document.getElementById("repos-frame");
  repos.forEach(repo => {
    repo_frame.appendChild(createElement("div")
      .attr("class", "repo-frame")
      .attr('onclick',`window.open("${repo.svn_url}")`)
      .textContent(`${repo.name}`)
      .toDOM());
  });
  setTimeout(
    () => {
      preloader.classList.add("done");
      document.getElementsByClassName('text')[0].innerText = "$Successfuly!";
    }, 1000
  )
}

loadPage();