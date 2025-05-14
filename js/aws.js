function showAddDetails(){
    var rid = $('#rid').val();
    console.log(rid);
    var btn = true;
    sessionStorage.setItem("btn", btn);
    window.location.href = "addDetails.html";
}

function displayDataByID(rid) {
    $.ajax({
        url: './php/getDataByID.php',
        method: "POST",
        data: {
            "rid": rid
        },
        dataType: "json",
        success: function(response) {
            console.log(response);
            $.each(response, function(key, value) {
                $('#rid').val(value.r_id);
                $('#name').val(value.name);  
                
            });
        }
    });
}

function displayDetailsDataByRID(rid){
    $.ajax({
        url: './php/getDetailsByRID.php',
        method: "POST",
        data: {
            "rid": rid 
        },
        dataType: "json",
        success: function(response) {
            console.log(response);
            $('#tbl_details tbody').empty(); 
            $.each(response, function(key, value) {
                var newRow = '<tr>' +
                    '<td>' + value.award + '</td>' +
                    '<td>' + value.event + '</td>' +
                    '<td>' + value.date + '</td>' +
                    '<td><button class="btn btn-info" onclick="editDetailsRecord('+ value.did+')">Edit</button></td>' +
                    '<td><button class="btn btn-danger" onclick="deleteDetailsRecord('+ value.did +','+ value.r_id +')">Delete</button></td>' +	
                    '</tr>';
                var tableBody = $('#tbl_details tbody');
                tableBody.append(newRow);    
            });
        }
    });
}

function deleteDetailsRecord(did,rid){
    var respond = confirm("Confirm Delete Details Record?");
    
    if(respond){
        $.ajax({
            url: './php/deleteDetailsRecord.php',
            method: 'POST',
            data: {
                "did": did
            },
            dataType: "json",
            success: function(response){
                displayDetailsDataByRID(rid);
            }
        });

    }
}

function editDetailsRecord(did){
    console.log(did);
    sessionStorage.setItem("did", did);
    var btn = false;
    sessionStorage.setItem("btn", btn);
    window.location.href = 'editDetails.html';

}

$(function() {
    var rid = sessionStorage.getItem("rid");
    displayDataByID(rid);
    displayDetailsDataByRID(rid);
});

function Index(){
    window.location.href = 'index.html';
}

