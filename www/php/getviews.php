<?php

	
	require_once("config.php");


	//Super safe hahahah

	$projects = array();

	$projectQuery = $mysqli->query("SELECT * FROM Projects");

	

	while($project = $projectQuery->fetch_assoc()){

		$viewQuery = $mysqli->query("SELECT * FROM Views WHERE projectId = ".$project["projectId"]);

		
		

		$project["views"]

		$projects[] = $project;
	}

	echo json_encode($projects);


?>