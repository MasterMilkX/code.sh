
//////////////    SET UP ALL THE IMAGES AND OBJECTS   //////////////////

////////   gui and screens   //////////

//set up the canvas
var canvas = document.createElement("canvas");
canvas.id = "game";
var ctx = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 320;
document.body.appendChild(canvas);

//game properties
var scale = 10;
var gameover = false;


//make the room
var bgPNG = new Image();
bgPNG.src = "../img/background.png";
bgPNG.onload = function(){
  ctx.drawImage(bgPNG, 0, 0);
};

//status bar guis
var caffeineBar = new Image();
caffeineBar.src = "../img/caffeine_bar.png";
var caffeineBarReady = false;
caffeineBar.onload = function(){caffeineBarReady = true;};

var codeBar = new Image();
codeBar.src = "../img/code_bar.png";
var codeBarReady = false;
codeBar.onload = function(){codeBarReady = true;};

//fire gui
var fireIMG = new Image();
fireIMG.src = "../img/fire.png";
var fireReady = false;
fireIMG.onload = function(){fireReady = true;};

var fire = {
	x : 0,
	y : 0,
	anim : 0,
	show : false,
	time : 5,
	obj : null
};


//text output 
function termOut(text, color){
	this.text = text;
	this.color = color;
}
var terminal = [];
var codeStat = [new termOut("coder@computer ~ $ ", "#ffffff"),
				new termOut("", "#ffffff"),
				new termOut("", "#ffffff"),
				new termOut("", "#ffffff")];

var maxTerm = 4;
var maxHistory = 20;


////////   sound effects and music   ////////

var bg_music = new Audio("../data/theme.wav");
bg_music.loop = true;
bg_music.volume = .50;
bg_music.load();
bg_music.autoplay = true;

var hit_wav = new Audio("../data/hit.wav");
var select_wav = new Audio("../data/select.wav");
var code_wav = new Audio("../data/code_done.wav");
var success_wav = new Audio("../data/success.wav");
var fail_wav = new Audio("../data/crash.wav");
var die_wav = new Audio("../data/die.wav");
var boost_wav = new Audio("../data/boost.wav");
var run_wav = new Audio("../data/run.wav");
var enemy_wav = new Audio("../data/enemy.wav");
var deny_wav = new Audio("../data/deny.wav");

hit_wav.loop = false;
select_wav.loop = false;
code_wav.loop = false;
success_wav.loop = false;
fail_wav.loop = false;
die_wav.loop = false;
boost_wav.loop = false;
run_wav.loop = false;
enemy_wav.loop = false;
deny_wav.loop = false;


hit_wav.volume = 0.15;
select_wav.volume = 0.15;
code_wav.volume = 0.15;
success_wav.volume = 0.15;
fail_wav.volume = 0.15;
die_wav.volume = 0.15;
boost_wav.volume = 0.15;
run_wav.volume = 0.15;
enemy_wav.volume = 0.15;
deny_wav.volume = 0.15;



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
	hit : 0,

	//movement
	x : 32 * scale,
	y : 11 * scale, 
	speed : 3,
	show : true,

	//bars
	caffeine: 50,
	code: 0,

	//other properties
	canInteract : true,
	curObject : null,
	canMove : true,
	batting : false
}

//baseball bat
var batIMG = new Image();
batIMG.src = "../img/bat.png";
var batReady = false;
batIMG.onload = function(){batReady = true;};

var bat = {
	x : 0,
	y : 0,
	width : 160,
	height : 80, 
	show : false,
	anim : 0,
	row : 0,
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
	speed : 5,
	show : false,

	//stats
	hp : 10,
	moveInter : 0,
	trollInter : 0,
	dirInter : 0,
	teleportInter : 0,
	hpt : 0,
	hit : 0,
	trolling : false

}

//hacker
var hackerIMG = new Image();
hackerIMG.src = "../img/hacker3.png";
var hackerReady = false;
hackerIMG.onload = function(){hackerReady=true;};
var hackTime = 180
var hackClock = setInterval(function(){
	haxorz();
	door.state = "open";
	hackTime = Math.floor(Math.random()*180) + 60;
}, hackTime*1000);

var hacker = {
	width : 8*scale,
	height : 8*scale,
	dir : "right",
	img : hackerIMG,
	ready : hackerReady,
	hit : 0,

	//movement
	x : 52 * scale,
	y : 11 * scale, 
	speed : 7,
	show : false,

	//stats
	hp : 10,
	hpt : 0,
	hit : 0,
	hacking : false

}

var bugIMG = new Image();
bugIMG.src = "../img/bug.png";
var bugReady = false;
bugIMG.onload = function(){bugReady = true;};

var compass = ["north", "south", "east", "west"];
var bugMax = 4;
function bugger(dir){
	this.x = computer.x+Math.floor(computer.width/4);
	this.y = computer.y+Math.floor(computer.height/4);
	this.width = 50;
	this.height = 50;
	this.anim = 0;
	this.dir = dir;
	this.hp = 3;
	this.hpt = 0;
	this.speed = 10;
	this.hit = 0;
}

