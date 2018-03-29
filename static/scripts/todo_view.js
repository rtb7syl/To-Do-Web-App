
/*global $*/
/*global date*/
/*global location*/


$('input#chck').click(function() {
    var theClass = this.className;
    // "this" is the element clicked
    //alert( theClass);
    
    var i = theClass.slice(8);
    var postObj = {i:i};
    
    var postObjJSON = JSON.stringify(postObj);
    console.log(postObj)
    console.log(date)
    //console.log('desc'+theClass.slice(8))
    //console.log("p.todo_description"+theClass.slice(8))
    
    
    $( "h2.header.todo_description"+theClass.slice(8)).toggleClass('desc');
    
    $.ajax({
      type: 'POST',
      data: postObjJSON ,
      dataType: 'json',
      contentType: 'application/json',
      url: 'http://todo-list-web-app-sritabrata.c9users.io:8080/' + date + '/todo/mark_done' ,            
      success: function(data) {
          console.log('success');
          //console.log(JSON.stringify(data));
      }
  });
    
});  


function goToNextDate(){
  var date_array = date.split('-');
  
  var year = date_array[2]
  var month = date_array[1] - 1
  var day = date_array[0]
  
  var day = new Date(year,month,day);
  console.log(day); // Apr 30 2000
  
  var nextDay = new Date(day);
  nextDay.setDate(day.getDate()+1);
  //console.log(nextDay.getDate());
  
  var next_day_date = nextDay.getDate().toString() + '-' + (nextDay.getMonth() + 1).toString() + '-' + nextDay.getFullYear().toString()
  
  location.href = '/' + next_day_date
  
}

function goToPrevDate(){
  var date_array = date.split('-');
  
  var year = date_array[2]
  var month = date_array[1] - 1
  var day = date_array[0]
  
  var day = new Date(year,month,day);
  console.log(day); // Apr 30 2000
  
  var prevDay = new Date(day);
  prevDay.setDate(day.getDate()-1);
  //console.log(nextDay.getDate());
  
  var prev_day_date = prevDay.getDate().toString() + '-' + (prevDay.getMonth() + 1).toString() + '-' + prevDay.getFullYear().toString()
  
  location.href = '/' + prev_day_date
  
}