"use strict"

var offsetX, offsetY;
var currentMovable;
var layer = 1;
const preloader = document.getElementById("preloader");
const movableElements = document.getElementsByClassName("hold-to-move");

for(let i = 0; i < movableElements.length; i++)
{
  setMovable(movableElements[i]);
}

function setMovable(el)
{
  el.addEventListener("mousedown",(event) => {
    offsetX = event.offsetX;
    offsetY = event.offsetY;
    currentMovable = el;
    currentMovable.parentElement.style.zIndex = ++layer;
    document.body.addEventListener("mousemove",moveElement, { passive: false });
  });

  el.addEventListener("mouseup",(event) => {
    document.body.removeEventListener("mousemove", moveElement, { passive: true });
  });

  el.addEventListener("mouseleave",(event) => {
    document.body.removeEventListener("mousemove", moveElement, { passive: true });
  });
}

function moveElement(e)
{
  currentMovable.parentElement.style.left = `calc(${e.pageX}px - ${offsetX}px)`;
  currentMovable.parentElement.style.top = `calc(${e.pageY}px  - ${offsetY}px)`;
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