var bugArmy = [];

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
	anim : {"full" : 0, "empty" : 1},
	unlock : true
}
var cft = 0;
var caf_keyTick = 0;

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
	anim : {"stock" : 0},
	unlock : false,
	quotes : ["'I AM ERROR'", 
			"'Talk is cheap. Show me the code'",
			"'hail;m io\\\\'",
			"'> fortune | cowsay'",
			"'What, you egg? [He stabs him.]'",
			"'Nevermore' - E.A.P.",
			"'Err.. what was your name again?",
			"'Never knows best'",
			"'Greetins, programs!'",
			"'Sorry, I'm dead'",
			"'You have died of dysentery'",
			"'All your base are belong to us'",
			"'o shit whaddup'",
			"'Bee boo boo bop boo boo bop'"],
	curQuote : 0,
	maxQuote : 0,
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
	anim : {"close" : 0, "full" : 1, "empty":2},
	unlock : false,
	foods : [new food("chocolate", 10), new food("cold spaghetti", 15), new food("super pizza", 20), new food("MONSTER", 50)]
}

//food boost
function food(name, boost){
	this.name = name;
	this.boost = boost;
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
	anim : {"off" : 0, "compile" : 1, "crash" : 2},
	unlock : true,

	program_index : 0,
	curProgram : null,
	action : "code select",
	option_index : 0,

	codeCt : 0		//determines how many codes you have
}
//countdown for compiler
var ct = 0;
var comp_keyTick = 0;

//programs
var all_programs = ["code.sh", "fire.sh", "coffee.sh", "fridge.sh", "book.sh", "table.sh", "win.sh", "ilu.sh"];
function program(name, time, bug_rate, run_funct){
	this.name = name;
	this.options = ["code"];
	this.time = time;
	this.bug_rate = bug_rate;
	this.run_funct = run_funct;
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
	things : [new thing("empty", "...nothing found..."),
			new thing("rubik", "ooh... a colorful cube!"),
			new thing("chicken", "mmm... looks like chicken"),
			new thing("pixel", "...glitch?"),
			new thing("robot", "BEEP BOOP"),
			new thing("boombox", "good jam"),
			new thing("ufo", "-object unidentified-")],
	curThing : new thing("empty", "...nothing found..."),
	anim : {"empty" : 0, "rubik" : 1, "chicken" : 2, 
			"pixel" : 3, "robot" : 4, "boombox" : 5, 
			"ufo" : 6} ,
	unlock : false
}

//switch t
function thing(name, text){
	this.name = name;
	this.text = text;
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
	anim : {"close" : 1, "open" : 0} ,
	unlock : true,


}

//entire set of objects
var stuff = [coffee, books, fridge, computer, table, door];


/////////     CONTROLS     ///////////
var upKey = 38;     //[Up]
var leftKey = 37;   //[Left]
var rightKey = 39;  //[Rigt]
var downKey = 40;   //[Down]
var moveKeySet = [upKey, leftKey, rightKey, downKey];
var scroll = true;

var z_key = 90;   //[Z]
var x_key = 88;   //[X]
var m_key = 77;   //[M]
var actionKeySet = [z_key, x_key];
var keys = [];


//////////////////    GENERIC FUNCTIONS   ///////////////

//checks if an element is in an array
function inArr(arr, e){
  if(arr.length == 0)
	 return false;
  return arr.indexOf(e) !== -1
}


////////////////    OBJECT INTERACTION   ///////////////


//sets fire to a random object
function setFire(){
	var randObj = Math.floor(Math.random() * stuff.length);
	var obj = stuff[randObj];
	fire.show = true;
	fire.x = obj.x + Math.floor(obj.width/4);
	fire.y = obj.y - Math.floor(obj.height/4);
	fire.obj = obj;
	enemy_wav.play();
}

//determine which object a character is in front of
function getObjInteraction(character){
	var midpt = Math.round((character.x + (character.width / 2)));
	for(var o=0;o<stuff.length;o++){
		var obj = stuff[o];
		if((obj.x < midpt && (obj.x + obj.width) > midpt))
			return obj;
	}
	return null;
}

//check if outside the window
function outbounds(obj){
	if((obj.x+obj.width) < 0 || obj.x > canvas.width)
		return true;
	else if((obj.y + obj.height) < 0 || obj.y > 200)
		return true;
	else
		return false;
}

//check if colliding pixels
function colliding(obj1, obj2){

	//get bounding box area
	var xArea1 = [];
	for(var z=0;z<obj1.width;z++){
		xArea1.push(obj1.x+z);
	}
	var yArea1 = [];
	for(var z=0;z<obj1.height;z++){
		yArea1.push(obj1.y+z);
	}

	var xArea2 = [];
	for(var z=0;z<obj2.width;z++){
		xArea2.push(obj2.x+z);
	}
	var yArea2 = [];
	for(var z=0;z<obj2.height;z++){
		yArea2.push(obj2.y+z);
	}

	//find overlap
	var xOver = false;
	for(var a=0;a<xArea1.length;a++){
		if(inArr(xArea2, xArea1[a])){
			xOver = true;
			break;
		}
	}
	var yOver = false;
	for(var b=0;b<yArea1.length;b++){
		if(inArr(yArea2, yArea1[b])){
			yOver = true;
			break;
		}
	}

	return xOver && yOver;
}

