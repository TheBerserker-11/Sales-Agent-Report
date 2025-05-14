<?php

    try{
        include 'dbconnection.php';

        $did=$_POST['did'];
        
        $sql="DELETE FROM tbl_details WHERE  did=".$did;
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        $data=array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            $data[] = $row;
        }
        header('Content-type: application/json');
        header("Access-Control-Allow-Origin:*");    
        echo json_encode($data);

    }catch(PDOException  $e){
        echo "Error: " . $e->getMessage();
    }
    $conn = null;

?>