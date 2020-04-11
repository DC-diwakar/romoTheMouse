
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
var game_canva;
var img;
var gameTimer;
var isDragging=false;
var oldm;
var oldn;
var redHome;
var circularVirusA;
var jerryend;
var jerryhome;
var move_interval=50;
var level=1;

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function clear_canvas(xx,yy)
{
game_canva.context.beginPath();
game_canva.context.rect(xx,yy,100,100);
game_canva.context.fillStyle = "black";
game_canva.context.fill();
track_sanitizers();
}
function moveObject(){
	console.log("move object");
	//y=y+5;
	for(let i=0;i<nodes.length;i++){
		nodes[i].clear_virus();
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
		if(i%4==0){
			nodes[i].y=nodes[i].y-10;
			nodes[i].x=nodes[i].x-10;
		}else if(i%5==0){
			nodes[i].x=nodes[i].x-5;
			nodes[i].y=nodes[i].y+5;
		}else{
			nodes[i].y=nodes[i].y+(Math.floor(Math.random()*3)+1)*5;
			nodes[i].x=nodes[i].x+(Math.floor(Math.random()*3)-1)*5;
		}

		//else nodes[i].x=nodes[i].x+5;
		if(Math.abs(playerx-nodes[i].x)<=45 && Math.abs(playery-nodes[i].y)<=45){
			playerAttacked();					
		}else if(sanitizers.length<=3 && Math.abs(playerx-circularVirusA.radiiX)<=50 && Math.abs(playery-circularVirusA.radiiY)<=50){
			playerWon();
		}
		else{
			nodes[i].create_virus();
		}
	}

	if(Math.abs(playerx-circularVirusA.x)<=45 && Math.abs(playery-circularVirusA.y)<=45){
			playerAttacked();
	}
	clear_canvas(circularVirusA.x,circularVirusA.y);
	circularVirusA.angle=circularVirusA.angle+Math.PI/36;
	if(circularVirusA.angle>2*Math.PI) circularVirusA.angle=0;
	circularVirusA.x=circularVirusA.radiiX-150*Math.cos(circularVirusA.angle);
	circularVirusA.y=circularVirusA.radiiY+150*Math.sin(circularVirusA.angle);
	testEnemy();

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
	game_canva.context.drawImage(img,me.x,me.y,80,80);
	// game_canva.context.fill();
	// game_canva.context.stroke();
	}
	this.clear_virus=function(){
		game_canva.context.beginPath();
		game_canva.context.rect(me.x,me.y,80,80);
		game_canva.context.fillStyle = "black";
		//game_canva.context.fillStyle = "#8A2BE2";
		game_canva.context.fill();
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
	game_canva.context.drawImage(img,circularVirusA.x,circularVirusA.y,60,60);
	game_canva.context.drawImage(jerryhome,circularVirusA.radiiX,circularVirusA.radiiY,100,100);

	// game_canva.context.fill();
	// game_canva.context.stroke();
}
function create_player(){
		m=window.innerWidth/2;
		n=window.innerHeight-80;
		playerx=m;
		playery=n;
		game_canva.context.drawImage(boyimg,window.innerWidth/2,window.innerHeight-120,100,100);
		
		for(let i=0;i<16;i++){
		var v=new virus(getRndInteger(0,window.innerWidth),getRndInteger(0,window.innerHeight-150));
		v.create_virus();
		nodes.push(v);
		}
		for(let i=0;i<14;i++){
			var s=new sanitizer(getRndInteger(0,window.innerWidth-100),getRndInteger(0,window.innerHeight-150));
			s.create_sanitizer();
			sanitizers.push(s);
		}
		circularVirusA=new virus(window.innerWidth/2,150);
		circularVirusA.create_virus();
		circularVirusA.radiiX=circularVirusA.x+150;
		circularVirusA.radiiY=circularVirusA.y;
		circularVirusA.angle=0;
		game_canva.context.drawImage(jerryhome,circularVirusA.radiiX,circularVirusA.radiiY,100,100);

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

function handleMouseDown(e){
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



function startGame(){
	gameTimer=window.setInterval(function(){
		moveObject();
	}, move_interval);
}
function restartGame(level){
	if(level==1){
		move_interval=50;
	}else if(level==2){
		move_interval=30;
	}
	isDragging=false;
    x=50;
	y=50;
	nodes=[];
	sanitizers=[];
	game_canva.context.beginPath();
	game_canva.context.rect(0,0,window.innerWidth,window.innerHeight);
	game_canva.context.fillStyle = "black";
	game_canva.context.fill();	
	create_player();
	startGame();
}
function playerAttacked(){
			clear_canvas(playerx,playery);
			isDragging=false;
			window.clearInterval(gameTimer);
			game_canva.context.drawImage(jerryend,playerx,playery,200,200);
			setTimeout(function() {
			$("#gameOverModal").modal('toggle');
			}, 100);
}
function playerWon(){
	clear_canvas(playerx,playery);
			isDragging=false;
			window.clearInterval(gameTimer);
			setTimeout(function() {
			$("#gameWonModal").modal('toggle');
			}, 100);
}
function track_sanitizers(){
	for(let i=0;i<sanitizers.length;i++){
	if(Math.abs(playerx-sanitizers[i].x)<=50 && Math.abs(playery-sanitizers[i].y)<=50){
		sanitizers[i].clear_sanitizer();
		sanitizers.splice(i,1);
	}else{
	sanitizers[i].create_sanitizer();
	}
}
}
window.onload=function() {
	game_canva=initialiseGameZone();
	$("#myModal").modal("toggle");
	img=new Image();
	img.src='corona12.png';
	sanitizerimg=new Image();
	sanitizerimg.src='hand_sanitizer.png';
	boyimg=new Image();
	boyimg.src='jerry.png';
	jerryend=new Image();
	jerryend.src='jerry2.png';
	jerryhome=new Image();
	jerryhome.src='jerryhome.png';

	boyimg.onload=function(){
		create_player();
	}
}

