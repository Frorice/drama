var path = '';  
var length = location.pathname.split('/').length-1;
while(length>0){
  path += '../';
  length--;
}

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
 if(xhr.readyState == 4){
   if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
     if(xhr.responseText !== 'false'){
      var passages = document.getElementById('passages');
      var img = document.createElement('img');
      var anchor = document.createElement('a');
      var imgSrc = xhr.responseText.split('-')[0];
      var userHref = path + 'user/' + xhr.responseText.split('-')[1];
      

      passages.innerHTML = null;
      img.src = imgSrc;
      img.className = 'pure-img';
      anchor.className = 'logout';
      anchor.href = userHref;
      anchor.appendChild(img); 
      passages.appendChild(anchor);
     }
   }else{
     console.error("请求失败：" + xhr.status);
   }
 }
};
xhr.open('get',path+'logged',true);
xhr.send(null);