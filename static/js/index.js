"use strict"
document.addEventListener('keydown', keyDown, false)

function keyDown(e){
  if((e.ctrlKey)&&(e.keyCode == 84)&&(e.altKey)){
    createTerminal();
  }
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
