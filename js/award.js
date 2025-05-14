$(function(){
    var rid = sessionStorage.getItem('rid');
    $('#rid').val(rid);
    var did = sessionStorage.getItem('did');
    $('#did').val(did)
    var btn = sessionStorage.getItem('btn');
    loadVaccine();
    if(btn==='true'){
        $('#award').prop("selecetdIndex",0);
        $('#event').prop("selecetdIndex",0);
        $('#date').val('mm/dd/yyyy');
    }else{
        editDetailRecordByDID(did);
    }
    
    
});


function editDetailRecordByDID(did){
    $.ajax({
        url: './php/getDetailsByDID.php',
        method: "POST",
        data: {
            "did":did
        },
        dataType: "json",
        success: function(response){
            $.each(response,function(key,value){
                $('#award').find('option:contains('+value.award+')').attr('selected','selected');
                $('#event').find('option:contains('+value.event+')').attr('selected','selected');
                $('#date').val(value.date);
            });
        }
    });
}



function AddDetails(){
    var rid = $('#rid').val();
    var award = $('#award option:selected').text();
    var event = $('#event option:selected').text();
    var date = $('#date').val(); 

    console.log(rid, award, event, date); 

    $.ajax({
        url: './php/insertAwardData.php', 
        method: "POST",
        data: {
            "rid": rid,
            "award": award,
            "event": event,
            "date": date
        },
        //dataType: "json",
        success: function(response){ 
            alert('Award Data Successfully Inserted!')     
            window.location.href = "viewSales.html";
        }
    });
}


function UpdateDetails(){
    var did = $('#did').val();
    var award = $('#award option:selected').text();
    var event = $('#event option:selected').text();
    var date = $('#date').val();
    console.log(did,award,event,date); 
    
    $.ajax({
        url: './php/updateDetailsData.php',
        method: "POST",
        data: {
            "did": did,
            "award": award, 
            "event": event,
            "date": date
        },
        dataType: "json",
        success: function(response){ 
            alert('Details has been updated!');   
            window.location.href = "viewSales.html";
        }
    });
}

function loadVaccine(){
    $.ajax({
        url: './php/getAward.php',
        method: "POST",
        data: {

        },
        dataType: "json",
        success: function(response){
            $.each(response,function(key,value){
                $('#award').append('<option value="'+value.awards+'">'+value.awards+'</option>');
            });
        }
    })
}


function Sales(){
    window.location.href = 'viewSales.html';
}