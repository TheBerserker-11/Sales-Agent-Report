function AddNewRow(){
    var name = $('#name').val();
    var serialnumber = $('#serialnumber').val();
    var brand = $('#brand').val();
    var model = $('#model').val();
    var sold = $('#sold').val();
    var location = $('#location').val();
    console.log(name,serialnumber,brand, model, sold, location);
    
    insertSales(name,serialnumber,brand, model, sold, location);

    $('#name').val('');
    $('#serialnumber').val('');
    $('#brand').val('');
    $('#model').val('');
    $('#sold').val('');
    $('#location').val('');

    

}

function insertSales(name,serialnumber,brand, model, sold, location){
    $.ajax({
        url: './php/insertSales.php',
        method: "POST",
        data: {
            "name" : name,
            "serialnumber" : serialnumber,
            "brand" : brand,
            "model": model,
            "sold": sold,
            "location": location
            

        } ,
        dataType: "json",
        success: function(response){
            displayData()
        }
    });

    $('#exampleModal').modal('hide');
}

function searchData(){
    var searchWord = $('#search').val();

    $.ajax({
        url: './php/searchData.php',
        method: "POST",
        data: {
            "keyword": searchWord
        },
        dataType: "json",
        success: function(response) {
            $('#tbl_sales tbody').empty();
            $.each(response, function(key, value){
                newRowHTML(value.r_id, value.name, value.serialnumber, value.brand, value.model, value.sold, value.location);
            });
        }
    });
}

function AddEditRow(){
    var isAddEdit = $('#isAdd').val();
    if(isAddEdit=='true'){
        AddNewRow();
    }
    else{
        UpdateRow();
    }
}

function UpdateRow() {
    var rid = $('#rid').val();
    var name = $('#name').val();
    var serialnumber = $('#serialnumber').val();
    var brand = $('#brand').val();
    var model = $('#model').val();
    var sold = $('#sold').val();
    var location = $('#location').val();
    

    updateSales(rid,name,serialnumber,brand,model,sold,location);

    $('#exampleModal').modal('hide');
}

function updateSales(rid,name,serialnumber,brand,model,sold,location) {
    $.ajax({
        url: './php/updateData.php',
        method: "POST",
        data: {
            "rid": rid, 
            "name": name,
            "serialnumber": serialnumber,
            "brand": brand,
            "model": model,
            "sold": sold,
            "location": location
        },
        dataType: "json",
        success: function (response) {
            displayData();
        }
    });
}

function showModal(isAddEdit) {
    $('#name').val('');
    $('#serialnumber').val('');
    $('#brand').val('');
    $('#model').val('');
    $('#sold').val('');
    $('#location').val('');
    $('#isAdd').val(isAddEdit);
    $('#exampleModal').modal('show'); 
    $('#saveupdate').html('Save Record');
    $('#exampleModalLabel').html('Add New Record'); 

}

function editData(rid, isAddEdit) {
    console.log(rid);

    $.ajax({
        url:  './php/getDataByID.php',
        method: 'POST',
        data: {
            "rid": rid
        },
        dataType: 'json',
        success: function (response) {
            $.each(response, function(key, value){
                $('#rid').val(value.r_id);
                $('#name').val(value.name);
                $('#serialnumber').val(value.serialnumber);
                $('#brand').val(value.brand);
                $('#model').val(value.model);
                $('#sold').val(value.sold);
                $('#location').val(value.location);
            })
        }   
    });

    $('#isAdd').val(false);
    $('#exampleModal').modal('show'); 
    $('#saveupdate').html( 'Update Record');
    $('#exampleModalLabel').html('Edit Record'); 
}


function displayData(){
    
    $.ajax({
        url: './php/getSales.php',
        method: "POST",
        data: {},
        dataType: "json",
        success:function(response) {
            console.log(response);
            $('#tbl_sales tbody').empty(); 
            $.each(response, function(key, value){
                newRowHTML(value.r_id, value.name, value.serialnumber, value.brand, value.model, value.sold, value.location)
            });
        }
    });
}

function newRowHTML(r_id, name, serialnumber, brand, model, sold, location){
    var newRow = '<tr>' +
    '<td>' + r_id + '</td>' +
    '<td>' + name + '</td>' +
    '<td>' + serialnumber + '</td>' +
    '<td>' + brand + '</td>' +
    '<td>' + model + '</td>' +
    '<td>' + sold + '</td>' +
    '<td>' + location + '</td>' +
    '<td><button class="btn btn-success" onclick="viewSalesData(' + r_id + ')">View Agent Details</button><td>'+
    '<td><button class="btn btn-info" onclick="editData(' + r_id + ', true)">Edit</button></td>' +
    '<td><button class="btn btn-danger" onclick="deleteData(' + r_id + ')">Delete</button></td>' +	
    '</tr>';
    var tableBody = $('#tbl_sales tbody');
    tableBody.append(newRow);
}

function viewSalesData(rid) {
    sessionStorage.setItem("rid", rid); // Set the sales ID in sessionStorage
    console.log(rid);
    window.location.href = 'viewSales.html';
}

function deleteData(rid){
    var response = confirm("Delete ID " + rid + " Confirm Deletion?");
    if(response){
        $.ajax({
            url: './php/deleteSales.php',
            method: "POST",
            data: {"rid": rid},
            dataType: "json",
            success: function(response){displayData()}
        });
    }
}


function openDashboard(){
    window.location.href='dashboard.html';
}

$(function(){
    console.log("ready");
    displayData();
});