//get object distance
function displacement(obj1, obj2){
	var dist = [];
	dist[0] = obj2.x - obj1.x;
	dist[1] = obj2.y - obj1.y;
	return dist;
}


//find object given the name
function getObjbyName(name){
	for(var o=0;o<stuff.length;o++){
		if(stuff[o].name === name)
			return stuff[o];
	}
}

//object interact
function objInteract(obj){
	//computer inteaction
	if(obj == computer && !processing()){
		if(hacker.hacking){
	  		terminal.push(new termOut("Access denied - hack in progress", "#ff0000"));
	  		deny_wav.play();
	  	}else{
	  		computer.option_index = 0;
			codeStat[1] = new termOut("  > " + computer.programs[computer.program_index].name, "#ffffff");
			coder.canMove = false;
	  	}
	}
	//coffee interaction
	else if(obj == coffee){
		if(coffee.state === "full"){
			//add to caffeine bar and cap it off
			coder.caffeine += 25;
			if(coder.caffeine >= 100)
				coder.caffeine = 100;

			terminal.push(new termOut("coffee boost gained!", "#8B5907"));
			coffee.state = "empty";
			boost_wav.play();
		}else{
			terminal.push(new termOut("ERROR - Coffee not found!", "#ff0000"));
			deny_wav.play();
		}
	}
	//door interaction
	else if(obj == door){
		if(door.state === "close"){
			door.state = "open";
			terminal.push(new termOut("door opened", "#bebebe"));
		}else if(door.state === "open"){
			door.state = "close";
			terminal.push(new termOut("door closed", "#bebebe"));
		}
	}
	//books interaction
	else if(obj == books){
		if(!books.unlock){
			terminal.push(new termOut("Access denied - " + obj.name + ".sh", "#ff0000"));
			deny_wav.play();
		}
		else{
			books.curQuote = Math.round(Math.random() * books.maxQuote)
			terminal.push(new termOut(books.quotes[books.curQuote], "#ffffff"));
		}
	}
	//fridge interaction
	else if(obj == fridge){
		if(!fridge.unlock){
			terminal.push(new termOut("Access denied - " + obj.name + ".sh", "#ff0000"));
			deny_wav.play();
		}
		else{
			//closed door
			if(fridge.state === "close"){
				if(fridge.foods.length > 0)
					fridge.state = "full";
				else
					fridge.state = "empty";
			}
			//open door
			else{
				//full fridge
				if(fridge.foods.length > 0){
					var foodItem = Math.floor(Math.random()*fridge.foods.length);
					var f = fridge.foods.splice(foodItem,1)[0];
					terminal.push(new termOut((f.name + " added +" + f.boost + " caffeine"), "#FF9E00"));
					boost_wav.play();
					coder.caffeine += f.boost;
					if(coder.caffeine > 100)
						coder.caffeine = 100;
					if(fridge.foods.length == 0)
						fridge.state = "empty";
				}
				//empty fridge
				else{
					terminal.push(new termOut("ERROR - Food not found!", "#ff0000"));
					deny_wav.play();
				}
			}
		}
	}
	//table interaction
	else if(obj == table){
		if(!table.unlock){
			terminal.push(new termOut("Access denied - " + obj.name + ".sh", "#ff0000"));
			deny_wav.play();
		}
		else{
			terminal.push(new termOut(table.curThing.text, "#ffffff"));
		}

	}
}

//add a new program to the computer
function newCode(){
	codeStat[3] = new termOut("New code!", "#0000ff");
	//add the books program
	if(computer.codeCt == 0){
		computer.programs.push(
			new program("fridge.sh", 8, 3, 
			function(){
				fridge.unlock = true;
				fridge.foods = [new food("chocolate", 10), new food("cold spaghetti", 15), new food("super pizza", 20), new food("MONSTER", 50)]
				fridge.state = "close";
				codeStat[3] = new termOut("Fridge restocked!", "#41F1FF");
			}));
		computer.codeCt++;
		return;
	}
	//add the fridge
	else if(computer.codeCt == 1){
		computer.programs.push(
			new program("books.sh", 5, 4, 
				function(){
					books.unlock = true;
					if(books.maxQuote < books.quotes.length-1)
						books.maxQuote++;
					codeStat[3] = new termOut("New book!", "#34CA00");
				}));
		computer.codeCt++;
		return;
	}else if(computer.codeCt == 2){
		computer.programs.push(
		new program("table.sh", 6, 5,
			function(){
				table.unlock = true;
				var newThing = Math.floor(Math.random()*table.things.length);
				table.curThing = table.things[newThing];
				table.state = table.curThing.name;
				codeStat[3] = new termOut("New thing!", "#FFEA00");
			}));
		computer.codeCt++;
		return;
	}else if(computer.codeCt == 3){
		computer.programs.push(
			new program("win.sh", 7, 6,
			function(){
				game_stop();
				coder.code = 100;
				codeStat[3] = new termOut("Game Won!", "#00ff00");
				terminal.push(new termOut("win.sh run - Game Over!", "#00ff00"));
				terminal.push(new termOut("Thanks for playing!", "#00ff00"));
				terminal.push(new termOut("code.sh - A game by Milk", "#00ff00"));
			}));
		computer.codeCt++;
		return;
	}
}


