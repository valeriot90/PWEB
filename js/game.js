var score;			 //punteggio
var ogg;			 //array delle navicelle create dinamicamente
var indice;			 //indice alieni
var fi; 			 //array dei proiettili creati dinamicamente
var i;				//indice proiettili
var creaoggI; 		//oggetti da creare
var muoviIs; 		//oggetto si muove
var muoviId;		//il proiettile si muove
var freq;			//frequenza iniziale di creazione 
var index; 			//indice appoggio elementi colpiti da togliere
var npro; 			//numero proiettili (aumenta con i potenziamenti)
var z;              //indice crescente

//chiamata dall'evento onload nella home
//inizializza le variabili, crea array degli oggetti->in attesa del click dell'utente
function begin(){	
	ogg = new Array();
	fi = new Array();
	z = 0;
	x = 0;
	i = 0;
	z = 0;
	npro= 2;
	index= 0;
	score = 0;
	indice = 0;
}

//chiamata dall'evento onclick sull'universo
//avvia il gioco crea il personaggio ed inizializza le variabili di conteggio
function gamestart(){
	document.onkeydown = KeyHandler;
	var play = document.getElementById("play");
	play.src = "img/universo2.png";
	play.setAttribute("onclick", "");							//tolgo proprietà onclick
	var div= document.createElement("div");
	div.setAttribute("id", "shuttle");
	div.style.top = "300px";
	div.style.left = "225px";	
	var nave = createimg("nave", "img/shuttle1.gif", "pg", "imgpg");
	div.appendChild(nave);
	var game = document.getElementById("game");
	game.appendChild(div);
	var freq = 2000;
	creaoggI = setInterval("createobj()", freq);				//crea oggetti
	muoviIs = setInterval("muovisx()", 45); 					//alieni
	muoviId = setInterval("muovidx()", 10);						// Proiettili
	aumentafreqI = setInterval("increasesfreq()",25000);		//ogni 25 secondi aumenta frequenza
}

//chiamata con intervallo di 25 secondi,
//aumenta la frequenza di creazione alieni decrementato la variabile freq di creazione degli oggetti
function increasesfreq(){
	if(freq>50)
		freq -= 200;
}

//Codice ripreso dalle slide del corso
//prende un tasto da tastiera e chiama la funzione associata
function KeyHandler(e){
	e=(!e)?window.event:e;		
	var key=(e.which!=null)?e.which:e.keyCode;
	switch(key){
		case 37:moveds(-10);break;		//sx
		case 39:moveds(10);break;		//dx
		case 38:movesg(-10);break;		//su
		case 40:movesg(10);break;		//giu
		case 67:fire();break; 			//c->fire
	}
}

//muove la navicella (personaggio) a destra e sinistra
function moveds(spazio){
	var shuttle = document.getElementById("shuttle");
	var pos = parseInt(shuttle.style.left)+spazio;
	if(pos<1050 && pos>225)
		shuttle.style.left=pos+"px";
}

//muove la navicella (personaggio) su e giù
function movesg(spazio){
	var shuttle = document.getElementById("shuttle");
	var pos = parseInt(shuttle.style.top)+spazio;
	if(pos<610 && pos>75)
		shuttle.style.top=pos+"px";
}

//oggetti: alieni,life
//gli elementi vengono collocati ad un altezza casuale tra 90 e 580
function object(id, path, ClasseImg, alt) {
	var game = document.getElementById("game");
	this.img = createimg(id, path, ClasseImg, alt);
	this.img.style.position = "absolute";
	var alt = Math.floor(580*Math.random());
	while(alt < 90)
		alt = Math.floor(580*Math.random());		
	this.img.style.top = alt + "px";
	this.img.style.left = "1150px";	
	game.appendChild(this.img);
}

//oggetti: proiettili
//gli elementi vengono collocati nella punta della navicella
function objectpr(id, path, ClasseImg, alt) {
	var game = document.getElementById("game");
	this.img = createimg(id, path, ClasseImg, alt);
	this.img.style.position = "absolute";
	var shuttle = document.getElementById("shuttle");
	this.img.style.top = parseInt(shuttle.style.top) + 39 + "px";
	this.img.style.left = parseInt(shuttle.style.left) + 110 + "px";
	game.appendChild(this.img);
}

//crea le immagini
function createimg(id, path, ClasseImg, alt){
	var img = document.createElement("img");	
	
	var idIncr= id + "-" + z;
	img.setAttribute("id", idIncr);	
	z+=1;
	
	img.setAttribute("src", path);
	img.setAttribute("class", ClasseImg);
	img.setAttribute("alt", alt);
	return img;
}

//spara (crea) i proiettili
//limitati a 2 alla volta, vengono potenziati se prendi bullets
function fire(){
	var bullets= document.getElementById("bullets");
	if(bullets.firstChild.nodeValue>0){
		fi[i] = creamg();
		i = (i+1)%npro;
		bullets.firstChild.nodeValue--;
	}
}

