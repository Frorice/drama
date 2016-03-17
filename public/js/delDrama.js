function delDrama(){

  var delLine = event.target.parentNode.parentNode;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
   if(xhr.readyState == 4){
     if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){

       if(xhr.responseText === 'success'){
        
        delLine.style.display = "none";
       }else{
        console.error("删除失败")
       }
     }else{
       console.error("请求失败：" + xhr.status);
     }
   }
  };

  xhr.open('delete','/admin/dlist?id='+event.target.id,true);
  xhr.send(null);
}