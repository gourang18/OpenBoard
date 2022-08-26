let toolsC=document.querySelector(".tool-container");
let optionsC=document.querySelector(".options-container");
let pencilC=document.querySelector(".pencil-container");
let eraserC=document.querySelector(".eraser-cont");
let pencilImg=document.querySelector(".pencil-img");
let eraserImg=document.querySelector(".eraser-img");
let stickyImg=document.querySelector(".sticky-img");
let uploadImg=document.querySelector(".upload-img")

let optionsFlag=true;
let pencilFlag=false;
let eraserFlag=false;
let stickyFlag=false;
optionsC.addEventListener("click",(e) =>{
    optionsFlag=!optionsFlag;
    if(optionsFlag){
        openTools();
    }else{
        closeTools();
    }
})
function openTools(){
    let iconElem=optionsC.children[0];
    iconElem.classList.remove("fa-times");
    iconElem.classList.add("fa-bars");
    toolsC.style.display="flex";
}
function closeTools(){
    let iconElem=optionsC.children[0];
    iconElem.classList.remove("fa-bars");
    iconElem.classList.add("fa-times");
    toolsC.style.display="none";
    pencilC.style.display="none";
    eraserC.style.display="none";
}
pencilImg.addEventListener("click",(e)=>{
    pencilFlag=!pencilFlag;
    if(pencilFlag){
    pencilC.style.display="flex";
    }else{
    pencilC.style.display="none";
    }
})
eraserImg.addEventListener("click",(e)=>{
    eraserFlag=!eraserFlag;
    if(eraserFlag){
    eraserC.style.display="flex";
    }else{
    eraserC.style.display="none";
    }
})
uploadImg.addEventListener("click",(e) => {
    //Open file explorer
    let input=document.createElement("input");
    input.setAttribute("type", "file");
    input.click();
    input.addEventListener("change",(e) => {
        let file=input.files[0];
        let url=URL.createObjectURL(file);
        let stickyCont=document.createElement("div");
        stickyCont.setAttribute("class", "sticky-cont");
        stickyCont.innerHTML=` <div class="header-cont">
        <div class="minimize"></div>
        <div class="remove"></div>
        </div>
        <div class="note-cont">
        <img src="${url}" class="image"/>
        </div>`
document.body.appendChild(stickyCont);
let minimize=stickyCont.querySelector(".minimize");
  let remove=stickyCont.querySelector(".remove");
  noteActions(remove,minimize,stickyCont);
stickyCont.onmousedown = function(event) {

   dragAndDrop(stickyCont, event);
  
  };
  
  stickyCont.ondragstart = function() {
    return false;
  };

    })
    
})
stickyImg.addEventListener("click", function(e){
    let stickyCont=document.createElement("div");
    stickyCont.setAttribute("class", "sticky-cont");
    stickyCont.innerHTML=` <div class="header-cont">
    <div class="minimize"></div>
    <div class="remove"></div>
</div>
<div class="note-cont">
    <textarea></textarea>
</div>`
document.body.appendChild(stickyCont);
let minimize=stickyCont.querySelector(".minimize");
  let remove=stickyCont.querySelector(".remove");
  noteActions(remove,minimize,stickyCont);
stickyCont.onmousedown = function(event) {

   dragAndDrop(stickyCont, event);
  
  };
  
  stickyCont.ondragstart = function() {
    return false;
  };
  

})
function noteActions(remove,minimize,stickyCont) {
    remove.addEventListener("click",(e) => {
        stickyCont.remove();

    })
    minimize.addEventListener("click",(e) => {
        let noteCont=stickyCont.querySelector(".note-cont");
        let display=getComputedStyle(noteCont).getPropertyValue("display");
        if(display==="none") noteCont.style.display="block"
        else noteCont.style.display="none";
    })
}
function dragAndDrop(element,event){
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;
  
    element.style.position = 'absolute';
element.style.zIndex = 1000;
    
  
    moveAt(event.pageX, event.pageY);
  
    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
      element.style.left = pageX - shiftX + 'px';
      element.style.top = pageY - shiftY + 'px';
    }
  
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
  
    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);
  
    // drop the ball, remove unneeded handlers
    element.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      element.onmouseup = null;
    };
}