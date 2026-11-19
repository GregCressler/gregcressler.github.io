(function(){
  var audio=document.getElementById('player'); if(!audio) return;
  var current=null;
  function setState(t,on){ if(t) t.classList.toggle('playing',on); }
  document.querySelectorAll('.track').forEach(function(t){
    var btn=t.querySelector('.play');
    btn.addEventListener('click',function(){
      if(current===t && !audio.paused){ audio.pause(); return; }
      if(current!==t){
        setState(current,false); if(current) current.querySelector('.fill').style.width='0';
        current=t; audio.src=t.dataset.src;
      }
      audio.play();
    });
    var lb=t.querySelector('.lyr-btn');
    if(lb) lb.addEventListener('click',function(){
      var box=document.getElementById(lb.getAttribute('aria-controls'));
      var open=lb.getAttribute('aria-expanded')==='true';
      lb.setAttribute('aria-expanded',String(!open)); box.hidden=open;
    });
  });
  audio.addEventListener('play',function(){ setState(current,true); });
  audio.addEventListener('pause',function(){ setState(current,false); });
  audio.addEventListener('ended',function(){
    setState(current,false); current.querySelector('.fill').style.width='0';
    var next=current.nextElementSibling;
    if(next){ next.querySelector('.play').click(); }
  });
  audio.addEventListener('timeupdate',function(){
    if(current && audio.duration) current.querySelector('.fill').style.width=(audio.currentTime/audio.duration*100)+'%';
  });
})();
