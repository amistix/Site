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
  const terminalBody = createElement("div")
    .attr("class","console hidden")
    .css("width", "400px")
    .css("height", "300px")
    .toDOM();

  const terminalHeader = createElement("div")
    .attr("class","console-header hold-to-move")
    .toDOM();

  const terminalTitle = createElement("div")
    .attr("class","console-title")
    .textContent(`${header_title}`)
    .toDOM();

  const terminalControls = createElement("div")
    .attr("class","console-controls")
    .toDOM();
  const terminalMinimaze = createElement("div")
    .attr("class","console-minimize console-control")
    .toDOM();
  const terminalMaximize = createElement("div")
    .attr("class","console-maximize console-control")
    .toDOM();
  const terminalClose = createElement("div")
    .attr("class","console-close console-control")
    .toDOM();

  terminalControls.appendChild(terminalMinimaze);
  terminalControls.appendChild(terminalMaximize);
  terminalControls.appendChild(terminalClose);

  terminalClose.addEventListener("click",()=>{
    terminalBody.classList.toggle("hidden");
    setTimeout(
      () => {document.body.removeChild(terminalBody);},
      150
    );
  });

  terminalMinimaze.addEventListener("click",()=>{
    terminalBody.classList.toggle("hidden");
    terminalBody.style.display = "none";
  });

  terminalMaximize.addEventListener("click",()=>{
    terminalBody.style.top = 0;
    terminalBody.style.left = 0;
    terminalBody.style.width = "calc(100% - 1.1em)";
    terminalBody.style.height = "calc(100% - 1.1em)";

  });
  
  terminalHeader.appendChild(terminalTitle);
  terminalHeader.appendChild(terminalControls);
  terminalBody.appendChild(terminalHeader);

  setMovable(terminalHeader);
  document.body.appendChild(terminalBody);
  setTimeout(
    () => {terminalBody.classList.toggle("hidden");},
    10
  );
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
    repo_frame.appendChild(createElement("div")
      .attr("class", "repo-frame")
      .attr('onclick',`window.open("${repo.svn_url}")`)
      .textContent(`${repo.name}`)
      .toDOM());
  });
  setTimeout(
    () => {
      preloader.classList.add("done");
      document.getElementsByClassName('text')[0].innerHTML = "$Successfuly!";
    }, 1000
  )
}

loadPage();