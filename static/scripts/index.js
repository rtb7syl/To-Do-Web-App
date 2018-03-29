 /*global $*/
 /*global location*/
  
  
 function DisplayDateTime()
 {
 var DateTime = new Date();
 var strYear= DateTime.getFullYear();
 var strMonth= DateTime.getMonth() +1;
 var strDay = DateTime.getDate();
 var strHours = DateTime.getHours();
 var strMinutes = DateTime.getMinutes();
 var strSeconds = DateTime.getSeconds();
 //var tagDiv=document.getElementById("DivTag");
 $("strong.date").text(strDay + "/" + strMonth + "/" + strYear)
 $("strong.time").text(strHours + ":" + strMinutes + ":" + strSeconds)
 
 return strDay + "/" + strMonth + "/" + strYear
 }
 
  DisplayDateTime();


 function findDate()
 {
 var DateTime = new Date();
 var strYear= DateTime.getFullYear();
 var strMonth= DateTime.getMonth() +1;
 var strDay = DateTime.getDate();
 var strHours = DateTime.getHours();
 var strMinutes = DateTime.getMinutes();
 var strSeconds = DateTime.getSeconds();
 //var tagDiv=document.getElementById("DivTag");

 
 return strDay + "-" + strMonth + "-" + strYear
 }
  
 function goToPage()
 {
     var date = findDate();
     location.href = "/" + date;
 }
 
 
 