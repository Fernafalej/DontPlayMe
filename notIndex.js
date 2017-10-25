var rows = 5;
var cols = 5;
var colors = [];
var cells;
var marked = [];
var pixels = Math.floor(800/cols)+"px";
var points = 0;
var distortion = [];
var highscore = [0,0,0,0,0,0,0,0,0,0];
var HSNames =["Nameless","Nameless","Nameless","Nameless","Nameless","Nameless","Nameless","Nameless","Nameless","Nameless"]

function buildTable(table, r, c){
				// table is Id of the table, r is amount of rows added, c is the amount of cells per row
	var t = document.getElementById(table);
	var tempCells = [];
	determineColor();
	deleteTable(table);
	pixels = Math.floor(800/cols)+"px";
	for(var i = 0; i < r; i++){
		var row = t.insertRow(i);
		for(var j = 0; j < c; j++){
			var cell = row.insertCell(j);
			cell.id = table+"r"+i+"c"+j;
			cell.style.width = pixels;
			cell.style.height = pixels;
			cell.style.fontSize = "30px";
			cell.onclick = function (){
			clickedCell(this);
			};
			cell.style.backgroundColor = colors[i*cols+j];
			tempCells.push(cell);
		}
	}
	return tempCells;
}
function deleteTable(table){
	var t = document.getElementById(table);
	var x = document.getElementById(table).rows.length;
	for(var i = 0; i < x; i++){
		t.deleteRow(0);
	}
	return x;
}
function determineColor(){
	var i = 0;
	var temp;
	while (i < rows*cols){
		temp = Math.random()*100.0;
		if( temp >= 10){
			if(temp >= 35){
				if(temp >= 65){
					colors[i] = "green";
				}
				else{
					colors[i] = "blue";
				}
			}
			else{
				colors[i] = "red";
			}
		}
		else{
			colors[i] = "white";
		}		
		i++;
	}
	return colors;
}
function getColor(c,r){
	return(colors[c+r*cols])
}
function test(table, size){
	rows = size;
	cols = size;
	deleteTable(table);
	cells = buildTable(table,rows,cols);	
}
function clickedCell(cell){
	if(marked.length != 0){
		var b = false;
		var ckoor = idToPostition(cell.id);
		for(var i = 0; i < marked.length;i++){
			var mkoor = idToPostition(marked[i].id);
			if(mkoor[0] == ckoor[0] &&(mkoor[1]-1 == ckoor[1] || mkoor[1]+1 == ckoor[1])){
			 b= true;
			}
			if(mkoor[1] == ckoor[1] &&(mkoor[0]-1 == ckoor[0] || mkoor[0]+1 == ckoor[0] )){
			 b= true;
			}
			if(mkoor[0] == ckoor[0] && mkoor[1] == ckoor[1] || marked.length >= 3) {
				while(marked.length > 0){
					marked[marked.length-1].innerHTML = "";
					marked[marked.length-1].style.borderColor = "black";
					marked.pop();
				}
				return;
			}			
		}
		if(!b){
			return;
		}
	}
	if(cell.style.backgroundColor == "black"){
	
	}
	else if(marked.includes(cell)){
		cell.innerHTML = "";
		cell.style.borderColor = "black";
		marked.splice(marked.indexOf(cell),1);
		checkMarked();
	}
	else{
		cell.innerHTML = "X";
		cell.style.borderColor = "yellow";
		marked.push(cell);
		checkMarked();
	}
}
function checkMarked(){
	var doubles = [];
	var good = true;
	for(var i = 0; i < marked.length; i++){
		if(doubles.includes(marked[i].style.backgroundColor) && marked[i].style.backgroundColor != "white"){
			good = false;
			break;
		}
		doubles.push(marked[i].style.backgroundColor);
	}
	if(doubles.length != 3){
		good = false;
	}
	
	if(good == true){
		generatePoints();
		for(var i = marked.length-1; i >= 0; i--){
			marked[i].style.backgroundColor = newColor();
			marked[i].innerHTML ="";
			marked[i].style.borderColor = "black";
			marked.pop();
		}
	}
}
function generatePoints()
{	
	for(var i = 0; i < marked.length; i++){
		if(marked[i].style.backgroundColor != "white"){
			points++;
		}
	}
	document.getElementById("scoreTd").innerHTML = "Score: " + points;
	
}
function newGame(){
	buildTable("table1", rows, cols);
	highscoreCheck(points);
	points = 0;
	document.getElementById("scoreTd").innerHTML = "Score: " + points;
}
function newColor(){
	var temp = Math.random()*100.0;
	if( temp >= 10){
		if(temp >= 35){
			if(temp >= 65){
				return "green";
			}
			else{
				return "blue";
			}
		}
		else{
			return "red";
		}
	}
	else{
		return "white";
	}
}
function idToPostition(cellId){
	var koor = [0,0];
	var inOR = cellId.indexOf("r");
	var inOC = cellId.indexOf("c");
	koor[0] = cellId.slice(inOR+1,inOC);
	koor[1] = cellId.substring(inOC+1);
	koor[0] = parseInt(koor[0],10);	
	koor[1] = parseInt(koor[1],10);
	return koor;
}
function highscoreCheck(score){
	for(var i = 0; i < highscore.length; i++){
		if(points > highscore[i]){
			highscore.splice(i, 0, points);
			HSNames.splice(i,0,
				document.getElementById("hsName").value);
			i = 10;
			if(highscore.length > 10){
				highscore.pop();
			}
			writeHighscore();
			setHSCookie();
		}
	}
	return true;

}

