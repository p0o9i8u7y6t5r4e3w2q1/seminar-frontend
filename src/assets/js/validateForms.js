function validateQueryAvailableTimeForm() {
  var queryDate = document.forms["queryAvailableTimeForm"]["queryDate"].value;
  var queryClassroom=document.forms["queryAvailableTimeForm"]["queryClassroom"].value;
  var weekday=[document.getElementById("sunday"),document.getElementById("monday"),document.getElementById("tuesday"),document.getElementById("wednesday"),document.getElementById("thursday"),document.getElementById("friday"),document.getElementById("saturday")];

  if (queryDate == "" || queryClassroom=="") {
    alert("請填寫正確資料");
    return false;
  }
  else{ 
    //***************missing query from database*******************//
    var input_weekday=new Date(queryDate).getDay();
    var today=new Date(queryDate);

    for (var i=0;i<input_weekday;i++){
      var temp=new Date();
      temp.setDate(today.getDate()-(input_weekday-i));
      var dateString = temp.getUTCFullYear() +"/"+ (temp.getUTCMonth()+1) +"/"+ temp.getUTCDate() + " ("+weekday[i].innerHTML+")";
      weekday[i].innerHTML=dateString;
    }
    for (var i=input_weekday;i<=6;i++){
      var temp=new Date();
      temp.setDate(today.getDate()+(i-input_weekday));
      var dateString = temp.getUTCFullYear() +"/"+ (temp.getUTCMonth()+1) +"/"+ temp.getUTCDate() + " ("+weekday[i].innerHTML+")";
      weekday[i].innerHTML=dateString;
    }
    return false;
  }
}

function validateAcceptConditionForm(){
  var iimBtn = document.getElementById("imiimBtn");
  var notiimBtn=document.getElementById("imnotiimBtn");
  iimBtn.onclick=function(){
    window.open("/booking/iim", '_self');
  }
  notiimBtn.onclick=function(){
    window.open("/booking/general", '_self');
  }
  return false;
}

function validateBorrowFormIIM (){
  var id=document.getElementById("stu_id_input").value;
  var id_patt = new RegExp("[A-Za-z][0-9]{8}");
  if (!id_patt.test(id)){
    alert("請填入正確學號");
    return false;
  }
  var date=document.forms["iimRequestBorrowForm"]["date_input"].value;
  var start=document.forms["iimRequestBorrowForm"]["start_period"].selectedIndex;
  var end=document.forms["iimRequestBorrowForm"]["end_period"].selectedIndex;
  var classroom=document.forms["iimRequestBorrowForm"]["classroom"].value;
  var activity_name=document.forms["iimRequestBorrowForm"]["activity_name"].value;
  if(date==""||classroom==""||activity_name==""){
    alert("請填寫正確資料");
    return false;
  }
  if (start>end){
    alert("選擇節數不正確")
    return false;
  }
   //***************missing add data to database*******************//
  alert("您的申請編號為：12345678");
  return true;
}

function validateBorrowFormNotIIM (){
  var name=document.forms["notiimRequestBorrowForm "]["name_input"].value;
  var date=document.forms["notiimRequestBorrowForm"]["date_input"].value;
  var start=document.forms["notiimRequestBorrowForm"]["start_period"].selectedIndex;
  var end=document.forms["notiimRequestBorrowForm"]["end_period"].selectedIndex;
  var classroom=document.forms["notiimRequestBorrowForm"]["classroom"].value;
  var activity_name=document.forms["notiimRequestBorrowForm"]["activity_name"].value;
  if(name==""||date==""||classroom==""||activity_name==""){
    alert("請填寫正確資料");
    return false;
  }
  if (start>end){
    alert("選擇節數不正確")
    return false;
  }
  //***************missing add data to database*******************//
  alert("您的申請編號為：12345678");
  return true;
}

function queryBorrow(){
  var queryNum=document.getElementById("queryNum").value;
  var queryNumPatt=new RegExp("[0-9]{8}");
  if (!queryNumPatt.test(queryNum)){
    alert("流水號不正確");
  }else if (queryNum=="12345678"){
    //***************missing query from database*******************//
    window.open("06_查詢進度(結果).html", '_self');
  }else{
    alert("此流水號不存在");
  }
  
}

function deleteConfirmation(){
  var email=prompt("請輸入Email確認刪除:");
  if(email=="melolinchou@gmail.com"){
    //***************missing delete data from database*******************//
    alert("您的申請已刪除");
    window.open("05_查詢進度(流水號).html", '_self');
  }
  else{
    alert("Email不正確，刪除失敗")
  }
}

function login(){
  var account=document.getElementById("account").value;
  var password=document.getElementById("password").value;
  if(account=="h34055041"&&password=="melo"){
    //***************missing query from database*******************//
    window.open("09_個資修改.html",'_self');
  }else{
    alert("帳號或密碼不正確");
  }
}

function signUp(){
  var stu_id=document.getElementById("reg_stu_id").value;
  var name=document.getElementById("reg_name").value;
  var email=document.getElementById("reg_email").value;
  var pass=document.getElementById("reg_password").value;
  var confirm_pass=document.getElementById("reg_confirm_password").value;
  var id_patt = new RegExp("[A-Za-z][0-9]{8}");
  if (stu_id==""||name==""||email==""||pass==""||confirm_pass==""){
    alert("請確認填寫所有欄位");
    return false;
  }
  else if(!id_patt.test(stu_id)){
    alert("學號不正確");
    return false;
  }
  else if(pass!=confirm_pass){
    alert("密碼不正確");
    return false;
  }
  else{
    //***************missing add data to database*******************//
    alert("註冊成功，請重新登入");
    window.open("07_登入.html",'_self');
    
  }
  return false;
}

function changeProfile(){
  var name=document.getElementById("profile_name").value;
  var email=document.getElementById("profile_email").value;
  var pass=document.getElementById("profile_password").value;
  var confirm_pass=document.getElementById("profile_confirm_password").value;
  
  if (name==""||email==""||pass==""||confirm_pass==""){
    alert("請確認填寫所有欄位");
    return false;
  }
  else if(pass!=confirm_pass){
    alert("密碼不正確");
    return false;
  }
  else{
    //***************missing update data to database*******************//
    alert("修改成功");
    return true;
    
  }
}

function validateAddNewClassForm(){
  var date=document.getElementById("new_class_date").value;
  var start=document.getElementById("new_class_start_period").selectedIndex;
  var end=document.getElementById("new_class_end_period").selectedIndex;
  var classroom=document.getElementById("new_class_classroom").value;
  if(date==""||classroom==""){
    alert("請確認填寫所有欄位");
    return false;
  }
  else if(end<start){
    alert("選擇節數不正確");
    return false;
  }
  else if(start==5){
    //***************missing query from database*******************//
    alert("時段已有別人借用，請選擇其他時段");
    return false;
  }
  else{
    //***************missing add data to database*******************//
    alert("新增補課成功");
    window.open("10_課程管理.html",'_self');
  }
  return false;
}

function deleteClass(){
  var classname=document.getElementById("delete_class_name").value;
  var classroom=document.getElementById("delete_classroom").value;
  var date=document.getElementById("delete_date").value;
  var classperiod=[document.getElementById("period1").checked,document.getElementById("period2").checked,document.getElementById("period3").checked];

  if(date==""){
    alert("請填寫日期");
    return false;
  }
  
  else {
    for (var i=0;i<classperiod.length;i++){
      if(classperiod[i]==true){
        //***************missing delete data from database*******************//
      }
    }
    alert("停課成功");
    window.open("10_課程管理.html");
  }
  return false;
}
