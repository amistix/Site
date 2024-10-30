"use strict"

var layer = 1;
var offsetX, offsetY;
var currentMovable;
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
    document.addEventListener("mousemove",moveElement, { passive: false });
  });

  el.addEventListener("mouseup",(event) => {
    document.removeEventListener("mousemove", moveElement, { passive: true });
  });
}

function moveElement(e)
{
  currentMovable.parentElement.style.left = `calc(${e.pageX}px - ${offsetX}px)`;
  currentMovable.parentElement.style.top = `calc(${e.pageY}px  - ${offsetY}px)`;
}