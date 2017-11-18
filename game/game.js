
//////////    SET UP ALL THE IMAGES AND OBJECTS   /////////////

//set up the canvas
var canvas = document.createElement("canvas");
canvas.id = "game";
var ctx = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 320;
document.body.appendChild(canvas);

var scale = 10;

//make the room
var bgPNG = new Image();
bgPNG.src = "../img/background.png";
bgPNG.onload = function(){
  ctx.drawImage(bgPNG, 0, 0);
};

////////   moving players  ////////

//main player
var coderIMG = new Image();
coderIMG.src = "../img/coder.png";
var coderReady = false;
coderIMG.onload = function(){coderReady=true;};

var coder = {
	width : 8*scale,
	height : 8*scale,
	dir : "right",
	img : coderIMG,
	ready : coderReady,

	//movement
	x : 32 * scale,
	y : 11 * scale, 
	speed : 3,
	moving : false,
	show : true,

	//bars
	caffeine: 10,
	code: 0

}


//trolls
var trollIMG = new Image();
trollIMG.src = "../img/troll.png";
var trollReady = false;
trollIMG.onload = function(){trollReady=true;};

var troll = {
	width : 8*scale,
	height : 8*scale,
	dir : "right",
	img : trollIMG,
	ready : trollReady,

	//movement
	x : 52 * scale,
	y : 11 * scale, 
	speed : 1,
	moving : false,
	velX : 0,
	velY : 0,
	show : false,

	//stats
	time : 25,
	health : 10

}

//hacker
var hackerIMG = new Image();
hackerIMG.src = "../img/hacker3.png";
var hackerReady = false;
hackerIMG.onload = function(){hackerReady=true;};

var hacker = {
	width : 8*scale,
	height : 8*scale,
	dir : "right",
	img : hackerIMG,
	ready : hackerReady,

	//movement
	x : 52 * scale,
	y : 11 * scale, 
	speed : 1,
	moving : false,
	velX : 0,
	velY : 0,
	show : false,

	//stats
	time : 25,
	health : 10

}

/////////    objects    //////////

//coffee
var coffeeIMG = new Image();
coffeeIMG.src = "../img/coffee.png";
var coffeeReady = false;
coffeeIMG.onload = function(){coffeeReady = true;};
var coffee = {
	name : "coffee",
	x : 1*scale, 
	y : 13 * scale,
	width : 5*scale,
	height : 5*scale,
	img : coffeeIMG,
	ready : coffeeReady,

	state : "full",
	anim : {"full" : 0, "empty" : 1} 
}

//books
var booksIMG = new Image();
booksIMG.src = "../img/books.png";
var booksReady = false;
booksIMG.onload = function(){booksReady = true;};
var books = {
	name : "books",
	x : 7*scale, 
	y : 9 * scale,
	width : 7*scale,
	height : 9*scale,
	img : booksIMG,
	ready : booksReady,

	state : "stock",
	anim : {"stock" : 0} 
}

//fridge
var fridgeIMG = new Image();
fridgeIMG.src = "../img/fridge.png";
var fridgeReady = false;
fridgeIMG.onload = function(){fridgeReady = true;};
var fridge = {
	name : "fridge",
	x : 14*scale, 
	y : 8*scale,
	width : 8*scale,
	height : 10*scale,
	img : fridgeIMG,
	ready : fridgeReady,

	state : "close",
	anim : {"close" : 0, "full" : 1, "empty":2} 
}

//computer
var computerIMG = new Image();
computerIMG.src = "../img/computer.png";
var computerReady = false;
computerIMG.onload = function(){computerReady = true;};
var computer = {
	name : "computer",
	x : 25*scale, 
	y : 9*scale,
	width : 14*scale,
	height : 9*scale,
	img : computerIMG,
	ready : computerReady,

	state : "off",
	anim : {"off" : 0, "compile" : 1, "crash" : 2} 
}

//table
var tableIMG = new Image();
tableIMG.src = "../img/table.png";
var tableReady = false;
tableIMG.onload = function(){tableReady = true;};
var table = {
	name : "table",
	x : 41*scale, 
	y : 10*scale,
	width : 7*scale,
	height : 8*scale,
	img : tableIMG,
	ready : tableReady,

	state : "empty",
	anim : {"empty" : 0, "rubik" : 1, "chicken" : 2, 
			"pixel" : 3, "robot" : 4, "boombox" : 5, 
			"ufo" : 6} 
}