//////////////////  PLAYER CONTROLS /////////////////

document.body.addEventListener("keydown", function (e) {
  if(inArr(moveKeySet, e.keyCode)){
	 keys[e.keyCode] = true;
  }else if(inArr(actionKeySet, e.keyCode)){
	 keys[e.keyCode] = true;
  }else if(e.keyCode == m_key){
  	!bg_music.paused ? bg_music.pause() : bg_music.play();
  }
});

//check for key released
document.body.addEventListener("keyup", function (e) {
  if(inArr(moveKeySet, e.keyCode)){
	 keys[e.keyCode] = false;
	 coder.curObject = null;
	 scroll = true;
  }else if(inArr(actionKeySet, e.keyCode)){
	 keys[e.keyCode] = false;
	 coder.canInteract = true;
  }
});

//check if any directional key is held down
function anyKey(){
  return (keys[upKey] || keys[downKey] || keys[leftKey] || keys[rightKey])
}

//movement arrow keys
function keyboard(){
  //set the speed 
  	if(coder.canMove){
  		if(keys[rightKey]){
			coder.dir = "right";
			if((coder.x + coder.width) < canvas.width)
				coder.x += coder.speed;
		}else if(keys[leftKey]){
			coder.dir = "left";
			if(coder.x > 0)
				coder.x -= coder.speed;
		}else if(keys[upKey] && !coder.curObject){
			obj = getObjInteraction(coder);
			if(obj){
				coder.curObject = obj;
				objInteract(obj);
			}
		}
		
		//batter up
		if(keys[downKey]){
			coder.batting = true;
		}else{
			coder.batting = false;
		}
		batterUp();

  	}else if(!coder.canMove && !gameover && !hacker.hacking){
  		computerTerm();
  	}
}

//baseball bat animation
var bt;
var swing_back = false;
function batterUp(){
	//update animations
	if(keys[downKey] && bt == 0){
		bt = setInterval(function(){
			bat.anim += (swing_back ? -1 : 1);
			if(bat.anim == 4 || bat.anim == 0)
				swing_back = !swing_back
		}, 100);
	}else if(!keys[downKey]){
		clearInterval(bt);
		bt = 0;
		bat_tick=0;
	}

	if(coder.batting){
		bat.show = true;
		bat.y = coder.y;
		if(coder.dir === "right"){
			bat.row = 0;
			bat.x = coder.x;
		}
		else{
			bat.x = coder.x-80;
			bat.row = 1;
		}
	}else{
		bat.show = false;
	}
}


/////////////////		COMPUTER STUFF     /////////////////////


//utilize the computer stuff
function computerTerm(){
	//code selection stage
	if(computer.action === "code select" && scroll){
		codeStat[2].text = "";
		codeStat[3].text = "";
		computer.state = "off";
  		if(keys[leftKey]){
  			if(computer.program_index > 0)
  				computer.program_index--;
  			scroll = false;
  		}else if(keys[rightKey]){
  			if(computer.program_index < computer.programs.length-1)
  				computer.program_index++;
  				scroll = false;
  		}
  		codeStat[1].text = ("  > " + computer.programs[computer.program_index].name);
  		
  		if(keys[z_key]){
  			computer.curProgram = computer.programs[computer.program_index];
  			codeStat[0].text = "coder@computer ~ $ " + computer.curProgram.name;
  			computer.action = "options";
  			coder.canInteract = false;	
  			select_wav.play();
  		}
  	}
  	//option selection stage [code, compile, or run]
  	else if(computer.action === "options" && scroll){
  		if(keys[leftKey]){
  			if(computer.option_index > 0)
  				computer.option_index--;
  			scroll = false;
  		}else if(keys[rightKey]){
  			if(computer.option_index < computer.curProgram.options.length-1)
  				computer.option_index++;
  			scroll = false;
  		}
  		codeStat[1].text = ("  > " + computer.curProgram.options[computer.option_index]);
  		
  		
  		if(keys[z_key] && coder.canInteract){
  			select_wav.play();
  			computer.state = "compile";
  			codeStat[2].text = ("[                         ] 0%");
  			var op = computer.curProgram.options[computer.option_index];
  			if(op === "compile" || op === "run"){
  				coder.canMove = true;
  				computer.action = op;
  			}	
  			else{
  				if(coder.caffeine > 20){
  					coder.canMove = false;
  					computer.action = op;
  				}
  				else{
  					codeStat[3] = new termOut("Not enough caffeine to code...", "#8B5907")
  					codeStat[1].text = "";
  					codeStat[2].text = "";
  					coder.canMove = true;
  					computer.action = "code select";
  					computer.state = "off";
  				}
  			}
  			
  			
  		}
  	}
  	//finished with progress and status screen shown
  	else if(computer.action === "fini"){
  		codeStat[0].text = "coder@computer ~ $ ";
  		codeStat[1].text = "";
  		codeStat[2].text = "";
  		codeStat[3].text = "";
  		computer.action = "code select";
  		computer.option_index = 0;
  		//computer.program_index = 0;
  	}

  	//leave the screen
  	if(keys[x_key]){
  		if(!processing()){
  			codeStat[1].text = "";
  			codeStat[0].text = "coder@computer ~ $ ";
  			coder.canMove = true;
  		}

  		if(computer.action == "options"){
  			computer.action = "code select";
  			codeStat[1].text = "";
  			codeStat[0].text = "coder@computer ~ $ ";
  			coder.canMove = true;
  		}
  	}
}

