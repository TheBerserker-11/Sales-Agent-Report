<?php

    try {
        include 'dbconnection.php';
        
        $name = $_POST['name'];
        $serialnumber = $_POST['serialnumber'];
        $brand = $_POST['brand'];
        $model = $_POST['model'];
        $sold = $_POST['sold'];
        $location = $_POST['location'];
        

        $sql = "INSERT INTO tbl_sales (name,serialnumber,brand, model, sold, location) VALUES (?,?,?,?,?,?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$name, $serialnumber, $brand, $model, $sold, $location]);

        $data=array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            $data[] = $row;
        }
        header('Content-type: application/json');
        header("Access-Control-Allow-Origin:*");    
        echo json_encode($data);
        
    } catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
        }

	$conn = null;
?>