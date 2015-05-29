<?php

	//Get All the project

	
	require_once("config.php");


	//Super safe hahahah

	$projects = array();

	$query = $mysqli->query("SELECT * FROM Projects");

	while($project = $query->fetch_assoc()){

		$projects[] = $project;
	}

	echo json_encode($projects);


?>