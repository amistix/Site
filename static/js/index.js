"use strict"

const movableElements = document.getElementsByClassName("hold-to-move")[0];
const preloader = document.getElementById("preloader");
var offsetX, offsetY;

movableElements.addEventListener("mousedown",(event) => {
    offsetX = event.offsetX;
    offsetY = event.offsetY;
    document.body.addEventListener("mousemove",moveElement, { passive: false });
});

movableElements.addEventListener("mouseup",(event) => {
    document.body.removeEventListener("mousemove", moveElement, { passive: true });
});

function moveElement(e)
{
    movableElements.parentElement.style.left = `calc(${e.clientX}px - ${offsetX}px)`;//
    movableElements.parentElement.style.top = `calc(${e.clientY}px  - 100px - ${offsetY}px)`;//+${e.target.offsetParent.offsetTop}px
}


async function FetchRepos()
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

async function LoadPage()
{
    const repos = await FetchRepos();
    const repo_frame = document.getElementById("repos-frame");
    repos.forEach(repo => {
        repo_frame.appendChild(createElement("div").attr("class", "repo-frame").textContent(`${repo.name}`).toDOM());
    });
    setTimeout(
        () => {preloader.classList.add("done");}, 2000
    )
    
}

LoadPage();