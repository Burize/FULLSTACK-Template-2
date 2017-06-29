import './video.styl'

$( function(){
    
    
    $('.player').each(function(){
        
        
        var player = this.children[0];
	    var btnPlayPause = $(this).find('.player__controls-play').first();
	    var progressBar  = $(this).find('#progress-bar').first();
        var expand = $(this).find('.player__controls-fullscreen').first();
        
     
    expand.click(function(){
            
            toggleFullScreen();
        });
        
     player.addEventListener('timeupdate', updateProgressBar, false);
 
     btnPlayPause.click( function() {
             
       
            if (player.paused || player.ended) {


                player.play();
            }
            else {

                player.pause();
            }
  }); 
   
	player.addEventListener('play', function() {
		
        btnPlayPause.children('.svg-play').css('display', 'none');
        btnPlayPause.children('.svg-pause').css('display', 'block');
        
        return false;
	});
  
	player.addEventListener('pause', function() {
	 
        btnPlayPause.children('.svg-play').css('display', '');
        btnPlayPause.children('.svg-pause').css('display', '');
		
        return false;
	});
	
	
  
	player.addEventListener('ended', function() { this.pause(); return false});	
  
  progressBar[0].addEventListener("click", seek);

  function seek(e) {
      var percent = e.offsetX / this.offsetWidth;
      player.currentTime = percent * player.duration;
      e.target.value = Math.floor(percent * 100); 
  
  }


  function updateProgressBar() {
  	
  	var percentage = Math.floor( player.currentTime /  player.duration * 100 );
  	
  	progressBar[0].value = percentage; console.log(percentage);
  
  }
  
  function toggleFullScreen () {
  

    if (player.requestFullscreen)
        if (document.fullScreenElement) {
            document.cancelFullScreen();
        } else {
            player.requestFullscreen();
        }
        else if (player.msRequestFullscreen)
        if (document.msFullscreenElement) {
            document.msExitFullscreen();
        } else {
            player.msRequestFullscreen();
        }
        else if (player.mozRequestFullScreen)
        if (document.mozFullScreenElement) {
            document.mozCancelFullScreen();
        } else {
            player.mozRequestFullScreen();
        }
        else if (player.webkitRequestFullscreen)
        if (document.webkitFullscreenElement) {
            document.webkitCancelFullScreen();
        } else {
            player.webkitRequestFullscreen();
        }
    else {
        alert("Fullscreen API is not supported");
        
    }
  }
    
      }); 
})


