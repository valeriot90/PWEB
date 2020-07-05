<!DOCTYPE HTML PUBLIC "-//W3C//Dtd HTML 4.01//EN"
"http://www.w3.org/tr/html4/strict.dtd">
<html>		
	<head>
			<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">    <!-- std http-->
			<title> Invaders! </title>
			<link rel="shortcut icon" href="img/al.ico">
			<link rel="stylesheet" href="css/style.css" type="text/css" media = "screen" >
			<script type="text/javascript" src="js/game.js"> </script>	
			<script type="text/javascript" src="js/layout.js"> </script>
	</head>	
		<body>
		<div class="title"> <!-- sezione titolo -->
			<h1> <img src = "img/title.png" id = "ititle" alt = " Invaders!" > </h1>
		</div>
		
		<div id = "navigazione">
				<p>
				<a href="index.html" onClick = "begin()"> <img src="./img/home1.png" onMouseOver="cambia(1, 'over', 2)" onMouseOut="cambia(1, 'out', 2)" id="h" alt="home"></a>
				<a href="guide.html"> <img src="./img/guide1.png" onMouseOver="cambia(2, 'over', 2)" onMouseOut="cambia(2, 'out', 2)" id="g" alt="guide"></a>
				<a href="classifica.php"> <img src="./img/classifica.png" onMouseOver="cambia(3, 'over', 2)" onMouseOut="cambia(3, 'out', 2)" id="c" alt="classifica"></a>
				<a href="about.html"> <img src="./img/about1.png" onMouseOver="cambia(4, 'over', 2)" onMouseOut="cambia(4, 'out', 2)" id="a" alt="about"></a>
			</p>
		</div>
	
		<div id="divclassifica">
			<table border = "1" id="tabellaclassifica">
			<tr><td>POSITION</td>
				<td>NICK</td>
				<td>SCORE</td>
			</tr>
			
			<?php
			$connessione = mysql_connect("127.0.0.1", "root")
			or die (" Connessione non riuscita: " . mysql_error());

			mysql_select_db("classificaDB")
			or die(" Selezione del database non riuscita: " . mysql_error());
			
			$query = "SELECT * FROM classifica ORDER BY score DESC";
			$ris = mysql_query($query)
			or die(" Query fallita: " . mysql_error());
			$b=1;
			//stampa il risultato in una tabella			
			while($a = mysql_fetch_array($ris)){				
				echo '<tr >';
				echo '<td class="cella">'.$b++.'</td>';
				echo '<td class="cell1">'.$a['nick'].'</td>';
				echo '<td class="cella2">'.$a['score'].'</td>';
				echo '</tr>';
			}
			mysql_close($connessione);
			?>

			</table>
		</div>
	</body>
</html>
	















