

var x=50;
var y=50;
var m;
var n;
var nodes=[];
var sanitizers=[];
var playerx;
var playery;
var virusBossA;
var virusBossB;
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
function clear_canvas(xx,yy)
{
game_canva.context.beginPath();
game_canva.context.rect(xx,yy,100,100);
game_canva.context.fillStyle = "black";
//game_canva.context.fillStyle = "#8A2BE2";
game_canva.context.fill();
for(let i=0;i<sanitizers.length;i++){
	if(Math.abs(playerx-sanitizers[i].x)<=50 && Math.abs(playery-sanitizers[i].y)<=50){
		sanitizers[i].clear_sanitizer();
		sanitizers.splice(i,1);
	}else{
	sanitizers[i].create_sanitizer();
	}
}
}
function moveObject(){
	//y=y+5;
	for(let i=0;i<nodes.length;i++){
		clear_canvas(nodes[i].x,nodes[i].y);
		if(nodes[i].y>window.innerHeight){
	  nodes[i].y=nodes[i].y-window.innerHeight;
	}else if(nodes[i].y<0){
		nodes[i].y=nodes[i].y+window.innerHeight;	
	}
	if(nodes[i].x>window.innerWidth){
		nodes[i].x=nodes[i].x-window.innerWidth;
	}else if(nodes[i].x<0){
		nodes[i].x=nodes[i].x+window.innerWidth;	
	}



		//clear_canvas(nodes[i].x,nodes[i].y);
		if(i%4==0) {
			nodes[i].y=nodes[i].y-10;
			nodes[i].x=nodes[i].x-10;
		}else{
			nodes[i].y=nodes[i].y+(Math.floor(Math.random()*3)+1)*5;
			nodes[i].x=nodes[i].x+(Math.floor(Math.random()*3)-1)*5;
		}
		//else nodes[i].x=nodes[i].x+5;
		nodes[i].create_virus();
	}

}

function virus(x,y)
{
	var me=this;	
	this.x=x;
	this.y=y;
	this.create_virus=function(){
	let m=x;
	let n=y;
	// game_canva.context.beginPath();
	// game_canva.context.fillStyle = "gray";
	//game_canva.context.arc(x,y,25,0, 2*Math.PI);
	game_canva.context.drawImage(img,me.x,me.y,100,100);
	// game_canva.context.fill();
	// game_canva.context.stroke();
	}
}
function sanitizer(x,y)
{
	var me=this;	
	this.x=x;
	this.y=y;
	this.create_sanitizer=function(){
	let m=x;
	let n=y;
	// game_canva.context.beginPath();
	// game_canva.context.fillStyle = "gray";
	//game_canva.context.arc(x,y,25,0, 2*Math.PI);
	game_canva.context.drawImage(sanitizerimg,me.x,me.y,100,150);
	// game_canva.context.fill();
	// game_canva.context.stroke();
	}
	this.clear_sanitizer=function(){
		game_canva.context.beginPath();
		game_canva.context.rect(me.x,me.y,100,150);
		game_canva.context.fillStyle = "black";
		//game_canva.context.fillStyle = "#8A2BE2";
		game_canva.context.fill();

	}
}




function testEnemy(){
	// game_canva.context.beginPath();
	// game_canva.context.fillStyle = "gray";
	//game_canva.context.arc(x,y,25,0, 2*Math.PI);
	game_canva.context.drawImage(img,x,y,80,80);
	// game_canva.context.fill();
	// game_canva.context.stroke();
}
function create_player(){
		m=window.innerWidth/2;
		n=window.innerHeight-80;
		playerx=m;
		playery=n;
		game_canva.context.drawImage(boyimg,window.innerWidth/2,window.innerHeight-120,100,100);
		
		for(let i=0;i<12;i++){
		var v=new virus(getRndInteger(0,window.innerWidth),getRndInteger(0,window.innerHeight-150));
		v.create_virus();
		nodes.push(v);
		}
		for(let i=0;i<12;i++){
			var s=new sanitizer(getRndInteger(0,window.innerWidth),getRndInteger(0,window.innerHeight-150));
			s.create_sanitizer();
			sanitizers.push(s);
		}

}




function initialiseGameZone()
{
this.canva= document.getElementById('gameCanvas');
this.canva.addEventListener("mousedown",handleMouseDown,false); //works 
this.canva.addEventListener("mouseup",handleMouseUp,false);
this.canva.addEventListener("mousemove",handleMouseMove,false); //works 
this.canva.addEventListener("mouseout",handleMouseUp,false);
this.canva.addEventListener("touchstart",handleMouseDown,false);
this.canva.addEventListener("touchmove",handleMouseMove, {passive: false}); //works 
this.canva.addEventListener("touchend",handleMouseUp,false);
//this.canva.addEventListener("click",testEnemy,false); //works
this.context=canva.getContext("2d");
this.context.fillStyle = "white";
//this.canva.style.left = "200px";
//this.canva.style.top = "10px";
//this.canva.style.position = "relative";

this.canva.height= window.innerHeight;
this.canva.width= window.innerWidth;
// this.context.translate(0.5, 0.5);
 
	return this;
}
var isDragging=false;
var oldm;
var oldn;
function handleMouseDown(e){
//clear_canvas(m,n);
 oldm=m;
 oldn=n;
if (e.type === "touchstart") {
        m = e.touches[0].pageX - game_canva.canva.offsetLeft;
        n = e.touches[0].pageY - game_canva.canva.offsetTop;
      }else{
m=event.pageX- game_canva.canva.offsetLeft;  // event.clientX will also work.
n=event.pageY- game_canva.canva.offsetTop;
}

console.log(Math.abs(m-window.innerWidth/2));
console.log(Math.abs(n-(window.innerHeight-80)));
//if(Math.abs(m-oldm)<=100 && Math.abs(n-oldn)<=100){	
isDragging=true;
//}
}
function handleMouseMove(e){
	if(isDragging){
		oldm=m;
		oldn=n;
		clear_canvas(playerx,playery);
		if (e.type === "touchmove") {
        m = e.touches[0].pageX - game_canva.canva.offsetLeft;
        n = e.touches[0].pageY - game_canva.canva.offsetTop;
    	}else{
		m=e.pageX- game_canva.canva.offsetLeft;  // event.clientX will also work.
		n=e.pageY- game_canva.canva.offsetTop;
		}
		if(playerx>window.innerWidth){
		playerx=playerx-window.innerWidth;	
		}else if(playerx<0){
			playerx=playerx+window.innerWidth;
		}
		game_canva.context.drawImage(boyimg,playerx-(oldm-m),playery-(oldn-n),100,100);
		playerx=playerx-(oldm-m);
		playery=playery-(oldn-n);
		e.preventDefault(); 
	}
}
function handleMouseUp(e){
	isDragging=false;
console.log("stopped");
}
function handleMouseOut(e){

}


var game_canva;
var img;
window.onload=function() {
img=new Image();
img.src='corona1.png';
sanitizerimg=new Image();
sanitizerimg.src='hand_sanitizer.png';
boyimg=new Image();
boyimg.src='jerry.png';
boyimg.onload=function(){
	create_player();
}

img.onload=function(){
game_canva=initialiseGameZone();
//testEnemy();
window.setInterval(function(){
moveObject();
}, 50);
}
}

