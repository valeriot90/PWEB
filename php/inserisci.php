<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
"http://www.w3.org/TR/html4/strict.dtd">

<html>
	<head>
		<title>Server</title>
	</head>
	<body>
<?php
	$connessione = mysql_connect("127.0.0.1", "root")
	or die (" Connessione non riuscita: " . mysql_error());
	print (" Connesso ");
	
	$query = "CREATE DATABASE IF NOT EXISTS classificaDB;";
	
	$ris = mysql_query($query);			
	mysql_select_db("classificaDB");	
	
	$nick=$_GET['nick'];
	$score=$_GET['score'];
		
	$query = "CREATE TABLE IF NOT EXISTS classifica(
				id INT NOT NULL AUTO_INCREMENT,
				nick VARCHAR(10),
				score INT(6),
				PRIMARY KEY (id)
			) ENGINE = InnoDB;";
	$ris = mysql_query($query) or die(" creazione fallita: " .mysql_error());
	print(" Creato ");
	
	
	$query="INSERT INTO classifica(nick,score)
			VALUES('$nick','$score')";
	$ris = mysql_query($query) or die(" Inserimento fallito: " .mysql_error());
	mysql_close();
?>
	</body>
</html>