//funzione che crea gli oggetti (intervallo definito da gamestart()
//ogni 5 alieni crea un boss
//ogni 23 da un bonus life
//ogni 21 potenzia l'arma con un proiettile in più
function createobj(){
		ogg[indice] = crealieno();
		indice = (indice+1)%40;
		if((indice%5)==0){
			ogg[indice] = creaboss();
			indice = (indice+1)%40;
		}
		if((indice%21)==0){
			ogg[indice] = creabull();
			indice = (indice+1)%40;
		}	
		if((indice%23)==0){
			ogg[indice] = crealife();
			indice = (indice+1)%40;		
		}			
}


function crealieno(){
	var al = new object("alieno", "img/Alieno1.gif", "objcasual", "alieno");
	return al;
}

function creaboss(){
	var al = new object("boss", "img/Boss1.gif", "objcasual", "boss");
	return al;
}

function crealife(){
	var al = new object("life", "img/life.png", "objcasual", "life");
	return al;
}

function creabull(){
	var al = new object("bullets", "img/bullets.png", "objcasual", "bullets");
	return al;
}

function creamg(){
	var al = new objectpr("mg", "img/MG.png", "mobjcasual", "mg");
	return al;
}

//muove tutti gli oggetti dell'array fi verso destra, settata da gamestart
//ogni volta che sposta il proiettile controlla se ha colpito una navicella
function muovidx(){ 
	for(var i = 0; i < fi.length; i++){
		if(fi[i] != null){
			if(parseInt(fi[i].img.style.left) == 1180){ 			//E' arrivato a fine corsa
				var game = document.getElementById("game");
				game.removeChild(fi[i].img);
				fi[i] = null;
				var bullets= document.getElementById("bullets");
				bullets.firstChild.nodeValue++;						//incremento i proiettili
			}
			else{
				var pos = parseInt(fi[i].img.style.left) + 5;
				fi[i].img.style.left = pos + "px";
			}
		}
	}
	
	colpisci();
}

//controlla se un proiettile ha colpito una navicella aliena
//non rileva collisioni con life e bullets
function colpisci(){
	for(var j = 0; j < fi.length; j++){	
	for(var i = 0; i < ogg.length; i++){
		if(fi[j] != null){
		if(ogg[i] != null){										//PRENDO COORDINATE
			var tr = (parseInt(fi[j].img.style.left) +5);		//margine destro
			var tl = parseInt(fi[j].img.style.top); 			//margine alto->imprecisione della gif
			var bl = (parseInt(fi[j].img.style.top) + 50);		//margine basso
			var nvt = (parseInt(ogg[i].img.style.top) +20); 	//margine altoalieno
			var nvb = (parseInt(ogg[i].img.style.top) + 60);	//margine bassosxalieno
			var nvd = (parseInt(ogg[i].img.style.left) + 80);	//margine destro alieno
			if((parseInt(fi[j].img.style.left)) >= parseInt(ogg[i].img.style.left) && (parseInt(fi[j].img.style.left)) <= nvd){ //controllo se proiettile è tra left left+80 dell' alieno
				if((tl>nvt)&&(tl<nvb) || (bl>nvt)&&(bl<nvb)){
					var game = document.getElementById("game");	//avvenuta collisione 
					var id = ogg[i].img.id;
					var scomponiID = id.split("-");
					switch(scomponiID[0]){
						case "boss":							//Il cuore non deve essere rimosso
							score+=30;
						case "alieno":
							score+=10;
							var pt = document.getElementById("score");
							pt.firstChild.nodeValue = score;							
							ogg[i].img.src = "img/Exp.gif";
							index = i;						
							if(ogg[i].img.src != "img/Exp.gif"){
								setTimeout("rimuovi()", 600);
							}
							game.removeChild(fi[j].img);									
							fi[j] = null;																			
							var bullets= document.getElementById("bullets");
							bullets.firstChild.nodeValue++;
							break;
					}					
				}				
			}
		}}
	}}

}

//muove tutti gli oggetti dell'array ogg verso destra, settata da gamestart
//ogni volta che sposta una navicella controlla se ho colpito il personaggio
function muovisx(){ 
	for(var i = 0; i < ogg.length; i++){
		if(ogg[i] != null){
			if(parseInt(ogg[i].img.style.left) == 225){ 		//E' arrivato a fine corsa
				var game = document.getElementById("game");
				game.removeChild(ogg[i].img);
				ogg[i] = null;	
				if(score > 0)
					score-=1;										//fa diminuire il punteggio
				var pt = document.getElementById("score");
				if(parseInt(pt.firstChild.nodeValue) > 0 )
					pt.firstChild.nodeValue = score;
				return;
			}
			else{
				var pos = parseInt(ogg[i].img.style.left) - 5;
				ogg[i].img.style.left = pos + "px";			
			}
		}
	}	
	colpito();
}

