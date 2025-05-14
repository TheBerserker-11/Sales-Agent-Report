function getTotalAwards(){
    $.ajax({
        url: './php/countAward.php',
        method: "POST",
        data: {},
        dataType: "json",
        success: function(response) {
            $.each(response, function(key, value) {
                $('#award_count').text(value.AWARD_COUNT);
            }); 
        }
    });
}


function getAwarded(){
    $.ajax({
        url: './php/countAwarded.php',
        method: "POST",
        data: {},
        dataType: "json",
        success: function(response) {
            $.each(response, function(key, value) {
                $('#awarded_count').text(value.AWARDED_COUNT);
            }); 
        }
    });
}


function getAwards() {
    $.ajax({
        url: './php/countByAWARDS.php',
        method: 'POST',
        data: {},
        dataType: 'json',
        success: function(response) {
            var award = [];
            var award_count = [];
            var awardcolor = [];

           for (var i in response){
                award.push(response[i].award)
                award_count.push(response[i].award_count)
                awardcolor.push(response[i].COLOR)
           }



            var chartdata = {
                labels: award,
                datasets: [{
                    label: 'Award Count',
                    backgroundColor: awardcolor,
                    data: award_count
                }]
            };

            var ctx = $('#myChart');
            var barGraph = new Chart(ctx, {
                type: 'bar',
                data: chartdata
            });
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText); // Log the error response
            console.log(error); // Log the error message
            // You can also show an error message to the user or take other actions
        }
    });
}


function Index(){
    window.location.href = 'index.html';
}


$(function(){
    getTotalAwards();
    getAwarded();
    getAwards();
});
