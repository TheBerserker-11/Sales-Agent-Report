<?php

    try {
        include 'dbconnection.php';
        
        $keyword = $_POST['keyword'];
        $stmt = $conn->prepare("SELECT * FROM tbl_sales WHERE brand LIKE '%".$keyword."%'");
        $stmt->execute();

        
        $data=array();

            
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            $data[] = $row;
        }
        header('Content-type: application/json');

        echo json_encode($data);

    }catch(PDOException  $e){
        echo "Error: " . $e->getMessage();
    }
    $conn = null;
?>