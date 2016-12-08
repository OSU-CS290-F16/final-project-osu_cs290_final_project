<?php
if($Character){
	$query = "CREATE OR REPLACE VIEW Marathon AS
       SELECT DISTINCT E.Season_and_Episode, E.Episode_Title, E.length
       FROM Episode AS E, Plot_Participant AS PP
	   WHERE E.Episode_Title = PP.Episode_Title
       AND PP.Character_name LIKE $Character
	   ORDER BY E.Airdate, E.Season_and_Episode";
	  
	$result = mysqli_query($database, $query)
	     or die(mysqli_error(dbc));
}
if($Plot)
	$query = "CREATE OR REPLACE VIEW Marathon AS
       SELECT DISTINCT E.Season_and_Episode, E.Episode_Title, E.length
       FROM Episode AS E, Plot_Participant AS PP, Plot_Type AS PT
	   WHERE E.Episode_Title == PP.Episode_Title
       AND PT.Plot_Title = PP.Plot_Title
	   AND PT.type = $Plot
	   ORDER BY E.Airdate, E.Season_and_Episode"
	  
    $result = mysqli_query($database, $query)
	     or die(mysqli_error(dbc));
   
if($Series)
    $query = "CREATE OR REPLACE VIEW Marathon AS
       SELECT DISTINCT Season_and_Episode, Episode_Title, Length
       FROM Episode
       WHERE Season_and_Episode LIKE $Series
       ORDER BY E.Airdate, E.Season_and_Episode"
   	  
	$result = mysqli_query($database, $query)
	     or die(mysqli_error(dbc));
?>