//check if in the middle of a computer process
function processing(){
	return inArr(["code", "compile", "run"], computer.action)
}

//runs the background processes
function cpu(){
	//if currently running a process
	if(processing()){
		var percent = comp_keyTick / computer.curProgram.time;
		var bar_perc = Math.floor(percent *25);
		var progress_bar = "[";

		for(var a=0;a<bar_perc;a++){progress_bar +="#";}
		for(var a=0;a<(25-bar_perc);a++){progress_bar +=" ";}
		progress_bar += "] " + Math.floor(percent*100) + "%";
		codeStat[2].text = (progress_bar);

		//if finished on the progress bar
		if(percent == 1){
			//if coded - allow to compile
			if(computer.action === "code" && !inArr(computer.curProgram.options, "compile")){
				computer.curProgram.options.push("compile");
				computer.state = "off";
				codeStat[3] = new termOut("Code finished!", "#0000ff");
				code_wav.play();
				coder.canMove = true;
			}
			//if compiled, run it
			else if(computer.action === "compile" && !inArr(computer.curProgram.options, "run")){
				//randomly crash it
				var buggy = Math.floor(Math.random() * computer.curProgram.bug_rate);
				if(buggy != 0){
					var bugs = Math.floor(Math.random() * 3000) + 1;
					codeStat[3] = new termOut("Compile failed! " + bugs + " bugs found", "#ff0000");
					fail_wav.play();
					//randomize bug generation
					var bug_spawn = Math.floor(Math.random()*3);
					if(bug_spawn == 0){
						zerg_rush();
						terminal.push(new termOut("WARNING - bug spawn!", "#6ABE30"))
					}

					computer.state = "crash";
					computer.curProgram.options = ["code"];
				}else{
					success_wav.play();
					computer.curProgram.options.push("run");
					computer.state = "off";
					codeStat[3] = new termOut("Compile success!", "#0000ff");
				}
			}
			//if run - use the function
			else if(computer.action === "run"){
				computer.state = "off";
				computer.curProgram.run_funct();
				run_wav.play();
			}

			computer.action = "fini";
			comp_keyTick = 0;
			computer.option_index = 0;
		}
	}
}


/////////////       AI STUFF    /////////////////

function ai_action(){
	infest();			//bugs
	trololol();			//troll
	hack_the_planet(); 	//hacker
}



////////    bugs    ///////////


var mt = 0;
var rt = 0;
var bug_index = 0;

//add bugs
function zerg_rush(){
	var bugNum = Math.floor(Math.random() * bugMax)+1;
	//make some new bugs
	for(var b=0;b<bugNum;b++){
		var dir = compass[Math.floor(Math.random()*4)];
		var new_bug = new bugger(dir);
		 
		bugArmy.push(new_bug);
	}

	//set randomized movement
	if(mt == 0)
		mt = setInterval(function(){scatter();}, 100);

	if(rt == 0)
		rt = setInterval(function(){
			while(bug_index > bugArmy.length-1 && (bug_index >= 0))
				bug_index--;

			//random movement
			if(door.state === "close"){
				bugArmy[bug_index].dir = compass[Math.floor(Math.random()*4)];
			}
			//go to the door
			else{
				var door_center = {x : door.x+door.width/2, y:door.y+door.height/2};
				var bug_d = displacement(bugArmy[bug_index], door_center);
				if(Math.abs(bug_d[0]) >= Math.abs(bug_d[1])){	//move x
					if(bug_d[0] > 0)
						bugArmy[bug_index].dir = "east";
					else 
						bugArmy[bug_index].dir = "west";
				}else{
					if(bug_d[1] > 0)
						bugArmy[bug_index].dir = "south";
					else
						bugArmy[bug_index].dir = "north";
				}
			}
			
			bug_index++;
			if(bug_index > (bugArmy.length-1))
				bug_index = 0;
		}, (Math.floor(Math.random()*3)+1)*200)
}

