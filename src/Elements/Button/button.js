import "./button.styl"



 $(function() {
    
    
    $('.ripple-button').on('click', function (event) {
      event.preventDefault();
      
      var $div = $('<div/>'),
          btnOffset = $(this).offset(),
      		xPos = event.pageX - btnOffset.left,
      		yPos = event.pageY - btnOffset.top;
      

      
      $div.addClass('ripple');
      var $ripple = $(".ripple");
      
      $ripple.css("height", $(this).height());
      $ripple.css("width", $(this).height());
      $div
        .css({
          top: yPos - ($ripple.height()/2),
          left: xPos - ($ripple.width()/2),
          background: $(this).data("ripple-color")
        }) 
        .appendTo($(this));

      window.setTimeout(function(){
        $div.remove();
      }, 2000);
    });
    
     $('.ripple-button').each( function(){
         
        if( $(this).data("border-color") )
                 $(this).css("border", "solid 0.1em "+$(this).data("border-color"))
                 
        if( $(this).data("border-bottom-color") )
                 $(this).css("border-bottom", "solid 0.3em "+$(this).data("border-bottom-color"))
            
     })
  });
  