//door
var doorIMG = new Image();
doorIMG.src = "../img/door.png";
var doorReady = false;
doorIMG.onload = function(){doorReady = true;};
var door = {
	name : "door",
	x : 52*scale, 
	y : 8*scale,
	width : 8*scale,
	height : 10*scale,
	img : doorIMG,
	ready : doorReady,

	state : "close",
	anim : {"close" : 1, "open" : 0} 


}

//entire set of objects
var stuff = [coffee, books, fridge, computer, table, door];

function getObjbyName(name){
	for(var o=0;o<stuff.length;o++){
		if(stuff[o].name === name)
			return stuff[o];
	}
}


/////////     CONTROLS     ///////////
var upKey = 38;     //[Up]
var leftKey = 37;   //[Left]
var rightKey = 39;  //[Rigt]
var downKey = 40;   //[Down]
var moveKeySet = [upKey, leftKey, rightKey, downKey];

var z_key = 90;   //[Z]
var x_key = 88;   //[X]
var actionKeySet = [z_key, x_key];
var keys = [];


//////////////////    GENERIC FUNCTIONS   ///////////////

//checks if an element is in an array
function inArr(arr, e){
  if(arr.length == 0)
	 return false;
  return arr.indexOf(e) !== -1
}


//////////////////  PLAYER CONTROLS /////////////////

document.body.addEventListener("keydown", function (e) {
  if(inArr(moveKeySet, e.keyCode)){
	 keys[e.keyCode] = true;
  }else if(inArr(actionKeySet, e.keyCode)){
	 keys[e.keyCode] = true;
  }
});

//check for key released
document.body.addEventListener("keyup", function (e) {
  if(inArr(moveKeySet, e.keyCode)){
	 keys[e.keyCode] = false;
  }else if(inArr(actionKeySet, e.keyCode)){
	 keys[e.keyCode] = false;
	 reInteract = true;
  }
});

//check if any directional key is held down
function anyKey(){
  return (keys[upKey] || keys[downKey] || keys[leftKey] || keys[rightKey])
}

//movement arrow keys
function keyboard(){
  //set the speed 
	if(keys[rightKey]){
		coder.dir = "right";
		coder.x += coder.speed;
	}else if(keys[leftKey]){
		coder.dir = "left";
		coder.x -= coder.speed;
	}
}


//////////     RENDERING AND ANIMATIONS      ///////////
 //render everything 
function render(){
	checkRender();
	ctx.save();
  	ctx.clearRect(0, 0, canvas.width,canvas.height); 	//clear everything

  	ctx.drawImage(bgPNG, 0, 0);			//draw the background
  	for(var o=0;o<stuff.length;o++){	//draw objects 
  		drawObject(stuff[o]);
  	}
	drawChar(coder);				//draw the player


	ctx.restore();


}

//make sure everything was imported correctly
function checkRender(){
	//check if player loaded
	if(!coder.ready)
		coder.img.onload = function(){coder.ready = true;};

	//check if objects loaded
	for(var o=0;o<stuff.length;o++){
		var obj = stuff[o];
		if(!obj.ready)
			obj.img.onload = function(){obj.ready = true;};
	}
	
}

//draw a moving sprite character
function drawChar(character){
	var dirOffset = (character.dir == "right" ? 0 : 1);

	if(character.ready && character.show){
		ctx.drawImage(character.img, 
			character.width*dirOffset, 0,
			character.width, character.height,
			character.x, character.y,
			character.width, character.height);
	}
}

//draw objects based on the state they're in
function drawObject(obj){
	ctx.drawImage(obj.img, 
		obj.width*obj.anim[obj.state], 0,
		obj.width, obj.height,
		obj.x, obj.y,
		obj.width, obj.height);
}


//////////      UPDATE AND STUFF     /////////////
//main running function for the game
function main(){
	requestAnimationFrame(main);
	canvas.focus();
	render();
	keyboard();
}

main();