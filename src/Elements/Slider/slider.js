import "./slider.styl"

$(function(){
    
   
    
    $(".slider").each(function(index, _slider){
    
        var slider = $(_slider).children(".slider__inner").children("svg");
         var thumbElem = slider.children("circle");
        
         thumbElem.mousedown( function(e) {
      
        thumbElem.attr("cx");
      

      var sliderleft = slider.offset().left ;
        
      $(document).mousemove( function(e) {
       
        var newLeft = (e.pageX  - sliderleft) * 100.0 / slider.outerWidth() ;
      
         
          
        if (newLeft < 5) 
          newLeft = 5;
        
     
        if (newLeft > 95.1) 
          newLeft = 95.1;

    
        thumbElem.attr('cx', newLeft + '%'); 
          
         $(_slider).children(".slider-hint").css("left",  newLeft - 6 + '%').children("span").text( Math.round(newLeft * 1.099999 ) -5);
          
      })

      $(document).mouseup( function() {
        $(document).unbind('mousemove')
        $(document).unbind('mouseup')
      });

      return false; 
    });

    });

   
});


