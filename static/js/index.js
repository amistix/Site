"use strict"
document.addEventListener('keydown', keyDown, false)

const preloader = document.getElementById("preloader");

function keyDown(e){
  if((e.ctrlKey)&&(e.keyCode == 84)&&(e.altKey)){
    createTerminal();
  }
}

function createTerminal(header_title = "Terminal")
{
  const terminal_body = createElement("div").attr("class","console").css("width", "400px").css("height", "300px").toDOM();
  const terminal_header = createElement("div").attr("class","console-header hold-to-move").toDOM();
  const terminal_title = createElement("div").attr("class","console-title").textContent(`${header_title}`).toDOM();
  terminal_header.appendChild(terminal_title);
  terminal_body.appendChild(terminal_header);

  setMovable(terminal_header);
  document.body.appendChild(terminal_body);
}

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

function createElement(type) 
{
  const elem = document.createElement(type);
  return {
    baseElement: elem,
    css: function(key, value) {
      this.baseElement.style[key] = value;
      return this;
    },
    attr: function(key, value) {
      this.baseElement.setAttribute(key, value);
      return this;
    },
    textContent: function(value) {
      this.baseElement.textContent = value;
      return this;
    },
    toDOM: function() {
      return this.baseElement;
    }
  };
}

async function loadPage()
{
  const repos = await fetchRepos();
  const repo_frame = document.getElementById("repos-frame");
  repos.forEach(repo => {
    repo_frame.appendChild(createElement("div").attr("class", "repo-frame").attr('onclick',`window.open("${repo.svn_url}")`).textContent(`${repo.name}`).toDOM());
  });
  setTimeout(
    () => {
      preloader.classList.add("done");
      document.getElementsByClassName('text')[0].innerHTML = "$Successfuly!";
    }, 1000
  )
}

loadPage();