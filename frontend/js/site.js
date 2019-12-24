// JQUERY makes our life very easy

//1.  how to make backend call
$.getJSON('/api/data', function(d){
    //alert(JSON.stringify(d));

    $('#name').text(d.name);
    $('#college').text(d.college);
    $('#regno').text(d.regno);

})
//2.  how to show data from js file to html file