//bug behavior
function infest(){
	for(var b=0;b<bugArmy.length;b++){
		var my_bug = bugArmy[b];

		//animation
		if(my_bug.dir === "north" || my_bug.dir === "south")
			my_bug.anim = 1;
		else
			my_bug.anim = 0;

		//take damage
		if(coder.batting && my_bug.hpt == 0 && colliding(my_bug, bat)){
			my_bug.hit = 1;
			hit_wav.play();
			my_bug.hpt = setTimeout(
				function(){
					my_bug.hp--;
					my_bug.hit = 0;
					clearTimeout(my_bug.hpt);
					my_bug.hpt=0;}
			, 250);
		}else if(!coder.batting && my_bug.hpt != 0 && !colliding(my_bug, bat)){
			clearTimeout(my_bug.hpt);
			my_bug.hit = 0;
			my_bug.hpt = 0;
		}

		//kill the bug
		if(my_bug.hp <= 0){
			bugArmy.splice(b,1);
			die_wav.play();
			terminal.push(new termOut("bug smushed", "#6ABE30"));
			continue;
		}

		//went to the door
		var door_center = {x : door.x+door.width/2, y:door.y+door.height/2}
		if((door.state === "open") && colliding(bugArmy[b], door)){
			bugArmy.splice(b,1);
			terminal.push(new termOut("bug went out the door", "#6ABE30"));
		}
	}

	if(bugArmy.length == 0){
		bug_index = 0;
		clearInterval(mt);
		clearInterval(rt);
		rt = 0;
		mt = 0;
	}
}


//bug movement
function scatter(){
	for(var b=0;b<bugArmy.length;b++){
		var my_bug = bugArmy[b];
		//movement
		if(my_bug.dir === "north")
			my_bug.y-=my_bug.speed;
		else if(my_bug.dir === "south")
			my_bug.y+=my_bug.speed;
		else if(my_bug.dir === "west")
			my_bug.x-=my_bug.speed;
		else if(my_bug.dir === "east")
			my_bug.x+=my_bug.speed;
	}
}


/////// trolls ///////

var tt = setInterval(function(){
				if(door.state === "open" && !gameover && (Math.floor(Math.random()*3) == 0)){
					spoopy();
				}
			}, 10000);		//reset trigger
//release the troll
function spoopy(){
	troll.x = door.x+door.width/2;
	troll.y = 11 * scale
	troll.hp = 10;
	troll.show = true;
	troll.trolling = true;
	terminal.push(new termOut("WARNING - troll invaded!", "#BE7705"))
	troll.moveInter = setInterval(
		function(){
			if(troll.dir === "left")
				troll.x-=troll.speed;
			else
				troll.x+=troll.speed;
		}, 100);
	troll.trollInter = setInterval(
		function(){
			//mess with a troll object
			var trollObj = getObjInteraction(troll);
			if(trollObj){
				interfere(trollObj);
			}
		}, 2500);

	troll.dirInter = setInterval(
		function(){
			var dir = Math.round(Math.random());
			if(dir == 0){
				troll.dir = "left";
			}else{
				troll.dir = "right";
			}
		}, 750);

	troll.teleportInter = setInterval(
		function(){
			troll.x = Math.floor(Math.random()*600)+4;
		}, Math.floor(Math.random()*2000)+1000);
}

//troll behavior
function trololol(){
	if(troll.trolling){
		clearInterval(tt);
		tt = 0;
		//take damage
		if(coder.batting && troll.hpt == 0 && colliding(troll, bat)){
			troll.hit = 1;
			hit_wav.play();
			troll.hpt = setTimeout(
				function(){
					troll.hp--;
					troll.hit = 0;
					clearTimeout(troll.hpt);
					troll.hpt = 0;}
			, 250);
		}	

		//kill the bug
		if(troll.hp <= 0){
			troll.show = false;
			clearInterval(troll.moveInter);
			clearInterval(troll.teleportInter);
			clearInterval(troll.dirInter);
			clearInterval(troll.trollInter);
			die_wav.play();
			terminal.push(new termOut("troll blocked", "#BE7705"));
			tt = setInterval(function(){
				if(door.state === "open" && !gameover && (Math.floor(Math.random()*3) == 0)){
					spoopy();
				}
			}, 10000);		//reset trigger
			troll.trolling = false;
		}
	}
}

function interfere(obj){
	if(obj == coffee){
		if(coffee.state === "full"){
			coffee.state = "empty";
			enemy_wav.play();
			terminal.push(new termOut("troll emptied coffee", "#FFE500"))
		}
	}else if(obj == books){
		//add a random book
		var trollBook = "~TROLL~ ";
		var alphabet = "abcdefghijklmnopqrstuvwxyz0123456789#$%@&!*^~+_-=:;><?          ";
		var randLetter = Math.floor(Math.random()*alphabet.length);
		for(var l=0;l<15;l++){trollBook += (alphabet.charAt(randLetter));}
		books.quotes.unshift(trollBook);
		enemy_wav.play();
		terminal.push(new termOut("troll added a book", "#FFE500"))
	}else if(obj == fridge){
		if(coffee.state === "full"){
			coffee.state = "empty";
			enemy_wav.play();
			terminal.push(new termOut("troll ate all the food", "#FFE500"))
		}
	}else if(obj == table){
		if(table.state != "empty"){
			table.state = "empty";
			enemy_wav.play();
			terminal.push(new termOut("troll stole item from the table", "#FFE500"))
		}
		
	}
}


