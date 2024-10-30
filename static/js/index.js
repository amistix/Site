"use strict"

var offsetX, offsetY;
var currentMovable;
const preloader = document.getElementById("preloader");
const movableElements = document.getElementsByClassName("hold-to-move");

for(let i = 0; i < movableElements.length; i++)
{
    movableElements[i].addEventListener("mousedown",(event) => {
        offsetX = event.offsetX;
        offsetY = event.offsetY;
        currentMovable = movableElements[i];
        document.body.addEventListener("mousemove",moveElement, { passive: false });
    });

    movableElements[i].addEventListener("mouseup",(event) => {
        document.body.removeEventListener("mousemove", moveElement, { passive: true });
    });
}

function moveElement(e)
{
    currentMovable.parentElement.style.left = `calc(${e.clientX}px - ${offsetX}px)`;
    currentMovable.parentElement.style.top = `calc(${e.clientY}px  - ${offsetY}px)`;
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
        () => {
          preloader.classList.add("done");
        }, 2000
    )
    
}

LoadPage();