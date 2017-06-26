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
    
     $('.ripple-button').each( function(index, element){
         
        if( $(element).data("border-color") )
                 $(element).css("border", "solid 0.1em "+$(element).data("border-color"))
                 
        if( $(element).data("border-bottom-color") )
                 $(element).css("border-bottom", "solid 0.3em "+$(element).data("border-bottom-color"))
            
     })
  });
  