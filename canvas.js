let canvas=document.querySelector("canvas");
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;


let tool=canvas.getContext("2d");
let pencilColor=document.querySelectorAll(".pencil-color");
let pencilWidth=document.querySelector(".pencil-width");
let eraserWidth=document.querySelector(".eraser-width");
let download=document.querySelector(".download");
let undo=document.querySelector(".undo");
let redo=document.querySelector(".redo");


let penColor="red";
let eraserColor="white";
let penWidth=pencilWidth.value;
let eWidth=eraserWidth.value;
let track=0;//DATA
let undoRedoTracker=[];

tool.strokeStyle="red";
tool.lineWidth="3";
let mouseDownFlag=false;
canvas.addEventListener("mousedown",(e)=>{
mouseDownFlag=true;
beginPath({
    x:e.clientX,
    y:e.clientY,
  
})
})
canvas.addEventListener("mousemove",(e)=>{
    if(mouseDownFlag){
        drawStroke({
            x:e.clientX,
            y:e.clientY,
            color:eraserFlag ? eraserColor : penColor,
            width:eraserFlag ? eWidth:penWidth
        })
    }
})
canvas.addEventListener("mouseup",(e)=>{
    mouseDownFlag=false;

    let url=canvas.toDataURL();
    undoRedoTracker.push(url);
    track=undoRedoTracker.length-1;
})
undo.addEventListener("click",(e) => {
   if(track>0) track--; 
   let trackObj={
       trackValue:track,
       undoRedoTracker:undoRedoTracker
   }
   undoRedoCanvas(trackObj);
})
redo.addEventListener("click",(e) => {
    if(track<undoRedoTracker.length-1) track++;
    let trackObj={
        trackValue:track,
        undoRedoTracker:undoRedoTracker
    }
    undoRedoCanvas(trackObj);

})
function undoRedoCanvas(trackObj){
    track=trackObj.trackValue;
    undoRedoTracker=trackObj.undoRedoTracker;
    let url=undoRedoTracker[track];
    let img=new Image();
    img.src=url;
    img.onload=(e)=>{
        tool.drawImage(img,0,0,canvas.width,canvas.height);
    }
}
function beginPath(strokeObj){
    tool.beginPath();
    tool.moveTo(strokeObj.x,strokeObj.y);

}
function drawStroke(strokeObj){
    tool.strokeStyle=strokeObj.color;
    tool.lineWidth=strokeObj.width;
    tool.lineTo(strokeObj.x,strokeObj.y);
    tool.stroke();
}
pencilColor.forEach((colorElem) => {
    colorElem.addEventListener("click",(e) => {
        let color=colorElem.classList[0];
        penColor=color;
        tool.strokeStyle=penColor;
        
    })
})
pencilWidth.addEventListener("change",(e) => {
    penWidth=pencilWidth.value;
    tool.lineWidth=penWidth;
})
eraserWidth.addEventListener("change",(e) => {
    eWidth=eraserWidth.value;
    tool.lineWidth=eWidth;
})
eraserWidth.addEventListener("click",(e) => {
    if(eraserFlag){
        tool.strokeStyle=eraserColor;
        tool.lineWidth=eWidth;

    }else{
        penWidth=pencilWidth.value;
        tool.lineWidth=penWidth;

    }

})
download.addEventListener("click",(e) => {
    let url=canvas.toDataURL();
    
    let a=document.createElement("a");
    a.href=url;
    a.download="board.jpg";
    a.click();

})