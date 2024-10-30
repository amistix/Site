"use strict"

var layer = 1;
var offsetX, offsetY;
var currentMovable;
const loadingConsole = createTerminal("Status", 200, 100, createElement("div")
  .attr("class","text")
  .textContent("$Loading...")
  .toDOM()
);

setMovable(loadingConsole.children[0]);

function createTerminal(header_title = "Terminal", width=400, height=300, innerHTML=createElement("div").toDOM())
{
  const terminalBody = createElement("div")
    .attr("class","console hidden")
    .css("width", `${width}px`)
    .css("height", `${height}px`)
    .css("top",`calc(${Math.random() * 50}% + 25vh)`)
    .css("left",`calc(${Math.random() * 50}% + 25vw)`)
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
  terminalBody.appendChild(innerHTML);

  setMovable(terminalHeader);
  document.body.appendChild(terminalBody);

  setTimeout(() => {terminalBody.classList.toggle("hidden");}, 10);
  return terminalBody;
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
    currentMovable.style.cursor = "grab";
    document.removeEventListener("mousemove", moveElement, { passive: true });
  });
}

function moveElement(e)
{
  document.body.style.cursor = "grabing";
  currentMovable.parentElement.style.left = `calc(${e.pageX}px - ${offsetX}px)`;
  currentMovable.parentElement.style.top = `calc(${e.pageY}px  - ${offsetY}px)`;
}