//////  hacker  ///////

//add the hacker
function haxorz(){
	hacker.x = door.x+door.width/2;
	hacker.y = 11 * scale
	hacker.hp = 10;
	hacker.show = true;
	hacker.hacking = false;
	terminal.push(new termOut("WARNING - hacker breach!", "#ffffff"))
	hacker.moveInter = setInterval(
		function(){
			if(hacker.x > (computer.x+computer.width/2)){
				hacker.dir = "left";
				hacker.x -= hacker.speed;
			}
		}, 100);
}

//hacker behavior
function hack_the_planet(){
	if(hacker.x <= (computer.x+computer.width/2) && coder.canMove && !hacker.hacking && hacker.show){
		hacker.hacking = true;
	}

	//anti-virus
	//take damage

	if(coder.batting && hacker.hpt == 0 && colliding(hacker, bat) && hacker.show){
		hacker.hit = 1;
		hit_wav.play();
		hacker.hpt = setTimeout(
			function(){
				hacker.hp--;
				hacker.hit = 0;
				clearTimeout(hacker.hpt);
				hacker.hpt = 0;}
		, 250);
	}


	if(hacker.hacking){
		clearInterval(hackClock);
		hackClock = 0;



		if(processing()){
			clearInterval(ct);
			ct = 0;
			comp_keyTick=0;
			computer.state = "compile";
			computer.action = "hack";
		}

		//kill the hacker
		if(hacker.hp <= 0){
			hacker.show = false;
			die_wav.play();
			terminal.push(new termOut("hacker stopped", "#ffffff"));
			hackClock = setInterval(function(){
				haxorz();
				door.state = "open";
				hackTime = Math.floor(Math.random()*180) + 60;
			}, hackTime*1000);
			computer.action = "fini";
			clearInterval(ct);
			ct = 0;
			hacker.hacking = false;
		}

	}
}


//run the hack
function virus(){

	codeStat[1].text = "  > hack_code.sh";

	var percent = comp_keyTick / 7;
	var bar_perc = Math.floor(percent *25);
	var progress_bar = "[";

	for(var a=0;a<bar_perc;a++){progress_bar +="#";}
	for(var a=0;a<(25-bar_perc);a++){progress_bar +=" ";}
	progress_bar += "] " + Math.floor(percent*100) + "%";
	codeStat[2].text = (progress_bar);

	if(percent == 1){
		var infectIndex = Math.floor(Math.random()*computer.programs.length);
		var infectCode = computer.programs[infectIndex];
		infectCode.options = ["code"];
		terminal.push(new termOut(infectCode.name + " was hacked", "#ff0000"));
		codeStat[3] = new termOut("Code hacked!", "#ff0000");
		comp_keyTick = 0;
		enemy_wav.play();
	}else{
		codeStat[3].text = "";
	}


}



//////////     RENDERING AND ANIMATIONS      ///////////


 //render everything 
function render(){
	checkRender();
	ctx.save();
  	ctx.clearRect(0, 0, canvas.width,canvas.height); 	//clear everything

  	ctx.drawImage(bgPNG, 0, 0);			//draw the background
  	drawStatusBars();					//draw the status bar guis
  	for(var o=0;o<stuff.length;o++){	//draw objects 
  		drawObject(stuff[o]);
  	}
  	drawFire();
  	drawAI();
  	drawBat();
	drawChar(coder);				//draw the player
	
	stdout()						//draw the output
	stdout2()						//draw the output


	ctx.restore();


}

//make sure everything was imported correctly
function checkRender(){
	//check if player loaded
	if(!coderReady)
		coder.img.onload = function(){coderReady = true;};
	coder.ready = coderReady;

	//check if objects loaded
	for(var o=0;o<stuff.length;o++){
		var obj = stuff[o];
		if(!obj.ready)
			obj.img.onload = function(){obj.ready = true;};
	}

	//check if gui loaded
	if(!caffeineBarReady)
		caffeineBar.onload = function(){caffeineBarReady = true;};
	if(!codeBarReady)
		codeBar.onload = function(){codeBarReady = true;};

	//check objects
	if(!fireReady)
		fireIMG.onload = function(){fireReady = true;};
	if(!batReady)
		batIMG.onload = function(){batReady = true;};

	//check ai
	if(!bugReady)
		bugIMG.onload = function(){bugReady = true;}

	if(!trollReady){
		trollIMG.onload = function(){trollReady = true;}
	}
	troll.ready = trollReady;

	if(!hackerReady){
		hackerIMG.onload = function(){hackerReady = true;}
	}
	hacker.ready = hackerReady;
	
}

