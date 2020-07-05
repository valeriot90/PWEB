var img0 = new Array(4);
img0[0] = new Image();
img0[1] = new Image();
img0[2] = new Image();
img0[3] = new Image();

var img1 = new Array(4);
img1[0] = new Image();
img1[1] = new Image();
img1[2] = new Image();
img1[3] = new Image();

var img2 = new Array(4);
img2[0] = new Image();
img2[1] = new Image();
img2[2] = new Image();
img2[3] = new Image();

//precaricamento delle immagini
img0[0].src="./img/home.png";
img0[1].src="./img/guide.png";
img0[2].src="./img/classifica.png";
img0[3].src="./img/about.png";

img1[0].src="./img/home1.png";
img1[1].src="./img/guide1.png";
img1[2].src="./img/classifica1.png";
img1[3].src="./img/about1.png";

img2[0].src="./img/home2.png";
img2[1].src="./img/guide2.png";
img2[2].src="./img/classifica2.png";
img2[3].src="./img/about2.png";

//i è indice dell'immagine nell'array della pagina, 1 a 4
//tipo specifica il tipo di evento
//i-1 l'indice nell'array delle immagini precaricate(vedi sopra)
//n indica la pagina in cui si è verificato l'evento, da 0 a 3

function cambia(i, tipo, n){
	if(tipo == "over")
			document.images[i].src = img2[i-1].src;
	if(tipo == "out"){
		if(n != i-1)
			document.images[i].src = img1[i-1].src;		
		document.images[n+1].src = img0[n].src;
	}
}