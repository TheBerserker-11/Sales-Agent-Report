<?php

    try{
        include 'dbconnection.php';

        $rid = $_POST['rid'];
        $name = $_POST['name'];
        $serialnumber = $_POST['serialnumber'];
        $brand = $_POST['brand'];
        $model = $_POST['model'];
        $sold = $_POST['sold'];
        $location = $_POST['location'];
        

        $sql="call sp_updateSales('".$name."','".$serialnumber."','".$brand."','".$model."','".$sold."','".$location."','".$rid."')";
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