//controlla se il personaggio ha colpito una navicella aliena, life, bullets
//se ho colpito life incrementa le vite, se ho colpito bullets incrementa i proiettili in possesso
function colpito(){
	var shuttle = document.getElementById("shuttle");	
	for(var i = 0; i < ogg.length; i++){		
		if(ogg[i] != null){										 //PRENDO COORDINATE		
			var tr = (parseInt(shuttle.style.left) +115);		 //margine destro
			var tl = parseInt(shuttle.style.top);				 //margine alto			
			var bl = (parseInt(shuttle.style.top) + 60);		 //margine basso
			var nvt = parseInt(ogg[i].img.style.top);			 //margine alto
			var nvb = (parseInt(ogg[i].img.style.top) + 60);	 //margine bassosxalieno i
			if(tr == parseInt(ogg[i].img.style.left) || parseInt(shuttle.style.left) == parseInt(ogg[i].img.style.left)){      //se stanno a stesso left(testa) o left(coda)				
				if((nvt>tl)&&(nvt<bl) || (nvb>tl)&&(nvb<bl)){		//se parte del top è "sovrapposto" (condiviso
					var game = document.getElementById("game");		//avvenuta collisione
					var id = ogg[i].img.id;
					var scomponiID = id.split("-");					
					var life= document.getElementById("life");		//prendo id life
					switch(scomponiID[0]){			
						case "boss":
						case "alieno":						
							if(ogg[i].img.src !=  "img/Exp.gif"){
								var life= document.getElementById("life");
								life.firstChild.nodeValue--;
								ogg[i].img.src = "img/Exp.gif";							
								if(life.firstChild.nodeValue == 0){		//se ho perso tutte le vite
									gameover();							//termina gioco
								}
							}
							break;
						case "life":
							life.firstChild.nodeValue++;
							game.removeChild(ogg[i].img);
							ogg[i] = null;
							break;
						case "bullets":
							var bullets= document.getElementById("bullets");
							bullets.firstChild.nodeValue++;
							npro++;
							game.removeChild(ogg[i].img);
							ogg[i] = null;
							break;
					}					
					if(id != "life" && life.firstChild.nodeValue != 0){	//l'ultima volta che perdo la vita 
						index = i;										//gli oggetti vengono rimossi dalla game over, 
						setTimeout("rimuovi()", 600);					//lo farei 2 volte altrimenti!			
					}
				}				
			}
		}	
	}
}

//rimuove l'oggetto alieno esploso
//funzione invocata dopo 600ms ( pari alla durata .gif)
function rimuovi(){
	var game = document.getElementById("game");
	if(ogg[index] != null){
		game.removeChild(ogg[index].img);
		ogg[index] = null;	
	}
}

//invocata dalla colpito() quando l'utente ha perso tutte le vite
//rimuove dall'universo tutti gli oggetti e crea tasto e form
//se score è uguale a zero, non invia nessun dato al server
//si limita a cambiare schermata
function gameover(){
	clearInterval(creaoggI);
	clearInterval(muoviIs);
	clearInterval(muoviId);
	clearInterval(freq);
	
	document.onkeydown = null;
	
	var game = document.getElementById("game");
	var shuttle = document.getElementById("shuttle");
	if(shuttle != null){
		game.removeChild(shuttle);
	}	
	
	for(var j = 0; j<fi.length; j++){ 
		if(fi[j] != null){
			game.removeChild(fi[j].img);
			fi[j] = null;
		}
	}
	
	for(var i = 0; i< ogg.length; i++){
		if(ogg[i] != null){
			game.removeChild(ogg[i].img);
			ogg[i] = null;																
		}
	}	
	
	var play = document.getElementById("play");
	play.src = "img/universo4.png";
	
	if(score != 0){
		creaform();
		creatasto();
	}
	else setTimeout("newgame()", 3000);
}

//rimuove, se sono scati creati, l'input testo e tasto ed il messaggio
//invocata dalla controlla() [che invia i dati al server]
function pulisci(){
	var game = document.getElementById("game");
	var tasto= document.getElementById("tasto");
	var text= document.getElementById("text");
	var nick= document.getElementById("nick");
	
	game.removeChild(tasto);	
	game.removeChild(text);	
	game.removeChild(nick);
	newgame();
}

//invocata dalla pulisci
//ripristina il punteggio, i proiettili e le vite iniziali
//richiama la begin() [dell'evento onload del body della home]
function newgame(){ 
	var score = document.getElementById("score");
	score.firstChild.nodeValue = 0;	
	var life= document.getElementById("life");
	life.firstChild.nodeValue=3;
	var bullets= document.getElementById("bullets");
	bullets.firstChild.nodeValue=2;
	
	var play = document.getElementById("play");
	play.src = "img/universo3.png";
	play.setAttribute("onclick", "gamestart()");
	begin();
}
