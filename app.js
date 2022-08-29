$(window).load(function checkCookie() {
  let user = getCookie("name");
  if (user != "") {
    $('.name').addClass("hide");
    $('#namesubmit').addClass("hide");
    $('#messageInput').removeClass("hide");
    $('#msgsubmit').removeClass("hide");
  } else {
    $('#namesubmit').click(() =>{
  
      var name = $('#nameInput').val();
              if (name != null){
                setCookie("name", name, 30);
                $('.name').addClass("hide");
                $('#namesubmit').addClass("hide");
                $('#messageInput').removeClass("hide");
                $('#msgsubmit').removeClass("hide");
              }
    
            });
  }
});

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}



/*******************************************
 ****************** main js ****************/


var myDataRef = firebase.database().ref('chat');  

       
          $('#msgsubmit').click(()=> {
            if ($('#messageInput').val().length >=1){
           
            var name = getCookie("name");
            var text = $('#messageInput').val();
           var time= new Date().getHours()+":"+new Date().getMinutes();
            myDataRef.push({
                name: name,
                text: text,
                time: time
            });
            $('#messageInput').val(''); 
          }
        });
        
    
      myDataRef.on('child_added', function(chatting) {
        var message = chatting.val();
        
        displayChatMessage(message.name, message.text,message.time);
      });
    
      
      function displayChatMessage(name, text,time) {
        
        $('<div/>').addClass("text-msg "+ name).prepend($('<span/>').text(time).addClass("time")).prepend($('<p/>').text(text).addClass("p-msg")).prepend($('<em/>').text('~'+name).addClass("text-name "+ name)).appendTo($('#messagesDiv'));
       
       $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
        var findedname=getCookie("name");
     $(".text-name."+findedname).addClass("self-name");
     $(".text-msg."+findedname).addClass("self-msg");
       
      };

    
  
