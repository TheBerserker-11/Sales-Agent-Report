<?php
try {
    include 'dbconnection.php';

    $did = $_POST['did'];
    $award = $_POST['award'];
    $event = $_POST['event'];
    $date = $_POST['date'];
    

    $sql = "UPDATE tbl_details SET award='".$award."', event='".$event."', date='".$date."' WHERE did=" .$did;
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    
    $data=array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        $data[] = $row;
    }
    header('Content-type: application/json');
    header("Access-Control-Allow-Origin:*");    
    echo json_encode($data);

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

$conn = null;
?>
