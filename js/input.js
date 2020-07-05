//quando il gioco finisce, preleva nick e score, li invia al server
//e ripulisce l'area di gioco
//sarebbe la ajax gestore, parte del codice è ripreso dal libro
function controlla(){	
	var input = document.getElementById("nick");
	var nick = input.value;
	if((nick.length == 0) || (nick.length >10)){
		alert("Inserisci un nome valido!");
		return;
	}	
	var xmlHttp;
	try{ xmlHttp=new XMLHttpRequest();}
	catch(e){
		try{ xmlHttp=new ActiveXObject("Msxm12.XMLHTTP");}
		catch(e){
			try{ xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");}
			catch(e){
				windows.alert("Il tuo browser non supporta AJAX!");
				return false;
			}
		}
	}
	xmlHttp.onreadystatechange = function() {
		if(xmlHttp.readyState == 4) {
			var risposta = xmlHttp.responseText;
		}
	}
	
	xmlHttp.open('GET', "php/inserisci.php?nick=" +nick+ "&score="+score, true);
	xmlHttp.send(null);
	pulisci();
}

//invocata dalla gameover()
//crea il form in cui inserire in nick name
function creaform(){
	var game = document.getElementById("game");
	var input = document.createElement("input");
	input.id = "nick";
	input.type = "text";
	input.style.zIndex= 4;
	input.style.position = "absolute";
	input.style.top = 430 + "px";
	input.style.left = 610 + "px";
	input.alt = "nome";
	game.appendChild(input);
	var testo = document.createElement("p");
	testo.id = "text";
	var output= "Inserisci un nick (massimo 10 caratteri)";
	var txt = document.createTextNode(output);
	testo.appendChild(txt);
	testo.style.color = "AQUA";
	testo.style.fontSize = 18 + "pt";
	testo.style.left = 540 + "px";
	testo.style.top = 360 + "px";
	testo.style.zIndex= 4;
	testo.style.position = "absolute";
	game.appendChild(testo);
}

//invocata dalla gameover()
//crea il tasto invia tramite il quale controlla l'input
//ed eventualmente lo invia al server
function creatasto(){
	var game = document.getElementById("game");
	var tasto = document.createElement("input");
	tasto.id = "tasto";
	tasto.type = "submit";
	tasto.value = "Invia";
	tasto.setAttribute("onClick","controlla()");
	tasto.style.zIndex= 4;
	tasto.style.position = "absolute";
	tasto.style.top = 430 + "px";
	tasto.style.left = 800 + "px";
	tasto.style.visibility = "visible";
	tasto.alt = "tasto"; //SBAGLIATO?????
	game.appendChild(tasto);
}