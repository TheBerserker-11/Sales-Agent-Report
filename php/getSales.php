<?php

    try{
        include 'dbconnection.php';

        $stmt = $conn->prepare("SELECT * FROM tbl_sales");
        $stmt->execute();

        $data=array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            $data[] = $row;
        }
        header('Content-type: application/json');
        header('Access-Control-Allow-Origin:*');    
        echo json_encode($data);

    }catch(PDOException  $e){
        echo "Error: " . $e->getMessage();
    }
    $conn = null;

?>