//draw a moving sprite character
function drawChar(character){
	var dirOffset = (character.dir == "right" ? 0 : 1);

	if(character.ready && character.show){
		ctx.drawImage(character.img, 
			character.width*dirOffset, character.height*character.hit,
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

//draw the fire
function drawFire(){
	if(fire.show && fireReady)
		ctx.drawImage(fireIMG,
			fireIMG.width/2*fire.anim, 0,
			fireIMG.width/2, fireIMG.height,
			fire.x, fire.y,
			fireIMG.width/4, fireIMG.height/2);
}

function drawBat(){
	if(bat.show)
		ctx.drawImage(batIMG,
			bat.width*bat.anim, bat.height*bat.row,
			bat.width, bat.height,
			bat.x, bat.y,
			bat.width, bat.height);
}

function drawAI(){
	for(var b=0;b<bugArmy.length;b++){
		var bug = bugArmy[b];
		if(bugReady){
			ctx.drawImage(bugIMG,
				bug.width*bug.anim, bug.height*bug.hit,
				bug.width, bug.height,
				bug.x, bug.y,
				bug.width, bug.height);
		}
	}

	drawChar(troll);
	drawChar(hacker);
}

//wrap the text if overflowing on the dialog
function stdout() {
	//check if overflow
	if(terminal.length > maxHistory)
		terminal.shift();

	//setup
	ctx.font = "18px Fixedsys";
  	

  	//find counting index
  	var ct = (terminal.length > maxTerm ? terminal.length-maxTerm : 0);
  	var dt = 0;

  	while(ct < terminal.length){
  		ctx.fillStyle = terminal[ct].color;
  		ctx.fillText(terminal[ct].text, 16, 230+(dt*23));
  		ct++;
  		dt++;
  	}
}

function stdout2(){
	//shows first 4 lines
	// line 1: current running program
	// line 2: program list / [code, compile, or run]
	// line 3: progress bar
	// line 4: status 
	for(var s=0;s<4;s++){
		ctx.fillStyle = codeStat[s].color;
  		ctx.fillText(codeStat[s].text, 336, 230+(s*23));
	}
}

//draw the status bars for code and caffeine
function drawStatusBars(){
	ctx.font = "20px Monaco";
  	ctx.fillStyle = "#0000FF"

	//caffeine
	ctx.drawImage(caffeineBar,
		0, 0,
		caffeineBar.width, caffeineBar.height,
		120, 10,
		coder.caffeine*1.9, caffeineBar.height
	);

	//code
	ctx.drawImage(codeBar,
		0, 0,
		codeBar.width, codeBar.height,
		523-(coder.code*1.9), 10,
		coder.code*1.9, codeBar.height
	);

	//code percent text
	ctx.fillText(coder.code + "%", 595, 28)
}

//////////      UPDATE AND STUFF     /////////////
function init(){
	//fire animation
	var ft = setInterval(function(){fire.anim = (fire.anim == 0 ? 1 : 0)}, 350)
	
	//set initial programs
	computer.programs = [new program("code.sh", 10, 2, function(){coder.code+=20;newCode();this.options=["code"]}),
				new program("fire.sh", 3, 2, function(){codeStat[3] = new termOut("Fire set!", "#FF0000");setFire();terminal.push(new termOut(fire.obj.name + " is on fire", "#ff0000"))}),
				new program("coffee.sh", 4, 2, function(){codeStat[3] = new termOut("Coffee filled!", "#8B5907");coffee.state = "full"})]
	
	//st caffeine depletion rate
	cft = setInterval(function(){coder.caffeine -=1;}, 1500);
}

//main running function for the game
function main(){
	requestAnimationFrame(main);
	canvas.focus();

	//countdown for compiler
	if(processing() && ct == 0 && !hacker.hacking){
		ct = setInterval(function(){comp_keyTick+=1;cpu();}, 1000);
	}else if(!processing() && !hacker.hacking){
		clearInterval(ct);
		ct = 0;
		comp_keyTick=0;
	}

	//countdown for hackker execution
	if(hacker.hacking && ct == 0){
		ct = setInterval(function(){comp_keyTick+=1;virus();}, 1000);
	}

	//ai stuff
	ai_action();



	/*
	if(bugArmy.length > 0)
		console.log(bugArmy[0])
	*/

	//check for gameover status
	if(coder.caffeine <= 0 && !gameover){
		terminal.push(new termOut("no caffeine left - GAME OVER", "#8B5907"))
		game_stop();
	}else if(fire.obj == computer && !gameover){
		terminal.push(new termOut("code was burned - GAME OVER", "#ff0000"));
		game_stop();
	}

	render();
	keyboard();

	//debug
	var debugStr = "DEBUG: ";
	for(var b=0;b<bugArmy.length;b++)
		debugStr += bugArmy[b].hpt + " " 
					+ bugArmy[b].hp + " " 
					+ bugArmy[b].hit + " | ";
		
	//document.getElementById('debug').innerHTML = debugStr;
}

function game_stop(){
	clearInterval(cft);
	clearInterval(hackClock);
	clearInterval(tt);
	coder.batting = false;
	cft = 0;
	hackClock = 0;
	tt = 0;
	coder.canMove = false;
	gameover = true;
	bg_music.pause()
}

main();
