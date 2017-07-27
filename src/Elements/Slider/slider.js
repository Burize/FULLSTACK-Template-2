import "./slider.styl"

$(function(){
    
   
    
    $(".slider").each(function(index, _slider){
    
        let slider = $(_slider).children(".slider__inner").children("svg");
        let thumbElem = slider.children("circle");
        let hint = $(_slider).children(".slider-hint");
        
        thumbElem.on('mousedown.slider', function(e) {
      

            let sliderleft = slider.offset().left ;
        
        
            $(document).on( 'mousemove.slider',function(e) {

                let newLeft = (e.pageX  - sliderleft) * 100.0 / slider.outerWidth() ;

                if (newLeft < 5) 
                  newLeft = 5;

                if (newLeft > 95.1) 
                  newLeft = 95.1;

                thumbElem.attr('cx', newLeft + '%'); 

                hint.css("left",  newLeft - 6 + '%').children("span").text( Math.round(newLeft * 1.099999 ) -5);

            }) 

            $(document).on('mouseup.slider', function() {
              $(document).off('mousemove.slider')
              $(document).off('mouseup.slider')
            });

      return false; 
        });

    });

   
});


