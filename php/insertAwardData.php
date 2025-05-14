<?php

    try {
        include 'dbconnection.php';
        
        $rid = $_POST['rid'];
        $award = $_POST['award'];
        $event = $_POST['event'];
        $date = $_POST['date'];             

        $sql = "CALL sp_insertAwardData ('".$award."', '".$event."', '".$date."','".$rid."')";
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        $data=array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            $data[] = $row;
        }
        
        
    } catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
        }

	$conn = null;
?>