function buildHighscore(){
	tableScore.style.border = "0";
	for(var i= 0; i < 10; i++){
		var r = tableScore.insertRow(i);
		r.insertCell(0);
		r.insertCell(0);
		r.insertCell(0);
		document.getElementById("tableScore").rows[i].cells[0].style.width = "20px";
		document.getElementById("tableScore").rows[i].cells[1].style.width = "80px";
		document.getElementById("tableScore").rows[i].cells[2].style.width = "80px";
		document.getElementById("tableScore").rows[i].cells[0].style.borderStyle = "none";
		document.getElementById("tableScore").rows[i].cells[1].style.borderStyle = "none";
		document.getElementById("tableScore").rows[i].cells[2].style.borderStyle = "none";
		document.getElementById("tableScore").rows[i].cells[2].style.textAlign = "right";
	}
	writeHighscore();
}

function writeHighscore(){
	for(var i = 0; i < highscore.length; i++){
		document.getElementById("tableScore").rows[i].cells[0].innerHTML = (i+1) + ":";
		document.getElementById("tableScore").rows[i].cells[1].innerHTML = HSNames[i];
		document.getElementById("tableScore").rows[i].cells[2].innerHTML = highscore[i];
	}
}

function setHSCookie(){
	document.cookie = 'highscore=' + highscore + " ; expires=Thu, 01 Jan 2300 00:00:01 GMT;";
	document.cookie = "HSNames=" + HSNames + "; expires=Thu, 01 Jan 2300 00:00:01 GMT;";
}

function loadFromCookie(){
	var c = document.cookie;
	var hs = c.indexOf("highscore=")+"highscore=".length;
	var n = c.indexOf("HSNames=") + "HSNames=".length;
	if(hs != 0 && n != 0){
		hs = c.substring(hs);
		n = c.substring(n);
	}
	var bool = true;
	for(var i=0;bool && i < 10;i++){
		var temp = hs.indexOf(",");
		var temp2 = hs.indexOf(";");
		var temp3 = n.indexOf(",");
		var temp4 = n.indexOf(";");
		if(temp == -1 || temp > temp2){
			bool = false;
		}
		var s = hs.substring(0,temp);
		console.log(hs);
		var t = n.substring(0,temp3);
		hs = hs.slice(temp+1);
		n = n.slice(temp3+1);
		s = parseInt(s,10);
		if(isNaN(s)){
			s = 0;
		}
		highscore[i] = s;
		HSNames[i] = t  ;
	}
}