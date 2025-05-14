<?php

    try{
        include 'dbconnection.php';

        $rid=$_POST['rid'];

        $stmt = $conn->prepare("SELECT * FROM tbl_details WHERE r_id=" .$rid);
        $stmt->execute();

        $data=array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            $data[] = $row;
        }
        header('Content-type: application/json');
        header("Access-Control-Allow-Origin:*");    
        echo json_encode($data);

    }catch(PDOExeption $e){
        echo "Error: " . $e->getMessage();
    }
    $conn = null;

?>