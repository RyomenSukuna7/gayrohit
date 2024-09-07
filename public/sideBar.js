function openNav() {
    document.getElementById("mySidenav").style.width = "225px";
    document.getElementById("mySidenav").style.zIndex=1;
    document.getElementById("chat-container").style.zIndex=0;
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }